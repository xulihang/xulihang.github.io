---
date: 2018-05-22 17:37:50+08:00
layout: post
title: 在TeX中插入图片
categories: 技术随笔
tags: latex
---

latex中主要使用graphicx包插入图片，通过`\usepackage{graphicx}`代码使用。不过我测试时发现有的latex的class文件里有说使用这个包，tex文件里就不需要再申明了。默认支持常见图片格式的插入，jpg、png都是支持的，不需要转成eps或pdf。

可以直接通过以下代码插入图片：

`\includegraphics{fig.png}`

完整的命令是这样的：`\includegraphics*[key val list]{file}`，可以再设置参数，具体可以在CTAN上查阅graphicx的文档：[graphicx – Enhanced support for graphics](https://www.ctan.org/pkg/graphicx)。graphicx的功能不只插入图片，文档里对应的标题是*Including Graphics Files*。

如果我们要引用指定文件夹的图片，就要用到`\graphicspath{dir-list}`，比如`\graphicspath{\{images/\}}`。注意路径是一个文件夹组的列表，需要用花括号括起来。

我们这样插入的图片是插在行内的，也没有什么其它的设置，比如居中、设置图表题注。这时我们要用到figure环境。完整例子如下:

```
\begin{figure}[htbp] %设置浮动属性，一般需要float宏包。不设的话，图片可能会出现在页面的顶部，而不是在文字后面。
  \centering %居中
  \includegraphics[width=4in]{image002.png} %设置宽度，一般a4纸是8inch。这里的单位也可以用cm等其它latex支持的。
  \caption{Translation Competence} %caption是图片的标题
  \label{img2} %此处的label相当于一个图片的专属标志，目的是方便上下文的引用。可以用\ref{img2}来进行交叉引用，注意在引文中只是显示了一个第几张图片这个数字，还要自己在正文中补充其它内容。
\end{figure}
```

关于[htbp]这个浮动设置里几个字母的含义，可以在CTAN上查看float的文档，以下是查到的解释：

```
t Top of the page 
b Bottom of the page 
p Page of ﬂoats 
h Here, if possible 
H Here, deﬁnitel
```

好了，一般的图片插入应该没有问题了。




