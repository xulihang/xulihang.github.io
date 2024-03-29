---
date: 2017-09-29 18:57:50+08:00
layout: post
title: OCR与语音转录软件测试
categories: CAT
tags: 
---

翻译技术课上我们讨论组测试了各种OCR和语音转录软件，我这里也稍微总结一下我们的成果。

OCR

我们测了各种OCR软件成品：ABBYY Finereader、汉王OCR、捷速OCR等，也有网页端的百度、谷歌和GK扫描，也有手机端的ABBYY和扫描王等软件。

对于OCR结果的影响，我们列出了一些因素，主要有：图片分辨率（DPI）、字体、语种、简繁体、印刷体/手写体和是否有特殊样式。

一开始我听同学们讨论要各种测试的时候真的觉得挺没有意义的，我们不是软件开发者，不懂技术原理，也不懂什么软件测试的方法，光测试个软件结果有什么用？而且还有提议用百分比的方式翻译正确率。我想很多图片的字数还需要人工统计，然后在数错的字，工作量也不小的。但后来我想想这些实验还是可以做的，而且有一篇硕士论文就是做的这个，题目是《信息资源数字化文本型数字图像OCR识别准确度影响因素及提高策略研究》。

我们使用成品软件的话，对于识别过程的掌控较小，有一开源的ocr引擎tesseract，可以供学习使用。

语音转录的话，我目前发现的好用的是Youtube的自动字幕生成功能和讯飞听见。

两者都使用了机器学习算法。前者免费，但是要上传视频比较麻烦一点。后者支持中文，要收费。我也了解讯飞还建立了一个大众标注平台，叫爱标注，发动网民给医学等领域以及各地方言的语音数据进行标注。目前上海话的识别已经挺不错了，我直接用海宁话说也可以识别。

对于语音识别的技术细节我自然很难掌握，但通过youtube上导出的字幕窥知一二。比如它可以识别出音乐，并打在字幕上，说明它是需要区分人的声音和背景声音的。

感叹下现在科技的发展，便利了我们的生活和工作。
