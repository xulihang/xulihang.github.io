---
date: 2020-10-15 17:19:50+08:00
layout: post
title: 竖直文字排版
categories: 技术随笔
tags: 
---

中文、日文和韩文都能够竖直排版，现代日语的书籍还沿用了过去从右往左阅读的竖直排版模式。

翻译日语漫画为中文或者中文翻译为日文时，汉字通常需要竖直排版。

将汉字竖直排列，有一种简单的字符串处理方法，需要规定好每行有几个字，然后将汉字重新进行排列。

B4X示例代码（[来源](https://www.b4x.com/android/forum/posts/681136/)）：

```vb
Sub MakeItVerticalForCJK(s As String, NumberOfLettersPerColumn As Int) As String
	Dim sb As StringBuilder
	sb.Initialize
	Dim NumberOfColumns As Int = Ceil(s.Length / NumberOfLettersPerColumn)
	For y = 0 To NumberOfLettersPerColumn - 1
		For x = 0 To NumberOfColumns - 1
			Dim Index As Int = (NumberOfColumns - 1 - x) * NumberOfLettersPerColumn + y
			If Index < s.Length Then
				sb.Append(s.CharAt(Index))
			Else
				sb.Append(" ")
			End If
		Next
		sb.Append(CRLF)
	Next
	Return sb.ToString
End Sub
```

输出示例：

```
原文：
今天开始和大家一起学习的同学！

输出：
习大今
的家天
同一开
学起始
！学和
```

汉字和全角标点的宽度高度基本是一致的，所以效果还可以。但如果混入半角标点符号和拉丁字母以及空格，效果就不行了。此外，也不能也不能控制每行的字数。

我想到可以把文字先转换为图片，然后对图片进行调整，从而实现一个文字竖排引擎，可以供ImageTrans使用。

效果展示：

原文：

```
今日から
みんなと勉強
する事になった、
灰原哀さん
です！
```

输出图像：

![](/album/vertical_text.png)

竖排时需要遵循日语汉字的排版规则，例如：

1. 感叹号、冒号居中，顿号、逗号和句号靠右排列
2. 日语的延长音`—`需要进行旋转，类似的还有竖排引号『』。后者可以直接改用﹃﹄
3. 英文单词向右旋转90度排列
4. 位数较小的数字横向排列在一起

一个完善的文字引擎还需要考虑斜体加粗等富文本格式、字间距、行距、对齐等内容，较为复杂，目前我还没有实现。








