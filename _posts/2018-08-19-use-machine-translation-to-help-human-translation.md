---
date: 2018-08-19 16:53:50+08:00
layout: post
title: 使用机器翻译来辅助人工翻译
categories: 随笔
tags: CAT
---

机器翻译可以直接运用于以获取信息为目的，允许译文存在错误的场景。而对于要求较高的，比如出版物的内容的翻译，往往需要人工译者。

那么机器翻译可以给人工翻译提供什么帮助呢？

Philipp Koehn认为目前主要有两种模式[^pk]：译后编辑与交互式机器翻译。

# 译后编辑

给出机器翻译，由译员在此基础上进行修改，这叫做译后编辑模式。机器翻译可以让译员快速地了解原文的大致意思，如果结果不错，译员只需进行一点润色便可以完成翻译。

大多数CAT软件都支持调用机器翻译。在线CAT平台MateCAT，以译后编辑为主，并且除了机器翻译，还支持调用在线翻译记忆服务MyMemory进行辅助翻译。在创建项目时还需要选择领域，以利用针对性更强的资源。

![](/album/mt/matecat.png)

MateCAT还可以根据用户译后编辑的结果修改背后的机器翻译的模型参数，做增量式学习，这样一个机器翻译的错误被纠正后，下次就不用再纠正了。SDL Trados 2017的Adaptive MT功能和此类似。和MateCAT类似的国内CAT平台有yeekit。

但是机器翻译有时不能输出一个很好的句子结果，另外这种在机器翻译上修改的模式显得没有创造性。而译后编辑的模式也并不是一个很好的人机交互模式[^atanet]。于是就有了另一种模式。

# 交互式机器翻译

机器翻译系统根据用户输入的内容，提供翻译的建议，由用户选择是否采用，这叫做交互式机器翻译，或者叫交互式翻译预测。最早做出的项目是1997年的TransType，后来又涌现了CASMACAT、Forecat等交互式机器翻译系统。

## TransType

使用在线机器翻译的用户一般不知道统计式机器翻译系统可以生成一串备选翻译，TransType根据用户的输入对备选翻译列表进行筛选，得到合适的翻译建议。结果会以下拉列表的形式呈现。

![](/album/mt/transtype2.jpg)

SDL Trados的AutoSuggest提供了相似的功能，不过除了机器翻译，它还可以根据上下文、翻译记忆和定义的词典生成翻译建议。

![](/album/mt/autosuggest.jpg)

## CASMACAT

CASMACAT（Cognitive Analysis and Statistical Methods for Advanced Computer Aided Translation）[^casmacat]基于MateCAT开发。它使用了一个专门的统计式机器翻译系统，和翻译界面的耦合程度高。用户输入一部分翻译后（前缀），系统会给出一个机器翻译结果（后缀），单词还可以设置用颜色来表示置信程度。

![](/album/mt/casmacat-new.png)

CASMACAT可以记录用户的翻译过程，以便进行相关研究。

## Forecat

和CASMACAT与机器翻译相耦合的方式不同，又有人提出了一个以黑箱的方法利用机器翻译等双语资源的方法，开发出了Forecat这一软件。黑箱的方法更容易理解，运行成本低，可利用资源多，试验结果显示比CASMACAT这样的白箱方法效果更好。[^compare]

Forecat将原文拆分为若干片段，片段的最大长度可以定义，默认为4个词。然后，它使用机器翻译或者翻译记忆翻译这些片段，然后根据用户输入匹配译文片段。匹配译文开头时，如果开头一样，还要根据输入框中的位置和对应原文的位置进行排序。这样得到的片段会很多，很多距离较远的片段其实提供的参考价值更大，所以一般采用所处编辑位置最长和最短的片段。

建议以下拉列表的方式提供，默认显示4个建议。

Forecat使用Java编写，除了提供Web应用外，还可以集成到开源CAT工具OmegaT中使用。

![](/album/forecat.png)

## PTM

白箱式交互式机器翻译也在不断地完善中。斯坦福大学开发的预测型翻译记忆（Predictive translation memory, PTM）系统[^ptm]，基于混合主体（mixed-initiative）人机交互设计原则，在拥有之前的交互式翻译系统的特性的基础上上更加注重交互界面的设计。

比如它强调减少眼球的移动。传统的CAT工具都是采用的双栏表格形式，PTM使用的一行原文，一行译文相互交叉的模式。它认为分栏阅读时眼球移动的距离较大，而后者更加符合阅读习惯。因为原文和译文交叉，对于英语和法语这样都是由字母构成的语言不易区分，于是译文使用了等宽字体。

![](/album/mt/ptm.png)

上图是PTM的界面截图，A是原文，B是翻译了的整句，C是当前进行翻译的句子，如果原文的单词已经被翻译（通过词对齐实现），颜色会变为蓝色，D是翻译是用来给出建议的下拉列表，E是在输入框中给出的翻译。在原文的单词上悬停鼠标，还可以查看释义。

PTM对译者的帮助主要在三个方面：

1. 通过查词和显示已翻译的词，了解原文。
2. 给出粗略的机器翻译。
3. 利用下拉列表提供翻译的自动完成功能。

PTM还有一个特点是利用斯坦福的句法分析工具提取短语，以此来确定翻译建议的单元。

PTM的作者现已开办公司，推出了Lilt这一款商业化的计算机辅助翻译工具。

## Transmart

腾讯AI Lab的交互式机器翻译项目，目前提供一个在线翻译页面，融合辅助翻译输入法。

具体可以看黄国平博士在译直播上的讲座：[《译者与人工智能辅助翻译的约会 – 黄国平》](http://ttv.cn/archives/3951)

## BasicCAT

BasicCAT对原文做分词处理，并利用Stanford CoreNLP做句法分析以获得短语片段，提取出来的单词和短语会调用机器翻译进行翻译，在翻译时如果输入的内容有匹配，会以下拉列表的形式提示。

使用说明：[自动完成（交互式机器翻译）](http://docs.basiccat.org/zh_CN/latest/advancedFeatures.html#id16)

原理介绍：[BasicCAT开发笔记（九）：交互式机器翻译](/basiccat-developing-notes-9-interactive-machine-translation/)

# 结语

机器翻译主要通过直接提供译文或翻译建议，帮助用户了解原文，减少输入时敲击键盘的次数以提高翻译效率，实现人与机器合作完成翻译任务。

译后编辑与交互式机器翻译两种模式也并没有优劣之分，随着机器翻译质量的提高，两者的实用性都会大大加强。

另见：[机器翻译译后编辑注意事项](/attentions-of-machine-translation-post-editing/)

# 2019/05/26更新

机器翻译的使用带来了新的定价模式，比如有人提出按编辑距离计算价格。而很多人认为，既然是基于机器翻译完成的，应该打一个折扣。Lilt的CEO Spence Green认为[^green]，这样的话，技术是给译员增加了成本，让翻译变成血汗劳动。新的时代，我们需要探索合适的商业模型。

[^pk]: Computer Aided Translation[EB/OL]. https://www.microsoft.com/en-us/research/video/computer-aided-translation/, 2016/2018-8.19.
[^atanet]: Beyond Post-Editing: Advances in Interactive Translation Environments[EB/OL]. http://www.atanet.org/chronicle-online/?p=2448, 2016/2018-8.19.
[^casmacat]: Alabau V, Bonk R, Buck C, et al. CASMACAT: An Open Source Workbench for Advanced Computer Aided Translation[J]. The Prague Bulletin of Mathematical Linguistics, 2013, 100(1): 101-112.
[^compare]: Torregrosa D, Pérez-Ortiz J A, Forcada M L. Comparative Human and Automatic Evaluation of Glass-Box and Black-Box Approaches to Interactive Translation Prediction[J]. The Prague Bulletin of Mathematical Linguistics, 2017, 108(1): 97-108.
[^ptm]: Green S, Chuang J, Heer J, et al. Predictive translation memory: a mixed-initiative system for human language translation[A]. Association for Computing Machinery Symposium on User Interface Software and Technology[C], 2014: 177-187.
[^green]: THE RISE OF THE MACHINE: AI, ML, MT AND MORE[EB/OL]. https://trends2018.memoq.com/ai-ml-mt-and-more/, 2018/2019-5.26.
