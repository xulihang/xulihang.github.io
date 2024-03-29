---
date: 2017-04-03 15:05:50+08:00
layout: post
title: 论文写作心得-格式与自动化工具使用篇
categories: 技术随笔
tags: 论文
---

最近论文的初稿算是完成了，我想来讲一下过程中关于格式和使用的自动化技术的问题。

格式问题其实和自动化问题紧密关联，比如样式的设置影响题注和目录的生成。

主要的自动化工具就是Microsoft Word了。我用的2013版的word。另外我还使用了Endnote来管理参考文献。EndNote可以嵌入Word，利用域代码插入引文标注，自动更新编号等数据。


下面讲一下我碰到的几个主要的问题，顺便吐槽下我们外院的论文模板。

1、标题的样式设置与图片题注

学院的模板里，章节标题和下面第一级分节标题都是标题1的样式，再下一级是标题2样式，但章节标题的格式是后来重新改过的，把字号改大了。我后来将章节标题设置为标题样式，其实弄混了word里样式的概念。标题1到标题9一般用于长文件有分级标题的排版。而标题和副标题是一对的，主要用于小文件。其实是不影响最终效果的，目录也可以正常地根据设置标题样式的标题自动生成，但给图片添加题注时章节样式只有从标题1到标题9里选，没有标题样式，所以我最终还是改回了正确的做法，使用标题1-3的样式。

![](/album/paper/1.PNG)

一开始插入题注时提示错误如下：

> 题注或页码中不含章节号，如果要应用章节号，请选择“开始”选项卡中的多级列表按钮，然后选择一种链接到标题样式的编号方案。


2、多级列表与图片题注

和上一个问题紧密关联，题注的生成需要文中有对应的列表。我一开始没有用列表，是手动标1.1.1这样的序号的（论文模板便是这样操作，另外题注也是手动编辑的），这样不能自动生成题注，而且手动标号显得不够自动化。这里要用开始选项卡-段落功能区里的多级列表的功能。点击定义新的多级列表后，可以将级别链接到样式。因为级别1是特殊的Chapter One/Two/Three...格式，所以级别2要勾选正规形式编号单选框，不然编号会是One.1.1这样的形式。

![](/album/paper/2.PNG)

3、页眉页脚的设置

这个是比较基础的问题，我一开始不懂。利用页面布局选项卡下的分隔符-下一页功能可以进行分节。不同的分节可以设置不同的页眉页脚。此外还要注意链接到前一条页眉选项的勾选与否。

4、段落格式、分页控制

段落排版，比如两个段落的间距，首先应该使用段落格式进行设置，不推荐用换行操作。还有分页也是一样，有专门的分页符。但默认不显示分页符，可以通过设置显示所有格式标记显示。

5、软回车的使用

使用shift+enter进行软回车，区别于直接enter的硬回车。前者只是为了起到换行的视觉效果，而后者进行了分段操作。

接下来再补充点自动化操作的心得：

1、关于目录更新。可以在自定义目录里设置所需的样式，以后每次更新目录就不需要更改样式了。而外院论文说明里说还要自己“微调”。

2、引文标注与参考文献管理。 引文标注和图表题注一样，最好是自动管理的，不然前面的序号变了，后面的序号就都要变。这里我使用了endnote x7文献管理工具结合修改过了国标GB 7713-2005参考文献标准的样式文件（[此处](https://cnzhx.net/blog/endnote-output-style-cnzhx/)下载）。但该样式文件支持的格式有限，和学院论文规范里讲的格式也有出入，我又有给它进行了一点修改。

![](/album/paper/3.PNG)

![](/album/paper/4.PNG)

除此之外，我们专业的论文还要求在中文文献作者姓名之前加上拼音，并把中文名用[]框起来，但这个endnote我想就不能做到了。不过这也不是很难的事情，用python和xpinyin库很容易可以处理完成。之后将处理好的纯文本参考文献内容替换endnote生成的参考文献即可。

![](/album/paper/5.PNG)


理工科的同学有很多是用latex进行论文排版的，但我还没用过，毕竟word的功能也很强大，而且学院也只提供word模板，先把word用好吧。