---
date: 2018-02-23 10:22:50+08:00
layout: post
title: 网络抓包
categories: 技术随笔
tags: 
---

抓包是很有黑客感的一项操作，今天来讲讲。

百度百科关于抓包的解释：抓包（packet capture）就是将网络传输发送与接收的数据包进行截获、重发、编辑、转存等操作，也用来检查网络安全。抓包也经常被用来进行数据截取等。

之前写江大正方教务系统成绩查询软件时就用到了火狐的抓包插件httpfox，分析http post的内容。视频网站上的视频，也会用浏览器自带的调试工具进行分析，能得到单个完整的视频文件的链接自然是最好的，但现在很多都把视频文件分成多个小文件，就需要批量处理了。

常用的抓包软件有wireshark、fiddler和charles等，功能都很强大。安卓上也有packet capture这个软件，利用系统的vpnservice来使自己成为中间人。

一个无线网内，如果不是ap，想要截取其它客户端的包，一般可以开启无线网卡的监听模式，或者在本机架设代理，然后客户端连接那个代理。Fiddler和Charles都支持代理。

现在https逐渐普及了，fiddler和charles都支持对于https的解密。

最近两天做的抓包是截取海信a2pro的ota更新包和给仍然跑着ios8的iphone5C下载可以运行的旧版powerpoint的ipa。

ota包是用packet capture抓的，本来想解包boot.img的，但是发现都是patch，不知道怎么搞。海信a2pro的bootloader是有锁的，也刷不了添加root的boot.img。

给iphone抓旧版软件包网上的教程很多了，大多是使用的fiddler在windows上抓，因为新版的itunes不能直接下载ipa了，需要下载12.6的老版itunes。这里吐槽下越狱的软件源和xx助手们居然都没有保存旧版ipa。

使用fiddler获取包含软件各个版本号的xml文件，然后在截获下载请求（相当于断点调试啊），修改请求的包里的版本号为想要的旧版版本号，然后itnues就会下载下旧版的ipa，并对ipa进行签名处理。

下载下来1.2.2版本的powerpoint，功能不多，但是显示效果还是比wps好不少的。


