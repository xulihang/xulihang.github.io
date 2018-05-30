---
date: 2018-05-22 10:24:50+08:00
layout: post
title: 在LaTeX中显示中文
categories: 技术随笔
tags: latex
---

国外的文献的latex模板一般都有自己的class文件，不能直接支持中文，也不能切换到ctex的class。可以用cjk宏包或ctex宏包来支持中文。

使用cjk加入以下代码，并用pdflatex编译：

```
\usepackage{CJK}
...
\begin{document}
\begin{CJK}{UTF8}{gbsn}
...
\end{CJK}
\end{document}
```


使用ctex加入以下代码，xelatex和pdflatex都可以用来编译：

`\usepackage[UTF8, scheme = plain]{ctex}`


