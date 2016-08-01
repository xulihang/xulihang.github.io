---
date: 2016-08-01 10:17:50+08:00
layout: post
title: 拥有自己的B4i远程构建服务器
categories: 移动开发
tags: iOS
---
 
前几篇博客讲到了B4i如何使用免费的开发者调试证书，macOS下部署lighttpd和python-bottle的应用。这篇博文，就是基于这两篇文章之上的。

我的设想是家里安排一台b4i的buildserver，然后我到学校的时候可以直接在笔记本的Windows系统上使用B4i，而不用进macOS。

昨天测试发现B4i的buildserver提供的安装方式是itms-services，里面的plist和ipa的链接都是指向的无线局域网内的ip地址：192.168.1.107.因为我的网络条件是小区拨号宽带接无线路由器，路由器使用花生壳动态域名解析服务，然后DMZ暴露黑苹果主机给外网。所以在外面访问这台主机都要用花生壳动态域名来访问。而b4i的buildserver不是开放源代码的，我不能进行修改让它把地址改为动态域名。那我在外面不就不能使用黑苹果主机的buildserver了吗？

我于是又想了一个曲线救国的方法。通过lighttpd的服务器服务，把b4i的itms－services服务转过来。方法是这样的。

首先我们知道buildserver提供的几个URL地址：

1. https://192.168.1.107:51042/userid。安装该用户（在b4i里设置的）最近编译出来的ipa文件。

通过上面的地址又可以知道以下几个：

2. https://192.168.1.107:51042/download?type=manifest_userid 这是itms服务用到的plist文件。

3. https://192.168.1.107:51042/download?type=ipa_userid plist文件里记录的ipa文件地址。

然后，我们在bottle应用里，根据以上地址，生成可以用动态域名访问的plist文件，复制目标ipa并提供下载，放在在静态文件目录下，再做一个itms安装html用网页，里面提供一个如下的链接：`itms-services://?action=download-manifest&url=https://servername:8080/static/1.plist`。

这样之后还是不能完成安装，因为苹果在iOS7.1之后要求使用ssl证书。如果你自己签名一个ssl证书，会提示无法连接到服务器。需要在设备里安装你生成ssl证书用的CA证书。具体方法见此文：[ITMS-SERVICES://方式安装IPA在IOS 7.1中的变化](http://www.cnblogs.com/lihaibo-Leao/p/3998416.html)

另外在我5c的iOS8系统上，遇到了安装过一次后不能再安装的问题。搜索得到以下解决办法：[ IOS8企业版无法通过itms-services覆盖安装，没反应](http://blog.csdn.net/sunzeshan/article/details/49813703)

