---
date: 2019-04-28 21:09:50+08:00
layout: post
title: 机器翻译译后编辑注意事项
categories: 随笔
tags: 
---

因为机器翻译的应用，会出现以往人直接翻不会出现的一些问题，需要特别注意。

很多时候机器对原文存在理解问题，这时需要发挥人的智慧，理清原文的结构，理解原文的正确意思并用目的语表达出来。

我会把平时翻译中碰到的值得注意的地方整理到这里。

## 注意搭配关系

比如以下的机器翻译对原文的动宾搭配存在理解错误。

原文：

> reduce time taken to execute the network and memory

百度翻译：

> 减少执行网络和内存所需的时间

这里execute的宾语是network，不包括memory。memory是reduce的宾语。另外，直接翻译为减少内存不符合中文表达，改为减少内存占用。

合适的翻译：

减少执行网络所需的时间和内存占用

其实这里的原文也是可以改进的，memory比较短应该放在前面，time有修饰成分比较长应该放在后面。

## 注意一词多义

原文：

> Ensure you have enough processing and storage capacity

百度翻译：

> 确保您有足够的处理和存储容量

capacity一词多义，有能力和容量这两种意思，放在processing和storage后面没有问题。但翻译到中文需要进行区别。

合适的翻译：

确保您有足够的处理能力和存储容量

类似的还有do、make、improve这类含义宽泛的词。

可以用机器翻译翻译一下这句话试试：improving latency and efficiency，是不是结果存在词语搭配的问题。



