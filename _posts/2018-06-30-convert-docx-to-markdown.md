---
date: 2018-06-30 14:26:50+08:00
layout: post
title: 转换Word文档为Markdown
categories: 技术随笔
tags: CAT
---

之前尝试将word转latex，因为latex比较复杂，较难处理。这次转markdown，则相对顺利许多。

需要在转换的基础上在做一些查找替换操作。

1. 图片

将docx文件另存为网页，可以得到包含图片的文件夹，图片以image序号.png命名。而pandoc生成的markdown代码如下：

```
![](media/image23.png){width="" height=""}
```

需要用正则来进行下处理，去掉设置宽高的部分并设置正确的文件路径。pandoc转换生成的markdown有时候会在宽高部分的代码处换行，我们用notepad++处理的话要选择匹配新行。同时要使用非贪婪模式。

去掉宽高：

```
\{width=.*?\}
```

替换image1.png->image0，这里用到了分组。括号内是分组一，然后替换时保留分组内的序号，用\1表示。以下例子替换序号是个位的，两位的话要再修改下：

```
find: image(.?).png
replace: image00(\1).png
```




