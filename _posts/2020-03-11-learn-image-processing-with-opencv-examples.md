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

	`Gray=(R*299 + G*587 + B*114 + 500) / 1000`

	在OpenCV中使用threshold函数进行操作，该函数还支持OTSU和Triangle算法自动计算阈值。

	用PS打开灰度图像，像素的灰度会用K值来表示，这是反映黑色程度的百分值，计算方式：1-灰度值/255。

	B4J项目：[threshold](https://github.com/xulihang/opencv_examples/tree/master/threshold)

2. 轮廓检测

	OpenCV使用[^suzuki]提出的改进的边界跟踪(border following)进行轮廓检测。

	轮廓检测需要在二值化的图像上进行。什么是轮廓，可以看下面的示例。

	原图：

	![](/album/opencv/cup.jpg)

	轮廓：

	![](/album/opencv/cup_contours.jpg)

	轮廓可以分为两类，一种是外轮廓(outer border)，一种是孔洞(hole)。

	外轮廓：

	![](/album/opencv/cup_contours.jpg)

	孔洞：

	![](/album/opencv/cup_hole.jpg)

	下面是OpenCV中的用法：

	`findContours(img As cvMat,contours As List,hierarchy As cvMat,mode As Int,method As Int)`

	mode有四种模式：

	* RETR_EXTERNAL，提取所有外轮廓
	* RETR_LIST，单纯列举出所有轮廓
	* RETR_CCOMP，将轮廓分为外轮廓和孔洞轮廓两种
	* RETR_TREE，计算完整的轮廓层级

	B4J项目：[findContours](https://github.com/xulihang/opencv_examples/tree/master/findContours)

	示例程序可以单独查看某个层级的轮廓，便于试验。


参考文献：

[^suzuki]: Suzuki, S. and Abe, K., Topological Structural Analysis of Digitized Binary Images by Border Following. CVGIP 30 1, pp 32-46 (1985)


相关链接：

1. [【数字图像处理】边界跟踪算法 ](https://www.cnblogs.com/-wenli/p/11719012.html)


