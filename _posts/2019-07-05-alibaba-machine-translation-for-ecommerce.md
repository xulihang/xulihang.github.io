---
date: 2019-07-05 20:32:50+08:00
layout: post
title: 专用于电商的阿里机器翻译
categories: 技术随笔
tags: CAT
---

阿里的各种服务基本都是和电商挂钩的，它推出的机器翻译API就针对电商做了定制。

电商翻译常见的类型就是标题的翻译，比如这个：森马夏季短袖T恤女甜美撞色chic韩版娃娃领学生Polo衫糖果色百搭T。图片如下：

![](/album/ecommerce/semir-t-shirt.jpg)

我们分析下标题，会发现标题其实是由很多的关键词堆砌而成的，以上标题可以拆分成如下的短语：

```
森马
夏季
短袖
T恤
女
甜美
撞色
chic
韩版
娃娃领
POLO衫
糖果色
百搭T
```

那么标题的翻译主要的考验就是分词和构建对应的词典。这一任务其实不用神经网络，单纯用规则的方法也可以有比较好的效果。阿里就提供了自定义词典的接口。

现在我们来比较一下几家机器翻译的结果：

阿里电商：

> Semir Summer Short Sleeve T-shirt Female Sweet Contrasting Color Chic Korean-Style Peter Pan Collar Students Polo Shirt Candy-Colored Versatile T

阿里通用：

> Samma summer short-sleeved T-shirt female sweet hit color chic Korean version of the baby collar student polo shirt candy color Wild T

百度：

> Sunma Summer Short-sleeved T-shirt Woman Sweet Colour Chic Korean Doll Collector Student Polo Shirt Candy T-shirt

谷歌：

> Senma summer short-sleeved T-shirt female sweet contrast color chic Korean version of the doll collar student Polo shirt candy color wild T

有道：

> Summer sema short sleeve T shirt girl sweet contrast color chic han doll led students Polo shirt candy color joker T

搜狗：

> Senma summer short sleeve T-shirt female sweet contrast color chic Korean doll collar student Polo shirt Candy-colored Joker T

腾讯：

> Samma summer short-sleeved T-shirt sweet impact chic Korean doll collar student Polo shirt candy color T-shirt

IBM Watson：

> Senma summer short-sleeved T-shirt female sweet chic chic Korean version doll collar student Polo shirt candy color T-T T

一些常见的词，基本都能翻译出来，比如短袖、T恤、POLO衫等等，有一些针对服装设计的词，比如撞色（contrast color），有部分机器翻译没翻译出来，而森马这类专有名词则只有阿里电商翻译正确。

另外一些我自己也不太熟悉的表达，比如糖果色、娃娃领。

查了下娃娃领也叫彼得潘领，但不知道英文中是不是也有两种叫法，比如doll collar和Peter Pan Collar这两种。我在亚马逊检索Peter Pan Collar可以找到类似的内容，比如这条：[Allegra K Women's See Through Contrast Peter Pan Collar Lace Top ](https://www.amazon.co.uk/Allegra-Womens-Through-Contrast-Collar/dp/B01JGMJ7GU/ref=sr_1_10?keywords=peter+pan+collar+t+shirt&qid=1562330431&s=clothing&sr=1-10)

![](/album/ecommerce/Allegra-K-peter-pan-t-shirt.jpg)

当我检索doll collar时结果却很少，看来Peter Pan Collar是合适的翻译。

综合比较下来，的确阿里的电商版本效果最好。不过可能是我选择的标题关系。

针对特定领域的机器翻译现在看来还是非常有用的，因为不同领域，各种句式、用词都会不同，使用针对性的方法可以改善结果。

另外，机器翻译API一般只提供一个结果，其实一个中文词可能包含多个外文词表达的意思。比如露肩，我知道翻译为cold shoulder，但发现阿里翻译成了off-the-shoulder，我以为是翻错了，但仔细一想这个意思也是对的，而且能在亚马逊上搜索到。搜索了下图片，发现off-the-shoulder是没有肩带的，相当于中文的一字肩。而cold shoulder暂时没有找到更精确的中文翻译。

再提一下阿里机器翻译的接入。虽然提供的sdk很方便，但是BasicCAT的插件不能直接引用jar，于是我就自己写代码实现。但自己看文档写调用比较复杂，主要一点是签名的问题，是我除了亚马逊之外碰到的第二复杂的。以后碰到这种我还是偷个懒，放弃插件的方式，直接把SDK引入主程序里使用吧。



