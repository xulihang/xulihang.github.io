---
date: 2018-11-17 16:03:50+08:00
layout: post
title: BasicCAT开发笔记（十二）：PO文件的支持
categories: 技术随笔
tags: CAT
---

Gettext PO最初是GNU用来本地化C语言程序的，后来成为了本地化软件的一个标准。

在代码中用_gettext()包着要翻译的文本，然后用xgettext获取pot文件。pot文件分发给译员翻译到不同的语言，就是po文件。po文件转换为二进制的mo文件供程序调用。

PO和XLIFF一样，可以作为翻译中的一个中间格式。

PO文件是纯文本文件，较为容易处理。

以下是一个PO文件的示例：

```
msgid ""
msgstr ""
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"
"Language: en_US\n"
"Plural-Forms: nplurals=2; plural=(n!=1);\n"

msgctxt "okpCtx:sd=5:tu=NFDBB2FA9-tu2"
msgid "<g1>[Global Notes:</g1>"
msgstr "<g1>[全球需知：</g1>"

#, c-format
msgid "One file removed"
msgid_plural "%d files removed"
msgstr[0] ""
msgstr[1] ""
```

`msgid`保存的是原文，`msgstr`是译文。如果有复数的情况，会多一个`msgid_plural`，可能有多个`msgstr[*]`，`msgctxt`保存的是上下文信息，例子中是okapi生成的用来替换回原文件用的。

如果内容是多行的，msgstr或msgid后面先接一个空白的""，然后下一行的内容从下一行开始，结尾处有\n。比如例子中的第一个`msgstr`，不过po的第一个`msgid/msgstr`都支持存储文件的信息的，比如文件编码，原文的语言等。

要处理po的话也简单，只要按行读取，如果是`msgid`开头就读取为原文。不过有时候会遇到要翻译的内容为纯标签或者空白的情况，需要略过。读取时，对每个`msgid`都按顺序进行标号，这样方便生成的时候把内容替换回`msgstr`。

Okapi生成的PO也有类似opentag的行内标签。不过是以`<g1></g1>`这样的形式存储的，比较容易判断开头标签和结尾标签的对应情况。所以BasicCAT默认是隐藏片段开头结尾处的成对标签和单个标签的。

BasicCAT的po过滤器是以插件的形式开发的，插件和主程序之间需要传递很多的参数。

相关文件：<https://github.com/xulihang/BasicCAT/tree/master/plugins/poFilter>

