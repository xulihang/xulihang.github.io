---
date: 2020-12-30 19:33:50+08:00
layout: post
title: 设计一个日语漫画辅助阅读器
categories: 技术随笔
tags: CAT

---

我稍微懂点日语，但直接看原版漫画还是比较吃力。于是我针对性地完善了[ImageTrans](https://www.basiccat.org/zh/imagetrans/)以更好地用于阅读日语漫画，可以准确识别文字并提供机器翻译结果便于了解大概意思。

软件功能：

1. 自动定位文字区域

	![](/album/comics-reader/textboxes.jpg)
	
	定位文字区域的方法有很多，比如使用轮廓检测或者连通区域标记法提取气泡、使用文字连通区域法直接检测文字、深度学习目标检测方法、自然场景文字检测方法等等。我将这些方法都整合进了ImageTrans供用户选择。

2. 聚合多种OCR引擎，哪个好使用哪个，并提供竖排文字图片转横排功能

	整合了百度、微软、有道、腾讯、搜狗等在线OCR引擎和Tessearct离线引擎。

	但测试只有tesseract、微软和有道支持竖排的文本，所以我又做了一个将竖直排列的文字横向排列的功能。

	原图：

	![](/album/comics-reader/vertical.jpg)
	 
	百度识别结果：证山,K领山源十诲!心长想:2や十

	转换后：
	 
	![](/album/comics-reader/horizontal.jpg)

	百度识别结果：今日からみんなと勉強する事になった灰原哀さんです!

	但这要求文字区域的背景是白色的，如果比较复杂就不能重新排列了。
	
	更新：其实百度有提供精确版OCR，是支持竖排识别的，只是每天有500次的使用限制。而且有时候识别结果不如转换为横排后识别得到的结果好。

3. 提供去除振假名的功能

	用于注音的振假名会影响OCR结果，需要进行去除。

	去除前：
	 
	![](/album/comics-reader/with_furigana.jpg)

	tesseract识别结果：いきなり東大を_目指しだして以来

	去除后：

	![](/album/comics-reader/without_furigana.jpg)

	tesseract识别结果：思えば高-のとき三者面談でいきなり東大を目指しだして以来

4. 整合多种机器翻译引擎

	整合了谷歌、百度和腾讯等机器翻译服务。但测试下来，很难把原文意思翻译出来。日语比较特别，有很多语气词，内容还依赖于语境。不过切换不同的机器翻译再加上图片内容，大致意思就能理解了。

	![](/album/comics-reader/imagetrans_mt.png)

5. 将译文替换回图片

	![](/album/comics-reader/imagetrans_translated.png)

6. 使用Chrome插件翻译网页中的图片

	现在一般在线看漫画，用Chrome扩展获取网页中图片链接并把翻译好的图片替换回去，体验会好很多。



### 视频演示

手动分步翻译：

<iframe src="//player.bilibili.com/player.html?aid=373454146&bvid=BV1Uo4y1Z7Wo&cid=273691942&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

一键自动翻译：

<iframe src="//player.bilibili.com/player.html?aid=373454146&bvid=BV1Uo4y1Z7Wo&cid=274451193&page=2" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

视频中的自动翻译使用搜狗深智OCR定位文字并识别文字，处理速度和准确度都比较高，让我觉得我在研究文字定位和OCR图像预处理方面浪费了太多力气。

### 最新研究

日本的几位博士针对日语漫画设计了一整套翻译系统并发表了一篇论文：《Towards Fully Automated Manga Translation》（[链接](https://arxiv.org/abs/2012.14271)）

他们针对漫画设计了考虑上下文与多模态的机器翻译，训练了能识别振假名的OCR、漫画分镜和文字目标检测器，采用EdgeConnect图像修复法去除文字，根据文字区域面积自动调整排版译文，并制作了可用于评价检测和翻译的数据集以及一个在线翻译系统。

他们成立的公司叫做[mantra](https://mantra.co.jp/)，但目前还没有公开可用的系统。

不过实际使用的话，除了机器翻译考虑上下文与漫画中的图像信息，各方面和ImageTrans没有太大差距。因为ImageTrans目前整合的功能已经有较好的效果了，要再提升的话主要是并发处理和提高翻译质量以及软件的可用性这些方面。


