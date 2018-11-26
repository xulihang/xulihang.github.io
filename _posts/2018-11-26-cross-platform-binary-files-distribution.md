---
date: 2018-11-26 17:14:50+08:00
layout: post
title: 跨平台软件的分发
categories: 技术随笔
tags: 
---

BasicCAT是跨平台软件，所以发布的时候会提供不同平台的安装包。比如Windows是使用inno setup打包的exe，mac是dmg，linux是压缩的zip文档，里面提供安装用shell脚本。

接下来要考虑一个敏捷开发的问题，因为手工打包三个平台的安装包还是比较麻烦的。

windows的exe文件当然只有在windows下生成，不过linux和mac上可以使用wine。

mac的dmg其实就是一个hfs格式的分区，只不过这个分区存进了一个文件，然后又进行了压缩。dmg一般是要在macOS里用磁盘工具创建。我们可以在linux下用mkfs.hfsplus创建一个dmg文件，或者在windows里使用transmac。但最好的解决办法还是放弃dmg，采用zip格式进行打包。

一个B4J软件的持续集成平台可以这样设计：代码提交到github，触发webhooks调用自己编写的windows上跑的server，编译出新的jar，然后调用脚本构建三个平台的安装包，然后将结果上传到github release等地方进行分发。
