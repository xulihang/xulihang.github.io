---
date: 2018-06-19 20:05:50+08:00
layout: post
title: 计算语言学概念整理
categories: 技术随笔
tags: CAT NLP
---

语言出身的我还是更喜欢用计算语言学这个词。本文整理一些相关概念。

## 齐夫定律

在一个大规模的语料库，统计词频，将词按词频从高到低排序。词的词频f和序号r相乘得到k，这个k近似于一个常数。

齐夫定律也叫省力法则，通俗的意义就是人们喜欢用少量的词表达想表达的意思。就比如诸葛亮，说话者和听者只听这一个词就能知道意思，如果再用什么孔明、卧龙，则比较费劲。

所以语料库的一个问题就是很多冷门的词出现的频率会很低。

## 词的归一化（Word Normalization）

在检索时经常用到。比如U.S.A和USA统一用USA存。也可以把一个词拓展，比如搜索window，同时出现windows和Windows的结果。

## 波特词干算法

适用于信息检索的词干还原方法，比如automate、automatic和automation都会被还原为automat，是一种比较粗暴的办法。

## 汉语离合词

汉语动词很多现象，使得计算机难以处理。比如游泳，会说成游了一会儿泳。

# 概率统计

我不太懂这个，只做一些收集整理。

试验：一个婴孩出生，是男是女？

样本空间：一个试验的全部可能出现的结果的集合。

例如一个家有两个孩子，样本空间$\Omega $={男男、男女、女女}

贝叶斯公式：<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default">$P(A|B)=\frac{P(B|A)P(A)}{P(B)}$</script>

