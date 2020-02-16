---
date: 2019-05-04 09:55:50+08:00
layout: post
title: CAT工具的互操作性
categories: 技术随笔
tags: CAT
---

世界上存在各式各样的计算机辅助翻译工具，如何在不同的工具间共享数据？

这个问题也可以表述为如何实现CAT工具的互操作性。为了实现互操作性，我们需要大家都支持的中间格式，而这类中间格式已经有了标准，目前主要有以下四种：

* TMX，用于翻译记忆交换
* TBX，用于术语交换
* SRX，用于句段分割规则交换
* XLIFF，用于本地化数据交换

有关这几个标准的介绍可以参考我之前写的文章：[TMX、TBX、SRX，LISA的三大翻译标准](https://blog.xulihang.me/TMX-TBX-SRX-Three-Lisa-oscar-standards/)、 [XLIFF简介](https://blog.xulihang.me/a-brief-introduction-to-xliff/)。

下面主要讲一下实现的难点。

### 翻译记忆的交换

翻译记忆除了保存原文和译文，还有创建者、创建时间、上下句段文本、备注等各种信息，这方面各个软件的支持都不一样。比如OmegaT是依赖TMX文件存储翻译的，会给它拓展很多的标签。这些拓展的标签导入另一个软件时可能就会丢失。

另外还有格式的问题，行内格式一般用标签表示，可以转为为tmx支持的标签，如`<bpt>`、`<ept>`、`<ph>`等。但处理同样的docx文件，不同的CAT软件生成的tag数量和位置不一定匹配。

### XLIFF

XLIFF是一种中间格式，SDL Trados Studio使用的SDLXLIFF格式是一种修改过的XLIFF文件。利用这类中间文件，可以实现翻译项目在不同的CAT软件中进行。比如用Trados处理docx文件生成的sdlxliff可以放到OmegaT里翻译，翻译好后用Trados打开，继续相关操作。

但是像OmegaT这样不生成中间格式，只在内存里存储数据的软件，就难以做到这点。有点讽刺的是闭源的Trados居然比开源的OmegaT在这点上做得更好。当然，OmegaT的这种模式也有好处[^did]，而且它出生的时候XLIFF格式都还没有制定[^dgt]。

另外还有句段状态的对应问题。OmegaT里句段状态只有两种，已翻译和未翻译。只要句段有输入文本，就算翻译。而Trados的句段状态有很多，比如草稿、已翻译、未翻译、已审阅、已签发等等。句段状态信息会存储到XLIFF文件里。因为OmegaT的句段状态比Trados少，所以OmegaT的句段状态转到Trados里是可以的，Trados转到OmegaT则会有句段状态的不对应问题。


### 总结

每个CAT工具都有自己的特点，要在保留自己的特点的同时做到和其它软件的互操作性不是一件容易的事情，即使有相关的标准，也只能做到软件间的部分兼容。


[^did]: [OmegaT - Dublin Computational Linguistic Research Seminars ](http://www.didierbriel.com/downloads/omegatdclrs.pdf)
[^dgt]: [Interoperability between DGT-OmegaT and SDL Trados Studio](http://185.13.37.79/sites/default/files/ARTICLE-FOLHA-SDLXLIFF-INTEROPERABILITY.pdf)


