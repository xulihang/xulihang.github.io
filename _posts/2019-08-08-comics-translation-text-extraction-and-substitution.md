---
date: 2019-08-08 10:12:50+08:00
layout: post
title: 漫画翻译之文字提取与替换
categories: 随笔
tags: 翻译
---

一般译员翻译漫画是直接看着图片输入译文，这样的一个缺点是不能统计字数、不能使用CAT软件，数据不够结构化。

漫画一般是用Photoshop和InDesign制作，可以整理出6种情况：

1. JPG
2. PSD，文字存在于文本框中
3. PSD，文字已经由文本框转换为图像，文本都有单独的图层
4. PSD，文字已经由文本框转换为图像，而且和其它内容融合在一起
5. PDF
6. IDML或者INDD

为此，我专门设计了两个工具：

1. ImageTranscriber，辅助图片OCR工具。
2. PSDLocalization，可以从PSD文件提取文本，并将翻译好的文本回填。

### 情况一

使用ImageTranscriber提取文字。一般的OCR会先检测文字区域，然后识别文字，但是漫画的文字通常存在于气泡中，OCR常常不能准确识别文字区域。该工具可以利用深度学习自动检测气泡，根据坐标信息排序气泡并OCR。

![](/album/comics/imagetranscriber.JPG)

回填的话，可以用jpg文件生成PSD，在文字区域新建一个遮盖层并新建一个文本框。

一般需要处理JPG是因为时间紧张不能及时提供PSD，或者工作本身就是粉丝志愿发起的。

### 情况二

文字存在于文本框中，可以通过PSDLocalization操作Photoshop，可以直接批量提取文本并替换。

![](/album/comics/text_layers.JPG)

### 情况三

文字已经由文本框转换为图像，文本都有单独的图层，可以通过PSDLocalization操作Photoshop，将存在文字的图层导出为图像，使用OCR提取文字。回填时根据该图层的坐标生成文本图层，同时删去或者隐藏原来的图层。

![](/album/comics/separate_pixelized_text_layers.JPG)

### 情况四

文字已经由文本框转换为图像，而且和其它内容融合在一起。需要将PSD另存为JPG，使用ImageTranscriber处理，然后在PSD文件中生成遮盖层和文本框。如果PSD中的文字可以比较容易地隐藏，那就不用生成遮盖层。

![](/album/comics/merged_pixelized_text_layers.JPG)

### 情况五

PDF一般是由InDesign转换而来的，如果有InDesign的源文件，最好直接处理源文件。如果没有，只能把PDF导出为图像，当作JPG来处理。

### 情况六

InDesign文件可以直接使用CAT软件处理。

### 文字排版

一般漫画文字的排版是一倍行距，除非文字很长或者气泡很小，文字大小一致。

如果文字实在放不下，需要把气泡调大。

![](/album/comics/balloons.JPG)

对于拟声词，有PSD的话一般直接隐藏就可以。但是有的漫画的拟声词是作者绘画时手动画上去的或者只有JPG，这时要p掉文字会比较麻烦。要p掉文字的话可以用PS的污点修复画笔工具，对背景的还原效果还可以。

![](/album/comics/spot-healing-brush-tool.png)






