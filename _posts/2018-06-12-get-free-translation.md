---
date: 2018-06-12 16:21:50+08:00
layout: post
title: 判断意译与直译
categories: 技术随笔
tags: CAT NLP
---

最近计算机辅助翻译技术的课程项目是给一个TAB分割的口语英汉语料，让我们判断它是不是采用了意译的方法。

直译一般保持原有句子中词语的意思，比如hot line翻译成热线。意译很多时候用来处理俗语，比如A piece of cake翻译为小菜一碟。

我们想出来的办法用英汉词典把实词（名词、形容词、代词）转中文。再用中文同义词词典，看看这个意思的词在中文翻译中存不存在。

具体的步骤如下：

1. 文本预处理，去除原来语料中不需要的内容。（给的语料中有多余的人名和空格）
2. 将mdx格式的朗道英汉汉英词典转为TAB分割的txt。
3. 将哈工大同义词林转为TAB分割的txt。
4. 用NLTK对英文进行分词、词性标注和命名实体识别。
5. 结合词性信息，用nltk的wordnet进行词性还原，在英汉词典中找到中文释义，看看在翻译中存不存在。如果不存在再看该释义的同义词在不在翻译中。还没有就再看下一条释义，如果都没有就说明这个意思没有被翻译出来，是意译。

我们可以通过计算精确率、召回率和准确率来了解结果。我人工判断了30个句子是否为意译，结果意译8句，直译22句。而输出的结果是意译17句，其中8句意译都判断出来，但是有9句判断错的。

```
准确率：(8+13)/30=70%
精确率： 8/(8+9)=47%
召回率： 8/8=100%
```

通过以上数据，我们可以知道，是意译的句子基本都能提出来，下一步要减少误判断。

一些问题：

1. 没有处理短语。比如“All right”被译为好的，只考虑了“right”的意思，结果被判断为意译。不过这种口语中的固定表达我也不清楚算不算意译。
2. 词典不全。“sorry”居然没有抱歉的释义，人工给补上。
3. 形容词在词典中一般都解释为“什么什么的”，但是原文中可能不会出现“的”。所以我处理形容词时会把“的”去掉。不过遇到灵活翻译的情况还是会有问题。比如“the latter half of the 19th Century”译为“19世纪后半期”，“latter”在词典中没有单独的“后”这一个字的释义。
4. 人名被当作普通词语。遇到一个人名叫“Lane”，译为“莱恩”。但是处理时把它当作街道意思的“lane”处理。所以我默认不检测命名实体。
5. 中文的同义表达太多。就比如“What are you doing?”可以被翻译为“你在干啥”，“你在干嘛”，“你在干什么”等等。“this place”可以被翻译为“这地方”或者“这里”。但是“place”译为中文的“地方”时，同义词典里没有“里”这个同义词。
6. 原文的翻译错误。很多翻过来的词和原来的词还是有语义的差异的，比如“interrupt”，词典里是“打断”，而译文中是“打扰”。
7. 一些实词，比如do、make、get和have，翻译过来的方法很多，会影响结果，因此又见了一个过滤词表，默认不检测这些词。

此外，我也考虑过使用word2vec这样的词向量模型来计算相似度，例如使用百度的短文本相似度API可以得到“这地方”和“这里”的相似度为0.831017，“小菜一碟”和“一块蛋糕”的相似度是0.415756，“一条狗”和“一只猫”的相似度是0.624687。但这个相似度一般用于搜索时给用户提供相关的检索词，单凭这个相似度分数不能判断每个词都被翻译出来了。而且这个相似度需要在用一个语言内进行比较，我还需要用词典或者机器翻译把原文先转换为译文语言，然后再和译文做比较。所以这个方法并不见得比上文的方法更好。


