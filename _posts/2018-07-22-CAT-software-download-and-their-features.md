---
date: 2018-07-22 09:57:50+08:00
layout: post
title: 主流CAT软件下载及其特点
categories: 技术随笔
tags: CAT
---

最近下载deja vu和memoq，发现网上相关资源还挺少，只有去官网下载。但是deja vu的网站还上不去，走外国vps才下下来。现在做个整理吧，顺便简单讲下这些软件的特点。

1、SDL Trados

首先是占有率最高的老牌CAT软件Trados，它的界面比较复杂，操作繁琐。功能较为强大，支持各种常见格式，支持编写插件，定制性不错。价格太高，620美元。个人译员不适合使用。而作为企业，Trados大版本更新可能会导致不兼容问题。我并不是很喜欢Trados。

基于.net开发，使用ribbon界面。

在此下载30天试用版：<https://www.sdltrados.cn/cn/products/trados-studio/free-trial.html>

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/CAT/trados.png)

2、Déjà Vu

Deja Vu同样基于.net开发，使用access数据库存储术语和翻译记忆，支持SQL语句。界面同样是ribbon界面，但比Trados清爽很多，操作也更简单。建立项目时会提示设置机器翻译。Deja Vu填充匹配的翻译记忆叫做自动传播（auto propogation）。

在此下载30天试用版：<https://atril.com/download-and-install/>

最新的Deja Vu X3下载地址：<https://dejavux4.com/installers/DejaVuX3.Setup.exe>

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/CAT/dejavu.png)

3、MemoQ


MemoQ同样基于.net开发，ribbon界面。

MemoQ支持插件，比如mymemory、tmxmall等都有插件支持。还可以调用transpdf服务转换扫描版PDF为Word。

在此下载30天试用版：<https://www.memoq.com/downloads>，过期后不能导入外部翻译记忆，不能翻译多个文件。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/CAT/memoq.png)



4、雪人CAT

雪人是国产CAT中的杰出代表，使用c++编写，运行速度快，可以用wine在linux和macos上运行。

雪人的界面很简单，容易上手，但功能并不弱。雪人的项目是单文件的，一个文件里包含了翻译记忆库和术语库，不用手动建立。雪人的翻译记忆匹配强于大多数CAT软件，主要是它有一个基于实例的机器翻译系统（EBMT），可以根据翻译记忆和自带的词典，替换相似句子中不同的成分。

雪人有免费版本提供，缺点就是支持的格式较少，不能进行词型还原等。我个人非常喜欢雪人，平时的翻译都是用它来完成的。

雪人的特点很多，还是见官网吧，免费版有提供下载：<http://www.gcys.cn/>

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/CAT/snowman.png)

5、OmegaT

OmegaT是使用Java编写的开源软件，严格遵守和使用各种翻译行业的标准，比如tmx、tbx文件格式。

OmegaT的功能很强大，同时因为其开源的属性，很容易可以给它添加功能并适配到特定的工作流中。再加上Okapi Framework，几乎支持所有文件格式。

对于追求开源和自由的人来说，OmegaT肯定是第一选择。

我在这篇文章里讲了很多OmegaT的功能如何使用：[面向本地化工程师的开源CAT工具教程](http://blog.xulihang.me/guide-of-open-source-cat-tools-for-localization-engineers/)

下载见官网：<http://omegat.org/download>

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/CAT/OmegaT.png)

对于CAT软件的特点，我这里肯定讲得不全，欢迎补充。

# 2018-09-16更新

对于试用版过期问题，我们这里可以使用虚拟机来作为一种变通方法（workaround）。可以使用Parallels Desktop、VMware等虚拟软件安装一个Win7系统，等CAT软件过期后就再重装一个系统。

