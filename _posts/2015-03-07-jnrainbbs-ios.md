---
date: 2015-03-07 15:55:50+00:00
layout: post
title: 江南听雨BBS的iOS客户端已上架
categories: iOS
tags: 江南大学 江南听雨
---

三月三日v1.0.1版上架，算是功能比较完全的版本。

在论坛发了说明[听雨iOS客户端v1.0.1正式上架发布](http://bbs.jiangnan.edu.cn/wForum/disparticle.php?boardName=Apple&ID=4316&pos=3)

下面来说说软件的构架

使用Basic4ios开发，内嵌了一些objective-c的代码以弥补刚开发的b4i的功能上的不足，用到了AFnetworking。

使用CustomListView来加载版块列表和帖子列表等，还没有使用TabelCell。

浏览帖子使用Webview，用overrideURL来进行控制。因为后端传来的数据就是html。我对Web前端的东西不了解。

上传和压缩图片都是用obj-c代码来实现的。摸黑使用obj-c真的挺痛苦。

发帖界面很简单。我行我素，表情用picker来显示和插入，懒得做一个面板显示表情以供选择了。

设置界面的选项也都是DIY的，都没用tabelcell。呵呵。彩蛋很简单，以后考虑增加几款游戏。

后端方面，

kbs不归我管，从没向站长要服务器登录帐号，也不会改c代码。我只管用json api。

于是我都是用openshift来增加供移动设备使用的功能的。

目前主要也就是图片中转站，之前的博文提到过，还是挺简单的。

明天开学了，我还有心情写这个......