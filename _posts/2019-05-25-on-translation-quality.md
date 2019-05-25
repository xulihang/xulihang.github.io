---
date: 2019-05-25 19:21:50+08:00
layout: post
title: 翻译质量
categories: 随笔
tags: 翻译
---

最近收到TransPerfect的审校，发现他们严格按照SAE J2450这一质量评估标准来做的。这里想讨论有关翻译质量的问题。

## 翻译质量评估标准(Translation Quality Metrics)

业界的标准有LISA QA、SAE J2450、TAUS DQF等等。SAE J2450将错误分为以下几类：

* Wrong Term 
* Wrong Meaning 
* Omission 
* Structural Error 
* Misspelling 
* Punctuation Error 
* Miscellaneous Error 

除了文本的错误，还有格式、标点等错误类型，毕竟翻译服务交付的是一个使用类似docx格式的成品。

错误类型有对应的罚分，统计错误和罚分，最终可以得到一个分数，如果分数过低，译稿就不通过，到时候稿费可能也不会给。

SAE J2450是针对汽车行业设计的，这类文本使用的算是受控语言，对词、句式的选择有很大的限制。所以，使用这类评估方法是有必要的。

这里提一下，在做英译中时尤其要注意汉语的语法问题，这是汉语母语译者的一大问题，主要是从小没有接触语法方面的训练，翻译出来的内容对不对光凭语感。这也是汉语本身存在的问题，不如英语严谨。所以英译中审校需要有很好的汉语水平，且对语法问题敏感。

技术类翻译可以使用这些标准，但是文学类需要灵活变化的文本则并不怎么适用。因为这时很难做到字对字的对应，而且很多漏译是合理的。本来原文的创作就有随意性，那为什么翻译就要一板一眼的呢？

主流的CAT软件还集成了根据这些模型进行审校和打分的功能，比如Trados的TQA和memoQ的LQA功能。和根据规则自动检查错误的QA不同，TQA目前主要还是人工对错误进行识别和分类。

以下是Trados编辑TQA的界面：

![](/album/Trados/TQA.png)

导出的Word文件可以附带批注，不过测试有时候生成的docx文件会有问题。

![](/album/Trados/TQA_export.png)

## 如何衡量翻译质量(how to assess translation quality)

如何衡量翻译质量其实是[翻译理论](https://blog.xulihang.me/translation-studies-1/)的核心问题[^quality]。

就比如直译和意译的问题，a piece of cake，我们都知道翻译为小菜一碟，而如果一定要直译，翻译成一块蛋糕，大多数人都会判断这个翻译翻错了。

从功能学派的角度看，对翻译质量的衡量应该结合翻译的类型和目的。结合现在很火热的人工智能和机器翻译，谷歌翻译提供网页翻译，用户即使不懂该网页的语言，也能通过机器翻译了解大概内容。用户的目的是获取信息，这时候对翻译质量的要求并不高，对即时性、性价比要求较高。如果翻译的内容是一份航空航天领域的技术文档，那就是一个字也不能错，否则就可能导致空难。所以，这时候对翻译质量的要求是严格还原原文的内容，可以使用上面的翻译质量评估标准。

而翻译的内容如果是文学作品，那可能又要求译者隐身，尽量让读者看不出这是翻译过来的。这时对翻译的评估就变得模糊。一般的图书翻译，由译者和编辑共同完成，译者完成翻译后，编辑进行润色和改错，使成品符合出版要求。另外，也会对翻译中的难点进行集中讨论，可能一时间没有好的结果，译者出去轧个马路回来就有了灵感。

讲到翻译的难点就涉及一个不可译的问题，比如很多修辞方法难以翻译，特别是和语言本身关联性很大的押韵等修辞。

更多论述可以看Juliane House的《TRANSLATION QUALITY ASSESSMENT》。

## 什么使我们不懈追求翻译质量(what makes us pursue a perfect translation quality)

什么使我们不懈追求翻译质量？是爱吗，也是责任。

翻译质量和译者的主观性有很大的关系。如果译者翻译的内容不是他喜欢和熟悉的，那他只会想着应付任务，不会想着去不断改进翻译。童书译者 Daniel Hahn 一直只做童书的翻译[^hahn]，《冰与火之歌》的译者屈畅六级也没过[^quchang]，但翻译出了高质量的中文译本。

而在语言服务行业的专业译者更多的是一份责任。医药、航天领域的翻译枯燥吧，但它很重要，翻译好它有意义，而且能得到一笔不错的收入。翻译行业一般分垂直领域，译者在垂直领域做多了，掌握相关内容后，翻译速度和质量也会提高，但仍然需要有耐心和细心。


翻译质量评估标准相关链接：

[LISA QA Metric](http://producthelp.sdl.com/SDL_TMS_2011/en/Creating_and_Maintaining_Organizations/Managing_QA_Models/LISA_QA_Model.htm)
[J2450 Translation Quality Metric ](https://www.translationdirectory.com/article581.htm)
[DQF: Quality benchmark for our industry](https://www.taus.net/evaluate/dqf-background)


参考资料：

[^quality]: House, J. (2014). Translation Quality Assessment: Past and Present. 
[^hahn]: TRANSLATION Daniel Hahn advocates for children's literature https://www.wordsandpics.org/2019/04/translation-danny-hahn.html
[^quchang]: 英语六级没过，却翻译了《冰与火之歌》 http://culture.ifeng.com/a/20170825/51754576_0.shtml