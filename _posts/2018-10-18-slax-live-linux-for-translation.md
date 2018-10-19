---
date: 2018-10-18 21:52:50+08:00
layout: post
title: 基于Slax构建译者专用Linux
categories: 技术随笔
tags: CAT 启动
---

针对译者的linux已经有[tuxtrans](https://www.uibk.ac.at/tuxtrans/)了。它基于ubuntu打包了很多译者需要的软件。适合追求使用自由软件的用户使用。

现在我要基于Slax打造一个新的译者专用Linux。为什么的？主要是因为Slax的便捷性：

1. 可以从U盘等移动介质Live启动，启动后对系统进行的修改可以保存。
2. 模块化，可以方便地把软件打包，做进启动盘里。
3. 轻量级，启动快。

在Slax下运行如下命令：

`# savechanges out.sb`

即可把启动后进行的修改打包成squashfs格式的sb文件，然后放入光盘的modules目录即可使用。

去年出的Slax 9是基于Debian的，有包管理系统，也更适合小白进行操作。想之前基于slackware，安装软件要解决各种依赖关系，不过对于包的管控倒是比较清楚。

下面讲一下制作过程：

1. 添加中文支持。

	安装文泉驿中文字体：

	`# apt install fonts-wqy-microhei fonts-wqy-zenhei`

	安装输入法：

	`# apt install ibus ibus-pinyin ibus-qt4`

	这里因为slax缺少一些组件，我们需要补充上，另外默认桌面不能用中文输入法，改使用xfce桌面管理器，用lightdm登录管理器。

	`# apt install dbus-x11 task-xfce-desktop`

	安装im-config，可以强制设定输入法。

	`# apt install im-config zenity`

2. 安装常用CAT软件

	`# apt install translate-utils`

	然后OmegaT和Okapi需要手动安装，OmegaT自带安装脚本，运行即可。Rainbow可以参考OmegaT的脚本安装。主要是把它复制到/opt里，然后软连接执行文件到/usr/bin，并在/usr/share/applications里建立对应的desktop文件，把项目添加到系统的菜单里，把png图标放到/usr/share/icons/hicolor/32x32/apps里。

3. 安装其它辅助工具

	`# apt install gpicview okular libreoffice calibre tesseract default-jre openjfx xfce4-screenshooter`


然后可以安装visual studio code编辑器、scribus桌面排版软件等等。

这样，slax for translators就完成了。

不过这样的slax适合熟悉linux操作的用户使用，对于普通用户，易用性肯定是不佳的，就比如普通用户默认不支持fat32分区的写入。

这套系统的实用性还是有的，制作的过程也是充满乐趣。

这个网站整理了linux上可以使用的翻译软件：<https://translateonlinux.org/>。可以作为参考。








