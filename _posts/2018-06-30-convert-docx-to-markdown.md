---
date: 2018-06-30 14:26:50+08:00
layout: post
title: 转换Word文档为Markdown
categories: 技术随笔
tags: CAT
---

之前尝试将word转latex，因为latex比较复杂，较难处理。这次转markdown，则相对顺利许多。

使用以下代码转换docx为md：

```
$ pandoc 1.docx -o out.md
```

需要在转换的基础上在做一些查找替换操作。

我的情况，主要需要改的是图片部分。

将docx文件另存为网页，可以得到包含图片的文件夹，图片以image序号.png命名。而pandoc生成的markdown代码如下：

```
![](media/image23.png){width="" height=""}
```

需要用正则来进行下处理，去掉设置宽高的部分并设置正确的文件路径。pandoc转换生成的markdown有时候会在不该换行的地方换行，好在markdown是用空行来区分段落的。我们用notepad++处理的话要选择匹配新行。同时要使用非贪婪模式。

去掉宽高：

```
\{width=.*?\}
```

替换image1.png->image0，这里用到了分组。括号内是分组一，然后替换时保留分组内的序号，用\1表示。以下例子替换序号是个位的，两位的话要再修改下：

```
find: image(.?).png
replace: image00(\1).png
```

有的图片是从excel直接复制过来形成的，另存为时会被保存为emf格式，需要进行下格式转换。

转换的结果是这篇文章：[面向本地化工程师的开源CAT工具教程](http://blog.xulihang.me/guide-of-open-source-cat-tools-for-localization-engineers/)

处理后的md也可以再转回docx，图片和基本的结构都是对的：

```
pandoc out.md -o out.docx
```




