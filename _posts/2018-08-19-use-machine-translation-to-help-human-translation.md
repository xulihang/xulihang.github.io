---
date: 2018-08-19 16:53:50+08:00
layout: post
title: 使用机器翻译来辅助人工翻译
categories: 随笔
tags: CAT
---

机器翻译可以直接运用于以获取信息为目的，允许译文存在错误的场景。而对于要求较高的，比如出版物的内容的翻译，往往需要人工译者。

那么机器翻译可以给人工翻译提供什么帮助呢？

Philipp Koehn认为目前主要有两种模式[^pk]：

# 译后编辑

给出机器翻译，由译员在此基础上进行修改，这叫做译后编辑模式。机器翻译可以让译员快速地了解原文的大致意思，如果结果不错，译员只需进行一点润色便可以完成翻译。

大多数CAT软件都支持调用机器翻译。在线CAT平台MateCAT，以译后编辑为主，并且除了机器翻译，还支持调用在线翻译记忆服务MyMemory进行辅助翻译。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/mt/matecat.png)

但是译后编辑的模式往往使得翻译工作更加无聊与繁琐。机器翻译常常不能输出一个很好的句子，而且这种在机器翻译上修改的模式显得没有创造性，有可能翻译速度和质量都因此下降。而且译后编辑的模式并不是一个好的人机交互模式[^atanet]。于是就有了另一种模式。

# 交互式机器翻译

机器翻译系统根据用户输入的内容，提供翻译的建议，由用户选择是否采用，这叫做交互式机器翻译。最早做出的项目是1997年的TransType，后来又涌现了Caitra和CASMACAT等交互式机器翻译系统。

使用在线机器翻译的用户一般不知道统计式机器翻译系统可以生成一串备选翻译，TransType根据用户的输入对备选翻译列表进行筛选，得到合适的翻译建议。结果会以下拉列表的形式呈现。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/mt/transtype2.jpg)

SDL Trados的AutoSuggest提供了相似的功能，不过除了机器翻译，它还可以根据上下文、翻译记忆和定义的词典生成翻译建议。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/mt/autosuggest.jpg)

Casmacat的特点是机器翻译可以根据用户的操作不断学习完善。它使用了一个专门的统计式机器翻译系统，和翻译界面的耦合程度高。用户输入翻译后（前缀），系统会给出一个机器翻译结果（后缀），单词还会以颜色来表示置信程度。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/mt/casmacat.jpg)

和Casmacat与机器翻译相耦合的方式不同，又有人提出了一个以黑箱的方法利用机器翻译等双语资源的方法，开发出了Forecat这一软件。

Forecat将原文拆分为若干片段，片段的最大长度可以定义，默认为4个词。然后，它使用机器翻译或者翻译记忆翻译这些片段，然后根据用户输入匹配译文片段。匹配译文开头时，如果开头一样，还要根据输入框中的位置和对应原文的位置进行排序。这样得到的片段会很多，很多距离较远的片段其实提供的参考价值更大，所以一般采用所处编辑位置最长和最短的片段。

建议以下拉列表的方式提供，默认显示4个建议。

Forecat使用Java编写，除了提供Web应用外，还可以集成到开源CAT工具OmegaT中使用。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/forecat.png)


机器翻译辅助人工译员，主要还是通过让译者迅速了解原文、减少敲击键盘次数以提高翻译效率。但对于提高翻译质量，目前还没看到太多的研究。



[^pk]: Computer Aided Translation[EB/OL]. https://www.microsoft.com/en-us/research/video/computer-aided-translation/, 2016/2018-8.19.
[^atanet]: Beyond Post-Editing: Advances in Interactive Translation Environments[EB/OL]. http://www.atanet.org/chronicle-online/?p=2448, 2016/2018-8.19.