---
date: 2019-10-05 16:00:50+08:00
layout: post
title: 平行文本对齐
categories: 技术随笔
tags: 
---

平行文本，指存在对应关系的原文及其译文。

平行文本对齐，主要是将对齐的粒度细化。比如原来是篇章对齐，现在要进一步对齐到段落、句子甚至是单词。

文本对齐可以基于各种信息，比如以一行原文、一行译文保存的Word文档，可以比较容易地基于这一特点做段落对齐。比如漫画，文字是存在于气泡中的，对齐文本相当于对齐气泡。比如字幕，句与句之间一般有时间间隔，可以根据时间轴信息做句子的划分。还有使用特殊字符、各种数字当做对齐时用的锚点。

下面再讲一下句对齐。

Gale & Church 算法[^Gale]假设文本已经做好了段落对齐，原文句子和译文句子存在6种对应关系，增加、对应、删除、一对二、二对一。这就类似于编辑距离的计算，两个文本之间有增加、替换和删除三种关系。该算法主要根据句子长度来确定转换关系。具体的介绍可以看[此文](http://mttalks.ufal.ms.mff.cuni.cz/index.php?title=Sentence_Alignment)。

[hunalign](http://mokk.bme.hu/en/resources/hunalign/) 对齐工具使用了上述算法，并且结合了词典信息，它有一个桌面版的前端叫做[LF Aligner](http://sourceforge.net/projects/aligner/)。

[Bleualign](https://github.com/rsennrich/Bleualign)借助机器翻译的结果进行对齐。使用机器翻译的目的是用目标语表示原文的大概意思，然后和译文进行比较（通过修改版的bleu得分）。

其实有了机器翻译后，除了用bleu得分，还可以用很多其它方法判断原文和译文的对应关系，比如使用词向量计算语义相似度，有一个Python类库叫[synonyms](https://github.com/chatopera/Synonyms)。

比如有以下原文、机器翻译结果和译文（断好句的）。

```
source:
He wanted to make a special breakfast for his nephews, and it wasn't easy.	

machine translation (youdao):
他想为他的侄子们做一顿特别的早餐，这并不容易。

target:
他想为他的侄子们做一顿特别的早餐。
这并不容易。
```

使用synonyms计算句子之间的相似度，可以发现附带后面一段译文的时候相似度更高，而且机器翻译结果比第一个片段的译文长度要长，说明该原文应该对应两个片段。

```
>>> synonyms.compare("他想为他的侄子们做一顿特别的早餐，这并不容易。", "他想为他的侄子们做一顿特别的早餐。")
0.811
>>> synonyms.compare("他想为他的侄子们做一顿特别的早餐，这并不容易。", "他想为他的侄子们做一顿特别的早餐。这并不容易。")
0.937
```

[Vecalign](https://github.com/thompsonb/vecalign)则采用了多语言的句子嵌入来计算句子的相似度，不需要使用机器翻译或者双语词典就能完成自动对齐任务。


实际任务中使用得多的工具：

* SDL WinAlign（内置在Trados里的叫Alignment）
* Wordfast Aligner（和Trados一样采用连线的方式对齐）
* Stingray Document Aligner
* ABBYY Aligner
* TMXMall
* 雪人CAT
* OmegaT（内置了对齐工具，使用维特比算法和前向-后向算法）
* BasicCAT Aligner

TMXMall及后面几个软件都有自动对齐功能，TMXMall前面几个只提供了一般的断句和片段操作功能。

我写的BasicCAT的对齐工具原理很简单，首先进行段落对齐，然后根据SRX断句规则进行断句，如果段落的句子数量不一致，就用空白片段填补。提供手动调整的功能。集成了bleualign用于自动对齐。

这有一篇句对齐的集合贴：[Getting started with sentence alignment
](https://textprocessing.org/getting-started-with-sentence-alignment
)

再讲下短语和词这样亚句级的对齐。这通常用于统计式机器翻译当中。它一般使用的无监督机器学习的方法，通过观察文本，得出词之间的概率关系。[^wiki]

词和短语的对齐还可以用在双语语料库的检索时高亮显示原文对应的译文，以及CAT软件从翻译记忆中提取有用的片段翻译（Trados的upLift功能）。

参考文献：

[^Gale]: William Gale, Kenneth Church. A Program for Aligning Sentences in Bilingual Corpora 
[^wiki]: <https://en.wikipedia.org/wiki/Bitext_word_alignment>
