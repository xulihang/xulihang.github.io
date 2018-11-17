---
date: 2018-11-17 15:50:50+08:00
layout: post
title: BasicCAT开发笔记（十一）：XLIFF文件的支持
categories: 技术随笔
tags: CAT
---

关于XLIFF的介绍见[前文](/a-brief-introduction-to-xliff/)，这里主要讲下BasicCAT是怎么处理xliff文件的。

```
<?xml version="1.0" encoding="UTF-8"?>
<xliff version='1.2'
       xmlns='urn:oasis:names:tc:xliff:document:1.2'>
<file original="Stories/Story_u1c52c.xml" source-language="en-US" target-language="zh-CN" datatype="xml">
    <body>
        <trans-unit id="NE9BA6C2E-tu1" xml:space="preserve">
            <source xml:lang="en-US"><g id="1">Conte<g id="2">n</g>ts</g></source>
            <target xml:lang="zh-CN"><g id="1">Conte<g id="2">n</g>ts</g></target>
        </trans-unit>
    </body>
</file>
</xliff>
```

以往处理XML都是利用XML2MAP类将XML文件转为b4j中的map进行处理。在xliff中，我们要提取source中的内容作为原文。但是直接提取，会把`<g>`标签和文本分开进行存储。我便把source中的标签都做了转义。用户直接翻译`<g id="1">Conte<g id="2">n</g>ts</g>`这样的内容。

因为标签太多的话比较麻烦，于是对于片段中只有一对标签和一个标签的情况，做了标签的隐藏。

`<g id="1">Conte<g id="2">n</g>ts</g>`这个片段中，`<g id="1"><g>`可以进行隐藏。而如果是这样`<g id="1">Conte<g><g id="2">nts</g>`，就不进行隐藏。

因为xliff成对的行内标签要判断开头标签和哪个结尾标签较为麻烦，所以只隐藏只有一对标签和单个标签的情况。

因为xliff的文本没有换行等信息，所以预览文本的功能不能直接显示分段。其实每个transunit的提取基本都是按段落来的。所以预览或者生成双语段落对照可以根据transunit来。

相关文件：<https://github.com/xulihang/BasicCAT/blob/master/BasicCAT/xliffFilter.bas>
