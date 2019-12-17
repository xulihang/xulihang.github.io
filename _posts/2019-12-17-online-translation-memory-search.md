---
date: 2019-12-17 20:03:50+08:00
layout: post
title: 翻译记忆在线检索器
categories: 技术随笔
tags: CAT
---

上个月做了一个翻译记忆在线检索器，使用B4J编写的后端和前端，该工具使用逻辑如下：

1. 用户上传tmx翻译记忆文件
2. 服务器将翻译记忆存入SQLite数据库，并启用全文检索，提供用户一个具有唯一ID的访问链接
3. 用户在网页上对翻译记忆进行检索，支持选择检索全部语言还是单个语言，支持短语查询。匹配的关键词会高亮。

我基于人人影视《老友记》全十季中英字幕做了翻译记忆并导入该检索器，可以访问这里使用：<http://www.xulihang.me/search.html?tmid=NMLDVSyPF0cvQJr6NfuSg>

这一服务类似于[Linguee](https://www.linguee.com/)和[Glosbe](https://glosbe.com/)，不同的是我们可以导入自己的翻译记忆。

比如很多人熟悉的《老友记》，主要是美国人之间的口语对话，可以用于检索地道表达，可信度比linguee这样从中国的双语网站爬取的语料会更高一点。

《老友记》的一大主题是恋爱，含有很多关于亲密关系的表达，这对于翻译中文言情小说、漫画有帮助。下面是一些例子：

### 暗恋

```
note: Friends.S06E21.chs&eng.sohu.ass 0:00:21.08,0:00:25.74
en: Wait. "On the 1 9th a secret crush announces itself. "
zh: 十九日 暗恋你的人会向你表白
```

### 配不上

```
1
note: Friends.S04E22.chs&eng.sohu.ass 0:05:26.05,0:05:27.83
en: I'm too good for the Hut. I'm too good for the Hut.
zh: 必胜客配不上我 配不上我
2
note: Friends.S01E08.chs&eng.sohu.ass 0:11:04.84,0:11:08.71
en: Well I think Brian's a little out of your league.
zh: 我觉得你有点配不上布莱恩
3
note: Friends.S01E08.chs&eng.sohu.ass 0:11:15.45,0:11:17.61
en: You don't think I could get a Brian?
zh: 你觉得我配不上布莱恩
```

下面再说一下Trados和memoQ的语料检索功能。

Trados有Concordance Search和Fulltext Search两种语料检索方式，前者类似于模糊匹配，会显示检索词和结果的匹配程度，后者是全文检索，可以分别设置原文和译文的检索词。更多可以参考[Know How: Concordance Search in SDL Trados Studio](https://gateway.sdl.com/apex/communityknowledge?articleName=000002703#Con1)。

memoQ的Concordance Search功能差不多，支持KWIC关键词在中间的形式呈现，并可以猜测检索短语对应的翻译。

![](https://jealousmarkup.xyz/files/memoq/translating-concordance.png)


还有通用一点的语料检索工具：AntConc、AntPConc、PowerGREP，但没有针对翻译记忆这样的多语言对语料进行设计。



