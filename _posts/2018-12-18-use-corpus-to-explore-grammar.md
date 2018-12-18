---
date: 2018-12-18 10:41:50+08:00
layout: post
title: 使用语料库研究语法问题
categories: 语言
tags: 语料库
---

之前看到本科的[英语老师](https://weibo.com/u/1815249517)发了给学生布置的语法作业，里面提到他在英国国家语料库里提取例句，用来说明want sb doing这一语法现象。

最近听奥斯汀与艾丽时，发现第二季11集里也出现了这一表达。于是我下载了这一集的字幕文件，做成了语料库。

下面是具体的做法：

1. [在此](http://assrt.net/xml/sub/244/244974.xml)下载srt格式字幕，去除中文，时间轴等信息，得到纯英文的内容：

    ```
    - Last time on "Austin & Ally"...

    Ally: Austin and I do like each other, but it's complicated.

    I think he still has feelings for another girl.

    I made up my mind. I'm gonna ask Kira to be my girlfriend.

    It's time for me to face my biggest fear.

    ```

2. 使用[TagAnt](http://www.laurenceanthony.net/software/tagant/)对文本进行词性标注。

    ```
    -_: Last_JJ time_NN on_IN "_`` Austin_NP &_CC Ally_NP "_'' ..._: 

    Ally_NN :_: Austin_NP and_CC I_PP do_VVP like_IN each_DT other_JJ ,_, but_CC it_PP 's_VBZ complicated_JJ ._SENT 

    I_PP think_VVP he_PP still_RB has_VHZ feelings_NNS for_IN another_DT girl_NN ._SENT 

    I_PP made_VVD up_RP my_PP$ mind_NN ._SENT I_PP 'm_VBP gonna_VVG ask_VV Kira_NP to_TO be_VB my_PP$ girlfriend_NN ._SENT 

    It_PP 's_VBZ time_NN for_IN me_PP to_TO face_VV my_PP$ biggest_JJS fear_NN ._SENT 
    ```

    使用的tag遵循TreeTagger的tagset，说明文档[在此](http://www.laurenceanthony.net/software/tagant/resources/treetagger_tagset.pdf)。

3. 使用[AntConc](http://www.laurenceanthony.net/software/antconc/)进行检索

    默认会把标签当做一般的单词处理，可以在global settings里设置隐藏标签。AntConc如何处理标注好的数据可以见作者录的[视频教程](https://www.youtube.com/playlist?list=PLiRIDpYmiC0Ta0-Hdvc1D7hG6dmiS_TZj)。

    使用以下表达式：`want_VV *_NP *_VVG`，可以检索want sb doing的句子。不过这里没有准备很多奥斯丁与艾丽字幕文本的语料，只显示一条内容。

    ![](https://github.com/xulihang/xulihang.github.io/raw/master/album/corpus/antconc.png)


我们也可以直接使用在线的语料库，比如杨百翰大学的[BNC语料库](https://corpus.byu.edu/bnc/)。

杨百翰语料库的说明[见此](https://corpus.byu.edu/help/updates2016.asp)。

我们检索want的任意形态+代词+动词ing形式的内容：

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/corpus/bnc_search.png)

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/corpus/bnc_result.png)
