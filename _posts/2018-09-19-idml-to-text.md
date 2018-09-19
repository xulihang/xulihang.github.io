---
date: 2018-09-19 16:30:50+08:00
layout: post
title: 导出IDML格式的InDesign文件为文字
categories: 技术随笔
tags: 出版 CAT
---

使用InDesign导出文件为HTML可以取得文字。不过，为了能直接修改IDML文件，我研究了如何用B4J编写程序进行转换。

步骤如下：

1、选择IDML文件路径，复制IDML文件到工作目录，然后进行解压。
2、利用xml2map将xml文件转换为map。xml2map是Erel写的基于XmlSax的解析库。
3、首先解析designmap.xml，获得spreads列表。
4、获取spreads列表后，进一步获取每个TextFrame元素（注意有的TextFrame内嵌在别的元素里），并根据ItemTransform的坐标信息进行排序。X坐标小于0的是左边页，大于0的是右边页，然后再比较Y坐标，Y坐标越小，它排的顺序越靠前。这里因为涉及对二维坐标排序，比较麻烦一点，我使用了冒泡排序，然后对原来比较数字大小的部分写了一个函数。
5、对TextFrame进行排序后，再读取对应的story文件。有的TextFrame彼此是链接在一起的，他们的ParentStory属性是一样的，这时需要删除后面的那个story。
6、story读取时，处理content里的内容，还要处理换行等问题。最后生成的文本也要再进一步去除多余的空行和空格。
7、为了方便，我还加上了页码信息。

最后生成类似这样的结果：

```
Page 1
The Real Science of
Supers

A Discovery Book

Page 2
Foreword
To me, The Incredibles has always been about nostalgia.
```
