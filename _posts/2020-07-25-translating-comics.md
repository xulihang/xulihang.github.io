---
date: 2020-07-25 15:11:50+08:00
layout: post
title: 漫画翻译心得
categories: 随笔
tags: 翻译
---

我的硕士毕业论文是《一个漫画翻译辅助工具的设计与实现》（[researchgate](https://www.researchgate.net/publication/342623300_Design_and_Implementation_of_a_Computer-Aided_Comics_Translation_Tool)），主要成果是[ImageTrans](https://www.basiccat.org/zh/imagetrans)这一辅助翻译工具，从图像处理和文字翻译两个方面进行辅助。完成论文后，我又继续做了xkcd和腾讯动漫上的一些中文漫画的翻译，这里我把我的心得做一个总结。

## 图像处理

1. 翻译软件应能正确生成文字区域

	漫画翻译需要以文字区域为单位进行。文字区域应该以语义片段为单位，一般就是一个段落。不同气泡中的文字区域不应该被合并。

	漫画文字通常存在于气泡中，但也有许多文字不在气泡里。传统的基于气泡检测的方法没有办法检测气泡外的文字，比较实用的是合并连通区域并对这些候选区域进行分类以获得正确的文字区域的方法，但它不适用于背景颜色比文字颜色深的情况。

	此外也可以用深度学习目标检测方法和自然场景文字检测方法。目标检测也需要生成候选区域，其使用的方法用于漫画文字不够精确。而目前最先进的自然场景文字检测方法，比如CRAFT，效果则很好，缺点就是单机部署处理的速度比较慢。

	ImageTrans使用基于连通区域的文字区域检测方法，可以设置相关参数，并能够通过检测文字外的轮廓判断不同区域是不是需要合并。

2. 翻译软件应集成图像浏览与翻译功能

	漫画翻译是一种[符际翻译](/translation-studies-1/)，译者翻译时需要参考图像，所以应该提供便利的图像浏览和片段切换方式。

	很多翻译公司是将图像文字转录为表格，然后给译员翻译。这样如果显示设备空间不够，会存在来回切换窗口的问题，也会存在文字和图像对应出错的问题，比如不知道转录的文字对应漫画中的哪句话。

	ImageTrans支持用户点击图片上的文字框来进行翻译，并能够实时预览翻译效果。

![](/album/comics/imagetrans_xkcd.jpg)

## 文字翻译

1. 尽量使用简短、地道的表达

	因为漫画文字的空间受到限制，尽量使用较短的表达。另外漫画中的文本多为人物对话，一般需要使用比较地道的口语表达.

	我们可以通过检索语料查找相关表达。影视字幕文件是一个好的语料来源。

	比如这么一句话：

	`那个女人也抛弃了他和他的对手好上了`

	百度翻译结果：

	`That woman also abandoned him and his opponent`

	腾讯翻译结果：

	`The woman also abandoned him and fell in love with his opponent.`

	检索老友记的平行语料，可以找到相关条目。

	首先检索“抛弃”，发现可以选择较短的dump表示抛弃的意思：

	```
	8
	note: Friends.S03E22.chs&eng.sohu.ass 0:07:04.48,0:07:07.32
	en: I dump him for telling people the short version.
	zh: 我会因为他光说简单的 抛弃了他

	10
	note: Friends.S05E08.chs&eng.sohu.ass 0:02:54.93,0:02:56.63
	en: and abandoned its entire family.
	zh: 抛妻弃子的话

	15
	note: Friends.S06E02.chs&eng.sohu.ass 0:21:29.93,0:21:32.99
	en: But then we ditch those two and we get married.
	zh: 接着我们就抛弃他们结婚
	```

	然后检索“好上”，可以找到hook up这个表达：

	```
	9
	note: Friends.S10E03.chs&eng.sohu.ass 0:20:55.13,0:20:57.40
	en: When you and Monica first hooked up...
	zh: 你和莫妮卡刚好上的时候
	```

	整句可以翻译为：The woman dumped him and hooked up with his opponent.
	
	但有些表达在语料库里可能检索不到，最好还是平时多看剧，有条件就出国，熟悉英文的表达。


2. 灵活翻译拟声词

	我遇到一个漫画用“唰”表示把衣服脱在床上以及用修眉刀修眉毛的声音。想不出对应的英文拟声词，可以把动作翻译出来，分别翻译为fell和shave。

3. 摆脱原文束缚

	翻译并不一定要完全按照原文一字一字翻译，漫画翻译一般用流畅的文本把原文的意思表述出来就行了，而且更加容易理解。

	比如xkcd 第2336篇中的这么一段话：

	`Astronomers define the Campfire Habitable Zone as the region where you're far enough not to be burned but close enough to roast marshmallows.`

	百度翻译：

	`天文学家将篝火可居住区定义为：你离这里足够远，不会被烧焦，但距离足够近，可以烤棉花糖。`

	DeepL：

	`天文学家将 "篝火宜居区 "定义为：在这个区域里，你离得足够远，不会被烧伤，但又足够近，可以烤棉花糖。`

	我校对的翻译：

	`天文学家对篝火宜居带的定义：离篝火足够远，不至于被烫伤，又足够近，能烤棉花糖的区域`
	
4. 注意俚语、习语等表达

	比如我最近帮忙校对的xkcd的这篇漫画：

	![](https://xkcd.in/resources/compiled_cn/54dae463a32d54035e9b990eab99c018.jpg)
	
	里面那句这招永远玩不腻的英文是That never gets old，最初的翻译是这帮人永远长不大。这是该漫画最主要的梗，居然也翻错了。get old是一个习语，表示不会厌倦的意思。翻译漫画时应该具有辨别习语和俚语这类表达的意识。




