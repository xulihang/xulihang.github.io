---
date: 2017-03-28 11:06:50+08:00
layout: post
title: 斯坦福自然语言处理工具小试
categories: 技术随笔
tags: NLP
---

Stanford Parser去年夏天就有试用，但感觉上手挺难，一来不懂自然语言处理，很多术语不了解。二来界面也不是很用户友好型的。所以没怎么用。

此次写毕业论文却是想把它写进去，用于分析英语原文和汉语译文中被动语态的使用次数。

# 介绍

Stanford NLP小组编写了一系列的NLP工具。整合在一起就是Stanford CoreNLP。它是一款自然语言处理套件，用Java写成，并在[github](https://github.com/stanfordnlp/CoreNLP)上开源。

Stanford corenlp主要可以对句子进行标注，可以是词性标注（POS，Part-of-speech） 、句法分析（parsing）、依赖关系标注（Dependency Parsing）、命名实体识别（NER，Named Entity Recognition）等。

而统计被动语态用到的就是依赖关系标注。在CoreNLP附带的StanfordDependenciesManual.pdf说明文件中可以了解各个标签的含义。比如反应被动语态的auxpass的说明如下：

> auxpass: passive auxiliary
> 
> A passive auxiliary of a clause is a non-main verb of the clause which contains the passive information.

# 具体用法

CoreNLP可以以服务器模式运行，也可以当作命令行工具单独完成一次处理。提供java api，可供程序调用。服务器模式好处在于进程不用结束，这样加载过模型文件以后，再次使用不用花时间加载，但不能处理长文，会出现timeout的问题。CoreNLP对内存的需求较高，没个16GB内存可能出现内存不足的问题。

以下介绍直接用java在命令行下运行的方法

服务器模式运行：

`$ java -Xmx8g -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLPServer`

如果需要支持中文则这样：

`$ java -Xmx8g -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLPServer -serverProperties StanfordCoreNLP-chinese.properties`

处理英文文本，结果导出为文本格式：

`$ java -mx6g -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLP  -annotators tokenize,ssplit,parse -file en.txt -outputFormat text`

处理中文文本，结果导出为文本格式：

`$ java -mx6g -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLP  -annotators tokenize,ssplit,parse -props StanfordCoreNLP-chinese.properties -file zh.txt -outputFormat text`

另外，因为stanford corenlp很容易占用资源，特别是调用了耗费资源的annotator和处理大文件时。

官网推荐的做法是不要处理大文件，而是使用分开的小文件。具体命令如下：

```
ls -1 para*.txt > all-files.txt
java -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLP -filelist all-files.txt -outputFormat json
```

具体的说明还是见官网和相关网站。

# 相关链接：

官网：[The Stanford Natural Language Processing Group](https://nlp.stanford.edu/)

CoreNLP Github Pages: [Stanford CoreNLP – a suite of core NLP tools](http://stanfordnlp.github.io/CoreNLP/)