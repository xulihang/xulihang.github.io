---
date: 2018-02-27 17:00:50+08:00
layout: post
title: 在移动设备上使用ssh隧道
categories: 技术随笔
tags: 
---

ssh隧道外国人一般用来加密通讯，而国内则有了特殊的用途。

我最近也用ssh隧道来使用家里的电信网络，因为软微的网络会无法访问一些网站。此前也有写用ssh进行内网穿透的文章。

现在想在安卓和iOS等移动设备上使用ssh隧道。

这里给出三种方法：

1、本地运行ssh，进行端口转发，建立socks代理。再使用privoxy将socks代理转为http代理。

运行以下命令建立socks代理：`ssh -qTfnN -D 7070 xxx@x.x.x.x -p port`

在privoxy的配置文件中加入以下内容：`forward-socks5   /               127.0.0.1:7070 .`

2、在vps上直接建立好http代理，直接设置代理即可。

3、在vps上建立socks代理，在移动设备上使用pac文件配置。


安卓已经有ssh tunnel这样的软件了，但是需要root。对于没有root的手机可以使用termux。但我测试使用termux自带的ssh和privoxy无法连接，可能proot到debian可以成功。第三种方法也没有测试成功。我转而采用第二种方法。

因为担心直接在vps上运行相关程序会被封，所以改用家里的树莓派连接并建立http代理。然后手机上设置http代理的地址和端口就可以了。使用移动数据时可以通过修改apn里的代理来使用。



