---
date: 2015-07-26 10:14:50+00:00
layout: post
title: Windows Phone 8.1 开发学习笔记（一）使用Httpclient
categories: 技术随笔
tags: Windows 
---

要开发听雨的客户端，关键的无非是网络数据的获取、解析与发送。要用到Http的Get和Post方法。

Windows Phone 8.1已经提供了很好的网络库：Windows.Web.Http，语法简单，不用管header，自动管理cookie和cache。这些优点也是我在开发中才知道的。详细的介绍见channel9上的视频： [Five Great Reasons to Use the New HttpClient API to Connect to Web Services](https://channel9.msdn.com/Events/Build/2013/4-092)

另外还有很多网络库，其中System.Net.Http是.Net提供的，类的命名上会与Windows.Web.Http有重叠。我选择使用后者。

怎么用可参照林政老师的博文：[`[深入浅出WP8.1(Runtime)]网络编程之HttpClient类 `](http://www.cnblogs.com/linzheng/p/4018092.html) 
。我一开始照搬林政老师的代码，并对把它封装到我称作Httputils的类里。以后使用只要实例化后加一行代码就可以完成操作了。但使用中遇到以下几个问题。

1、发送字符失败。

照林老师的代码，在发送用户名和密码来实现登录听雨论坛时，总提示用户名不存在。我一开始以为是论坛的问题，但测试其它的登录方式正常。于是开始找别的实现http post的代码。

测试使用网上的用System.Net.Http的代码登录成功了，它的字符串用System.Net.Http.FormUrlEncodedContent进行了处理。

于是我把修改了林老师代码里的httpStringContent:

` HttpStringContent httpStringContent = new HttpStringContent(content, Windows.Storage.Streams.UnicodeEncoding.Utf8,"application/x-www-form-urlencoded"); `

测试成功。

2、cookie的问题

登录以后，我应该能看到隐藏的版块，但实际测试却别有显示。我怀疑是wp的网络库不能自动管理cookie。于是我继续bing搜索。什么cookiecontainer、cookiemanager等等网上有关的代码我都下来试了。搞了几个小时，但仍然无效，放弃。躺沙发上玩手机。但还是不甘心，静下心来逛wp论坛。过程中看到了[Five Great Reasons to Use the New HttpClient API to Connect to Web Services](https://channel9.msdn.com/Events/Build/2013/4-092)，等着第二天看。

第二天醒来，看昨晚发现的视频。结果跟我说httpclient是自动管理cookie的，而且cookie在应用内都是共享的。看来不是cookie问题，我去。

3、GET不更新的问题

偶尔打开程序直接登录，然后再浏览版块列表可以看到隐藏版块。另外回帖或帖子的顺序没有变。这让我发下了这第三个问题，它居然缓存了相同链接的内容！


在stackoverflow里找到相关代码，我把它改为使用Windows.Web.Http的：


    //防止相同链接不进行刷新
    httpClient.DefaultRequestHeaders.IfModifiedSince = new DateTimeOffset(DateTime.Now);

	
好了，以上就是我初学WP开发关于网络操作的心得。遇到很多挫折，也是我对网络编程和各种网络协议不熟悉，也不太会看微软的文档。


