---
date: 2018-10-25 21:05:50+08:00
layout: post
title: 学点BAT
categories: 技术随笔
tags: 
---

有人问我windows下如何快速批量转换word为html。我想到用pandoc转换word为html。但是如何批量操作呢？我熟悉Python等编程语言，写一下很容易。

但是要在别人的电脑上运行Python却是件麻烦的事。这种情况下，使用较为通用的bat批处理文件则方便很多。我使用以下命令完成的批量转换任务：

```cmd
for /r .\ %i in (*.docx) do @pandoc --standalone --self-contained %i -o "%~ni.html"
```

把文件存储为bat文件后交给被人用也很方便。

当然，Jeff Atwood在《高效能程序员的修炼》提到尽量不要用脚本语言，缺少正经程序语言的谨密性，一旦写的东西多了，就会难以维护。

2008年那会出的很多PE系统，用的工具都是下图这样一个界面，获取用户输入，执行下一步操作。后来也都转而使用图形界面了。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/bat.png)


相关链接：

BAT 批处理脚本教程: <https://www.cnblogs.com/mq0036/p/3412171.html>
