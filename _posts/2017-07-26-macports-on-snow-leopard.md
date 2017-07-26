---
date: 2017-07-26 15:56:50+08:00
layout: post
title: 在苹果雪豹系统上运行macports
categories: 技术随笔
tags: 
---

因为x61运行比较完美的黑苹果版本是雪豹，我又想使用git等工具，便想使用homebrew之类的macos上的包管理工具。比较了fink、homebrew和macpors后觉得还是macports适合过时了的雪豹系统，因为据说对系统的依赖性较小。

## 安装MacPorts：

1、因为官网为雪豹提供的pkg文件安装失败，我选择用源码编译安装。

2、雪豹安装macports需要先安装xcode3.2，提供必要的编译工具。

3、下载源码安装。

## 配置Macports：

一、设置源

中科大有提供macports的源，国内的总归速度快一点，果断换上。我网上搜索到的配置方法都已经过时了。最后还是直接照着配置文件修改成功的。

1、修改/opt/local/etc/macports/sources.conf，在末尾添加如下内容：

`rsync://rsync.mirrors.ustc.edu.cn/macports/release/tarballs/ports.tar [default] `

2、修改/opt/local/etc/macports/macports.conf，设置rsync_server为rsync.mirrors.ustc.edu.cn，rsync_dir保持原来的设置不变。

3、运行sudo port -v selfupdate进行更新。

二、其它

其它配置不多讲了，我还没接触到。基本上/opt/local/etc/macports/macports.conf里包括了大部分设置。比如选择软件的架构。雪豹默认设置的架构是纯64位程序。我是以32位内核模式运行的雪豹，发现也可以运行64位程序。

## 遇到的问题

装个git什么的还是轻松愉快的，但是我在装gimp时却遇到了问题。问题出在编译依赖的ffmpeg时，提示ERROR: vda requested, but not all dependencies are satisfied: vda_framework pthreads。我便在网上搜索，搜到唯一一篇帖子如下：[ffmpeg-devel @20170615_0 does not build on Mac OS X 10.6.8, Snow Leopard, because of missing vda_framework pthreads](https://trac.macports.org/ticket/54333)，里面提到了什么macports对雪豹的支持有限，可以通过编辑配置文件切换编译器来解决问题。

于是我就去装gcc4.9，但是发现被加入blacklist，还是用的默认的xcode装的gcc版本。我还尝试使用clang，也失败了。设置osx默认的gcc版本可以sudo port install gcc_select，然后通过port select --list gcc和select --set gcc llvm-gcc42两个命令设置。clang也是一样。

最后我还是修改ffmpeg的Portfile来编译通过的，还好文件里注释写得很清楚。vda是video hardware acceleration的意思，可以不启用。。注释掉启用的部分后就可以编译通过了。

另外，装macports本来想装openjdk8的，但看官网显示最低系统要求是10.7.3，雪豹上能运行，但不保证不出问题。之前运行omegat mac版时就遇到了包自带的java1.8启动失败，用系统的java1.6启动成功的事情。看来雪豹系统还真是老了。

还有macports相当于在osx下再搞了一个小的posix系统，要占用不少空间，我只给mac分配了25gb，空间容易紧张。

折腾这类类unix系统真是要花费不少时间。



























