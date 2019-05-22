---
date: 2019-05-22 16:02:50+08:00
layout: post
title: HTTP 301重定向
categories: 网络
tags: 
---

最近在考虑改变域名的问题，目前博客使用的是blog.xulihang.me这一域名，想转换到xulihang.me。但其实前者已经有了不错的权重，没有必要迁移。

不过，我还是研究了一下，怎么把让xulihang.me的访问跳转到blog.xulihang.me。

主要使用的是HTTP 301状态码，表示永久迁移，这样搜索引擎会把xulihang.me和blog.xulihang.me看做一个网站。

我的xulihang.me解析到一台VPS，开了http服务，但因为没有什么内容，就简单地给首页添加了一段JavaScript，3秒后进行跳转：

```js
var i = 3; 
var intervalid; 
intervalid = setInterval("fun()", 1000); 
function fun() { 
    if (i == 0) { 
        top.location.href='https://blog.xulihang.me';
        clearInterval(intervalid); 
    } 
    document.getElementById("mes").innerHTML = i; 
    i--; 
} 
```

这样的不足之处是返回的状态码不是301，真的迁移域名的话是不合适的。

这里，我使用lighttpd的url.redirect进行跳转。添加以下代码到lighttpd.conf：

```
$HTTP["host"] =~ "^[a-z]*\.*(.*)$" {
  url.redirect = ( "^/(.*)" => "https://blog.xulihang.me/$1" )
}
```

这样，xulihang.me或者www.xulihang.me这样的域名都会自动跳转到blog.xulihang.me。并且状态码是301。以下是curl的结果：

```
root@ip-172-31-35-138:/etc/letsencrypt/live/xulihang.me# curl -v xulihang.me
* Rebuilt URL to: xulihang.me/
*   Trying 18.223.21.100...
* TCP_NODELAY set
* Connected to xulihang.me (18.223.21.100) port 80 (#0)
> GET / HTTP/1.1
> Host: xulihang.me
> User-Agent: curl/7.58.0
> Accept: */*
>
< HTTP/1.1 301 Moved Permanently
< Location: https://blog.xulihang.me/
< Content-Length: 0
< Date: Wed, 22 May 2019 08:17:27 GMT
< Server: lighttpd/1.4.45
<
* Connection #0 to host xulihang.me left intact
```

另外，我还考虑了HTTPS的问题。可以使用Let's encrypt的免费证书。

这里，我之前使用了ocserv，会占用443端口。不过好在我使用docker运行的ocserv，可以较为方便地将443映射到其它端口。

具体操作可以参考这篇文章：[lighttpd支持HTTPS](https://www.jianshu.com/p/a9c909aaaaba)

获得的证书90天后过期，到时候重新运行一遍就行了。

参考链接：

* [Permanent redirect (301) with lighttpd](http://charles.lescampeurs.org/2008/06/30/permanent-redirect-301-with-lighttpd)
* [certbot](https://certbot.eff.org/)


