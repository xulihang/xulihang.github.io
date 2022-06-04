---
date: 2018-11-26 17:29:50+08:00
layout: post
title: Sphinx文档的本地化
categories: 技术随笔
tags: 技术写作
---

如何本地化Sphinx的步骤我参考官网写在此处：
<https://sphinx-apidoc.readthedocs.io/zh_CN/latest/more/i18n.html>

Sphinx会对要翻译的内容进行提取，然后存储为po文件。其中代码、图片等directives的内容会被忽略。这点比okapi转换markdown文件为po文件要做得好。

在本地的Sphinx项目运行以下命令可以生成对应的语言版本：

`make -e SPHINXOPTS="-D language='en'" html`

但是要翻译的内容往往不只是文字，还有图片等内容。这样修改源文件中图片的链接对象是件挺难维护的事情。

而readthedocs的做法是，不同的语言版本享有一个独立的仓库。这样，不同仓库可以存放同样文件名，但显示的语言不一样的文件。

2022/06/04更新：

在使用中遇到一个模糊匹配（fuzzy）翻译没有被替换的问题，需要启用使用模糊匹配的翻译。具体见这个issue：[Support for fuzzy translations](https://github.com/sphinx-doc/sphinx/issues/9618)


