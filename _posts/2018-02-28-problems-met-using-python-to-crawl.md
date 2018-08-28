---
date: 2018-02-28 11:50:50+08:00
layout: post
title: 写爬虫遇到的一点问题
categories: 技术随笔
tags: 
---

最近吴语学堂改版了，主页变成一个简单的form，可以查询字音。各地的字音汇总在一起。我便想做一个包含吴语各地字音的mdx文件。

我用rime提供的吴语码表作为查询的单字的来源。获取这些字音后其实再做一个rime的拼音方案是可行的。

我用python requests下载失败，之后使用python2+urllib2解决了。获得的数据经过gzip压缩的话还要解压，不过可以修改Accept-Encoding控制直接获得文本。requests失败后测试用fiddler是正常的，本来以为是没有定义好header。第二天才发现是requests的参数写错了，post和get的参数不一样，一个是params，一个是data。之后测试成功，requests的高度封装的一个好处是可以直接解压gzip的结果。

还有一个问题是在windows上的编码问题，在cmd里如果设置代码页为utf-8，直接输入的汉字编码有问题，还是要用默认的gbk代码页。所以开python交互界面调试时一不小心就会陷入坑里。

用python和b4x的一个差别就是前者我倾向于直接使用网上提供的代码，而后者我会先找到官网论坛的tutorial，把每行代码都研究清楚。而b4x的ide也的确更加智能，看来我要换一个python ide了，自带的idle不够智能。