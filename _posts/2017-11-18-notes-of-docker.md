---
date: 2017-11-18 20:40:50+08:00
layout: post
title: docker使用小记
categories: 技术随笔
tags: 
---

之前也试用过docker，但安装后看着一堆命令不知道怎么用。今天因为要安装ocserv-docker（未PN服务器），就再次使用了下这个时下流行的容器技术。以前在htc g1上有用chroot进入一个debian lenny镜像，在安卓上用vnc运行linux桌面。chroot应该是最古老的容器技术。

docker镜像省去了复杂的配置，可以让我们专注于使用，也可以说方便了很多伸手党，对配置过程不求甚解。当然容器和系统的隔离，也避免了更中配置把宿主系统搞得一团糟。

在实际使用过程中，我逐渐了解了docker的使用。

1、 建立docker镜像（docker build）。可以自己写Dockerfile来生成镜像文件，这个比debian的debootstrap好使很多。
2、 基于镜像运行一个新的容器（docker run）。容器是可修改的，而镜像是只读的。
3、 docker的其它操作一般都是基于已经有的容器。两条命令我觉得挺重要：

进入容器运行shell进行操作

`$ sudo docker exec -it 容器名字 /bin/bash`

查看容器，包括运行的和停止运行的

`$ sudo docker ps -a`

4、 容器的端口和系统的端口是两个概念。不像chroot，运行sshd后可以直接连接22端口。需要进行端口的绑定。

docker背后的技术还是挺复杂的，我光了解怎么用就费了不少功夫。

参考链接：

[通过 Docker 部署 OpenConnect 服务器 ](https://tommy.net.cn/2015/02/12/deploy-openconnect-server-with-docker/)

[wppurking/ocserv-docker ](https://github.com/wppurking/ocserv-docker)

[Docker 教程](http://www.runoob.com/docker/docker-tutorial.html)

[如何进入、退出docker的container](http://blog.csdn.net/dongdong9223/article/details/52998375)

[Get Docker CE for Debian](https://docs.docker.com/engine/installation/linux/docker-ce/debian/)

