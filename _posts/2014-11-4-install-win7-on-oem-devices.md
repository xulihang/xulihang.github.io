---
date: 2014-11-04 16:34:17+00:00
layout: post
title: 给当今品牌机装Win7激活那点事儿
categories: 技术随笔
tags: Windows 装机
---

去年买新笔记本装win7就费了我不少劲。在远景写了[这篇文章](http://bbs.pcbeta.com/viewthread-1414954-1-1.html)。

时隔一年多，我再给同学装win7，又稍稍费了点劲。原因有下，其实主要是激活问题，安装与驱动都不是问题：

1、原装Win8系统，UEFI+GPT组合，想保留win8，装双系统，只有装win7 64位版，并开启主板csm模式。

2、联想M495默认没有启用slp，没有slic2.1的表。oem与kms激活都不行。

3、gpt+efi，无法软破解激活。

我用无约而来的win7 33in1版安装，装好后用slic toolkit查看有两张slic表，一张是slic2.1的能通过验证，但怎么也激活不了。于是再用kms激活。因为装win8习惯了kms激活。结果也失败了。起先估计是装的零售版的问题，于是下了江大的正版win7。结果也kms激活失败了。之后才知道因为slic表marker的问题。

我突然想到我的电脑当初是在dos下用工具改bios才有slic2.1的表的。于是到远景搜索。果真找到了适用于m495的vbkem，运行enable slp的命令后再重启，查看slic。2.1了！

然后导入证书和密钥就成功oem激活了。

一切的一切，都为了看到这个：

![](/album/win7_activated.PNG)