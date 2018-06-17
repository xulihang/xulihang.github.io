---
date: 2018-06-17 14:39:50+08:00
layout: post
title: NLTK调用Stanford NLP工具包
categories: 技术随笔
tags: CAT NLP
---


NLTK含有与斯坦福自然语言处理工具的接口，可以直接将结果转为nltk支持的数据。

比如句法分析，可以直接生成nltk的tree类型数据。

具体教程网上已经有不少了，现做一个收集：

* [在 NLTK 中使用 Stanford NLP 工具包](http://www.zmonster.me/2016/06/08/use-stanford-nlp-package-in-nltk.html#orgheadline13)
* [Python自然语言处理实践: 在NLTK中使用斯坦福中文分词器](http://www.52nlp.cn/python%e8%87%aa%e7%84%b6%e8%af%ad%e8%a8%80%e5%a4%84%e7%90%86%e5%ae%9e%e8%b7%b5-%e5%9c%a8nltk%e4%b8%ad%e4%bd%bf%e7%94%a8%e6%96%af%e5%9d%a6%e7%a6%8f%e4%b8%ad%e6%96%87%e5%88%86%e8%af%8d%e5%99%a8)
* [Python NLTK结合stanford NLP工具包进行文本处理](https://www.cnblogs.com/baiboy/p/nltk1.html)


另外还有通过REST API直接调用CoreNLP的，官方网站的源码：[Source code for nltk.parse.corenlp](http://www.nltk.org/_modules/nltk/parse/corenlp.html)

具体用法：

实例一个server并运行:

```python
server=nltk.parse.corenlp.CoreNLPServer(path_to_jar="stanford-corenlp-3.7.0.jar", path_to_models_jar="stanford-corenlp-3.7.0-models.jar")
server.start()
```

具体用法就和上面的文章中提到的差不多了，提供分词、词性标注、句法分析和依存句法分析等功能。

比如句法分析：

```
>>> print(list(a.raw_parse("I like you."))[0])
(ROOT (S (NP (PRP I)) (VP (VBP like) (NP (PRP you))) (. .)))
```
