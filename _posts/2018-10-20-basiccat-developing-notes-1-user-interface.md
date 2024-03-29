---
date: 2018-10-20 10:11:50+08:00
layout: post
title: BasicCAT开发笔记（一）：用户界面
categories: 技术随笔
tags: CAT
---

编写CAT软件，首先要考虑一个界面的设计，然后进行功能上的实现。

以下是目前设计的一个界面。

![](/album/basiccat/main.png)

左边是项目区，中间是编辑区，右边是术语区。下方是提供翻译记忆、片段搜索等功能的区域。最下面有状态栏，最上面有菜单栏。

### 项目区

项目区是一个TreeTableView，可以在此给项目添加或删除文件，查看翻译记忆、术语库，查看项目统计信息，查看预览等。

### 编辑区

编辑区是一个customlistview，每个列表项是一对textarea，左边原文，右边译文。

因为编辑区要加载成千上万的片段，为了加载不卡顿，需要使用一个延迟加载的技术。即只填充可见区域的列表项，如果区域不可见，就把上面的控件删除，以节约内存，加快加载速度。不可见的列表项需要设置一个高度，使得滚动条的长度大致符合加载全部片段时的长度。

平时翻译的操作都会修改segment这一列表全局变量，编辑区只是把可见区域的片段的内容从segment中读取出来并进行修改。

另外，输入框要能根据文本的长度自动调整自己的高度。所以每次用户输入内容，或者调整窗口，都需要计算适合的文本高度。

编辑区承担了主要的翻译交互。用户可以选中原文的单词查看释义，并添加术语。在输入时，还会根据输入的内容提供翻译建议。翻译完后，如果有错误还会弹出提示。这些主要是利用contextmenu实现的。contextmenu继承自javafx的popup类，，会出现一个下拉列表一样的东西，符合此类操作的需要。

### 术语区

术语区主要是显示术语的，比较简单，由一个listview来显示匹配的术语，然后下方可以添加术语。编辑区选中的词会自动填入输入框。

### 翻译记忆等功能区

该区域左边是一个webview，用于显示匹配的翻译记忆和原文的不同，同时也便于查看结果。

右边是一个TabPane，平时以TableView表格的形式展示翻译记忆、片段搜索的结果。也可以点击右边的按钮切换，用WebView或TextView显示文字，这样文字字体更大，片段搜索的内容还可以高亮，便于查看。

### 状态栏

状态栏主要显示进行了什么操作，当前片段的序号等信息。

以上便是主界面的设计。界面很大程度上参考了雪人CAT，主要也是我已经习惯了雪人这种简单的界面风格。

上述各功能区都是基于SplitPane进行分割的，可以自由调整宽度。我并没有采用dockable windows这样更自由的设计，也是splitpane更为简单，功能基本够用了。

界面和功能都是紧密关联的，更具体的细节还是在分功能的笔记中讲吧。





