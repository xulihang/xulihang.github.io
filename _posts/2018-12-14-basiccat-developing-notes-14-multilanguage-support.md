---
date: 2018-12-14 10:14:50+08:00
layout: post
title: BasicCAT开发笔记（十四）：多语种的支持
categories: 技术随笔
tags: CAT
---

BasicCAT最初仅支持中英互译，目的是针对两种语言做专门的适配，同时减轻刚开始开发的负担。随着软件的不断完善，需要增强软件的通用性，增加更多语言的支持。

其实多语种的支持并不复杂。主要需要做的是以下三点：

1. 建立项目时增加语言选项，使用ISO639标准的语言代码保存语言信息。
2. 添加对应语言的分割规则，需要修改SRX文件。
3. 判断哪些语言是中间有空格的，它的字数又是如何统计的。

另外还有针对各大机器翻译API，使用的语言代码不尽相同，需要做一个表进行转换。当然也可以设置为自动检测，检查语法和拼写的Language Tool我便设成了自动检测，不过对于德语英语这样有很多词形式一样的语言，会出现判断错误的问题。而斯坦福corenlp支持的语言有限，不支持的语言就不进行句法分析了。

还有屈折语的屈折变化问题，一种是提取词的原形(lemma)，一种是提取词干(stem)。我这里选择使用opennlp进行词形还原。因为opennlp提供的模型和词典有限，我也没有精力去做其它语言的适配，于是目前只对英文进行词形还原。

下面我再具体讲一下BasicCAT中对于中英互译和韩文的处理。

对于中译英，中文没有空格，而英文有空格，按句段进行翻译时，译者并不需要注意添加空格的问题。所以生成翻译时，需要BasicCAT自动在英文的句子间添加空格。

而反过来，英译汉的时候，则需要删去多余的空格。因为BasicCAT保留了原文的空格和换行等信息，虽然显示的片段都是没有多余空格的，但生成时会被包含进去，这在做英译法等有空格语言的互译时很方便，但英译中时，空格就成了多余的内容。

因为原文可能包含了换行、tab等信息，不能简单地使用Trim来去除空格。也不能直接把原文的空格全部删去，因为有可能中文里也会使用空格，比如下面的情况：

>正则表达式，又称规则表达式。（英语：Regular Expression，在代码中常简写为regex、regexp或RE），计算机科学的一个概念。

所以我采用正则表达式，删去不是字母和汉字中间的空格。

```vb
Sub removeSpacesAtBothSides(text As String) As String
	text=Regex.Replace2("\b( *)\b",32,text,"placeholder<$1>placeholder")
	text=Regex.Replace2("(?<! *placeholder<) *(?! *>placeholder)",32,text,"")
	text=Regex.Replace2("placeholder<( *)>placeholder",32,text,"$1")
	Return text
End Sub
```

再来说说韩文，本来我以为中日韩都是没有空格的，但发现韩语使用表音谚文书写，是有用空格来区分词语的。而且韩语的标点也都是英文标点，句子之间也有空格。那它就不属于词之间没有空格的语言。

但韩语的字数统计又是按字来算的，所以不能像其它有空格的语言那样直接根据空格进行split来统计字数。而是要去掉空格，统计字符数。

多语言的支持做到极致还是挺难的事情，而且我也不懂其它语言。阿拉伯语、希伯来语是从右往左书写的，我从来没有在计算机上处理过这类语言，BasicCAT便也不支持这两种语言。

# 更新

对于删去多余空格，我参考omegat的方法又进行了改进。需要根据句段分割标准，去除中文断句位置后面多余的空格。但有时候句子开头也会有多余空格，这时不清楚是不是要去除。我测试如果中文句子后面有一个空格，Trados会删去。但是如果有两个空格，两个都会被保留。其实大多数时候这些空格应该是删去的，但也不清楚是否有些文本会需要保留空格。于是我在BasicCAT的项目设置里添加选项，可以控制是否去除。

对应代码如下：

```vb
Sub removeSpacesAtBothSides(path As String,targetLang As String,text As String,removeRedundantSpaces As Boolean) As String
	readRules(targetLang,path)
	Dim breakPositionsMap As Map=getPositions("yes",previousText&text)
	Dim breakPositions As List
	breakPositions.Initialize
	For Each pos As Int In breakPositionsMap.Keys
		pos=pos-previousText.Length
		breakPositions.Add(pos)
	Next
	breakPositions.Sort(False)
	
	For Each position As Int In breakPositions
		Try
			Dim offsetToRight As Int=0
			For i=0 To Max(text.Length-1-position,0)
				If position+i<=text.Length-1 Then
					If text.CharAt(position+i)=" " Then
						offsetToRight=offsetToRight+1
					Else
						Exit
					End If
				End If
			Next
			Dim rightText As String
			If position+offsetToRight<=text.Length-1 Then
				rightText=text.SubString2(position+offsetToRight,text.Length)
			End If
			text=text.SubString2(0,position)&rightText
		Catch
			Log(LastException)
		End Try
	Next
	
	If removeRedundantSpaces Then
		text=Regex.Replace2("\b *\B",32,text,"")
		text=Regex.Replace2("\B *\b",32,text,"")
	End If
	previousText=text
	Return text
End Sub
```

# 12/18更新

关于从右至左（RTL, right to left）书写的阿拉伯语和希伯来语，我测试其实Windows可以自动帮我们处理。只要输入框里存在阿拉伯语，就会自动采用从右至左的模式。delete和backspace键是反的，复制粘贴是反的，输入的光标会一直在左端。

![](/album/basiccat/arabic.png)

# 2020/03/12更新

我完善了SRX算法后，空格和换行等信息会包含在后一个句子中，所以去除多余空格这一步需要将前一片段和后一片段合并后进行处理。

关于字数统计有一个标准[GMX-V](/GMX-V/)，但很多CAT软件都没有遵循。

# 2020/11/12更新

有阿拉伯译员反馈对阿拉伯语的支持不对。阿拉伯语需要右对齐显示。

1.9.2版本添加了这一支持。



