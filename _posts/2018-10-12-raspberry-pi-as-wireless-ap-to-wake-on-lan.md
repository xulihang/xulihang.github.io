---
date: 2018-10-12 10:31:50+08:00
layout: post
title: 树莓派用作无线AP以唤醒连接的主机
categories: 网络
tags: 
---

上两篇文章讲到如何通过有线局域网远程唤醒主机，但是目前大多数设备并不支持通过无线网络进行唤醒。

于是我想到了利用树莓派作为无线AP，用网线连接树莓派和主机，把wifi网络桥接给主机。树莓派功耗低，平时可以一直开着，要用主机时再进行唤醒。

首先配置树莓派为一个无线AP，以下操作默认使用raspbian系统：

1.安装bridge-utils

    `$ sudo apt install bridge-utils`

2.创建网桥

    ```
    $ sudo brctl addbr br-lan
    $ sudo brctl addif br-lan eth0
    $ sudo ifconfig br-lan 192.168.1.1 up
    $ sudo ifconfig eth0 0.0.0.0 up
    ```
    
3.配置IP转发，用文本编辑器打开/etc/sysctl.conf修改以下配置

    `net.ipv4.ip_forward = 1`
    
4.配置iptables，添加NAT

    `iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE`
    
    
5.安装并配置dnsmasq作为dns和dhcp服务器

    `$ sudo apt install dnsmasq`
    
    修改/etc/dnsmasq.conf，添加以下内容，设置动态分配ip的范围，并给主机指定固定的ip地址。
    
    ```
    dhcp-range=192.168.1.50,192.168.1.150,255.255.255.0,12h
    dhcp-host=（填主机有线网卡的MAC地址，形如XX:XX:XX:XX:XX:XX）,192.168.1.55
    ```

6.设置开机启动

    修改/etc/rc.local，添加第2、4两步的命令。rc.local默认是root权限，不用sudo。
    
然后还需要配置主机支持网络唤醒，以下介绍ubuntu系统的设置。

1.安装ethtool

    `sudo apt-get install ethtool`
    
2.开启有线网卡的wol

    `sudo ethtool -s eth0 wol g`
    
3.修改/etc/init.d/halt的以下内容为no，这样休眠后保持网络接口不被关闭。

    `NETDOWN=no`


    
主机使用pm-hibernate进行休眠或者pm-suspend挂起之后，在树莓派上使用wakeonlan命令就可以进行唤醒了。

`wakeonlan -i 192.168.1.55 mac地址`
    
    
参考链接：

1.【树莓派】在Raspbian下将wifi中继为有线网络：<https://blog.csdn.net/wr132/article/details/78986190>
2.实战Ubuntu远程开机 (Wake on Lan)：<https://www.linuxidc.com/Linux/2012-07/64696.htm>