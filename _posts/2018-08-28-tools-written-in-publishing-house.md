---
date: 2018-08-28 20:40:50+08:00
layout: post
title: 在出版公司期间写的一些工具
categories: 技术随笔
tags: CAT
---

在出版公司实习时，碰到不少需要批量处理的工作，写个程序出来虽然会费不少工夫，但写完后就一劳永逸，可以节省挺多时间。涉及到文字转录、图片与PDF的处理。

# 图片转文字

文字转录的主要目的还是导入计算机辅助软件进行翻译，我一般看着PDF，对一遍转录的原文，理解原文后再进行翻译。

1、截图转文字

一开始要翻译小熊维尼的漫画，因为文字存在扫描版PDF里，用Word转会保留原文的表格，不是很方便。所以我基于tesseract写了一个截图转文字的[程序](https://github.com/xulihang/tesseract-clipboard)。

![](https://github.com/xulihang/tesseract-clipboard/raw/master/demo.gif)

其它的第三方软件，ABBYY也支持截图传文字，而知网CAJ阅读器支持选中PDF区域进行识别。

2、PDF按章节转文字

利用pdfbox可以提取PDF的图像和文字。

如果PDF的内容是单纯的图片，就把图片提取出来，用tesseract进行文字识别。如果支持复制文字，就可以直接提取。

将文字按页导出，然后输入章节的页码信息可以提取出按章节分割的txt文件，方便翻译。

代码[见此](https://github.com/xulihang/PDF2TXT)。

# PDF处理

pdfbox支持PDF的分割、合并、图像与文字提取等操作。

利用它，写了PDF转图像的工具。

而图像转PDF稍微麻烦一点，改使用Python+PyMuPDF库实现。

# 其它文字处理

1、词汇表按拼音顺序排列

将以下从英文翻译过来的词汇表重新按拼音顺序排列。主要利用了java的pinyin4j库来实现文字转拼音。将纯文本进行结构化这一步的代码比较麻烦一点。代码[见此](https://github.com/xulihang/glossaryMaker)。

```
A
Atmosphere 大气层
包裹着行星或者卫星的气体层。
B
Barrier 屏障
阻止某物从一个地方进入另一个地方。
Bunker 地堡
战争中用来为士兵提供掩护的工事。
C
Camouflage 伪装
和周边环境相融合的能力。伪装可利用皮肤颜色、材质和身体形状实现。
Cartilage 软骨
人和动物体内一种坚韧的组织。不像骨头，软骨可以非常容易地进行弯曲。
```

结果：
```
D
大气层 Atmosphere 
包裹着行星或者卫星的气体层。
地堡 Bunker 
战争中用来为士兵提供掩护的工事。
P
屏障 Barrier 
阻止某物从一个地方进入另一个地方。
R
软骨 Cartilage 
人和动物体内一种坚韧的组织。不像骨头，软骨可以非常容易地进行弯曲。
W
伪装 Camouflage 
和周边环境相融合的能力。伪装可利用皮肤颜色、材质和身体形状实现。
```

2、比较字表中的重复

分级阅读有不同等级的字表，每个字表的内容不能有重复。

用Python写程序，将每个字表的内容存为一个列表，然后进行比对，导出重复的结果。


