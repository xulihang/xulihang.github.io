---
date: 2017-08-12 21:02:50+08:00
layout: post
title: 联想幸福Linux安装小记
categories: 电子数码
tags: 
---

![](/album/happylinux.png)

最近整理联想天鹤640P老电脑的随机光盘，安装了幸福之家v3.23生活版并录制视频传到了[b站](https://www.bilibili.com/video/av13241747/)上。

在网上也看到了联想幸福Linux，以前看这篇文章[那些曾经的Linux发行版（三）：Happy Linux](http://www.linuxfans.org/archives/3222)了解过，当时没有镜像觉得挺可惜的。这次发现原来有镜像提供下载，是幸福Linux1.0版，于是打算装虚拟机上体验。

2000年时的系统，基本的Linux软件都有，当然版本比较低，比如python是1.5，kde是1.12，linux内核是2.2的。和著名的蓝点Linux是同一个时期的。Vmware上没启动起来，后来改用Virtual PC安装。VPC只有Win7以下系统能运行，我还得win10下开个xp虚拟机跑幸福Linux。

VPC上装得比较顺利，但也有两个问题，一个是声卡，得用sndconfig选择Sound Blaster 16并手动设置参数，这里参考了[虚拟机VPC装红旗linux4.1声卡问题之解决](http://www.qqread.com/sys-soft/a211036.html)。还有一个问题就是只有VGA分辨率，8位色，重新运行Xconfigurator后选择一个合适的monitor后可以解决。

幸福linux有两张光盘，一张系统盘，一张软件盘。通过阅读附带的使用手册可以知道幸福之家场景软件要用软件盘安装。

装好后就可以体验Linux上的幸福之家了。测试发现该场景软件场景移动只是一张张图片的切换，不像Windows版那样是可以自由移动缩放的。还有，虽然联想给Linux开发了不少附带的游戏和应用，对比Windows版的软件质量要低得多。可以看得出，Linux版的幸福之家是对Windows版幸福之家v3.2的低质量克隆。

回想一下20世纪初，计算机其实并不十分依赖互联网，基本都是脱机运行。用户大多也就运行下系统自带的软件，所以幸福linux还是可以满足用户的需求的。但是相比于Windows98和幸福之家的组合，则要逊色不少。

幸福linux的中文化还是做得很好的，联想作为一家电脑公司，那个时候也还是很重视软件的。后来联想的随机软件却被称为bloatware，给用户的印象就都是负面的了。