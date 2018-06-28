---
date: 2015-06-13 15:06:50+00:00
layout: post
title: 用龙芯本当路由器之远程查看摄像头
categories: 技术随笔
tags: linux loongson 龙芯
---

逸珑8089D自带摄像头。既然带了，就要充分利用。想想现在智能摄像头很流行，不如也让龙芯本提供远程查看摄像头的功能。

搜索下有没有现成的项目，发现了mjpg-streamer。sourceforge上的项目已经比较老了，我在github上找到fork的版本，见此[链接](https://github.com/codewithpassion/mjpg-streamer)。

有的内核可能不支持摄像头，需要自己编译内核。测试用debian的3.2的内核可以使用摄像头。就是需要Fn+ESC快捷键手动开启。如果摄像头启动了，会存在/dev/video0这个文件。

编译完mjpg-streamer之后，在所在目录运行以下命令就可以开启服务：`mjpg_streamer -input "input_uvc.so -device /dev/video0 -fps 10 -resolution 320x240" -output "output_http.so -p 8080 -w www"`

如果编译失败，把相关的dev包装好。

运行时遇到`Init v4L2 failed`错误，参见这篇文章[mjpg-streamer：Init v4L2 failed](http://blog.csdn.net/firefoxbug/article/details/7524697)
