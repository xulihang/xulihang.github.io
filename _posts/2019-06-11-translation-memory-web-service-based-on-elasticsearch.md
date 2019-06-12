---
date: 2019-06-11 19:44:50+08:00
layout: post
title: 基于Elasticsearch构建翻译记忆Web服务
categories: 技术随笔
tags: CAT
---

此前的一篇文章[翻译记忆服务器探究](/exploration-of-translation-memory-servers/)主要介绍了Pootle采用的基于PostegreSQL的amagama和Elasticsearch两种实现方式。

PostegreSQL对性能要求没有Elasticsearch那样高，但是学习难度不小。我这里先基于提供REST API的Elasticsearch设计自己中间件程序，用于提供翻译记忆检索的Web服务。

构想的索引结构见以下新建索引的命令：

```
$ curl -XPOST 'http://localhost:9200/tm/_doc?pretty' -H 'Content-Type: application/json' -d '
{
    "creator": "kimchy",
    "createdTime": "1560259504000",
    "field": "generic",
    "tag": "自我介绍",
    "doc": {"id":"", "filename":"", "seg_num":,""}
    "text": {"zh":"我是男人。","en":"I am a man."} 
}
```

在检索时，比如检索英译中项目的翻译记忆，可以使用以下命令：

```
curl -XGET 'http://localhost:9200/tm/_search?pretty=true' -H 'Content-Type: application/json' -d '
{
    "query" : {
        "bool": {
            "must":
                [
                    {"match" : { "text.en": "I am a woman." }},
                    {"exists" : { "field": "text.zh" }}
                ]
            }
        }
}'
```

获得检索结果后可以进一步用编辑距离计算相似度并排序。

其实索引的内容是照搬了现有的翻译记忆的条目设计，比如谁创建的，什么时候创建的，一条记忆可以包含多个语种的文本。除此以外，还可以设置领域和标签。领域的种类是有限的，而标签可以由用户自行添加。

关于如何上传翻译记忆，有两种方法，一种是用户翻译一条，上传一条，一种是导入tmx文件或者其它双语格式文件。

使用前一种，则基本可以替代本地的翻译记忆数据库，直接通过网络API保存和检索翻译记忆。后一种因为是翻译结束后导入，可以保证质量。另外，导入的双语文件可以是xliff或者是BasicCAT的工作文件，这样可以提供上下文信息。所以我在上面的索引结构里还添加了翻译记忆来自于哪个翻译文件，对应的片段号是多少。

还要考虑一个翻译记忆的更新问题，可以根据文件名和文本确定是否有该条记忆，如果有则进行更新操作，没有则新建一个索引项目。

做好核心功能后，还可以添加多用户的功能以及社区协作模式，类似[globse](https://zh.glosbe.com/)。但用户多了可能难以确定哪个版本的质量好，如何保证质量还需要进一步研究。

相关链接：

[elasticsearch 嵌套对象之嵌套类型](https://www.cnblogs.com/gmhappy/p/9472382.html)






