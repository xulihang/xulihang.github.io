---
date: 2019-05-03 10:26:50+08:00
layout: post
title: 翻译记忆服务器探究
categories: 技术随笔
tags: CAT
---

翻译记忆服务器提供一个集中式的翻译记忆服务。用户通过API，获得匹配的翻译记忆条目，不需要在本地拥有一份翻译记忆库，也不需要在本地进行计算。

开源的在线本地化软件[Pootle](https://github.com/translate/pootle)支持两种在线翻译记忆服务：自己开发的amaGama、基于Elasticsearch的翻译记忆服务。


### amaGama

[amaGama](https://github.com/translate/amagama)是用Python+Flask+PostgreSQL构建的，它的代码数量不多，目前用户只能通过API获得匹配，不能实时更新远程数据库。翻译记忆数据库需要本地更新（从PO、TMX和XLIFF导入双语数据）。

为了提高速度，有使用memcache进行缓存，也有考虑存储编辑距离的计算结果。它主要的一条SQL查询匹配的语句如下：

```python
query = """
SELECT * from (SELECT s.text AS source, t.text AS target, TS_RANK(s.vector, query, 32) * 1744.93406073519 AS rank
    FROM sources_%s s JOIN targets_%s t ON s.sid = t.sid,
    TO_TSQUERY(%%(lang_config)s, prepare_ortsquery(%%(search_str)s)) query
    WHERE t.lang = %%(tlang)s AND s.length BETWEEN %%(minlen)s AND %%(maxlen)s
    AND s.vector @@ query) sub WHERE rank > %%(minrank)s
    ORDER BY rank DESC
""" % (slang, slang)
```

### Elasticsearch

Elasticsearch是基于lucene的高性能分布式全文检索引擎。Pootle通过以下Elasticsearch的查询语句获得匹配：

```python
es_res = self._es_call(
            "search",
            index=self._settings['INDEX_NAME'],
            doc_type=language,
            body={
                "query": {
                    "match": {
                        "source": {
                            "query": unit.source,
                            "fuzziness": 'AUTO',
                        }
                    }
                }
            }
        )
```

每个条目存储的结构如下(python dict)：

```
{
    '_index': self.INDEX_NAME,
    '_type': unit['store__translation_project__language__code'],
    '_id': unit['id'],
    'revision': int(unit['revision']),
    'project': unit['store__translation_project__project__fullname'],
    'path': unit['store__pootle_path'],
    'username': unit['change__submitted_by__username'],
    'fullname': fullname,
    'email_md5': email_md5,
    'source': unit['source_f'],
    'target': unit['target_f'],
    'iso_submitted_on': iso_submitted_on,
    'display_submitted_on': display_submitted_on,
}
```

然后通过编辑距离筛选结果。ElasticSearch它本身支持的最大编辑距离是2，用于修复拼写错误。这里的编辑距离计算是amaGama自己实现的。

我测试下来，觉得利用Elasticsearch的全文检索功能预先检索相关片段，然后对所得的片段用编辑距离筛选是一个不错的模式。片段第一次检索会按相关度进行排序，编辑距离可以确定具体的相似度。直接检索检索结果比使用编辑距离有一些优点，比如China vs Japan和Japan vs China，两者的含义是一样的，但如果使用编辑距离计算相似度，差别就比较大。所以可能也不妨提供个选项，不使用编辑距离筛选。

如果Elasticsearch是本地服务，用户的翻译单元会添加进去，如果是远程的，则不是自动添加。

除了Pootle，Transifex也有使用Elasticsearch作为翻译记忆的后端，具体可以看这篇博文：[Elasticsearch at Transifex](https://www.transifex.com/blog/2015/elasticsearch-at-transifex/)。

### 其它

BasicCAT目前采取的方法是中央服务器只存储翻译记忆，用户在使用时，会把远程的翻译记忆先同步到本地，然后在本地进行相似度计算。这对于共享项目翻译记忆还是很好用的。但是如果记忆库很大、或者记忆库需要保密，则不是很好使了。

类似的还有OmegaT的协作方法，基于SVN/Git服务器共享翻译记忆tmx文件。

### 2019/11/18更新 

MaxPrograms发布了[TMEngine](https://github.com/rmraya/TMEngine)这一开源的翻译记忆服务器程序，提供常见的翻译记忆操作，支持mapdb、mysql、mariadb等数据库。它的算法不是很先进，索引占据很大的空间，检索效果还不准确。

下面是它的一些API操作，使用curl演示。

建立TM：

```
curl -X POST "http://localhost:8000/TMServer/create" -H 'Content-Type: application/json' -d'

{
  "name": "First Memory",
  "type": "MapDbEngine"
}'
```

导入翻译记忆：

```
curl -X POST "http://localhost:8000/TMServer/import" -H 'Content-Type: application/json' -d'
{
  "id": "1574061624814",
  "file": "E:\\FileRecv\\通用领域记忆库10_英中.tmx",
  "project": "Main TM"
}'
```

查看导入结果或者查询结果：

```
curl -X POST "http://localhost:8000/TMServer/status" -H 'Content-Type: application/json' -d'
{
  "process": "1574061941890",
}'
{
  "result": "Completed",
  "data": {"matches": [{
    "similarity": 61,
    "origin": "1574061624814",
    "source": "<tuv xml:lang=\"en-us\"><seg>Are you from Sandu?<\/seg><\/tuv>",
    "properties": {
      "creationdate": "20191118T152541Z",
      "project": "Main TM",
      "tuid": "1574061949773",
      "creationid": "xulihang"
    },
    "target": "<tuv xml:lang=\"zh-cn\"><seg>你是来自三都吗？<\/seg><\/tuv>"
  }]},
  "status": "OK"
}

```

模糊匹配：


```
curl -X POST "http://localhost:8000/TMServer/search" -H 'Content-Type: application/json' -d'
{
  "id": "1574061624814",
  "text": "you are famous.",
  "srcLang": "en-us",
  "tgtLang": "zh-cn",
  "similarity": 50,
  "caseSensitive": false
}
'
```

片段搜索：

```
curl -X POST "http://localhost:8000/TMServer/concordance" -H 'Content-Type: application/json' -d'
{
  "id": "1574061624814",
  "text": "computer",
  "srcLang": "en-us",
  "limit": 5,
  "isRegexp": false,
  "caseSensitive": false
}
'
```



参考资料：

* [Translation Memory - Pootle](http://docs.translatehouse.org/projects/pootle/en/stable-2.7.3/features/translation_memory.html)
* [amaGama documentation](http://docs.translatehouse.org/projects/amagama/en/latest/index.html)




