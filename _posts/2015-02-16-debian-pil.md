---
date: 2015-02-16 11:26:50+00:00
layout: post
title: '[Linux记]Python安装PIL库处理图片'
categories: 经验
tags: linux python
---

做了听雨的图片中转站。其实很简单的东西，把图片下下来后用PIL把分辨率改小下提供下载。

中转站用的一个免费vps，还要自己配置环境。。

安装Python，再`pip install PIL`结果报错。

主要是一些头文件和库没有安装到位。

参考以下网站解决：

[Installing PIL with pip](http://stackoverflow.com/questions/20060096/installing-pil-with-pip)

[解决使用PIL “decoder jpeg not available”错误](http://ju.outofmemory.cn/entry/86143)