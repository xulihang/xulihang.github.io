---
date: 2018-05-28 20:32:50+08:00
layout: post
title: DITA简介
categories: 技术随笔
tags: 技术写作
---

来北大上了一学期课了，这还是我第一篇正经的关于技术写作的文章。最近觉得DITA还是很有用的标准，值得介绍一下。

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


## DITA CMS是什么

## 我对于DITA的看法

## 学习资源

[The DITA Style Guide: Best Practices for Authors](https://www.oxygenxml.com/dita/styleguide/webhelp-feedback/index_frames.html)

[OASIS官方文档](http://docs.oasis-open.org/dita/v1.2/spec/DITA1.2-spec.html)

[learningdita](http://www.learningdita.cn)（上海的TC互联做的learningdita的中文版）

[idratherbewriting.com](http://idratherbewriting.com)（亚马逊的一位TW的博客）

待更新……


