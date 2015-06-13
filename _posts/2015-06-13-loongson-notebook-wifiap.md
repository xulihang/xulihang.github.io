---
date: 2015-06-13 14:40:50+00:00
layout: post
title: 用龙芯本当路由器之开启无线热点
categories: linux
tags: linux loongson 龙芯
---

买来龙芯本后一直想用它来做无线热点，可惜手头的tplink 725n（rtl8188eu芯片）一直不能用hostap开热点，提示segment fault。而逸珑8089D自带的rtl8187无线网卡不支持AP模式。

于是想买过个网卡，网上搜索了一圈，感觉无线网卡性价比都不高，而且芯片还说不准是那块芯片。搜到这篇文章[小米随身WiFi，Linux下AP热点驱动（开源）](http://blog.csdn.net/sumang_87/article/details/38168877) ,感到360wifi二代非常适合，不用hostap就可以直接开启热点。

终于实现由我的龙芯本做热点了。我的笔记本可以专心做别的事了。

具体的操作就见原文吧。