---
date: 2019-10-05 16:00:50+08:00
layout: post
title: 平行文本对齐
categories: 技术随笔
tags: 
---

平行文本，指存在对应关系的原文及其译文。

平行文本对齐，主要是将对齐的粒度细化。比如原来是篇章对齐，现在要进一步对齐到段落、句子甚至是单词。

文本对齐可以基于各种信息，比如以一行原文、一行译文保存的Word文档，可以比较容易地基于这一特点做段落对齐。比如漫画，文字是存在于气泡中的，对齐文本相当于对齐气泡。比如字幕，句与句之间一般有时间间隔，可以根据时间轴信息做句子的划分。

下面再讲一下句对齐。

Gale & Church 算法[^Gale]假设文本已经做好了段落对齐，原文句子和译文句子存在6种对应关系，增加、对应、删除、一对二、二对一。这就类似于编辑距离的计算，两个文本之间有增加、替换和删除三种关系。该算法主要根据句子长度来确定转换关系。具体的介绍可以看[此文](http://mttalks.ufal.ms.mff.cuni.cz/index.php?title=Sentence_Alignment)。

[hunalign](http://mokk.bme.hu/en/resources/hunalign/) 对齐工具使用了上述算法，并且结合了词典信息，它有一个桌面版的前端叫做[LF Aligner](http://sourceforge.net/projects/aligner/)。

[Bleualign](https://github.com/rsennrich/Bleualign)借助机器翻译的结果进行对齐。使用机器翻译的目的是用目标语表示原文的大概意思，然后和译文进行比较（通过修改版的bleu得分）。

另外还可以参考特殊字符，可以当做对齐时用的锚点，比如各种数字。

实际任务中使用得多的常见工具：

* SDL WinAlign（内置在Trados里）
* ABBYY Aligner
* TMXMall
* 雪人CAT
* OmegaT（内置了对齐工具，使用维特比算法和前向-后向算法）
* BasicCAT Aligner

我写的BasicCAT的对齐工具原理很简单，首先进行段落对齐，然后根据SRX断句规则进行断句，如果段落的句子数量不一致，就用空白片段填补。提供手动调整的功能。

再讲下短语和词的对齐。这通常用于统计式机器翻译当中。它一般使用的无监督机器学习的方法，通过观察文本，得出词之间的概率关系。[^wiki]


[^Gale]: William Gale, Kenneth Church. A Program for Aligning Sentences in Bilingual Corpora 
[^wiki]: <https://en.wikipedia.org/wiki/Bitext_word_alignment>
