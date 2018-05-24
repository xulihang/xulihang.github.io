---
date: 2018-05-24 22:34:50+08:00
layout: post
title: 尝试将word自动转为latex
categories: 技术随笔
tags: latex
---

我的毕业论文用word的写的，标题的样式、列表都设置得很清楚。想想可以利用pandoc可以把word转为latex。

但是有挺多多余的标签

比如这个二级标题：

`\hypertarget{cat-tools}{\subsubsection{CAT Tools}\label{cat-tools}}`

我们可以用正则把不需要得部分去掉，但是latex的语句和正则表达式有很多重合的符号，需要进行转义，比较麻烦。

`\\hypertarget\{.*?\}`

再比如这个endnote插入的参考文献的域代码：

`\textsuperscript{{[}\protect\hyperlink{_ENREF_37}{37}{]}}`


正则匹配：`\\textsuperscript\{\{\[\}\\protect\\hyperlink\{_ENREF_.*?\}\{(.*?)\}\{\]\}\}`

替换：`\\citep\{RN\1\}`

然后还有插入的图片和其题注，也是一个问题。列表倒生成得很好。

想想太麻烦，还是直接从word里复制内容到tex编辑器里省事。