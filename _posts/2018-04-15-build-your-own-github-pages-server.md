---
date: 2018-04-15 14:10:50+08:00
layout: post
title: 搭建自己的GitHub Pages服务器
categories: 技术随笔
tags: Web
---

最近我们专业在进行OmegaT的本地化项目，其中包括了omegat的网站，是jekyll生成的。我把它放到github pages上，但生成失败，提示有不支持的tag。看来github的jekyll缺少插件。那我们就本地用jekyll生成吧。

但是配置环境还是挺麻烦的事，还是直接配一台自己的github pages服务器方便，其它人也可以用。

下面是具体步骤：

## 1、安装jekyll

debian linux下用以下方法安装：

`# apt get install ruby ruby-dev make gcc g++`

`# gem install bundle jekyll`

注意不要用apt装jekyll，会报错。

## 2、clone远程omegat的网页仓库

`$ git clone https://github.com/omegat-org/omegat-website`

之后进入仓库，运行`JEKYLL_ENV=production bundle exec jekyll build`就可以生成页面了。

## 3、建立本地git仓库

首先建立一个供其它用户使用git的账户

`# adduser git`

切换到git用户

`#su git`

建立裸仓库。git的服务器端必须用--bare。

`$ git init --bare web`

这里我预期用户需要上传仓库的内容不是omegat网站的全部内容，而是zh_CN文件夹部分。

## 4、配置lighttpd

jekyll生成的是静态页面，可以用lighttpd来提供服务。

因为此后要用git账户修改www文件夹的内容，所以选择用git账户启动lighttpd。

以下是lighttpd.conf的内容：

```
server.modules = (
        "mod_access",
        "mod_alias",
        "mod_compress",
        "mod_redirect",
        "mod_rewrite",
)

server.document-root        = "/home/git/www/html"
server.upload-dirs          = ( "/home/git/var/uploads" )
server.errorlog             = "/home/git/var/error.log"
server.pid-file             = "/home/git/var/lighttpd.pid"
server.username             = "git"
server.groupname            = "git"
server.port                 = 8080


index-file.names            = ( "index.php", "index.html", "index.lighttpd.html" )
url.access-deny             = ( "~", ".inc" )
static-file.exclude-extensions = ( ".php", ".pl", ".fcgi" )
url.rewrite-if-not-file = (
  "zh_CN/(.*)" => "zh_CN/$1.html"
)

compress.cache-dir          = "/home/git/var"
compress.filetype           = ( "application/javascript", "text/css", "text/html", "text/plain" )

# default listening port for IPv6 falls back to the IPv4 port
include_shell "/usr/share/lighttpd/use-ipv6.pl " + server.port
include_shell "/usr/share/lighttpd/create-mime.assign.pl"
include_shell "/usr/share/lighttpd/include-conf-enabled.pl"
```

可以建立一个shell脚本来启动，内容如下：

```
#!/bin/bash

/usr/sbin/lighttpd -f ~/lighttpd.conf
```

这里我给lighttpd开启了mod_rewrite功能，主要是因为omegat的链接有的是/documentation这样的，需要补上.html。我用正则表达式试了好久，最后发现应该使用url.rewrite-if-not-file。相比于用b4j写jetty的服务器程序，lighttpd给我的自定义空间要小了点。

## 5、配置git hooks

在git仓库的hooks文件夹里有很多示例的脚本，把它们文件名后面的.sample去掉就可以启动。另外，文件名会影响这些脚本在什么时候运行。比如这里我们需要的是post-update，在提交保存后进行操作。

以下是脚本的内容：

```
#!/bin/bash

cd ~/git
rm -rf web
git clone ssh://git@127.0.0.1:43999/home/git/web
cd web
cp -r * ~/omegat-website-master/_i18n/zh_CN
cp yml/* ~/omegat-website-master/_i18n/
cd ~/omegat-website-master/
JEKYLL_ENV=production bundle exec jekyll build
cp -r _site/* ~/www/html
pkill lighttpd
~/run.sh
echo "OKay!!!"
exit 0
```

因为服务器上的git仓库都是git objects，所以需要在本地clone一次。我还给git账户用ssh-keygen配置了公钥，免去输入密码的步骤。


再具体讲一下操作流程：

1. 用户clone ssh://git@127.0.0.1:43999/home/git/web，用最新翻译出来的zh_CN文件夹的内容进行替换。
2. 用户提交，远程服务器将zh_CN文件夹放到jekyll项目里，生成网页到_site文件夹。
3. 将_site文件夹的内容替换lighttpd的www/html文件夹。
4. 重启lighttpd，结果生效。





