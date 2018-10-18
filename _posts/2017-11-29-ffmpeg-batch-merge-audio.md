---
date: 2017-11-29 21:37:50+08:00
layout: post
title: ffmpeg批量合并音频文件
categories: 技术随笔
tags: B4X
---

用mpg editor提取了星际争霸的战役剧情。每个战役文件夹里有很多小的音频文件。我打算合并这些文件方便听。但是这样的文件太多了，用格式工厂等工具肯定不适合，决定直接用ffmpeg。

ffmpeg的文档太长了，我参考了这篇[中文博客](http://blog.csdn.net/u012587637/article/details/51670975)，以下是参考内容。

>方法二：FFmpeg concat 分离器
>
>这种方法成功率很高，也是最好的，但是需要 FFmpeg 1.1 以上版本。先创建一个文本文件filelist.txt：
>
>file 'input1.mkv'
>
>file 'input2.mkv'
>
>file 'input3.mkv'
>
>然后：

>ffmpeg -f concat -i filelist.txt -c copy output.mkv

生成文件列表，然后运行命令合并就行了。合并音频就把命令改成如下内容：

`ffmpeg -f concat -i filelist.txt -c copy output.wav`

我写了一个b4j程序，用Resumable subs协程处理，速度还是很快的。

代码在这里：[https://github.com/xulihang/misc/tree/master/b4x/b4j/mergeAudio](https://github.com/xulihang/misc/tree/master/b4x/b4j/mergeAudio)
  