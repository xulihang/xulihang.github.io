---
date: 2017-11-23 22:00:50+08:00
layout: post
title: B4X笔记———使用WebSocket
categories: 技术随笔
tags: B4X
---


![](https://github.com/xulihang/xulihang.github.io/raw/master/album/websocket.JPG)

如图是一个基于websocket实现共享输入框文本的b4j应用。使用websocket主要是用来做实时的双向的消息传输。

b4x论坛上相关的帖子主要有以下两个：

[[WebApp] Web Apps Overview](https://www.b4x.com/android/forum/threads/webapp-web-apps-overview.39811/)

[jWebSocketClient library](https://www.b4x.com/android/forum/threads/jwebsocketclient-library.40985/#content)

前者提供了b4j后端的代码（见nosql那个文件，不需要额外的库），后者提供了b4j前端的代码。因为erel没有对代码进行具体的说明，我摸索websocket的使用花了不少时间。我这里总结一下使用的要点。

1、官方的服务器代码里提供了*shared的这样一个代码文件，是面向所有websocket连接的，它可以保存websocket连接（用map或list保存websocket class）、同时向所有客户端发送信息。

2、客户端需要使用WebSocketHandler这个class,用来处理各类websocket的事件。比如以下这个sub是用来给服务器发事件的。需要在服务器对应的websocket class里存在对应的sub，并且参数类型要一致，否则会提示如下错误`java.lang.RuntimeException: java.lang.Exception: Sub upload_text signature does not match expected signature.`。另外事件名必须要有下划线，否则不被识别。服务器端的sub是不是public似乎并不影响。

```
Public Sub SendEventToServer(Event As String, Data As Map)
	Dim m As Map
	m.Initialize
	m.Put("type", "event")
	m.Put("event", Event)
	m.Put("params", Data)
	Dim jg As JSONGenerator
	jg.Initialize(m)
	ws.SendText(jg.ToString)
End Sub
```

3、服务器端给客户端发消息用类似如下代码

```
	ws.RunFunction("refresh",list1)
	ws.Flush
```

b4a和b4j的代码会有差异，但大致相同。