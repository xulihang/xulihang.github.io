---
date: 2018-02-22 14:37:50+08:00
layout: post
title: 免root的安卓linux环境
categories: 电子数码
tags: 
---

我在使用htc g1的时候就折腾过在android上跑linux，当时建立一个debian系统的磁盘镜像，然后运行脚本chroot进去，再运行本地的vncserver，通过vnc客户端来运行lxde。

但是手机毕竟屏幕太小，而且桌面linux都是针对键盘鼠标设计的，操作不便。唯一的用处可能就是能运行个服务器程序。但是当时只有3g网络，而且流量很贵，放在家里连wifi也有其它设备可以用。现在有4g了，但还是需要用花生壳之类的软件进行内网穿透。

所以主要的用途就是本地跑程序玩，如果可以接上键盘鼠标和大显示器的话可以当linux电脑用。

因为海信a2pro的电子墨水屏，我很想在它上面跑一些生产力工具看看。网上我也碰到了用13.3寸的文石max来跑linux的。

因为海信a2pro没有root，所以只能用不需要root权限的chroot——proot来进入纯linux环境，或者使用termux这样在安卓系统分配的沙盒内运行单用户的一个linux环境。

我试用了基于proot的ubuntu noroot，效果不好。另外还有同一个作者的xserver for android，因为xorg是c/s架构，可以在运行基于x的程序，但没有一个窗口管理器总归不方便。

最后还是觉得termux最好用。使用termux自身提供的包就可以实现很多功能，也可以用proot登录debian、arch这样的纯正环境里。

测试proot到debian还是会有权限的问题，毕竟它只是一个fakeroot。所以根文件系统我是在电脑上用qemu-debootsrap制作的，不然会报错。因为之前给mips的龙芯也做过，所以比较顺手。和用户相关的命令，如adduser、passwd、ssh都会有问题，因为没有root。termux支持的ssh server也不能用户登录，需要使用密钥。

不多折腾了，鼠标键盘、windows和专业软件才是生产力。linux on android只能满足特定时候的一些特定需求，搭配superbook这样的设备才算实用一点。



