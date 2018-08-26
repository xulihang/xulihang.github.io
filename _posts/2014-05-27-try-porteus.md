---
date: 2014-05-27 10:56:17+00:00
layout: post
title: 使用Porteus 3.0
categories: 技术随笔
tags: slax porteus
---

以前做启动光盘、U盘，常折腾Slax。硬盘启动Slax，保存changes，也可当本地系统使。个人感觉这样的系统一是小巧，不用安装，启动方便，二是定制性很强，因为模块化。用Slax的livecd制作脚本还可以基于其它系统做livecd，比如我做的[红旗linux6的Livecd](http://hi.baidu.com/xulihanghai/item/f2933cd7da5fd7da251f40ed)。三是方便研究linux，因为你每次操作的改动都可通过查看changes得知。

Porteus原名slax-remix，后来做得好了，有了很多自己的技术，就改名了，同样基于slackware。优点什么的见[官网](http://www.porteus.org/info/why-choose-porteus.html)

昨天启动U盘里的Porteus2.1，可惜pppoe拨号莫名地失败，去官网看到3.0出来了，索性更新下。

syslinux引导U盘启动，基本5秒内见桌面。选择的Kde4环境果然很爽，界面靓丽细致，功能强大。习惯了Win7的Aerosnap，kde4的窗口吸附（是这样叫吧）更加强大，移到边上可操作缩到上方、下方还是整个半边屏。别跟我说这种功能在别的桌面环境装个软件配置下也可以，我很懒的。另外kde4比gnome3在笔记本的小屏幕上能显示更多内容。

默认没有中文字体和输入法，可参考我之前的[汉化方法](http://hi.baidu.com/xulihanghai/item/8baf76fc70fdecb131c199d1),Porteus也提供了语言选择工具。其实就是装个中文字体，装个输入法，装若干中文包的事。

制作xzm模块还是很容易的，用继承自slax的txz2xzm,tgz2xzm,deb2xzm,rpm2xzm,dir2xzm等等脚本转换很轻松。源码包用src2pkg也比较方便，自己编译也可以。Porteus提供保存session或changes到模块或单个文件或文件夹的功能，使做包更容易了。当然依赖关系还得自己搞定。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/porteus/snapshot2.jpeg)

个人很喜欢slax或porteus的模块化，显得比较清爽，没有不干净的感觉。启动选always flesh进系统就是全新的系统，copy2ram大大提高运行速度，保存changes就可以当本地linux用了。

以上就是我作为使用者的一点感受。


![](https://github.com/xulihang/xulihang.github.io/raw/master/album/porteus/snapshot3.jpeg)