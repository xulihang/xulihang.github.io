---
date: 2018-05-30 16:40:50+08:00
layout: post
title: 类似BT的网络云盘
categories: 技术随笔
tags: 
---

最近有多人同步文件夹的需求，坚果云免费的个人版有人数限制，onedrive什么感觉不好用。

看到用人说在linux上自己搭btsync，发现是个不错的东西。和bt一样，使用P2P技术，可以很方便地传送文件给对方，速度也有保证（软微的百兆上传带宽可以用起来了）。

btsync后来改叫Resilio Sync，在国内有对应的版本叫微力同步。

当然，和bt一样，要求有在线的客户端才能提供下载。所以，我在一台vps上也运行了微力同步，保证实时都可以提供下载。

目前它支持的客户端系统还是很多的，并提供一个基于web的管理界面，比较便于使用。

目前发现有开源的实现叫做syncthing，github地址：<https://github.com/syncthing/syncthing/>。

感觉还是开源项目会持续发展下去。syncthing着重解决同步的数据安全，应该比resillio要完善一点。