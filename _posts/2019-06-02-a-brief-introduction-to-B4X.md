---
date: 2019-06-02 23:13:50+08:00
layout: post
title: B4X简介
categories: 技术随笔
tags: B4X
---

看了下B4X论坛上我的注册信息，算算我从2009年左右接触basic4ppc，学习编写PPC软件，到后来大一时利用B4A编写听雨书房，大二时利用B4i编写听雨BBS客户端，再到现在一直专注于用B4J开发桌面端和网页应用，也已经过了10年了。

![](/album/B4X/profile.png)

我业余时间学习了Autoit、C、Pascal、B4X、Python、C#、Swift、JavaScript等各种语言，但是目前使用得最顺手的还是B4X。

下面讲一下它的主要优点：

### 1. 现代化的Basic语言

B4X目前最重要的产品是B4A，它将Basic转译为Java，实现原生开发。因为基于Java，所以B4X也是一种面向对象的语言，在很多方面可以看到受到了Java影响。不过B4X的面向对象比较简单，对象有属性和方法，但是不能继承。而转译到Java的一个好处就是可以使用JVM平台上的各种类库。

当然，作为Basic风格的语言，使用Basic风格的关键字，比如If...Then、For...Next、Sub...End Sub、Dim等。

### 2. 跨平台

B4X支持的平台：

* 移动端：Android(B4A)、iOS(B4i)
* 三大操作系统(B4J)：Windows、macOS、Linux
* 嵌入式：Arduino(B4R)、树莓派（B4J+arm版Linux）
* 另外还可以开发Web应用(B4J)

B4X目前不能做到编写一次代码，在各个平台上运行。但这给了我们原生环境编程的体验。我们需要了解Android、iOS的生命周期，了解它们的常用控件，一直到软件如何发布。很多原生平台的类库，可以直接进行封装，供B4X语言调用。

而纯粹使用B4X语言编写的代码，则可以在多个平台中共享。UI的跨平台方面，作者也在使用XUI进行尝试。

### 3. 强大的集成开发环境

安装包只有10几MB，配置所需环境也很简单，有详细的说明。

IDE功能强大，支持智能提示、自动补全、断点调试、调试代码热交换等等，有很好的图形化界面设计器。

针对Android和iOS的界面设计，还提供了远程的界面预览功能。iOS开发需要Mac电脑，还提供了Mac编译主机服务。

### 4. 活跃的社区

B4X作者Erel是一个非常勤奋的开发者，他会非常耐心地回答用户的问题。主要的讨论场所就是B4X的论坛。论坛基于xenforo构建，Erel还做了各种加强，比如一个好用的搜索引擎。

B4X虽然不是很热门，但也有很多粉丝用户，其中有现实中从事程序员工作的技术大牛，也有普通的希望学习软件开发的新手。技术高手除了开发各种类库、写教程外，也会热心地回答其它用户的问题。

论文的秩序维持是一件重要的事，比如发的帖子不能跑题，提与主题无关的问题要另开一个新帖子，提问时要贴出代码而不是图片等等。虽然严肃，但也创造了很多B4X用户才知道的梗，比如这个帖子提到了很多：[B4X Forum memes](https://www.b4x.com/android/forum/threads/b4x-forum-memes.106098/)

### 5. 丰富的学习资源

文档齐全，手册、教程还有各种函数、类库的文档。

一些集合帖：

* B4X小册子，包含B4X语言、分平台开发、自定义控件等内容：[[B4X] Documentation Booklets - klaus ](https://www.b4x.com/android/forum/threads/88985/)
* 网络相关集合贴：[[B4X] The Networker's Guide To The Galaxy](https://www.b4x.com/android/forum/threads/b4x-the-networkers-guide-to-the-galaxy.68974/
)

除了文档，Erel还专门录制了教学视频：[B4X Video Tutorials](https://www.b4x.com/etp.html)

我的博客也会继续发与B4X相关的内容。

另外讲讲B4X的在国内的情况。国内的用户不多，也没看到哪家公司招聘时说需要B4X开发者。不过应该是存在使用B4X作为主力开发语言的公司的。

B4X的推广，早期有沉默蜂，在163上写了很多B4A的博客，他也创建了QQ群。还有几个其它的群，有一个群的群主是刺鱼，管理员有王爷、icefairy333等人。但B4X的主要交流场所还是论坛，交流的语言是英文。

B4X套件是闭源软件，其中，B4A和B4i是收费产品，B4J和B4R则是免费的。平时论坛里用户经常会贴出自己的源码，不过在GitHub和StackOverFlow等地方并不活跃。如果想使用主流语言，还是推荐使用Java、Python之类的，关于这点，可以看我之前的文章：[小众编程语言](/minority-programming-language/)。


