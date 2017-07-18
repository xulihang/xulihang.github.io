---
date: 2015-07-26 16:51:50+00:00
layout: post
title: 十天，从WP小白到上架第一个应用
categories: WindowsPhone
tags: Windows 
---

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/windows/jnrain-wp.png)

##成为WP用户
暑假总归要找点事情做。买点新东西可以得到新鲜感和新的学习方向。

从前是Windows Mobile的用户，后来WM被抛弃了，我用了Android，去年又开始使用iOS系统。现在Windows 10要出来了，想想作为智能手机爱好者，总应该用一下第三大移动平台。看下12年的旗舰，Htc 8X的v版只要300多，而且还支持升级Windows 10，就入手了。


##学习WP开发
WP系统很简洁，甚至给我一种原始的感觉。但我个人很喜欢这种风格。发现不能刷机，也不能越狱，就只能老老实实、舒舒服服地用手机。既然我用了Windows Phone，总想给这个平台开发点软件，如我之前用b4x开发PPC、安卓和iOS的软件一样。但对于Windows开发我一点基础都没有，也从没学过C#，该怎么学习呢？

我网上搜索相关教程，搜到了channel9上的[Windows Phone 8.1 development for absolute beginners](http://channel9.msdn.com/Series/Windows-Phone-8-1-Development-for-Absolute-Beginners)。我先下了PDF的教程看，发现它说应该先学[C# Fundamentals: Development for Absolute Beginners](https://channel9.msdn.com/Series/C-Sharp-Fundamentals-Development-for-Absolute-Beginners)。于是我准备先学c#。

搭建开发环境就费了挺久，Windows Phone 8.0和8.1的开发还不一样。8.1的开发用到和Windows 8.1上metro应用一样的API，这样还可以给上亿的Windows8用户写应用，果断直接学8.1的开发。将来Windows10的开发的通用性就更好了。

每天看十段视频并时间，两三天时间感觉c#的基础差不多就可以掌握了。然后我开始试着开发WP的应用了！继续看Bob Tabor的初学者视频，这样上手可以比较快。了解了基本的控件，界面设计，事件驱动的编程，基本的模板。3天左右，视频看得差不多了。之后的学习感觉就要靠自己了。

边做边学吧，开发应用会比较有成就感。

我打算做我们学校[江南听雨论坛](http://bbs.jiangnan.edu.cn)的手机客户端，南京大学小百合和北邮人论坛的WP客户端珠玉在前，给我的设计提供了借鉴。

应用的功能很简单，获取版块列表、帖子列表、浏览帖子、发帖回帖，登录注销。主要用到httpclient进行网络请求和listview进行布局。

想想我的应用还需要广告推广，于是加入了aDduplex。它免费提供应用相互推荐的广告，当然我也不能赚钱。

讲讲容易，实际上写出代码不容易。我在我的[学习笔记](http://xulihang.github.io/learn-wp-development-note-1/)里就讲了使用httpclient遇到的问题。不过在4天内，我还是把它写了出来并完成了上架。WP的应用审核很快，只用一个小时不到的时间，我的应用就上架了。相比苹果至少7天的审核时间，简直是光速。

都说WP是开发者的蓝海，仁者见仁，智者见智吧。若是有创意的面向新兴市场的新应用，肯定要选择用户数量多的Android和iOS平台啊。我喜欢WP这个平台，或许也正因它是个小众的平台吧。

##相关学习资源

微软虚拟学院和channel9：上面有很多教学视频，值得好好挖掘和学习。比如我看得C#和WP8.1基础的视频就是这上面的，虽然都是英语没有字幕，但如果熟悉计算机术语还是很容易听懂的，而且讲解的老外发音也很清楚。

其它的书本、网站、视频我没学过，就不推荐了。

##最后，学习建议

我遇到问题都是直接搜索，发现这样的效率不高。WP的技术更新快，还容易找到过时的内容。应该多逛逛相关的网站、论坛。我最总搜到的很多正解都是有人在网上问了问题，高手回答了的。如果没有类似的问题该怎么办呢？我们可以自己问啊。问之前还可以多看看微软MSDN上的文档，虽然我至今不太会用，感觉文档内容好多，哪些是适合WP开发的不清楚，例子给的也不多。github之类平台上的开源项目也懒得看。

个人觉得还是论坛这样的形式适合讨论，PPC时代的论坛气氛很好。Android和iOS来了后，虽然很火，但没有以前的感觉了，用户数多也是一个原因吧，论坛都变成资源下载站了。而且现在微博微信崛起，论坛已经落寞了。

所以，最后我想问个问题，各位大侠们。有什么好的WP论坛推荐呢？




