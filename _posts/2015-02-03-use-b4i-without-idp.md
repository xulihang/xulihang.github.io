---
date: 2015-02-03 19:31:50+00:00
layout: post
title: 免开发者帐号使用b4i开发iOS应用
categories: apple
tags: hack
---

一直用b4a进行Android的开发，语言与界面简洁，开发高效。现在出了b4i，支持开发iOS的应用。

可惜没有试用版。支持下Erel，买了b4i正式版。但苹果99美元/年的开发者帐号实在不想购买，毕竟没有上架app store的需求。但b4i偏偏要求开发者帐号。

用b4i直接编译调试程序，需要按照苹果最新的要求，提供从官网处理下载得到的证书(.cer)和mobileprovision文件。这两个文件没有idp，我没有办法提供。也不懂仿冒的技术。于是只好曲线救国，换个方式使用b4i了。Attention! It is illegal!!

其实很简单，在b4i里点运行，尽管不能通过编译服务器，但会生成xcode的project。用Xcode打开生成的project，按照[Xcode 6.1 / iOS 8.1 使用越狱设备免开发者ID调试](http://blog.sina.com.cn/s/blog_952093030102v9sq.html)进行处理后就可以在实机运行调试了。

需要注意的是，

1、需要提供假冒的证书和mobileprovision文件，不然不能生成project。这里提供仿冒文件[下载](http://xulihang.wicp.net/assets/key.zip)

2、需要把macserver里的libs文件夹放到project文件夹里，里面有需要的库和运行文件。

3、因为相关运行文件是arm架构的，不能用ios simulator来调试。simulator用的都是原生的x86的文件，不是模拟运行。只能实机运行。

4、b4i-bridge不能用，但可用xcode调试。