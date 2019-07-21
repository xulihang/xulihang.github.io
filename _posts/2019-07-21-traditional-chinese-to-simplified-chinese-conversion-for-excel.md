---
date: 2019-07-21 22:48:50+08:00
layout: post
title: 转换Excel中的繁体到简体
categories: 技术随笔
tags: 
---

Excel和Word一样，是自带简繁转换的，但是我在处理暗黑2的繁体中文时出现了错误，无法转换。于是我想利用opencc来做。

opencc是使用cygwin编译的，可以直接命令行调用，使用以下命令可以将繁体转换为简体，其中的txt文件要求utf-8编码。

`opencc -i input.txt -o output.txt -c t2s.json`

一种方法是使用Apache POI直接操作Excel，将繁体内容导出，调用opencc命令行转换，然后导回。

还有一种方法是使用Excel的开发功能，新建一个VBA模块，通过自定义函数来调用opencc进行转换。

因为我嫌vba操作文本文件比较麻烦，默认使用的gbk编码而不是utf8，所以选择了用B4J搭建一个服务器，提供转换接口，VBA访问http://127.0.0.1/t2s?text=TraditionalChinese来获得转换后的简体中文。

VBA代码如下：

```
Function T2S(text As String) As String
    Dim xmlhttp As Object
    Set xmlhttp = CreateObject("MSXML2.XMLHTTP") '创建XML对象
    xmlhttp.Open "GET", "http://127.0.0.1:8080/t2s?text=" & encodeURI(text), False
    '用GET 发送请求
    xmlhttp.Send
    T2S = xmlhttp.responsetext
End Function


Function encodeURI(strText As String) As String
    strText = Replace(strText, "", "\")
    strText = Replace(strText, "'", "\'")
    strText = Replace(strText, Chr(13), "\r")
    strText = Replace(strText, Chr(10), "\n")
    strText = Replace(strText, Chr(0), "\0")
    With CreateObject("msscriptcontrol.scriptcontrol")
        .Language = "JavaScript"
        'encodeURI = .Eval("encodeURIComponent('" & strText & "');")
        encodeURI = .Eval("encodeURI('" & strText & "');")
    End With
End Function
```
URLEncode代码来自：[如何Encode Url 字元](http://club.excelhome.net/thread-1214743-1-1.html)

然后在单元格中输入函数就可以使用了。

![](/album/excel/T2S_user_defined_function.JPG)

通过HTTP获得的数据会被保存，再次打开Excel不会重复发送请求。不过如果单元格太多，非常容易发生错误。这种情况我觉得还是写个工具处理Excel比较方便。

