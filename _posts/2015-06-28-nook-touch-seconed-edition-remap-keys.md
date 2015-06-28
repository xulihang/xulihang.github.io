---
date: 2015-06-28 11:56:50+00:00
layout: post
title: 给nook2修改按键映射
categories: nook
tags: nook 电子书 Android
---

当初nook2买来就是图的是安卓系统，功能多，折腾性强。而买回来后我是抱着不折腾的态度，刷了行云版rom之后就安心用它来看书了。

可最近中间的n键不灵光了，我也懒得拆机修理（不会也不太敢）。有时按上去没反应，有是会导致自动锁屏。心想把n键对应的功能改掉，用左边上一页的按钮做home键不就可以了！

打开/system/usr/keylayout,看到4个文件，我也不知道改那个文件。于是上XDA看了一下。最终我是这样做的：

1、打开gpio-keys.kl，修改HOME为MENU，这一步把n键的功能改为menu。其实因为这个按键不灵光了，可以不对应任何功能。

2、打开TWL4030_Keypad.kl，找到以下内容：

    key 407   RIGHT_NEXTPAGE

    key 412 BACK WAKE_DROPPED

    key 139 MENU WAKE_DROPPED

    key 158   RIGHT_PREVPAGE

行云版rom已经把左边的上一页按键定义为返回键，下一页按键定义为菜单键。因为n键home键的功能改掉了，用上一页按键代替。把BACK改成HOME。

最后用修改好的两个文件替换掉原来的文件。

需要重新挂载system分区，如果用root explorer也可以。在电脑上用adb的话输以下命令：

`# mount -o remount /dev/block/mmcblk0p5 /system`

最后上几张图：

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/nook/20150628115149.png)

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/nook/20150628115425.png)

参考链接：

[Remap 'n' button in sleep mode](http://forum.xda-developers.com/showthread.php?t=2666715)

[Nook Simple Touch Remap Hardware Keys](http://forum.xda-developers.com/showthread.php?t=1139149)

[Nook 2nd Edition Touch - Development](http://forum.xda-developers.com/showthread.php?t=1124160)

[Android修改system只读权限：remount](http://blog.sina.com.cn/s/blog_6e1b60990100rhdp.html)