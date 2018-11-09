---
date: 2018-11-09 21:00:50+08:00
layout: post
title: Unicode——最基础的翻译技术
categories: 技术随笔
tags: CAT
---

从前要在计算机上显示各种不同的语言，需要切换不同的编码。比如简体中文是GBK编码，繁体中文是Big5编码。如果把Big5编码的内容当作GBK编码来显示，就会出现乱码。一个经典的例子是《三国志曹操传》只在台湾引进，然后大陆的玩家在自己电脑上运行时会出现乱码，比如“瓣Ｂ变巨肚”。

后来便出现了Unicode，它是一个很大的字符集，可以显示全世界的语言。

关于ASCII、UTF-8、Unicode的关系，阮一峰的[文章](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)已经讲得很清楚了，我这里再用Python举例子。

接着上面曹操传的例子，我们看看变巨两个字对应的中文是什么。


```python
>>> '变'.encode('gbk') 将“变”转为gbk编码的字节，可以看到编码是B1E4
b'\xb1\xe4'
>>> b'\xb1\xe4'.decode('big5') 将编码B1E4以big5的编码显示
'曹'
>>> '巨'.encode('gbk')
b'\xbe\xde'
>>> b'\xbe\xde'.decode('big5') 
'操'
```

我们可以发现gbk编码中的变巨对应的是big5编码中的曹操。我们再来看看utf-8和unicode相关的操作

```
>>> '严'
'严'
>>> ord('严') 得到“严”的unicode的十进制编码
20005
>>> hex(ord('严')) “严”的unicode的十六进制编码
'0x4e25'
>>> int('4E25',16) 把十六进制文本转回十进制
20005
>>> chr(20005) 十进制unicode转回文本
'严'
>>>'严'.encode('utf-8') “严”的utf-8编码
b'\xe4\xb8\xa5'
```

更多参考Python的文档：<https://docs.python.org/3/howto/unicode.html>

除了编码，还要解决文字的显示问题。比如汉字文字众多，中日韩的汉字有重复，阿拉伯语是从右到左书写的等等。

这些技术是我们在计算机上进行翻译的基础。

## 编码的转换工具

libiconv是gnu开发的一个c的类库，可以在各种编码之间进行转换。

ICU，另一个为软件提供国际化的工具。BasicCAT用icu4j来识别和转换文件编码。


