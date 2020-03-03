---
date: 2019-12-30 21:11:50+08:00
layout: post
title: 图像文字颜色检测
categories: 技术随笔
tags: 图像处理
---

这里讨论背景元素简单的纯色背景的情况。

过程如下：

1. 取图像开头的像素得到背景颜色
2. 对图像做边缘检测
3. 使用形态学操作平滑边缘
4. 对边缘做轮廓检测，并做孔洞填充
5. 遍历原图的所有像素，如果该像素坐标位于字体轮廓内，且与背景颜色并不相似，则对其颜色进行计数，像素出现次数最多的颜色就是字体的颜色。

问题：

因为文字和背景过度区域有很多中间颜色的像素，所以需要进行去除，主要是判断和背景颜色是否相似。那如何判断和背景颜色相似？很多背景颜色和文字颜色都是蓝色，只是一个深一点，一个浅一点，这样将RGB转换到HSB比较色调是不行的。我还是采用了比较RGB值的差的方法。

### 2020-03-03更新

之前的方法在背景颜色检测方面太过简单。这里提出一个基于KMeans聚类获得图像主色(Dominant Color)的方法。

背景颜色通常在图像中占据较大的比例，是图像主要包含的颜色。

微软和谷歌的计算机视觉服务能够检测图片的配色，详见两者的文档：[检测图像中的配色方案 - 微软](https://docs.microsoft.com/zh-cn/azure/cognitive-services/computer-vision/concept-detecting-color-schemes)、[检测图片属性 - 谷歌](https://cloud.google.com/vision/docs/detecting-properties)。

那具体怎么实现呢？检测主要颜色的方法有很多，常用的是KMeans，还有一种方法是颜色量化(Color Quantization)。KMeans是一种无监督的聚类方法，可以将数据聚成指定数量的类别，下面是操作步骤：

我们首先将图片缩放，然后获取每个像素的RGB值。生成如下的csv表：

```
r,g,b
255,255,255
202,202,202
39,39,39
0,0,0
1,1,1
0,0,0
```

之后进行聚类，每个类别的质心就是该类别对应的颜色。Java的话可以使用weka包含的SimpleKMeans类进行操作。

背景颜色出现的次数应该最多，所以包含像素最多的那个类别是背景颜色所在的类别。该类别质心对应的颜色就是背景颜色。


相关链接：

1. [颜色空间转换](https://tool.lu/color/)
2. [RGBtoHSB, java docs](https://docs.oracle.com/javase/1.5.0/docs/api/java/awt/Color.html#RGBtoHSB(int, int, int, float[]))
3. [老铁！怎么识别一张图片上文字的颜色](https://www.v2ex.com/amp/t/354940/1)
4. [Dominant Colors for Lazy-Loading Images](https://manu.ninja/dominant-colors-for-lazy-loading-images)
5. [Finding dominant colors in an image](https://aishack.in/tutorials/dominant-color/)