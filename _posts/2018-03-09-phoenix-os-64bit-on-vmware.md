---
date: 2018-03-09 20:26:50+08:00
layout: post
title: 在Vmware上安装64位凤凰OS
categories: 技术随笔
tags: 
---

昨天看到了chromebook，续航好，还支持安卓应用，心水了一下。寒假习惯了在安卓机顶盒上看电视，发现windows上没有对应的软件非常不方便。实机运行了凤凰os，体验还是不错的，在富士通10.4寸的屏幕上还是移动版网页效果好，另外凤凰os基于android x86深度定制，已经非常适合作为桌面系统使用了。

不过实机安装还是不如windows加虚拟机方便，虽然测试比windows省电。决定还是在vmware上装一个。

其实要运行安卓应用，可以用chromeos-apk在chrome上运行或者装bluestack或者直接qemu就行了，但是实际效果还是不理想。还是用vmware player装省心。

我下载的是凤凰os的64位版本，需要在虚拟机的设置里开启3d加速，不然可能停在android那里。

默认vmware是不支持efi的，我们要修改vmx文件，添加firmware="efi"进去，之后启动就会进入grub efi而不是isolinux。

然后就是建立一个efi分区，建立一个系统分区，再装efi grub就可以了。

具体参考官方教程：[.iso镜像文件如何使用](http://www.phoenixos.com/help/installation/iso-Uefi)

使用`adb connect 凤凰os分配的ip地址`可以连接上，并且可以有root权限，以后要调试安卓应用也可以用这个。


# 3月10日更新

我又在驰为hi8pro上装凤凰os，因为该win板比较特殊，只能用32位的uefi，装起来比较麻烦。最新的linux内核是支持32位efi启动64位系统的，但我测试没成功。后来装x86版本的启动成功了，但是各种应用停止运行，而且不支持无线、触摸，看来还是需要专门的适配啊。我的驰为hi8pro是早期不支持安卓双系统的，没有remix os可以用，我也懒得发回原厂升级。还是放弃了。

不过安卓程序要显示在windows上还有另一个方法就是用安卓手机miracast投屏到电脑上。见此:[折腾无线投屏](http://blog.xulihang.me/wireless-display/)