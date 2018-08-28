---
date: 2018-08-26 14:50:50+08:00
layout: post
title: 翻译InDesign文件
categories: 技术随笔
tags: CAT
---

InDesign是常用的排版软件，我翻译的许多儿童绘本都是用它来制作的。

最新的InDesign默认使用indd格式保存，并不被大多数CAT软件支持。我们需要将其转换为idml格式文件。idml基于xml，可以用来兼容旧版的InDesign，而开源的scribus1.5版也支持了idml。

生成idml后，就可以直接导入Trados等CAT软件了。我们也可以使用Okapi将其转换为XLIFF文件，这样所有主流CAT软件都支持这一格式。如何使用Okapi可以参见此文：[面向本地化工程师的开源CAT工具教程](http://blog.xulihang.me/guide-of-open-source-cat-tools-for-localization-engineers/)

最后生成目标语言的idml文件，使用排版软件打开查看结果。

注意事项：

1. Translating Indesign Files - Sending back IDML to the INDD format https://forums.adobe.com/message/4130893 这里提到了indd文件如果使用了内嵌图片，需要先取消内嵌，改为链接本地图片。
2. 使用Scirbus打开生成的idml文件，会无法显示中文，这时需要手动修改中文字体。
3. 用CAT软件打开后，文本的顺序可能和原文有差别。比如第二页的文字出现的垂直位置比第一页的靠前，结果在第二页的文字会被排在前面。这点在自由性上不如直接翻译纯文本，纯文本可以随便调顺序。

其它：

1. Redokun支持在线将Indesign文件导出为xlsx或者xliff文件。https://forums.adobe.com/message/8744798#8744798
2. Incopy是Adobe允许作家、编辑和设计共同编辑一个indesign文件的软件，更加适合文字编辑工作。



