---
date: 2018-02-23 10:44:50+08:00
layout: post
title: 折腾无线投屏
categories: 技术随笔
tags: 
---

读研期间做的最多的一件事就是做ppt然后上台汇报，大家轮番带着自己的电脑上阵或者将文件到拷贝到一个同学的电脑上。软微的教室都没有电脑，需要自己带设备去连接投影仪。

投影仪的接口当然是vga的。我的x62只有minihdmi和minidp接口，使用转接器发现连接不稳定，关键时刻显示不出来。另外x62的4芯电池的电量实在有限，顶多两个小时就要关机了。

于是寒假期间我研究了以下无线投屏（同屏）器，发现这真是神器啊。

先讲一下目前的投屏技术，主要是dlna、airplay、miracast和widi。前两者要连在同一个无线网里，后两个是使用的无线直连技术，可以投屏的同时连别的无线网。

dlna大多数设备都支持，airplay是苹果设备使用的，miracast大多数安卓和pc都支持，应该对无线网卡有要求。widi是微软和英特尔推的，miracast基于widi的，现在用的不多，就不提了。以上技术除了dlna，基本不需要第三方软件。dlna是设备把视频传给投屏器，让投屏器自己解码播放。这也是为啥投屏器参数里讲支持的文件格式的原因。

相比于几百元的正版苹果的有线lightening转hdmi和各种正版无线投屏适配器，国产的投屏器大概只有几十元。主要有海倍思和各种山寨ezcast。

我选择的anycast m4 plus只要55元，使用了瑞芯微的多屏互动芯片RK3036，winbond 25Q128BVFG 16MB NOR flash ROM和samsung k4t1g164qf-bcf7 128MB RAM，支持自己建热点让用户连接，传输速率很快，可以同屏、可以放视频，效果不比有线差多少了。不过做工是一般，不知道能用多久。

测试iphone5c、x62和moto g都能用。yota和海信a2pro因为双屏貌似用不了。我还测试了windows phone，htc8x的硬件并不支持投屏，应该只有少数wp设备支持。

另外现在的电视盒子、智能电视也都支持无线投屏了。不过大多要额外装软件，我给烽火hg680装了个乐播投屏，手机上再装对应的客户端就可以用了。

# 3月2日更新

我在软微实际和教室的投影仪连接了一下，海信a2pro用airpincast使用dlna镜像太卡，moto g 二代配置太差，延迟严重。iphone5c的airplay和windows电脑的miracast则比较流畅，基本同步。

# 3月10日更新

关于让windows设备成为miracast的接收端（miracast server or receiever or sink），以前可以用airserver，支持mac和pc，支持airplay和miracast，就是要花钱。

现在win10的周年更新版已经自带这一功能了，点开始菜单，打开连接这个软件就可以了。

测试android可以投射屏幕，并输送音频。用另一台windows连接还可以设置为扩展屏幕，也可以在支持投射的视频播放软件里把视频投到server上播放。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/connect_windows.jpg)

# 12月4日更新

Linux上可以使用[miraclecast](https://github.com/albfan/miraclecast)和[shairply](https://github.com/juhovh/shairplay)实现micrast sink和airplay server的功能。miraclecast还比较挑无线网卡，有的网卡并不支持，比如rtl8188eu芯片的水星mw150us，而我的ar9271芯片的tplink 322g+老无线网卡倒支持。

Android在4.2后一般都不能当做miracast的接收端，不过有一款软件叫airscreen，可以让全平台的设备无线投屏到Android设备上。



