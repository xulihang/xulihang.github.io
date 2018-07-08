---
date: 2014-10-23 15:50:17+00:00
layout: post
title: 在digitalocean vps上搭建pptp vpn
categories: 网络
tags: digitalocean vps vpn
---

接[上一篇文章](http://xulihang.wicp.net/edu-vps-ssh/)。

我已经能用ssh代理了。但毕竟还要设置代理，不如直接用vpn方便。我喜欢pptp这样只需要用户名和密码，可直接在各电脑和手机操作系统上使用的vpn。

vps.me的vps没有ppp模块，不支持iptables -t nat，各种功能不健全。所以还是要用digitalocean的vps。

下面就讲下搭建过程，基于ubuntu的：

#安装PPTP

```
apt-get update
apt-get install pptpd
```

#配置PPTP

编辑/etc/pptpd.conf
把以下内容前的`#`去掉

```
#localip 192.168.0.1
#remoteip 192.168.0.234-238,192.168.0.245
```

上面的两行为VPN服务器的IP和VPN客户端连接后获取到的IP范围。

##添加VPN帐户

编辑/etc/ppp/chap-secrets 添加如下内容：

```
username pptpd password *
```

其中username为你要添加的VPN帐号的用户名，password为你VPN帐号的密码。

##修改DNS服务器

编辑/etc/ppp/options，添加如下内容：

```
ms-dns 8.8.8.8
ms-dns 8.8.4.4
```

##开启IPv4转发

编辑/etc/sysctl.conf文件，去掉net.ipv4.ip_forward=1前的注释
运行如下命令，使配置修改生效

```
sysctl -p
```

##重启pptpd服务

```
/etc/init.d/pptpd restart
```

##安装iptables

```
apt-get install iptables #如果已经安装可以跳过
```

##开启iptables转发

```
iptables -t nat -A POSTROUTING -s 192.168.0.0/24 -o eth0 -j MASQUERADE
iptables-save > /etc/iptables.pptp
```

在/etc/network/if-up.d/目录下创建iptables文件，内容如下：

```
#!/bin/sh
iptables-restore < /etc/iptables.pptp
```

给脚本添加执行权限：

```
chmod +x /etc/network/if-up.d/iptables
```

至此PPTP VPN服务器端的设置就完成了。然后设置下pptp的vpn，就可以连上了！

参考链接：[Linode VPS PPTP VPN 安装配置教程](http://www.vpser.net/manage/linode-vps-pptp-vpn-howto.html)

