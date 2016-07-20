---
date: 2016-07-20 12:12:50+08:00
layout: post
title: OS X下安装Lighttpd+Python+Bottle
categories: 笔记
tags: Python
---
 
因为要运行b4i的buildserver，所以新配的电脑不能切到linux下工作。直接在macosx下部署python－bottle应用。其实可以用一些虚拟技术，但我还没学过。

我选择了轻量级的lighttpd，使用fastcgi来使用python+bottle的组合。

具体方法如下：

1、安装并配置lighttpd

`$ brew install lighttpd`

启动lighttpd：`$ brew services start lighttpd`

打开配置文件`/usr/local/etc/lighttpd.conf`，添加以下内容

```

fastcgi.server = ( "/app.py" =>(( "socket" =>"/tmp/fastcgi.socket",
"bin-path" =>"/usr/local/bin/python3 /usr/local/var/www/app/app.py",
"max-procs" =>1,
"check-local" =>"disable"
))
)

url.rewrite-once = (
"^/favicon.ico$" =>"/favicon.ico",
"^/(.*)$" =>"/app.py/$1",
)

```

这里我是参考了廖雪峰的python教程：[Linux配置Lighttpd+Python+web.py应用](http://www.liaoxuefeng.com/article/0013738925109653a9f5fe0a82c4984ba8e8174b456d0ce000)

其它的还要修改module.conf，照着廖雪峰教程里的。我自己把include "conf.d/fastcgi.conf"前的＃去掉了。


2、安装配置Python

在/usr/local/var/www/app下建立app.py，内容如下：

```
#!/usr/bin/env python
# -*- coding: utf-8 -*-
import bottle
import os
from bottle import route, run, view

import home

@route('/')
def index():
    return 'Hello World'

APP_ROOT = os.path.abspath(os.path.dirname(__file__))
bottle.TEMPLATE_PATH.append(os.path.join(APP_ROOT, 'templates'))
app = bottle.default_app()

if __name__ == '__main__':
    from flup.server.fcgi import WSGIServer
    WSGIServer(app).run()
```

这里参考自：[bottle + lighttpd + fastcgi](http://notionbox.de/detail/3/)。

因为我实际测试时发现mac自带的python2会提示import _dummy_thread的错误，发现dummy_thread时python3专用的，所以又用brew安装了python3。应用默认使用python3。

安装所需模块(使用python3用的easy_install)：

`sudo easy_install-3.5 flup`  

`sudo easy_install-3.5 bottle`

3、重启lighttpd进行测试

`$ brew services restart lighttpd`


