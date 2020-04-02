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

	二值化是在灰度图像的基础上进行操作，用一定的阈值对每个像素的灰度进行判断，如果该灰度小于阈值则是黑色，大于阈值则是白色。

	灰度图像可以由RGB图像转换得来，数值在0-255之间，数值越大，亮度越大。

	下面是一个RGB转灰度的公式：

	`Gray=(R*299 + G*587 + B*114 + 500) / 1000`

	在OpenCV中使用threshold函数进行操作，该函数还支持OTSU和Triangle算法自动计算阈值。

	用PS打开灰度图像，像素的灰度会用K值来表示，这是反映黑色程度的百分值，计算方式：1-灰度值/255。

	B4J项目：[threshold](https://github.com/xulihang/opencv_examples/tree/master/threshold)

2. 轮廓检测

	OpenCV使用[^suzuki]提出的改进版边界跟踪(border following)算法进行轮廓检测。

	轮廓检测需要在二值化的图像上进行。什么是轮廓，可以看下面的示例。

	原图：

	![](/album/opencv/cup.jpg)

	轮廓：

	![](/album/opencv/cup_contours.jpg)

	轮廓可以分为两类，一种是外轮廓(outer border)，一种是孔洞(hole)。因为OpenCV检测时处理的是白色的像素，所以这里孔洞和外轮廓是倒过来的。

	孔洞：

	![](/album/opencv/cup_outer_border.jpg)

	外轮廓：

	![](/album/opencv/cup_hole.jpg)

	下面是OpenCV中的用法：

	`findContours(img As cvMat,contours As List,hierarchy As cvMat,mode As Int,method As Int)`

	mode有四种模式：

	* RETR_EXTERNAL，提取所有外轮廓
	* RETR_LIST，单纯列举出所有轮廓
	* RETR_CCOMP，将轮廓分为外轮廓和孔洞轮廓两种，最内部的轮廓会和最外面轮廓归到一级。
	* RETR_TREE，计算完整的轮廓层级
	
	hiearchy，包含四种层级信息，分别是：
	
	1. 同一层级的下一轮廓
	2. 同一层级的前一轮廓
	3. 第一个子轮廓
	4. 父轮廓
	
	我觉得比较有用的是父轮廓信息，可以据此对轮廓进行分类。
	

	B4J项目：[findContours](https://github.com/xulihang/opencv_examples/tree/master/findContours)

	示例程序可以单独查看某个层级的轮廓，便于试验。

3. 图像修复

	图像修复原理是给出需要修复的图片区域，然后根据区域周边像素对该区域进行复原。一个用途是结合轮廓检测生成文字掩膜，抹除图片中的文字。
	
	OpenCV中对应inpaint方法。该方法包含在轮廓检测项目中。
	
4. 形态学操作

	这里主要指腐蚀和膨胀操作。

	首先取一个核(kernel)，也叫形态元素(Structuring Element)，进行卷积操作。核的中心点的取值是所在核的所有像素值中最大或最小的那个值，如果取最大则为膨胀操作，最小则为腐蚀操作。

5. 边缘检测

	边缘和轮廓这两个概念比较接近。我理解轮廓提取的精度更高，边缘则是近似的，表示灰度变化明显的区域。边缘检测能处理彩色图片，可以保留更完整的边缘信息。具体可以看下面的例子，不过边缘检测的结果和阈值的设定有关。

	原图：

	![](/album/opencv/text.png)

	轮廓：

	![](/album/opencv/text_contours.jpg)

	边缘：

	![](/album/opencv/text_canny.jpg)

	使用Canny算子检测物体的边缘，该操作有以下步骤：

	1. 高斯平滑用于去除噪点
	2. 计算梯度强度和方向
	3. 非极大值抑制去除非边缘像素
	4. hysteresis阈值处理，输出二值化的轮廓图像，该步骤需要两个阈值，如果像素的梯度高于较大的阈值，则判定为边缘。如果像素的梯度小于较小的阈值则去除。如果在两个阈值之间，那么需要存在相邻的梯度高于较大的阈值的像素。

6. 连通区域标记

	如果一个像素和它周围的8个像素或者上下左右4个像素的颜色一致或相近，那这些像素就是彼此连通的。
	
	连通区域标记就是给每个区域的像素进行标记（赋值一个数字），从而知道图中有哪几个连通区域，每个区域对应哪些像素。
	
	连通区域和轮廓的区别在于，轮廓仅仅是图像的边缘部分。
	连通区域标记的算法很多，比较简单的是递归的方法。具体见相关链接。
	
	项目：[connectedcomponents](https://github.com/xulihang/opencv_examples/tree/master/connectedcomponents)

	
相关链接：

1. [【数字图像处理】边界跟踪算法 ](https://www.cnblogs.com/-wenli/p/11719012.html)
2. [Finding contours in your image](https://docs.opencv.org/2.4/doc/tutorials/imgproc/shapedescriptors/find_contours/find_contours.html)
3. [Canny Edge Detector](https://docs.opencv.org/2.4/doc/tutorials/imgproc/imgtrans/canny_detector/canny_detector.html)
4. [Eroding and Dilating](https://docs.opencv.org/2.4/doc/tutorials/imgproc/erosion_dilatation/erosion_dilatation.html)
5. [图像分析：二值图像连通域标记 ](https://www.cnblogs.com/ronny/p/img_aly_01.html)
6. [Connected Component Labelling](https://www.aishack.in/tutorials/labelling-connected-components-example/)


参考文献：

[^suzuki]: Suzuki, S. and Abe, K., Topological Structural Analysis of Digitized Binary Images by Border Following. CVGIP 30 1, pp 32-46 (1985)

