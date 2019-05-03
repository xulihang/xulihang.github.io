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

每个条目存储的结构如下：

```json
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

然后通过编辑距离筛选结果。但是我看ElasticSearch的文档说它本身支持的最大编辑距离是2，可能结果并不会很好。

如果Elasticsearch是本地服务，用户的翻译单元会添加进去，如果是远程的，则不是自动添加。

除了Pootle，Transifex也有使用Elasticsearch作为翻译记忆的后端，具体可以看这篇博文：[Elasticsearch at Transifex](https://www.transifex.com/blog/2015/elasticsearch-at-transifex/)。

### 其它

BasicCAT目前采取的方法是中央服务器只存储翻译记忆，用户在使用时，会把远程的翻译记忆先同步到本地，然后在本地进行相似度计算。这对于共享项目翻译记忆还是很好用的。但是如果记忆库很大、或者记忆库需要保密，则不是很好使了。

参考资料：

* [Translation Memory - Pootle](http://docs.translatehouse.org/projects/pootle/en/stable-2.7.3/features/translation_memory.html)
* [amaGama documentation](http://docs.translatehouse.org/projects/amagama/en/latest/index.html)




