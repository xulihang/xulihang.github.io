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

之前处理XML都是利用XML2MAP类将XML文件转为b4j中的map进行处理。在xliff中，我们要提取source中的内容作为原文。用户直接翻译`<g id="1">Conte<g id="2">n</g>ts</g>`这样的内容。但是直接提取，会把`<g>`标签和文本分开进行存储。我便把source中的标签都做了转义。当然只转义xliff的bpt、g、x等标签，其它文件格式的标签不会转义。转义时碰到一个效率问题，主要是从头开始替换会改变匹配的文本的offset，这样得反复进行匹配。解决办法是从文件末尾开始进行替换。

因为标签太多的话比较麻烦，于是对于片段中只有一对标签和一个标签的情况，做了标签的隐藏。Trados默认是不隐藏标签的，所以这样做后，导出的tmx翻译记忆给Trados用会少不少标签信息。解决方法可以是用Trados打开翻译的xliff文件，这样它会自动读取target标签中的内容，也就不用翻译记忆了。

`<g id="1">Conte<g id="2">n</g>ts</g>`这个片段中，`<g id="1"><g>`可以进行隐藏。而如果是这样`<g id="1">Conte<g><g id="2">nts</g>`，就不进行隐藏。

因为xliff成对的行内标签要判断开头标签和哪个结尾标签较为麻烦，所以只隐藏只有一对标签和单个标签的情况。

因为xliff的文本没有换行等信息，所以预览文本的功能不能直接显示分段。其实每个transunit的提取基本都是按段落来的。所以预览或者生成双语段落对照可以根据transunit来。

# 2020-08-31更新

BasicCAT 1.8.3开始使用XmlSax将XML解析为自定义的XmlNode类，可以较好地处理行内标签，并可以建立标签的对应关系以及简化XLIFF的标签。之前那样对标签代码进行转义的方法是不正确的。XML比JSON强的一点在于它表示混合性的内容（mixed content）的内容较好。



相关文件：<https://github.com/xulihang/BasicCAT/blob/master/BasicCAT/xliffFilter.bas>
