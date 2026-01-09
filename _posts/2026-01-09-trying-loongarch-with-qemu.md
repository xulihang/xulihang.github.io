---
date: 2026-01-09 16:16:50+08:00
layout: post
title: 基于QEMU测试Loongarch龙架构
categories: 技术随笔
tags: 
---

最近有个公司客户说要在3A6000上运行我们的产品。大一的时候279元买了台龙芯2F的逸珑8089d笔记本，那时还是mips架构的，现在龙芯已经使用新的Loongarch龙架构了。

我看了下网上没有很便宜的整机可以买到，于是就考虑用QEMU来模拟测试环境。

QEMU有两种模式，一种是system，可以模拟整个硬件环境，一种是user，可以直接在自己的环境中执行另一个架构的程序。

## System模式

我们可以直接下载龙芯官方的Loongnix系统的qemu磁盘镜像来启动一个Loongarch的系统。

镜像链接：<https://pkg.loongnix.cn/loongnix/20/isos/Loongnix-20.7.rc1/Loongnix-20.7.rc1.cartoon.gui.loongarch64.en.qcow2>

EFI固件：<https://github.com/loongson/Firmware/blob/main/LoongArchVirtMachine/QEMU_EFI.fd>

然后用以下命令启动：

```
qemu-system-loongarch64 -m 4G -cpu la464-loongarch-cpu -machine virt -smp 4 -bios QEMU_EFI.fd -serial stdio -device virtio-gpu-pci -net nic -net user -device nec-usb-xhci,id=xhci,addr=0x1b -device usb-tablet,id=tablet,bus=xhci.0,port=1 -device usb-kbd,id=keyboard,bus=xhci.0,port=2 -hda Loongnix-20.7.rc1.cartoon.gui.loongarch64.en.qcow2
```

密码是Loongson20。

## User模式

我们需要有一个基本的rootfs，可以用debootstrap构建或者解压现成打包好的版本（[CLFS-for-LoongArch](https://github.com/sunhaiyong1978/CLFS-for-LoongArch)）。


下面是使用debootstrap的方法，测试环境是Debian 14 Testing：

```
sudo apt install debootstrap qemu-user-binfmt binfmt-support debian-ports-archive-keyring
mkdir loongson
sudo debootstrap --arch=loong64 --foreign sid loongson http://mirrors.ustc.edu.cn/debian
sudo cp /usr/bin/qemu-loongarch64 loongson/usr/bin/
sudo mount -t proc proc loongson/proc
sudo mount -t sysfs sys loongson/sys
sudo mount -t devpts devpts loongson/dev/pts
sudo chroot loongson /debootstrap/debootstrap --second-stage
```

## 新旧世界

LoongArch有两套不兼容的软件体系，叫做旧世界和新世界，官方叫ABI 1.0和ABI 2.0。

主要是早期官方维护了一套自己的工具链，接近MIPS的风格，后面接受社区的反馈，融入了开源社区。

一个比较明显的区别是新世界的程序解释器路径是 /lib64/ld-linux-loongarch-lp64d.so.1，而旧世界的程序解释器路径是 /lib64/ld.so.1。


一般比较老的Linux 4.x内核的，麒麟、UOS、Loongnix 20这些是旧世界的系统，社区的Debian、Arch和Loongnix 25是新世界系统。


新世界系统可以通过liblol兼容旧世界系统的软件。不过旧世界兼容新世界就没有那么容易了。


要编译支持某个世界系统的程序，最好是在目标系统编译，或者使用对应的交叉编译工具链。

## 相关链接

* [请教在x86平台使用qemu运行商业版（旧世界）loongarch64的方法](https://github.com/sunhaiyong1978/CLFS-for-LoongArch/issues/53)
* [旧世界与新世界](https://areweloongyet.com/docs/old-and-new-worlds)
* [基于KVM的新世界运行旧世界闭源软件](https://bbs.loongarch.org/d/335-kvm)


