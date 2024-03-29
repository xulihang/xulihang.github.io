---
date: 2019-05-24 09:21:50+08:00
layout: post
title: 翻译中用到的Office技巧
categories: 技术随笔
tags: CAT
---

最近接到的很多翻译任务，都使用了一些Office的技巧，还是挺有想法的，我这里整理一下。

## Excel的vlookup

vlookup是Excel中的一个常用函数，它的语法规则如下：

`VLOOKUP(lookup_value,table_array,col_index_num,range_lookup)`

它可以查询某个值在另一张表中对应的内容。比如在sheet1中有需要翻译的内容，第一列是原文，第二列是译文：

```
原文	译文
word	（待翻译）
book	（待翻译）
```

sheet2里有之前的翻译记忆：

```
原文	译文
word	单词
text	文本
```

使用以下公式可以找到word这个词在翻译记忆表格中是否有完全匹配，有则进行填充，无则显示#N/A错误：

`VLOOKUP(A2,Sheet2!A:B,2,FALSE)`

更多见微软的文档：[VLOOKUP function](https://support.office.com/en-us/article/VLOOKUP-function-0BBC8083-26FE-4963-8AB8-93A18AD188A1)

## 制作Word双语段落对照

很多时候项目要求提交双语对照的内容，但是Trados没有提供这一功能（虽然内部有开发双语合并工具），于是有人想出来了利用Trados可以不处理Word的隐藏文本来制作双语段落对照的方法。

选中文本设置隐藏的方法有很多，比如设置特殊格式，制作表格等等。

我这里讲一下表格的方法，在交给译员翻译之前需要做的处理。

1. 选中文本，点击插入-表格-文本转换成表格，选择1列，文字分割位置为段落标记。
2. 插入第一列的内容，可以生成第二列，两列文本相同。设置第一列文本为隐藏文本。
3. 点击表格-布局-转换为文本，文本分隔符是段落标记。

这样，译员翻译好后生成文档，再把隐藏的原文取消隐藏，就可以得到双语段落对照。

当然，这是不能修改CAT工具时的一种workaround。其实完全可以处理xliff文档，把每个trans-unit标签下target标签的内容替换为原文+译文。

## 只翻译Excel表格中需要翻译的行与列

有时候，Excel表格只需要翻译部分行与列，比如一张中英数据混杂的表格，可能只需翻译表头，不用翻译其它内容。

这时我们可以把不需要翻译的行与列设置隐藏。

测试Okapi Rainbow是支持这一操作的，除此之外，也可以在Rainbow的Filter设置的Excel部分选择是否翻译表名、哪些前景色的文字需要排除，哪些行与列需要排除。

