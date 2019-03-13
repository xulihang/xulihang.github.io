---
date: 2019-03-13 18:27:50+08:00
layout: post
title: 基于Elasticsearch构建翻译资源检索系统
categories: 技术随笔
tags: CAT B4X Elasticsearch
---

翻译部门常常会有一堆存在硬盘上的过往的翻译资源以及不断产生的新的资源，可以利用Elasticsearch构建一个全文搜索引擎进行管理。

### 索引

这些资源文件一般会以文件夹进行管理，结构依次是分类-项目名-文件。

其中文件有源文档和目标文档。比较结构化的一种文件整理法是源文档放在source文件夹，目标文档放在target文件夹，然后源文档和目标文档的名字一样。使用CAT软件后还可以有句对齐的翻译记忆，这里先不考虑。

我们可以在Elasticsearch中建一个documents索引，然后保存的文档按以下内容组织：

```
 "_source" : {
          "filename" : "Apple just dismissed more than 200 employees from Project Titan.txt",
          "project" : "163",
          "sourceOrTarget" : "target",
          "text" : "苹果自动驾驶项目Project Titan裁员逾200人",
          "category" : "AI",
          "title" : "Apple just dismissed more than 200 employees from Project Titan"
}
```

#### 添加中文支持

默认的分词器会把中文分成单字，没有词语。通过[添加analysis-ik](http://blog.xulihang.me/elasticsearch/#%E4%BD%BF%E7%94%A8%E4%B8%AD%E6%96%87%E5%88%86%E8%AF%8D)可以对中文进行分词。

这样检索时可以按词语进行检索，匹配效果更好。

设置mapping时一般对全文使用ik_max_word分析，对搜索的关键词进行ik_smart分析。前者分词的粒度更细，供检索的词就越多。而后者用于关键词，可以保证检索结果和关键词更加匹配。

不过有一个问题就是无法检索单字，因为默认没有对单字进行索引。我们需要修改ik默认的配置文件添加单字词典。配置文件是在plugins\ik\config目录的IKAnalyzer.cfg.xml文件，可以看到目录里还有extra_single_word.dic这个单字词典，默认没有使用。我选择先添加这个词典。

保存后的配置文件如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
	<comment>IK Analyzer 扩展配置</comment>
	<!--用户可以在这里配置自己的扩展字典 -->
	<entry key="ext_dict">extra_single_word.dic</entry> <!-- 这里我进行了修改 -->
	 <!--用户可以在这里配置自己的扩展停止词字典-->
	<entry key="ext_stopwords"></entry>
	<!--用户可以在这里配置远程扩展字典 -->
	<!-- <entry key="remote_ext_dict">words_location</entry> -->
	<!--用户可以在这里配置远程扩展停止词字典-->
	<!-- <entry key="remote_ext_stopwords">words_location</entry> -->
</properties>
```

#### 多字段检索

多字段检索可以使用multi_match，相当于使用should的bool。

我这里统一使用bool。比如我要检索的内容必须符合某个分类以及是原文还是译文，在title或者text中有匹配就行。可以写出以下的表达式：

```json
{"bool":
    {"must":
        [
            {"match" : {"category" : "分类"}}, 
            {"match" : {"sourceOrTarget" : "target""}},
            {"bool" : {
                "should" : [
                    {"match" : { "title" : "apple"}},
                    {"match" : { "text" : "apple"}}
                    ]
                    }
                  }
        ]
    }
}
```

#### 通配符与模糊匹配

要检索包含227的内容，可以输入`*227*`来检索，*表示匹配多个字符，?表示匹配单个字符。

```
curl -X GET "localhost:9200/_search" -H 'Content-Type: application/json' -d'
{
    "query" : {
        "wildcard":{"text":"*227*"}
    }
}'
```

模糊匹配是使用了编辑距离，编辑距离如果小于某个值就算是命中。比如检索excite，可以检索到编辑距离为2的excited，或者是拼写错误，are输成了aer，也可以显示正确的结果。

```
curl -X GET "localhost:9200/_search" -H 'Content-Type: application/json' -d'
{
    "query" : {
        "fuzzy":{"text":"excite"}
    }
}'
```

以上两个主要是把默认的match换成wildcard和fuzzy。另外还支持正则，regexp。

#### 获得分类列表

可以使用aggregation来获得某个字段的值的列表。

```
curl -X GET "localhost:9200/_search" -H 'Content-Type: application/json' -d'
{
	"size" : 0 ,
    "aggs" : {
        "categories" : {
            "terms" : { "field" : "category.keyword" }
        }
    }
}'
```

```json
{
  "took" : 38,
  "timed_out" : false,
  "_shards" : {
    "total" : 16,
    "successful" : 16,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : 27,
    "max_score" : 0.0,
    "hits" : [ ]
  },
  "aggregations" : {
    "categories" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 0,
      "buckets" : [
        {
          "key" : "童书",
          "doc_count" : 12
        },
        {
          "key" : "默认分类",
          "doc_count" : 4
        },
        {
          "key" : "pdf",
          "doc_count" : 2
        }
      ]
    }
  }
}
```

### 具体实现

使用B4J做后端，BANano写前端。

#### 后端

后端与elasticsearch进行交互。每个一段时间会检查翻译文档目录。通过建立meta索引保存之前索引的文件修改的时间，可以知道哪些文件有更新，有更新而且源文档和目标文档同时存在就进行索引。如果文档不是txt格式，就利用okapi tikal转换为xliff，然后再提取纯文本的内容。

对外提供检索接口。

#### 前端

前端调用后端接口，提供一个完整的搜索引擎的功能。使用BANano开发，前后端可以分离。

主要做好结果展示、分页，检索选项等内容。

