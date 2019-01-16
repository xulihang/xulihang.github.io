---
date: 2019-01-16 14:07:50+08:00
layout: post
title: 字体的相关概念
categories: 笔记
tags: 
---

乔布斯在他2005年的斯坦福毕业典礼演讲中提到，他从Reed College退学后，继续学习了关于字体设计的课程，并把学到的东西都用到了Mac里，给Mac带来了优美的字体设计。

本文主要讲一下字体的相关概念，主要内容参考苹果的文档：[Typographical Concepts](https://developer.apple.com/library/archive/documentation/TextFonts/Conceptual/CocoaTextArchitecture/TypoFeatures/TextSystemFeatures.html#//apple_ref/doc/uid/TP40009459-CH6-BBCFAEGE)

### Characters 和 Glyphs

中文中的一个汉字，英文中的一个字母，算作一个字符（character），它们可以用不同的字形（glyphs）。

比如a，有斜体和粗体等形式：*a*, **a**。

一个字形也有可能包含两个字符，主要是æ这样的连体字母（ligatures）。

### Typefaces 和 Fonts

Typefaces 和 Fonts 翻译过来可能都是字体，前者表示抽象的设计，比如Times字体这种设计，而后者指字体本身。Font是指有相同字体设计、字体样式的字形（glyphs）集。斜体、粗体，这些属于字体样式（typestyle）。

有着同样的字体设计，但字体样式不同的一组字体叫做字体族（font family）。

[思源宋体](https://source.typekit.com/source-han-serif/cn/)便是一个字体族，它官网的介绍中有这段描述：

>思源宋体支持四种不同的东亚语言（简体中文、繁体中文、日语和朝鲜语），7 种粗细类型中的每一种都有 65,535 个字形。

思源宋体有7种粗细，那么它这个字体族里就包含了7种字体，不过它们的字体设计是一样的。

字体一般有三种：衬线字体（serif）、无衬线字体（sans serif）和等宽字体(monospace)。

衬线字体有很多的修饰，比如中文的宋体，英文的Times New Roman。无衬线字体比较平滑，没有多余的修饰，比如中文的黑体，英文的Tahoma。一般无衬线字体看起来比较不费眼，在移动设备上都是用的无衬线字体。

等宽字体每个字符的宽度都是一样的，比如i、m，在非等宽字体中，前者的宽度要小，而等宽字体中，两者宽度一样。这种字体适合用来编程，因为编程特别注重缩进。

### Text Layout

另外还有文本的布局，每个字形的位置应该怎么处理。

要显示大段的文字，就要考虑在哪里断行（line-breaking）的问题。

一般字符之间的距离都是相同的，但有时候为了特殊的设计效果或者是显示更多内容，需要调整字间距（tracking），这种操作叫做kerning。

我们小时候抄写英语单词，抄在有四道线的栏里，从上往下第三条线是基线（baseline），它决定单词“坐着”的位置。

另外还有行间距（leading），对齐（alignment）等常见布局属性。

在Word的段落属性或者InDesign中可以体验相关的操作。

Okapi的一个issue中有相关的示例图片：[IDML Filter: Merge tags that differ only by kerning, tracking, leading or baseline shift ](https://bitbucket.org/okapiframework/okapi/issues/756/idml-filter-merge-tags-that-differ-only-by)



















