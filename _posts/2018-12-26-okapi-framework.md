---
date: 2018-12-27 15:21:50+08:00
layout: post
title: Okapi Framework 简介
categories: 技术随笔
tags: CAT
---

Okapi Framework是一套开源的翻译工具框架，主要由以下组件组成：

* Rainbow，本地化工具，图形化界面
* Checkmate，质量检查工具，图形化界面
* Ratel，SRX分割规则编辑器，图形化界面
* Tikal，本地化工具，命令行界面
* Longhorn，服务器程序，可以用REST API执行Rainbow可以完成的操作
* Ocelot，一个xliff图形化编辑器，比较难用

它还为OmegaT开发了过滤器插件，可以让OmegaT支持更多格式。


Rainbow可以将源文档转换为xliff、po等格式，翻译好后再转换回去。它也有术语抽取等其它功能。

Checkmate需要导入双语格式的文件，比如xliff、tmx，然后可以检查标签、数字等问题。

以上两个工具我在[此文](https://blog.xulihang.me/guide-of-open-source-cat-tools-for-localization-engineers/)有截图的操作说明。

下面着重讲解Tikal，因为Tikal支持命令行操作，可以较为方便地用来完成批量操作和集成到CAT软件中。

1. 将文档导出为xliff

    以下操作把docx文件导出为xlf文件，源语言是英文，目标语是中文

    `tikal -x 321880_ms.docx -sl en -tl zh`
    
2. 从xliff文件生成目标文件

    `tikal -m 321880_ms.docx.xlf`
    
3. 转换到其它格式

    Tikal还提供转换到tmx、po、tab分割的文本等类型文件的功能。只有转换为tmx时，标签信息会得到保留，其它格式并不会保留标签信息。
    
    转换为TMX:
    
    `tikal -2tmx 321880_ms.docx.xlf`

4. 其它常用选项

    有时候需要指定过滤器Filter，可以用以下选项调用：
    
    `-fc configId`
    
    configId的值可以用以下命令列出：
    
    ```
    $ tikal -listconf
    ...
    - okf_openxml = Microsoft Office documents (DOCX, DOCM, DOTX, DOTM, PPTX, PPTM, PPSX, PPSM, POTX, POTM, XLSX, XLSM, XLTX, XLTM, VSDX, VSDM).
    - okf_pensieve = Configuration for Pensieve translation memories.
    - okf_xliff = Configuration for XML Localisation Interchange File Format (XLIFF) documents.
    - okf_xliff-sdl = Configuration for SDL XLIFF documents. Supports SDL specific metadata
    ...
    ```
    
    使用`-ie encoding`和`-oe encoding`可以指定输入输出时使用的编码。
    
    使用`-seg [srxFile]`可以指定srx文件对原文进行分割，这样分句会保存在xliff的seg-source标签里。
    
    
还有一个老的工具叫Olifant，是.net写的TMX编辑器，能把tab分割的txt转换为tmx，它大部分功能都可以用rainbow和tikal来实现。


更多内容还是见Okapi的官网：<http://okapiframework.org/>

找到一篇采访Okapi开发者的文章，还挺有意思的：[The Okapi Framework: Q and A with Yves Savourel of ENLASO ](http://www.translationdirectory.com/article737.htm)。





