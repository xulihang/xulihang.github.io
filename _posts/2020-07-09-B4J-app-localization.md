---
date: 2020-07-09 14:07:50+08:00
layout: post
title: B4J应用本地化
categories: 技术随笔
tags: 
---

软件本地化的实现其实不是件难事。比如对于以下代码：

```vb
fx.MsgBox(MainForm,"Message","Title")
```

需要处理的是"Message"和"Title"，我们可以做一个表，包含三列内容，ID、英文文本和译文文本，表头的语言代码遵循ISO标准。

```
id, en, zh
msgbox.message, Message, 信息
msgbox.title, Title, 标题
```

将数据以id为键，所需显示的语言的数据为值读入字典。构建一个函数通过查询ID来得到用于显示的文本，可用于封装代码中需要翻译的文本。

函数：

```vb
Sub Localize(id as String) as String
    return strings.Get(id)
End Sub
```

用函数包裹文本后的代码：

```vb
fx.MsgBox(MainForm,Localize("Message"),Localize("Title"))
```

Java使用Resource Bundle实现这一功能，在B4X中则是Localizator。Localizator的示例中使用具体语言的文本作为键。

我针对B4J应用对Localizator做了功能加强。

1. 自动导出和导回所有布局文件和代码中的文本，支持多种控件
2. 针对控件中文字因为空间不足而无法显示完整的问题，自动添加Tooltips。当然，最好的办法还是不同的语言使用不同的布局文件，可以调整控件的位置以及文本的字体。

具体说明我发布在此处：[Localization Practices](https://www.b4x.com/android/forum/threads/localization-practices.119940/)














