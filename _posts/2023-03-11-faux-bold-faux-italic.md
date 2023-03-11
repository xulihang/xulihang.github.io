---
date: 2023-03-11 15:46:50+08:00
layout: post
title: 仿粗体与仿斜体
categories: 技术随笔
tags: B4J
---

打开Word，在字体设置功能区里，我们可以轻松地设置文字字体为粗体、斜体，并执行添加下划线、设置颜色等操作。

![word](/album/font/word.jpg)

但实际上，很多字体并不支持设置斜体和粗体，比如绝大多数的汉字字体是没有斜体的。这里能设置斜体，是Word自身的富文本功能可以通过软件算法去模拟斜体效果。

这样的功能在Photoshop中叫做仿斜体(faux bold)和仿粗体(faux italic)。用于字体不支持粗体斜体时模仿粗体斜体的效果。

那什么时候需要用到粗体斜体呢？比如用于漫画翻译嵌字。虽然汉字没有斜体，但我们在翻译美漫的时候，为了实现异化的目的，可以沿用美漫中的用于表示突出和强调的粗斜体。

我们可以基于JavaFX的Text组件去实现仿斜体和仿粗体，这里用B4J代码示例。

仿粗体通过设置描边来实现：

```vb
Dim text as string = "文本"
Dim item As JavaObject
item.InitializeNewInstance("javafx.scene.text.Text", Array(text))
item.RunMethod("setStroke",Array(fx.Colors.Black))
item.RunMethod("setStrokeWidth",Array(0.5))
```

仿斜体通过设置透视变换来实现，它需要定义变换后四个坐标点的x、y的位置，数值是与原来坐标的差值：
```vb
Dim text as string = "文本"
Dim item As JavaObject
item.InitializeNewInstance("javafx.scene.text.Text", Array(text))
Dim TR As JavaObject
TR.InitializeNewInstance("javafx.scene.effect.PerspectiveTransform",Null)
TR.Runmethod("setUlx",Array(2.0))
TR.Runmethod("setUly",Array(0.0))
TR.Runmethod("setUrx",Array(width + 2))
TR.Runmethod("setUry",Array(0.0))
TR.Runmethod("setLrx",Array(width))
TR.Runmethod("setLry",Array(height))
TR.Runmethod("setLlx",Array(0.0))
TR.Runmethod("setLly",Array(height))
item.RunMethod("setEffect", Array(TR))
```

最后的效果如下：

![textflow](/album/font/textflow.jpg)




