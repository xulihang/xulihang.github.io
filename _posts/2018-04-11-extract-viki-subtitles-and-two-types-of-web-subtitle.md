---
date: 2018-04-11 11:43:50+08:00
layout: post
title: 提取viki.com视频字幕及介绍两种网页字幕
categories: 技术随笔
tags: 
---


最近翻译课的展示要做美版《甄嬛传》，于是到netflix上想看看有没有中文字幕。之前的文章[提取netflix上的字幕](http://blog.xulihang.me/extract-subtitles-from-netflix/)讲了如何提取字幕。但是发现netflix会检测代理，将主流的vps的ip都给封了。这下看netflix就成了问题。

另外一个视频网站viki.com则没有这个限制。viki.com的字幕是其召集志愿者进行翻译的，支持的语种多，和netflix相似。但是质量则要差许多。

需要下载的话，只需开启网页的开发者工具，等网页加载，然后搜索vtt就可以得到下载地址。

类似这样的：`https://api.viki.io/v4/videos/1080083v/subtitles/en.vtt?app=100000a&sig=17e06a202e2c49a97e37f5dc3e59c3b545480cb1&stream_id=67775977&t=1523350508`

下载下来的是vtt格式字幕文件，与srt类似，就是第一行多了webvtt，时间轴毫秒部分前的逗号变成了句号，另外还支持一些标签。现在windows10的视频播放器默认就支持这一格式。

以下是例子：

```
WEBVTT

1
00:00:03.130 --> 00:00:09.660
<i>Subtitles brought to you by The Empresses Team@viki .com<i></i></i>
```

而netflix使用的是其修改过的ttml字幕文件，一般的ttml是HH:MM:SS这样的时间轴，而它是以乘以10000000的秒存储的。

```
<p begin="1352800000t" end="1390000000t" region="bottomCenter" style="s1" xml:id="subtitle0"><span style="s1_1">It was here that Mei was pushed</span><br/><span style="s1_1">and fell into the water.</span></p>
```




