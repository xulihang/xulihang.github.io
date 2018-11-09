---
date: 2018-11-09 10:41:50+08:00
layout: post
title: 翻译Word的办法
categories: 技术随笔
tags: CAT
---

Microsoft Office在2007版推出了基于XML的OpenXML格式，word的docx格式便是zip压缩后的一系列xml文件。因为基于xml，第三方程序可以较为方便地进行读取。

但是解析openxml文件对我来说还是有点复杂，虽然有现成的docx4j和apache poi等类库可以调用。

以往翻译Word，是把Word转换为纯文本，翻译好后再进行替换。即使是Office365的[Word机器翻译功能](https://www.microsoft.com/en-us/translator/business/word/)也是这样设计的。

我想能不能导出文本后，再替换回去时使用Word的加载项自动进行替换。于是我使用VBA测试了一下。发现VBA的搜索替换功能其实就对应于Word的搜索与替换。如果一句话内部没有特殊的斜体、颜色等样式，替换是很完美的，原来的样式可以保留。但如果有的话，直接替换后这些样式会丢失。但其实这种句内样式的情况还是比较少的。

用加载项的话，便不能很好地跨平台。所以，还是使用okapi将word转换为po或者xliff格式进行翻译较为合适。

如果一句话内部没有特殊格式，可以隐藏该句的标签，这样其实和利用加载项替换的效果是一样的。




