---
date: 2014-09-07 9:43:17+00:00
layout: post
title: iPhone安装python运行本地搜狗代理
categories: iphone
tags: 越狱 ios
---

开学了，学校的无线信号增强了，可惜500MB的流量不够用啊。还好可以用搜狗代理，不仅减少流量使用，还提高了网速，虽然有些网站访问不了，但基本能满足需求。

以前玩Android时也这样做过，不过我是chroot到debian系统里运行的，比较麻烦。没尝试过安装python到本地系统。

而ios本身是osx，基于unix，越狱后用cydia安装软件，采用deb包管理系统，很方便。

具体怎么用搜狗代理呢:

1、cydia安装python及依赖包。我这边的网连不上源，出现500或hash not match错误，用vpn才连上的。

2、把小虾写的搜狗代理的py脚本放到iphone上。

3、安装mobile terminal在iphone上运行命令。因为不支持真后台，还要安装mobileterm backgrounder，不然再登进terminal时原来的东西就都没有了。

4、terminal下进root帐户，运行python sougou.py。

5、wifi设置里设置代理，服务器127.0.0.1，端口1998。如果连不上，在终端里^C关闭代理，再python sougou.py开启代理试试，一直到能连上为止。

好了，现在就可以享受优质的校园网络生活了。

![](https://raw2.github.com/xulihang/xulihang.github.io/master/album/ios/sougou1.PNG)

![](https://raw2.github.com/xulihang/xulihang.github.io/master/album/ios/sougou2.PNG)








