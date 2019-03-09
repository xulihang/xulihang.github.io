---
date: 2019-03-09 18:41:50+08:00
layout: post
title: Elasticsearch
categories: 技术随笔
tags: 
---

[Elasticsearch](https://github.com/elastic/elasticsearch)是一个分布式的搜索引擎，可以检索全文并进行分析。其实和mongodb很像，不过Elasticsearch把文件存在Lucene index文件里，而mongodb存在bson里，另外es的文本功能也更丰富。

我之所以要用Elasticsearch是因为公司过去十几年的翻译文件只是以文件的形式存在硬盘里，没有能够好好地利用起来，如果能用搜索引擎对所有文件进行全文检索那就可以提高利用程度。

了解Elasticsearch可以访问官网的教程：<https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html>。

Elasticsearch是用java写的，以rest api或者java api对外提供接口。可以通过<http://127.0.0.1:9200>访问。


### 相关概念

* Near Realtime（近乎实时），从检索文件到可以被搜索到只需要很短的时间
* Node and Cluster（节点和集群），node就是在一台电脑上运行的实例，一组node构成一个cluster
* Index（索引），Index就是一堆文件的集合，这类文件应该有相似的结构，比如都具有某个属性
* Type（类型），Index下还可以细分成几个type，但是Elasticsearch6开始只能有一个type，而7.0后就将弃用。
* Document（文档），信息的基本单元，用json格式来进行描述
* Shards（分片），如果要index存储的数据很多，那么磁盘空间可能不够，而且读写性能会有问题。通过拆分index为一个个shards，可以解决这一问题。
* Replica是shard的备份，规避节点出现故障的风险

### 基础操作

####　添加三个文档到叫做twitter的索引

```
curl -XPUT 'http://localhost:9200/twitter/_doc/1?pretty' -H 'Content-Type: application/json' -d '
{
    "user": "kimchy",
    "post_date": "2009-11-15T13:12:00",
    "message": "Trying out Elasticsearch, so far so good?"
}'

curl -XPUT 'http://localhost:9200/twitter/_doc/2?pretty' -H 'Content-Type: application/json' -d '
{
    "user": "kimchy",
    "post_date": "2009-11-15T14:12:12",
    "message": "Another tweet, will it be indexed?"
}'

curl -XPUT 'http://localhost:9200/twitter/_doc/3?pretty' -H 'Content-Type: application/json' -d '
{
    "user": "elastic",
    "post_date": "2010-01-15T01:46:38",
    "message": "Building the site, should be kewl"
}'
```

#### 列出所有索引

```
$ curl -X GET "localhost:9200/_cat/indices?v"
```

结果：

```
health status index   uuid                   pri rep docs.count docs.deleted store.size pri.store.size
yellow open   twitter FLSTkYHXRIqIQajFzNnVDQ   5   1          3            0       14kb           14kb
```

#### 查看某个索引

```
$ curl -XGET 'http://localhost:9200/twitter/_doc/1?pretty=true'
```

结果：

```json
{
  "_index" : "twitter",
  "_type" : "_doc",
  "_id" : "1",
  "_version" : 1,
  "_seq_no" : 0,
  "_primary_term" : 1,
  "found" : true,
  "_source" : {
    "user" : "kimchy",
    "post_date" : "2009-11-15T13:12:00",
    "message" : "Trying out Elasticsearch, so far so good?"
  }
}

```

#### 检索

有两种办法。

使用URL：

`curl -XGET 'http://localhost:9200/twitter/_search?q=user:kimchy&pretty=true'`

或者使用Elasticsearch的基于json的查询语言：

```
curl -XGET 'http://localhost:9200/twitter/_search?pretty=true' -H 'Content-Type: application/json' -d '
{
    "query" : {
        "match" : { "user": "kimchy" }
    }
}'
```

结果：

```json
{
  "took" : 20,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 0.6931472,
    "hits" : [
      {
        "_index" : "twitter",
        "_type" : "_doc",
        "_id" : "2",
        "_score" : 0.6931472,
        "_source" : {
          "user" : "kimchy",
          "post_date" : "2009-11-15T14:12:12",
          "message" : "Another tweet, will it be indexed?"
        }
      },
      {
        "_index" : "twitter",
        "_type" : "_doc",
        "_id" : "1",
        "_score" : 0.2876821,
        "_source" : {
          "user" : "kimchy",
          "post_date" : "2009-11-15T13:12:00",
          "message" : "Trying out Elasticsearch, so far so good?"
        }
      }
    ]
  }
}

```

#### 更新

```
$ curl -X POST "localhost:9200/twitter/_doc/1/_update?pretty" -H 'Content-Type: application/json' -d'
{
  "doc": { "user": "Jane Doe" }
}
'
```

#### 删除

```
$ curl -X DELETE "localhost:9200/twitter/_doc/2?pretty"
```

#### 检查健康状况

```
$ curl -X GET "localhost:9200/_cat/health?v"
```

结果：

```
epoch      timestamp cluster       status node.total node.data shards pri relo i                    nit unassign pending_tasks max_task_wait_time active_shards_percent
1552132035 11:47:15  elasticsearch yellow          1         1     15  15    0                        0       15             0                  -                 50.0%
```

### 更复杂的操作

#### Highlight 高亮

检索之前存储的文档的message内容，并高亮匹配的内容。

```
curl -X GET "localhost:9200/_search?pretty=true" -H 'Content-Type: application/json' -d'
{
    "query" : {
        "match": { "message": "tweet" }
    },
    "highlight" : {
        "fields" : {
            "message" : {}
        }
    }
}
'
```

结果：

```json
{
  "took" : 4,
  "timed_out" : false,
  "_shards" : {
    "total" : 15,
    "successful" : 15,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 0.6931472,
    "hits" : [
      {
        "_index" : "twitter",
        "_type" : "_doc",
        "_id" : "2",
        "_score" : 0.6931472,
        "_source" : {
          "user" : "kimchy",
          "post_date" : "2009-11-15T14:12:12",
          "message" : "Another tweet, will it be indexed?"
        },
        "highlight" : {
          "message" : [
            "Another <em>tweet</em>, will it be indexed?"
          ]
        }
      }
    ]
  }
}
```

#### aggregations 聚合

类似于SQL中的GROUP BY，可以对数据进行分析然后分组。

用法：

```
curl -X GET "localhost:9200/twitter/_search?pretty=true" -H 'Content-Type: application/json' -d'
{
    "aggs" : {
        "usernames" : {
            "terms" : { "field" : "user.keyword" }
        }
    }
}
'
```

其中usernames可以自己定义，我们这里使用的term aggregation，根据字段进行分组。

除了检索结果，可以看到还多了aggregations这一部分。

```json
{
  "took" : 7,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : 3,
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "twitter",
        "_type" : "_doc",
        "_id" : "2",
        "_score" : 1.0,
        "_source" : {
          "user" : "kimchy",
          "post_date" : "2009-11-15T14:12:12",
          "message" : "Another tweet, will it be indexed?"
        }
      },
      {
        "_index" : "twitter",
        "_type" : "_doc",
        "_id" : "1",
        "_score" : 1.0,
        "_source" : {
          "user" : "kimchy",
          "post_date" : "2009-11-15T13:12:00",
          "message" : "Trying out Elasticsearch, so far so good?"
        }
      },
      {
        "_index" : "twitter",
        "_type" : "_doc",
        "_id" : "3",
        "_score" : 1.0,
        "_source" : {
          "user" : "elastic",
          "post_date" : "2010-01-15T01:46:38",
          "message" : "Building the site, should be kewl"
        }
      }
    ]
  },
  "aggregations" : {
    "usernames" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 0,
      "buckets" : [
        {
          "key" : "kimchy",
          "doc_count" : 2
        },
        {
          "key" : "elastic",
          "doc_count" : 1
        }
      ]
    }
  }
}
```


### 其它

如果硬盘空间占用过高（高于95%，说明[见此](https://github.com/ankane/searchkick/issues/1040)），elasticsearch会切换为只读状态，会提示以下错误：

```json
{
  "error" : {
    "root_cause" : [
      {
        "type" : "cluster_block_exception",
        "reason" : "blocked by: [FORBIDDEN/12/index read-only / allow delete (api)];"
      }
    ],
    "type" : "cluster_block_exception",
    "reason" : "blocked by: [FORBIDDEN/12/index read-only / allow delete (api)];"
  },
  "status" : 403
}
```

这时可以通过以下操作进行解除：

```
curl -XPUT -H "Content-Type: application/json" http://localhost:9200/_all/_settings -d '{"index.blocks.read_only_allow_delete": null}'
```

### 产品栈

除了Elasticsearch，elastic公司还开发了一系列相关产品：

* Kibana，前端控制台，可以管理和可视化数据
* Logstash，可以对日志文件进行收集和处理并传到elasticsearch里
* Beats，从服务端收集日志、网络、监控数据的代理程序
* Elastic Cloud，一站式SaaS订阅服务
