---
date: 2015-06-13 14:48:50+00:00
layout: post
title: 用龙芯本当路由器之挂代理上网
categories: 技术随笔
tags: linux loongson 龙芯
---


我们江南大学提供校园网Drcom认证计流量的上网方式和运营商合作提供的拨号上网方式。

平时我用校园网+搜狗代理，基本可以访问所需的网站，速度还可以，而且因为都在教育网，不走流量。我是文科生，没有实验室这种东西，没地方架搜狗代理，都是寝室电脑直接运行代理的。

龙芯本开启热点之后，在运行代理即可使用。代理用的[小虾](http://xiaoxia.org/)的python脚本。其它goagent什么的代理都可以，我用搜狗代理就是省流量加教育网加速。

为了自动化操作，我用curl实现了drcom的认证。修改/etc/rc.local，在开机时就设置好静态ip，开启热点，Drcom认证然后运行代理。

以下是通过Drcom网页进行认证的代码，貌似各大高校都是通用的：

登录：`curl -d "DDDDD=username&upass=password&0MKKey=%B5%C7%C2%BC+Login" 接入网站IP`

注销：`curl "http://接入网站IP/F.htm"`

