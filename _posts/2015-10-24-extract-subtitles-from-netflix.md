---
date: 2015-10-24 18:22:50+00:00
layout: post
title: 提取netflix上的字幕
categories: 技巧
tags: 大创
---

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/netflix/netflix.PNG)

我们的大创是对美剧版甄嬛传的英文字幕进行翻译相关的研究，由于研究需要，需要提取纯文本的字幕。我在网上搜遍了美剧甄嬛传的字幕也没有找到字幕文件下载，一度放弃。结果几个月后的今天，我想起netflix上可以打开关闭字幕，还可以选择英文和西班牙字幕，字幕应该不是融合在视频里的，于是重启开启了netflix会员，想把netflix上的字幕提取出来。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/netflix/1.png)

我先是在网上用netflix字幕提取和extract subtitles netflix搜索，结果没有找到可行的办法。想想还是自己用浏览器的开发者工具找吧。

试了之后发现很简单地就把字幕文件提取出来了。

打开浏览器的开发者调试工具，我这里直接用win10上的edge自带的调试工具，点网络，查看捕捉到的请求。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/netflix/netflix-debug.PNG)

光看URL的确没有可读的英文告诉我哪个是字幕文件，但比较发现主要有一个URL，是以ip/range开头的，应该是视频的分段文件。然而有一个url同样以这个ip开头，却没有了range，下载这个文件，打开后发现是xml格式的字幕文件！

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/netflix/netflix-subtitles.PNG)

这里在放上一段提取到的字幕文件的url：`http://108.175.47.162/?o=AQG-6PAGiKFL6gvV3dwTkXP_OsXnubrxuN1-oL9TI5ll08LNQrZEnV9wYGOWRIuQ0WjArxXeuL2Qv-gcGNXaO1xuMbUS5bVOYjgNMhlP0OU0EVCpaMaKbC4Ij66xK4dgYg&v=3&e=1445706614&t=pihXKkZxMeRMabM-roZFmxK9mSg`

好了，因为是重启的会员，没有新会员一个月的免费优惠了，我还是好好看看netflix上的视频，让9.99美元的订阅费有点价值吧。。