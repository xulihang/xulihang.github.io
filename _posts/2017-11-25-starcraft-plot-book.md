---
date: 2017-11-25 21:37:50+08:00
layout: post
title: 将星际争霸1的剧情文字整理到了gitbook
categories: 随笔
tags: 
---

玩星际1的时候就有想给游戏录像，反复听对话，但这肯定是个浩大的工程，而且网上肯定也有人做的，后来也就没怎么关注。

最近没什么事就打开星际争霸，听听熟悉的音乐。然后突然发现国服的星际争霸2免费了，美服的自由之翼及天梯都免费了。

我突然想把星际争霸的文本做成语料库，想着怎么给它把文字提取出来。我知道星际争霸这么流行的游戏肯定有黑客进行逆向工程，于是进行搜索。发现国内的星际MOD曾经挺火，有很多工具可以使用。其中比较有用的就是MPQWorkshop。星际的安装光盘里500多兆的install.exe其实就是一个mpq文件，里面包含了音乐、图片、文字等资源。具体的剧情文字在每个战役的scenario.chk这个文件里。该文件相当于一个地图文件，可以用[chkedit](http://www.staredit.net/files/2741/)打开，这个程序在github上有开源。

但我没有直接提取战役文件里的文字，我选择了HanStar的中英对照剧情文件，它是个纯文本，比较容易处理。HanStar是韩国人ChangKyu Song开发的一款外挂程序，用来替换英文为韩文。然后中国粉丝进行了将韩文替换为了中文。说明星际争霸的程序是支持unicode的啊。对于游戏黑客们表示敬佩。

最后按战役顺序排列做了一个星际争霸双语剧情书，放在gitbook上，链接如下：[http://xulihang.gitbooks.io/starcraft-plot/content](http://xulihang.gitbooks.io/starcraft-plot/content)
 
  