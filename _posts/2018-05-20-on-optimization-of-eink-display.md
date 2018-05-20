---
date: 2018-05-20 15:16:50+08:00
layout: post
title: 浅谈Eink的显示优化方法
categories: 技术随笔
tags: 
---

我本人对显示技术并不了解，不过作为一个eink设备爱好者，也想总结下目前使用的eink设备上感受到的优化方法。

Eink显示效果优化主要从硬件和软件两方面入手。关于Eink的原理，在[wikipedia](https://en.wikipedia.org/wiki/Electronic_paper)上有比较好的说明。我接下来讨论的其实更多还是属于软件方面。


早在Nook Simple Touch（nook2）的年代，极客们就想出了很多的eink显示效果优化办法，主要有以下几种：

应用漂白：修改应用以只显示黑白两种颜色。

局刷（partial refresh）：屏幕内容变化的不多的话，可以只刷新部分内容。特别适合看书的时候用，如果局刷多了有残影（ghost）就再全刷一次。

瞬刷（fast refresh mode）：这个也叫a2模式，只显示黑白内容，图像只需传输1bit的内容，速度很快。

再之后，我用的yotaphone，配备骁龙800处理器，刷新效果更加完善。

大上显示器支持的模式更多，有A2、A5、Floyd，A16等模式。其中Floyd模式是画质和速度兼具的一个模式，根据国外网友Kev Zettler的这篇[测评文章](https://kevzettler.com/2018/01/12/dasung-paperlike-pro-review)，是采用了Floyd–Steinberg dithering的算法。dithering中文叫抖动。在把图片转为gif这样只支持256色的格式时，会有颜色信息丢失。使用dithering可以优化显示效果，更为人眼所接受。电子墨水屏一般只有16级灰阶，要保证显示效果，需要这样的算法。而且图像压缩后应该可以有更快的刷新效果。

海信的双屏手机在开启流畅模式后，图片会显示出使用抖动算法产生的条形色块，应该也是用的Floyd算法。

但是利用图像处理来实现显示的优化，会导致处理器的负担加重。所以海信a2pro虽然有3000mah电池，经常用墨水屏的话，电量消耗还是很大的。




