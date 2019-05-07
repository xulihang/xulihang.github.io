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

其实这里的原文也是可以改进的，memory比较短应该放在前面，time有修饰成分比较长应该放在后面。为了用好机器翻译，有时候得先做一些译前编辑。

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

## 注意漏译

神经网络模型存在漏译问题，主要是翻译过程提前终止。另外结果可能更“达”了，但却不“信”了：行文流畅了但意思变了。

## 注意语序的调整

机器翻译一般是直译，有时也会针对语序问题做调整。但较复杂的情况下，还是会存在问题。

原文：

> In written tests, PHL participants could write the codes for each letter of the alphabet with 98% accuracy versus 59% for control.

有道翻译：

> 在书面测试中，PHL参与者可以为字母表中的每个字母编写代码，准确率为98%，而对照组为59%。

原文中的could表示概率，不是能力。如果准确率放在后面，could的意思就变成了能力，表示参与者有能力编写代码，但实际意思应该是参与者编写代码的准确率是98%。

合适的翻译：

在书面测试中，PHL参与者可以98%的准确率为字母表中的每个字母编写代码，而对照组为59%。

## 编辑策略

* 先阅读机器翻译。MTPE是一种注重翻译效率的方法，随着机器翻译质量的提高，可以通过直接阅读机器翻译来了解原文内容，然后进行编辑。
* 注重内容的准确性，但不必进行过多润色。一般译后编辑项目，读者阅读的主要目的是获得信息，不必做精细的优化，只要保证术语一致、语句通畅、信息准确就行。
* 译文难以读懂时，选择从原文重新翻译。

## 相关资料：

* [TAUS译后编辑指南](https://www.taus.net/file-downloads/download?path=Articles%252Ftaus-cngl-machine-translation-postediting-guidelines.pdf)
* [TAUS译后编辑定价指南](https://www.taus.net/academy/best-practices/postedit-best-practices/pricing-machine-translation-post-editing-guidelines)
* [人工智能给翻译带来的便利和挑战 – 李长栓](http://ttv.cn/archives/3937)
* [Advice to freelance translators on MT post-editing projects](https://www.translationdirectory.com/articles/article2433.php)
