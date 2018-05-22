---
date: 2018-05-22 12:42:50+08:00
layout: post
title: TeX在参考文献中引用网页
categories: 技术随笔
tags: latex
---

一般的参考文献，期刊论文(article)、专著(book)、会议论文(inproceedings)等都有对应的存储格式，而网页就没有专门的格式了。

我们需要使用misc，例子如下：

```
@misc{RN16,
  author = {Zanettin, Federico},
  year = {2000},
  url = {https://www.researchgate.net/publication/243771074_DIY_Corpora_the_WWW_and_the_Translator},
  urldate = {March 9, 2017},
  title = {DIY Corpora: the WWW and the Translator}
}
```

把misc换成article其实也可以用，不过生成时会报错，显示没有包含journal的名字。

因为包含了url，我们还要使用url宏包（\usepackage{url}），否则会生成失败。

最后生成的结果如下：

```
Zanettin, F. (2000). Diy corpora: the www and the translator. Retrieved March 9, 2017, from https://www.researchgate.net/publication/243771074_DIY_Corpora_the_WWW_and_the_Translator 
```

以上内容主要参考了[Problems with website formatting in apacite's reference page](https://tex.stackexchange.com/questions/170226/problems-with-website-formatting-in-apacites-reference-page)，另外还有一篇[How can I use BibTeX to cite a web page?](https://tex.stackexchange.com/questions/3587/how-can-i-use-bibtex-to-cite-a-web-page)中提到了wikipedia提供的bibtex引用方法，但是和apa格式不符合。