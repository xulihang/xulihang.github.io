---
date: 2020-04-08 20:58:50+08:00
layout: post
title: 使用Git管理Word格式的论文
categories: 技术随笔
tags: 
---

论文是用Word来写的，而且格式是doc，我一直只用备份文件的方法做版本控制。我习惯了使用Git做版本控制，可以查看每次做了哪些修改，但它对二进制格式文件的支持不佳，不能显示修改。另外我一个doc格式论文文档有十几MB大，这样经常提交commit的话git仓库的大小会变得很大。

于是写了个小工具，根据文件修改日期排序文件，然后利用Apache Tika导出文本后提交commit，commit的信息是修改日期。

本来还想导出成HTML或者markdown格式，并对图片进行管理的，觉得比较麻烦就没做。我的目的主要是查看文字变动，如果多了代码看起变动来就比较麻烦。

doc转markdown的相关文章其实我之前也写过：

* [学点BAT（doc转docx）](/learn-some-bat/)
* [转换Word文档为Markdown（docx转markdown）](/convert-docx-to-markdown/)


本项目是用B4J编写的：<https://github.com/xulihang/ThesisTrack>

网上还搜索到修改.gitattributes和.gitconfig的方法，也是用到了pandoc来转换doc到markdown：[git 对 Microsoft Word 进行版本控制](https://www.cnblogs.com/yezuhui/p/6853271.html)

但我不想把二进制文件直接放到仓库里，我考虑用github的release存放重要的论文版本。

好久不更博了，最近写作的时间都花在了硕士论文上面。难得更新的这篇文章也是关于论文写作的。

