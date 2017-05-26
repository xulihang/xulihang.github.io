---
date: 2016-11-25 21:45:50+08:00
layout: post
title: 给雪人CAT开发了款外挂
categories: 技术随笔
tags: B4J CAT
---
 
上一篇博文里已经讲到我选择了B4J加AutoitX库编写Windows程序。现在，我讲一下我给雪人CAT写外挂的事儿。

首先，因为雪人CAT免费版不支持标准tmx或通用的csv纯文本格式的记忆库和术语库的导出，这就限制了与其它软件互相交换翻译记忆和术语库的能力。同时，也不方便以后的查看和分析。

所以，我打算写外挂，直接从运行的窗体获得数据。

自动操作一般通过快捷键或模拟点击来实现。如果程序有设置快捷键，最好还是使用快捷键来控制。毕竟点击是要算坐标的，这样的话，不同的界面下，坐标可能无法使用。比如我对雪人CAT术语导出csv功能的实现上，一开始是用的controlClick函数，但会出现对同一术语栏多次点击的问题，同时，由于术语较多的列表会有滚动条，这样界面就会很复杂。同时不用注入等手段，不能控制第三方程序窗口的大小（如果固定大小，就不用担心分辨率不同造成的困扰）。

我花了一个下午实现了点击的方法，但不完美。我无意中发现可以用F2键激活术语栏的编辑状态，这样就可以和TAB键组合，通过纯快捷键的方法获取术语了。结果，十分钟就搞定了。

所以有时候多花点时间摸索比蛮干能有效得多。


再上点图，便于理解。

这是术语的管理界面，一大块DataGrid并不能直接获得数据

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/SCAT/info1.jpg)

激活了术语的编辑模式，可以获得数据。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/SCAT/info2.jpg)