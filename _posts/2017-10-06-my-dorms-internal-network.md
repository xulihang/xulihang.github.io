---
date: 2017-10-06 22:06:50+08:00
layout: post
title: 软微寝室的网络
categories: 技术随笔
tags: 北大
---

软微的网络是北大教育网，是从本部拉光纤过来的。和本部10元每月不同，我们这里的校园网是免费的。我在的5号楼寝室门口有网口，然后通过交换机分到4个床位下面。

我来的时候没有买无线路由器，带的树莓派，打算用它来架无线网。以前在江大的时候网络也是经过NAT的，我直接用龙芯笔记本做路由器，效果挺好的。这次在软微的设置也还是轻松愉快的，插网线直接分配到地址，然后按教程利用hostapd和dnsmasq就可以了。

但是网络一直有某些网页打不开的问题，edge提示dns错误。网页比如www.qq.com，login.weibo.com， mirrors.ustc.edu.cn还有知网。我一直以为是软微网络本身的问题，一直用江南大学的VPN上知网。但我今天连接TPLink WR842n架的无线网时发现这些网站都可以访问，就觉得奇怪了。于是想方设法要解决这个问题，结果到最后也没有解决。毕竟我的网络知识很薄弱。

虽然没有解决，但是还是学到不少东西。比如一些网络命令

1、nmap，主要用来检测网络设备运行的端口、操作系统。比如以下对北大一个网关的扫描。

```
pi@raspberrypi:~ $ sudo nmap -O 162.105.254.18

Starting Nmap 6.47 ( http://nmap.org ) at 2017-10-06 22:24 CST
Nmap scan report for 162.105.254.18
Host is up (0.0033s latency).
Not shown: 994 closed ports
PORT     STATE    SERVICE
53/tcp   filtered domain
135/tcp  filtered msrpc
139/tcp  filtered netbios-ssn
445/tcp  filtered microsoft-ds
1433/tcp filtered ms-sql-s
1434/tcp filtered ms-sql-m
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Device type: broadband router|router|switch|WAP
Running: Cisco embedded, Cisco IOS 12.X
OS CPE: cpe:/o:cisco:ios:12.2 cpe:/h:cisco:870_router cpe:/o:cisco:ios:12 cpe:/h:cisco:2960_switch cpe:/h:cisco:aironet_ap1250 cpe:/o:cisco:ios:12.4
OS details: Cisco 827H ADSL router (IOS 12.2), Cisco 870 router or 2960 switch (IOS 12.2 - 12.4), Cisco Aironet 1250 WAP (IOS 12.4)
Network Distance: 5 hops

OS detection performed. Please report any incorrect results at http://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 98.28 seconds
```

2、nslookup，检测dns服务是否正常。我用nslookup发现有些域名可以正常解析，但就是ping不同，浏览器打不开网页。

3、traceroute（windows上对应tracert），用来检测发出数据包的主机到目标主机之间所经过的网关数量的工具。下面是我测试的一些结果。可以看到在访问中科大开源镜像时出现三个星号，请求失败。162开头的是北大的网关，192开头的应该是内网的网关，可以知道寝室的网络应该是经过多重路由的。

```
pi@raspberrypi:~ $ traceroute weibo.com
traceroute to weibo.com (121.194.0.221), 30 hops max, 60 byte packets
 1  192.168.200.254 (192.168.200.254)  0.607 ms  0.604 ms  0.600 ms
 2  192.168.253.13 (192.168.253.13)  0.327 ms  0.429 ms  0.349 ms
 3  192.168.253.17 (192.168.253.17)  0.566 ms  0.595 ms  0.609 ms
 4  162.105.254.18 (162.105.254.18)  1.188 ms  1.323 ms  1.246 ms
 5  162.105.252.189 (162.105.252.189)  1.168 ms  1.201 ms  1.105 ms
 6  202.112.41.181 (202.112.41.181)  1.582 ms  1.346 ms  2.292 ms
 7  202.112.41.177 (202.112.41.177)  2.903 ms  3.648 ms  3.573 ms
 8  101.4.117.82 (101.4.117.82)  3.504 ms  3.422 ms  3.341 ms
 9  101.4.112.89 (101.4.112.89)  3.392 ms  3.145 ms  3.039 ms
10  219.224.102.230 (219.224.102.230)  3.272 ms  3.197 ms  3.118 ms
11  hef1.cernet.net (202.112.38.126)  2.890 ms  2.958 ms 202.112.38.166 (202.112.38.166)  2.004 ms
12  * * *
13  121.194.0.221 (121.194.0.221)  2.585 ms  2.771 ms  2.785 ms

pi@raspberrypi:~ $ traceroute mirrors.ustc.edu.cn
traceroute to mirrors.ustc.edu.cn (202.38.95.110), 30 hops max, 60 byte packets
 1  192.168.200.254 (192.168.200.254)  0.761 ms  0.626 ms  0.715 ms
 2  192.168.253.13 (192.168.253.13)  0.254 ms  0.367 ms  0.285 ms
 3  192.168.253.17 (192.168.253.17)  0.382 ms  0.487 ms  0.411 ms
 4  162.105.254.18 (162.105.254.18)  1.112 ms  1.026 ms  1.056 ms
 5  * * *
 6  * * *
 7  * * *
 8  * * *
 9  * * *
10  * * *
11  * * *
12  * * *
13  * * *
14  * * *
15  * * *
16  * * *
17  * * *
18  * * *
19  * * *
20  * * *
21  * * *
22  * * *
23  * * *
24  * * *
25  * * *
26  * * *
27  * * *
28  * * *
29  * * *
30  * * *
```

4、wireshark，抓包工具。这次没有用到。

5、netstat，显示各种网络信息的工具。我主要用来看路由表。

关于树莓派的配置，我也折腾了很久，主要是各种设置DNS服务器，设置静态分配ip。

修改dns直接修改resolv.conf就可以生效，这个文件由resolvconf自动生成，可以进行配置。dnsmasq分发给设备的dns地址可以通过dnsmasq.conf配置。设置静态IP有修改 /etc/network/interfaces的也有修改dhcpcd.conf 的，其实效果都一样。我发现不能使用8.8.8.8这样的公共dns，只能使用路由器提供的dns。

折腾了半天，还是没有解决无法连接如中科大开源镜像的网站问题。最终我选择直接用网线接电脑，发现都可以访问了。可能是经过的路由太多导致的访问失败。



