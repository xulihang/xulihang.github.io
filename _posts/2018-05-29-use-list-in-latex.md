---
date: 2018-05-29 10:08:50+08:00
layout: post
title: LaTeX中列表的使用
categories: 技术随笔
tags: latex
---

列表主要有无序列表、有序列表和定义列表，在tex中都有实现。

## 无序列表

```tex
\begin{itemize}
  \item This is the first item
  \item This is the second item
  \item This is the third item
\end{itemize}
```

* This is the first item
* This is the second item
* This is the third item


## 有序列表

```tex
\begin{enumerate}
 \item This is the first item
 \item This is the second item
 \item This is the third item
\end{enumerate}
```

1. This is the first item
2. This is the second item
3. This is the third item

## 定义列表

```tex
\begin{description}
  \item[概念] 概念用来描述某个概念或者总览信息，为读者提供背景知识。通常是简单的段落和无序列表。
\end{description}
```

概念
:  概念用来描述某个概念或者总览信息，为读者提供背景知识。通常是简单的段落和无序列表。

## 多级列表

tex中用多级列表比较麻烦，需要嵌套。

如下：

```tex
\begin{enumerate}
\item a
\item b
  \begin{enumerate}
    \item b.1
  \end{enumerate}
\item c
\end{enumerate}
```

我们可以用iitem宏包，以上列表可以这样写：

```tex
\begin{enumerate}
\item a
\item b
  \iitem b.1
\item c
\end{enumerate}
```

item可以变成iitem表示二级列表，ivtem表示四级列表。

## 自定义有序列表的编号

可以使用\renewcommand或者\def来重新定义\labelenum[i]（i的个数表示第几级列表）。更简单的方式是直接使用enumerate宏包：

```tex
\begin{enumerate}[1)]
\item The first item
\item The second item
\item The third item
\end{enumerate}
```

方括号中可以填A、a、I、i和1，对应latex中的\Alph、\alph、\Roman、\roman和\arabic。以上代码还添加了一个括号来修饰编号。
