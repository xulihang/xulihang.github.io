---
date: 2020-02-08 14:56:50+08:00
layout: post
title: 使用JavaScript编写Photoshop脚本
categories: 技术随笔
tags: CAT
---

之前的文章[Photoshop文档本地化脚本](/adobe-photoshop-localization-script/)已经介绍过如何编写Photoshop的脚本。我这里再针对JavaScript做点补充。

使用JavaScript的好处是跨平台，弊端是不如VBScript和AppleScript那样可以和系统更好地结合起来。

另外，我电脑上装的Photoshop CS3的精简版，没有办法用COM进行调用，装完整版PS的话磁盘空间不够，用JS来写的话，因为是打开PS后选择脚本进行调用，不用考虑COM是否能调用的问题。

首先来一波文档和工具链接：

1. [Adobe ExtendScript API documentation](http://yearbook.github.io/esdocs/#/)。用在Adobe中的JavaScript叫做ExtendScript，补充了很多API接口，比如本地文件读写的接口。
2. [Learn How to Script Adobe Photoshop CS2](http://www.adobepress.com/articles/article.asp?p=433750&seqNum=12)，较为全面的教程。
3. [JSON在线工具](https://www.sojson.com/)，查看导出的json时可以使用。

下面是我觉得可以写一下的注意事项：

1. 默认不支持将JS对象转换为JSON字符串，可以把[json2.js](https://github.com/douglascrockford/JSON-js)下下来include：`#include json2.js`。
2. 用上述方法调用JSON.stringify不能处理中文，需要将中文做encodeURI处理。
3. 要注意单位问题，PS中可以以点(point)或者像素(pixel)为单位。

我编写了三个本地化PSD用的脚本([github](https://github.com/xulihang/ImageTrans_PhotoshopScripts))：

```
psd2jpg.jsx，遍历某个目录及子目录下的所有PSD文档，另存为JPG
readTextLayers.jsx，遍历某个目录及子目录下的所有PSD文档，将所有文字图层的图层名、文字和坐标信息导出为一个json文件
addLayers.jsx，根据ImageTrans导出的数据文件，给图片添加文字层或者用译文替换PSD里文字图层的原文
```

JavaScript不是我的主力语言，所以折腾起来还是比较费劲。有一款漫画翻译标号工具叫LabelPlus，对PS脚本的利用比较充分。脚本项目地址：[PS-Script](https://github.com/LabelPlus/PS-Script)
