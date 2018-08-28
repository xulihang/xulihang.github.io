---
date: 2016-10-22 16:50:50+08:00
layout: post
title: 安卓系统使用蓝牙耳机录音
categories: 技术随笔
tags: Android
---
 
买华米手表前看到ticwatch自带麦克可以录音，我便想让没有自带麦克的华米手表用蓝牙耳机的麦克来录音，这样我平时朗读文章录音时只要手表和耳机就可以了。

首先华米手表的系统是完整的安卓5.1，这就给各种原本没有的功能提供了可能性。

我使用b4a为华米手表开发蓝牙耳机录音程序，首先在普通安卓手机上测试，然后直接可以装到华米手表上。

参考这两篇文章[How to record by bluetooth mic?](https://www.b4x.com/android/forum/threads/how-to-record-by-bluetooth-mic.33527/),[Set audio path to BT device(Solved)](https://www.b4x.com/android/forum/threads/set-audio-path-to-bt-device-solved.65450/#post-414771)，就可以利用audiostreamer录音了。

要利用蓝牙耳机录音，得切换到SCO模式，并设置录音来源为系统默认（参数数值为0），如果要播放声音就得关闭SCO模式。录音的采样率，声道数，量化位数也会影响到能不能成功录音，一般要多试一些参数。

然后我的蓝牙耳机是夏新A1（第一次用入耳式的耳机），测试录音质量不如手机麦克的好。最终在华米手表上的录音声调偏低，音量也偏小。但在手机上是没问题的，目前我也没有好的解决办法。

程序我放在华米论坛上，见[蓝牙耳机录音成功，放出测试版程序](http://bbs.huami.com/forum.php?mod=viewthread&tid=1148&page=1)
