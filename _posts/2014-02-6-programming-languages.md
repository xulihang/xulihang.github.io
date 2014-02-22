---
date: 2014-02-6 21:22:17+00:00
layout: post
title: '［译文］值得学习的十二种编程语言'
categories: 译文
tags: 经验    
---

[原文：Programming Languages Worth Learning](http://batsov.com/articles/2011/04/27/programming-languages-worth-learning/)

#为什么翻译：

锻炼英语能力，同时了解众多编程语言的特点。


#前奏

编程语言一直是我的一个爱好对象。经过这些年，我已经对它们有了不少的了解。学习的第一个编程语言是Pascal，大概13年之前，而最近一个是Scala，学了只有几个月。

尽管许多语言的作者宣称他们在困境之后创造的语言是最伟大的，但事情很少如他们所说。大部分“独特”的特点并不很独特，而真正独特的东西经常是没有什么用的。我不相信有一种伟大无双的语言，但我相信有一些语言在理论（在它们专注的方面）和实践（更有机会得到工作或更轻松完成任务）方面都很有价值。

在这篇博文中，我会评论约十种我发现在这几年对我而言最有趣/有用的语言。我认为每一位专业的软件工程师应该都至少对它们知道点。


#C

到现在，C语言已经存在了大约40年（它出现在1973年）。但它经常被看作一种高级汇编语言，在现在一个Java，.Net和 Python 流行的时代。C仍是做严谨的系统编写（写驱动，各种服务器和虚拟机）的唯一选择。

学习C也给你对计算机内部工作的了解，比如内存管理和原始数据类型（基于CPU的registries）。

最好的开始学习C语言的方法在过去的20年没有改变——只要买一本“The C Programming Language” by K&R。


#Lisp

    Lisp is worth learning for the profound enlightenment
    experience you will have when you finally get it; that experience will
    make you a better programmer for the rest of your days, even if you
    never actually use Lisp itself a lot.


   ——<strong>Eric S. Raymond</strong> - How to Become a Hacker

现今最古老的语言之，创造于1958年并且在今天仍然有重要意义。重要在它独特的代码是数据方法（data approach），高级的代码工具产生(generation)工具（宏）和以增量（incremental）和交互的方式开发的能力。

虽然它诞生是独特的许多特性（比如垃圾回收，if表达式，函数对象）现在能在许多现在语言中找到，Lisp仍然为感兴趣探索的人提供了不错的选择。

这几天Common Lisp被认为是典型的Lisp方言—— 一种对命令式，函数式和面向对象式编程都有极好支持的多重编程范式语言。另一个流行的份额方言是Scheme，它是一种更简单的语言，主要关注函数式编程。它到现在仍是很多美国大学的编程入门课程的受欢迎的选择。（最近逐渐被Python替代）。

学习Common Lisp，没有比 Peter Seibel 的“Practical Common Lisp”更好的了。
如果你更喜欢Scheme，可以看看经典的“Structure and Interpretation of Computer Programs”。“Lisp Problems”对有抱负的Lisp程序员来说是一本不错的练习书。




#Java

让我们面对这点-如果你去人才市场，三分之一的人是有关Java EE或Android开发的（另2/3也许是PHP和.NET）。这种语言不是很优雅，但这个平台真的很有吸引力。虽然有很多其它语言针对JVM（Scala，Groovy，Clojure，JRuby，Jython-只列出一些）。Java任稳稳地占据主导地位，这点不太可能马上改变。它的确是直接上最流行的编程语言。

我已经教授过一些介绍JAVA编程的课程（在保加利亚），但我推荐“Core Java”这本书，基于我的教授经验。




#Haskell

函数式编程在近几年随着并行计算机和和主流最接近的纯函数式编程语言Haskell的升起而不断变得流行。它的特点包含如type inference, lazy evaluation, monads, pattern matching这样的伟大想法。正如Lisp一样，许多Haskell的特性能在更多不纯包（比如Scala和Clojure）中找到，但在我愚见，Haskell仍是纯函数式语言中的顶尖。

有许多在线的不错的免费Haskell学习资源。比如[“Learn you a Haskell for great good”](http://learnyouahaskell.com/) 和[“Real world Haskell”](http://book.realworldhaskell.org/read/)


#Perl

曾经不可争议的Internet之王Perl已经在和新生代动态语言如PHP，Ruby和Python的战斗中从恩典（grace）中跌下。尽管我不会建议任何人用Perl开始写Web或企业应用，它仍是些管理或帮助脚本的最好语言，有着最少的忙乱和最大的开发效力。它的特点是最强大的文字处理功能和非常灵活的语法（尽管有点混乱）。

Perl CPAN也许是最大的为一种语言汇集的第三方库的集合。

翻翻“Learning Perl”或就去浏览超赞的perldoc来马上开始Perl编写。


#Clojure

Clojure是一种Lisp方言，有着对并行（parallel）和并发（concurrent）编程独特的支持。它运行在令人尊敬的的JVM之上。如果你打算做一些严肃的并行计算，并不需要别的。你会发现Clojure是一个集函数式数据结构，普遍的laziness，高阶函数和尾调用优化的功能和其它关于状态和身份方面新颖想法的一项的极好的集合。Clojure也清理了一些传统的Lisp语法（Ciojure比Common Lisp有更少的括弧）

我推荐看免费的Clojure屏幕录像课程：[blip.tv](http://clojure.blip.tv/)


#Prolog

逻辑编程家族最有名的语言。想解决数独问题一样解决一个问题会打开每个开发者的视野。

推荐： “Learn Prolog Now”，一本问题集合 “Prolog problems”。


#Ruby

一个纯面向对象的动态脚本语言，对元编程有着很好的支持。它有用Java编写的版本（JRuby）和用.Net编写的版本（IronRuby），这使的用Ruby和任何流行平台上的软件进行交互很轻松。这款语言随着Ruby On Rails Web框架的流行变得越来越受欢迎，但它有很多有潜力的应用不包括RoR或web开发。

推荐“Programming Ruby”和“The Ruby Programming Language”。


#Python

一种纯面向对象的动态脚本语言，关注简单性，可读性和可维护性。因web开发，GUI程序和系统管理流行。哲言是“只有一种方式去做”和“它带着电池出现”。Python受Google的宠爱并被IT巨头广泛使用。

一本好书：“Dive into Python 3”。


<h1>C#</h1>

.NET平台的标志语言。于Java在很多方面相似。C#不像Java那样有创新，介绍如泛型和属性这样的概念给主流程序员。它的特点是在Java之上在属性，灵活的命名空间和有限的type inference方面有改进。

它被包含在着发额列表里的主要原因只是为C#开发者提供的大量工作岗位。在我的家乡保加利亚，大约三分之一的编程岗位与C#有关。

我最喜欢的C#书是“C# in Depth”。


#Scala

一个有趣的纯面向对象语言和函数式语言的混合，带有一些并发计算支持。它的特点是advanced static type system (比Haskell更高级), state of the art Java integration, support for pattern matching, extractors and other functional goodness。如果有一种语言有机会代替Java，那它一定是Scala。。甚至Java之父 James Gosling 都这样说。

推荐：[“Programming in Scala”](http://www.artima.com/pins1ed/)


#JavaScript

我们不能结束这次关于值得注意的编程语言的混乱之旅且不提Web之王，促使Web2.0革命的JavaScript。尽管它有一个可怕的名字（JavaScript于Java不相干）。任何web开发者都可以做得不错，在学了一些Javascript之后。


#尾声

我们不能在十几二十种语言方面都成为专家-我确定。但我相信所有我们在不同编程语言发现的想法和技术会丰富我们的思想，是我们成为更好的软件工程师。


#译者：

作为一个计算机业余爱好者翻译一位IT大神写的文章真心觉得很吃力。一来是计算机术语的匮乏，二来是原作者的写作水平也不乍的。这次翻译全当训练了。

另外本文只是作者自己的观点，你可能觉得Basic是最好的语言，却不在罗列中。



