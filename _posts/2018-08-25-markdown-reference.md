---
date: 2018-08-25 19:31:50+08:00
layout: post
title: Markdown引用参考文献
categories: 技术随笔
tags: 
---

使用Markdown引用参考文献，主要使用它的脚注功能。

用法如下，和latex的方式差不多：

```

text[^referenceID]

[^referenceID]: Computer Aided Translation[EB/OL]. https://www.microsoft.com/en-us/research/video/computer-aided-translation/, 2016/2018-8.19.

```

之后，我们可以利用pandoc将其转换为Word。

`$ pandoc input.md -o output.docx`

可以在Word中操作，把脚注转换为尾注。

![](/album/word-footnote-endnote.png)

具体的效果可以见此：[使用机器翻译来辅助人工翻译](https://blog.xulihang.me/use-machine-translation-to-help-human-translation/)

