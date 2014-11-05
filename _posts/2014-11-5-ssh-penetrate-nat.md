---
date: 2014-11-05 17:45:17+00:00
layout: post
title: ssh内网穿透，实现校外访问校内网
categories: 网络
tags: ssh nat 教育网
---

寝室的网络都是经过NAT的，没有公网IP，无法从外部访问。而学校的反向VPN只对至善生、研究生和教师开放。

那么在校外，想访问校内网或操作寝室的电脑，该怎么办呢？我得知了一种ssh的穿透方法。利用一台vps穿透内网。

寝室的笔记本：

```
ssh -N -f -R 2222:127.0.0.1:22 root@vps的IP
```

VPS上:

```
ssh -p 2222 username@localhost
```

这样在VPS上就可以ssh到寝室电脑了。然后我想用ssh代理来浏览内网。

在寝室电脑，通过远程端口映射，使得VPS：2222 映射到 寝室电脑：22

```
ssh -N -f -R 2222:127.0.0.1:22 root@vps的IP
```
	
在校外电脑上，通过本地端口映射，使得校外电脑：2222 映射到VPS:2222

```
ssh -N -f -L 2222:127.0.0.1:2222 root@vps的IP
```

现在可以`ssh -p 2222 username@localhost `登录寝室电脑了。

然后运行代理：`ssh -qTfnN -D 7070 username@localhost -p 2222`。在浏览器上设置下socks代理后，就可以访问内网了。

这样做就是万一VPS重启了，连接就丢失了，不过一般没什么问题。还有用VPS搭VPN，然后校内和校外的电脑都连上，也可以实现校外访问校内网。


参考链接：[http://www.douban.com/note/363490887/](http://www.douban.com/note/363490887/)



