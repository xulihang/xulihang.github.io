---
date: 2016-11-20 17:09:50+08:00
layout: post
title: B4J加上Autoit的功能带来极好的Windows编程体验
categories: 技术随笔
tags: B4J B4X
---
 
我学的第一门编程语言是什么？答：Autoit。

还记得是2008年时接触如番茄花园，深度等各种山寨Windows的时候。我知道了系统封装有使用AU3，小兵和自由天空都有使用。然后我就跟着*Let's Autoit*这本教程学。当时水平不高，但脚本语言能直接操作其它程序，可以编写各种整人软件倒是让我对编程增加了不少兴趣。

现在我想给雪人CAT免费版写一个外挂，让它支持标准版才有的功能。因为我不懂解码他们使用的特殊文件格式，只有直接从运行中的窗体获得数据。

本来只知道Autoit3是比较合适的语言。但因为现在看autoit3觉得风格比较复杂，不如b4x的basic语言简单。而且我要做复杂的图形界面，调用各种网络功能，autoit就显得不适合了。

于是搜索b4j+autoit，意外地发现b4j支持调用autoit的autoitx.dll实现autoit的很多功能。毕竟b4j是处理成java的嘛，java有丰富的库，官方论坛有基于jacob和autoitx4java封装的jautoitx库。

打开au3的窗口信息获取工具，然后在b4j强大的ide里编写程序。虽然这样b4j的跨平台特性就只限在Windows平台上了，但给了我专门的Windows编程的感觉。