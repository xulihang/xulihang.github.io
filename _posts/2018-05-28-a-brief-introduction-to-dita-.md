---
date: 2018-05-28 20:32:50+08:00
layout: post
title: DITA简介
categories: 技术随笔
tags: 技术写作
---

来北大上了一学年课了，这还是我第一篇正经的关于技术写作的文章。最近觉得DITA还是很有用的标准，值得介绍一下。

## DITA是什么

DITA全称Darwin Information Typing Architecture，是一种基于XML的写作语言，由OASIS组织定义的一个开放标准。

DITA有一系列预定义好的元素（Element），它也支持拓展，可以针对特定领域进行定制（Specialization），就像达尔文的进化论一样，DITA可以从基本的DITA文件进化。

信息分类（Information typing）主要是指DITA是由固定的几类主题（Topic）构成的。常见的是任务（Task）、概念（Concept）和参考（Reference）。新版本又添加了两类（Troubleshooting、Glossary Entry）。任务、概念和参考都是从基本的主题进化而来的。具体的介绍见下一小节。

### DITA的几个主题


概念（Concept）
:  概念用来描述某个概念或者总览信息，为读者提供背景知识。通常是简单的段落和无序列表。


任务（Task）
:  任务用来记录完成一个任务所需要的步骤，主要由以下元素构成：
    * context：任务相关的信息。
    * steps：具体的步骤。
    * result：完成后的结果。
    * postreq：完成后还有什么可以做的。
        
参考（Reference）
:  参考主要是为用户在完成任务时提供参考的。主要是表格和属性表等内容。

还有一个bookmap文件，是用来索引的。

### DITA的特色

* 内容重用（reuse）。

* 同源开发（singlesourcing）。可以从同一份dita项目生成不同格式的成品，如html、pdf和chm等。另外，可以生成针对特定用户的版本。另外也支持多语种本地化。

## DITA CMS是什么

DITA CMS是DITA文件的在线管理系统，一般提供在线的所见即所得的dita编辑、在线文件与历史版本管理、在线发布（基于开源的DITA-OT）等功能，还有任务流程管理等，支持多人网络协作。

## DITA的编辑器

可以用免费的xml编辑器，或者专业的文档工具：oxygen、Arbortext等。

## DITA的新发展——lwdita

现在又有了新的轻量化标准，分别是使用了更少标签的xdita，使用html来写作的hdita和使用markdwon的mdita。

我很看好mdita。很多程序文档可能使用markdown写的，但markdown没有很好的发布机制，不能输出多种格式。有了mdita后，我们就可以利用dita对于多种格式输出的支持了。

## 我对于DITA的看法

DITA的重用功能用来开发具有多重型号的产品很适合。比如一款电风扇，有很多不同的版本，那么重用就可以发挥用途了。

而一般程序文档则不太适合用dita。dita给我的感觉对内容的划分什么要求比较严格，而且不如markdown那样轻量。

## 学习资源

[The DITA Style Guide: Best Practices for Authors](https://www.oxygenxml.com/dita/styleguide/webhelp-feedback/index_frames.html)

[OASIS官方文档](http://docs.oasis-open.org/dita/v1.2/spec/DITA1.2-spec.html)

[learningdita](http://www.learningdita.cn)（上海的TC互联做的learningdita的中文版）

[idratherbewriting.com](http://idratherbewriting.com)（亚马逊的一位TW的博客）



