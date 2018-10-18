---
date: 2018-04-05 11:08:50+08:00
layout: post
title: Rime
categories: 技术随笔
tags: 
---

rime是跨平台的输入法引擎，封装了输入法的逻辑，然后各大系统的输入法是要写个前端调用就行了。最近想用它来做一个在线吴语输入法。

# 编译 

编译是一件高深的事情。没有对编译原理、各种工具的了解和c语言基础，我的感觉就是在瞎试。

在64位linux上碰到的主要问题是动态库的问题，需要.so而不是.a，要在cmakefiles里的definition里加上-fPic。

windows平台最好还是用bash on windows。默认支持用vs的工具集编译，但我对windows这套工具也不熟悉，编译变量不会设。而在cygwin里安装会碰到各种错误。

c++程序的编译真是一件复杂的事情，有各种依赖。所以能折腾linux的人都是大神啊。

最后我在linux上编译成功了。但我发现其实用现成的库就行了。linux的发行版一般都带librime，而windows的小狼毫安装文件里有rime.dll。

# 调用

rime的文档并不是很完善，主要的api都在rime_api_console.cc这个文件里。java语言通过jni可以调用c++库来运行，安卓上的同文输入法就是这样做的。其它的python、lua等语言都可以。但目前我的水平都看不懂那个文件。要是都像rest api一样简单就好了。

以上是讲的我编译安装的痛苦经验，以后再讲怎么用吧。

