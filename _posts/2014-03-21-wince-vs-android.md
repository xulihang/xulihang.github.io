---
date: 2014-03-21 10:15:17+00:00
layout: post
title: Windows CE (Windows Mobile) 相对于Android的优势劣势
categories: 电子数码
tags: 讨论
---

最近因患阑尾炎，在医院住了几天，观察到护士在使用基于Windows Mobile 6.5系统的手持PDA工作，称作移动护士工作站。以前从来没注意这么一个市场。目前，Windows Mobile已被微软抛弃，Windows 
phone 8采用了NT内核。而智能手机市场已被Android和iOS这样的后起之秀占领。但wince系统还在使用，见于很多公共设备，民用GPS车载导航仪等等。

医院采用基于windows mobile的手持PDA，而不采取基于免费开源的Android的手持PDA是为什么呢？我想试着讲下它们各自的优势。

#Windows的优势

* WinCE支持架构广，ARM，X86，MIPS等。

* WinCE占用系统资源小，省电。

* WinCE是硬实时操作系统，而Android基于Linux，最多是软实时。

* WinCE与桌面Windows的API大致相同，开发移植方便。学习，开发成本低。因为大多数企业采用Windows系统，开发者熟悉Windows的开发。

* 沿用桌面Windows的用户体验，有出色的文件管理功能。

* 历史悠久，厂家开发经验丰富。

#Windows的劣势

* WM系统不再受支持，平台软件少。Android火热。

* 若设备研发成本高，厂家少，价格高。许多手持PDA都增加了很多功能，大多在硬件层面实现。

* 对比免费的Android没有价格优势。WinCE便宜，像魅族M8当初采用wince就是这个原因。但WM系统貌似收费要高的。

* 没有Android那样在技术上与时俱进。

#两者皆有的优势

* 系统开源，WinCE开放100%内核源代码，Android自称开源系统（Linux内核），定制性强。

* 有不错的开发文档支持。

#我不清楚的方面

* 驱动开发

……

Android主要还是针对手机和平板的系统，WindowsCE则关注广大嵌入式设备，或许不应太过纠结，可比的是WindowsCE和嵌入式Linux。现在微软的移动系统是Windows Phone。

另外对比也要考虑很多因素，视具体目的会有不同。要考虑使用年限，生产成本，销售，开发难度等一系列问题。


![](https://raw2.github.com/xulihang/xulihang.github.io/master/album/appendicitis/pda1.jpg)

![](https://raw2.github.com/xulihang/xulihang.github.io/master/album/appendicitis/pda2.jpg)

可参考网页：

[嵌入式中linux+android与wince的区别](http://www.2cto.com/os/201108/101071.html)

[Wince、Android谁会是PDA主流操作系统](http://www.iotworld.com.cn/html/News/201310/e9a05fda02f1a4bb.shtml)

[Android 之后，是否依旧坚持WINCE？](http://bbs.csdn.net/topics/380080930?page=1#post-394857909)

[Windows CE vs Embedded Linux](http://stackoverflow.com/questions/326516/windows-ce-vs-embedded-linux)

[wince6.0 实时性分析](http://hi.baidu.com/611bob/item/bbcd31998c6dd83e336eebf3)

[R.I.P, WINDOWS CE](http://hezongjian.com/blog/?p=10748)

相关公司：

中联软件、上海方联信息科技、浩瀚技术、东软、摩托罗拉、惠普。

相关专业：

信息管理、物联网...

相关人士：

无锡市人民医院刘喻


