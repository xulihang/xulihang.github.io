---
date: 2020-03-11 21:32:50+08:00
layout: post
title: 图像处理学习——基于OpenCV实例
categories: 技术随笔
tags: 图像处理
---

打算用B4J编写一系列OpenCV示例，用于更好地了解常见的图像处理算法和OpenCV的使用，主要包含ImageTrans用到的操作，会持续更新。

OpenCV函数的具体用法见前文：[OpenCV使用笔记](/opencv/)

1. 二值化

二值化是在灰度图像的基础上进行操作，用一定的阈值对每个像素的灰度进行判断，如果该灰度小于阈值则保留。

灰度图像可以由RGB图像转换得来，数值在0-255之间，数值越大，亮度越大。

下面是一个RGB转灰度的公式：

```
Gray=(R*299 + G*587 + B*114 + 500) / 1000
```

在OpenCV中使用threshold函数进行操作，该函数还支持OTSU和Triangle算法自动计算阈值。

用PS打开灰度图像，像素的灰度会用K值来表示，这是反映黑色程度的百分值，计算方式：1-灰度值/255。

B4J项目：[threshold](https://github.com/xulihang/opencv_examples/tree/master/threshold)


