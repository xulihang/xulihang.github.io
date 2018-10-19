---
date: 2018-06-05 17:21:50+08:00
layout: post
title: Sphinx生成PDF文档
categories: 技术随笔
tags: 技术写作
---

Sphinx是将rst文件转为latex文件以生成pdf的，装好latex后，在项目目录下运行make latexpdf就可以生成了。

以下是我总结的注意事项，主要是conf.py的修改：

* 修改latex_elements里的preamble，添加ctex或者cjk宏包可以支持中文。
* 修改language可以更改默认的语言，在生成的tex文件中会使用renewcommand修改原来的日期等信息为对应语言的。但默认中文的章节名没有得到更改，可以用以下代码不显示英文的Chapter。注意latex里有很多斜杠，在python中需要在引号前加r以避免转义。

```python
'preamble': r'''
\addto\captionsenglish{\renewcommand{\chaptername}{}}
\usepackage[UTF8, scheme = plain]{ctex}
''',
```

另外还有和readthedocs的结合的问题。readthedocs默认使用的pdflatex来编译文档，conf.py中修改了latex_engine为xelatex也没有效果。使用ctex宏包会提示错误，还是需要使用cjk宏包。

readthedocs默认使用的python2，在配置文件中写中文需要在引号前加u。当然可以切换为python3。

参考：[解决在readthedocs编译PDF含中文的问题](https://www.kawabangga.com/posts/2331)

