---
date: 2018-10-15 16:05:50+08:00
layout: post
title: 在Office里运行的CAT软件
categories: 技术随笔
tags: CAT
---

Trados和Wordfast等CAT软件早期都是在Office界面里工作的，但后来都发展成了集成式的翻译环境。

现在还有用这种模式工作的CAT软件，如Felix、Anaphraseus。这些软件的用户喜欢能够在原来的软件界面里进行翻译，而不喜欢Trados这样用表格显示分割的文本的模式。毕竟，这样的方法更加直观，你可以直接看到最终翻译的结果。

Felix是c++写的一款CAT软件，从前是商业软件，后来作者因为身体原因，选择了开源。

下面讲一下Felix翻译Word文件的方法。

首先打开Felix，然后打开要翻译的Word文件。

在工具栏里点加载项，可以看到felix的操作菜单和快捷按钮。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/CAT/felix-toolbar.png)

平时翻译的话，点Look up the next，会寻找当前光标到下一个句子结束位置的内容，然后在felix的翻译记忆和术语窗口中显示匹配的内容。用翻译覆盖之前选中的原文，然后点Set And Next就会自动保存翻译记忆，并跳转到下一句。如果使用匹配翻译记忆覆盖，则选择Get And Next。

在Word中选中原文，然后可以添加术语。匹配的术语可以用快捷键ALI+数字来调用。下图使用时的截图。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/CAT/felix.png)

总的来说，Felix的设计主要是为了译员能够使用翻译记忆并管理术语。虽然下一句，保存翻译记忆的操作挺麻烦，但熟悉快捷操作后效率还是不错的。

下面说说这种模式的缺点吧：

* 依赖于Office这样的软件
* 依赖快捷键提高效率，要记的快捷键还比较多
* 自动化程度不高
* 没有自己的编辑界面，扩展性不佳
* 不能跨平台





