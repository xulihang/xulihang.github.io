---
date: 2023-02-12 11:46:50+08:00
layout: post
title: BBCode解析
categories: 技术随笔
tags: 
---

一行文本，可以包含多种文字样式，比如粗体、斜体和颜色，这个叫富文本。

富文本的表示和编辑不是件容易的事情。一种比较简单的方法是使用BBCode。

BBCode是Bulletin Board Code的缩写，被用于论坛等程序中用于表示富文本。

它使用方括号表示标签。标签如果有属性，通常跟随在标签名后面，用等号连接。标签可以嵌套。

比如下面这个BBCode的示例：

```
[b]Hello [i][color=#ff0000]world[/color][/i][/b]!
```

可以得到下面这样的效果：

<strong>Hello <span style="color:#ff0000"><i>world</i></span></strong>!

本文会使用B4J编写一个简单的BBCode解析器，可以处理粗体、斜体和颜色标签。

1. 定义一个TextRun类型，包含所包含文本、粗体、斜体和颜色等属性。

   ```vb
   Type TextRun(text As String,bold As Boolean,italic As Boolean,color As String)
   ```

2. 建立一个BBCodeParser类，并添加一个解析文本的公开方法和一个解析TextRun的内部方法。解析的结果是TextRun列表。如果文本的bbcode有误，则不解析。这里的验证方法比较简单，只比较标签对数量和名字对不对。

   ```vb
   Sub Class_Globals
       Private supportedBBCodes As List = Array As String("b","color","i")
   End Sub
   Public Sub Parse(str As String) As List
       Dim run As TextRun
       run.Initialize
       run.text = str
       If validBBCode(str) Then
           Return ParseRun(run)
       Else
           Return Array(run)
       End If
   End Sub
   
   Private Sub ParseRun(run As TextRun) As List
   
   End Sub
   
   private Sub validBBCode(str As String) As Boolean
       Dim count As Int = 0
       Dim matcher As Matcher = Regex.Matcher("\[/?(.*?)]",str)
       Do While matcher.Find
           Dim match As String = matcher.Group(1)
           If match.Contains("=") Then
               match = match.SubString2(0,match.IndexOf("="))
           End If
           If match.Contains("[") Or match.Contains("]") Then
               Return False
           End If
           If supportedBBCodes.IndexOf(match) <> -1 Then
               count = count + 1
           End If
       Loop
       If count > 0 Then
           If count Mod 2 = 0 Then
               Return True
           End If
       End If    
       Return False
   End Sub
   ```

3. 实现ParseRun方法。

   具体步骤如下：
   
   1. 从左开始遍历单个字符，如果检测到`[`，截取`[`到下一个`]`的标签内容。如果没检测到，则将文本存入一个StringBuilder。
   2. 如果截取到的标签是支持的BBCode，截取完整的标签对包含的内容，新建一个TextRun，设置其对应的格式属性，将字符index移到该标签对结束位置。TextRun的文本为该标签对文本，但不包含标签本身。如果StringBuilder有内容，在新建一个富文本TextRun之前，先建一个纯文本的TextRun。
   3. 一个TextRun里面可能还包含标签，使用递归进行解析，直到不包含标签为止。
   4. 遍历结束后，如果StringBuilder不为空，添加一个纯文本TextRun。
   
   代码：

   ```vb
   Private Sub ParseRun(run As TextRun) As List
       Dim runs As List
       runs.Initialize
       If run.text = "" Then
           Return runs
       End If
       Dim str As String = run.text
       Dim plainText As StringBuilder
       plainText.Initialize
       For index=0 To str.Length-1
           If CurrentChar(str,index)="[" Then
               Dim tagContent As String = TextUntil("]",str,index)
               Dim codeName As String = GetBBCodeName(tagContent)
               If codeName <> "" And tagContent.Contains("/") = False Then
                   Dim text As String = plainText.ToString
                   If text <> "" Then
                       runs.Add(CreateRun(text,run,"",""))
                   End If
                   plainText.Initialize
                   Dim endTag As String = "[/"&codeName&"]"
                   Dim runText As String = TextUntil(endTag,str,index)
                   If runText<>"" Then
                       index = index + runText.Length - 1
                       runText = CodePairStripped(runText,tagContent,endTag)                
                       Dim richRun As TextRun = CreateRun(runText,run,codeName,tagContent)
                       Dim innerRuns As List
                       innerRuns.Initialize
                       parseInnerRuns(richRun,innerRuns)
                       runs.AddAll(innerRuns)
                   End If
               End If
           Else
               plainText.Append(CurrentChar(str,index))
           End If
       Next
       Dim text As String = plainText.ToString
       If text <> "" Then
           runs.Add(CreateRun(text,run,"",""))
       End If
       Return runs
   End Sub

   Private Sub parseInnerRuns(run As TextRun,runs As List)
       Dim parsedRuns As List  = ParseRun(run)
       If parsedRuns.Size = 1 Then ' no tags
           runs.Add(parsedRuns.Get(0))
       Else
           For Each innerRun As TextRun In parsedRuns
               parseInnerRuns(innerRun,runs)
           Next
       End If
   End Sub


   '[b]Hello [i]world[/i][/b] -> Hello [i]world[/i]
   Private Sub CodePairStripped(runText As String,tagContent As String,endTag As String) As String
       runText = runText.Replace(tagContent,"")
       runText= runText.Replace(endTag,"")
       Return runText
   End Sub

   'text:[color=#ff00ff]Red[/color],codeName:color,tagContent:[color=#ff00ff]
   private Sub CreateRun(text As String,parentRun As TextRun,codeName As String,tagContent As String) As TextRun
       Dim run As TextRun
       run.Initialize
       run.text = text
       
       If parentRun.IsInitialized Then
           run.bold = parentRun.bold
           run.color = parentRun.color
           run.italic = parentRun.italic
       End If
       
       If codeName = "b" Then
           run.bold = True
       else if codeName = "i" Then
           run.italic = True
       else if codeName = "color" Then
           run.color = ParseColor(tagContent)
       End If
       Return run
   End Sub

   'parse [color=#ff0000] and return the rgb value 255,0,0
   private Sub ParseColor(tagContent As String) As String
       Try
           Dim hex As String
           hex = tagContent.SubString2(tagContent.IndexOf("=")+1,tagContent.Length-1)
           Dim r As Int = Bit.ParseInt(hex.SubString2(1,3), 16)
           Dim g As Int = Bit.ParseInt(hex.SubString2(3,5), 16)
           Dim b As Int = Bit.ParseInt(hex.SubString2(5,7), 16)
           Return r&","&g&","&b
       Catch
           Log(LastException)
       End Try
       Return ""
   End Sub
   
   private Sub GetBBCodeName(str As String) As String
       Dim matcher As Matcher = Regex.Matcher("\[/?(.*?)]",str)
       If matcher.Find Then
           Dim match As String = matcher.Group(1)
           If match.Contains("=") Then
               match = match.SubString2(0,match.IndexOf("="))
           End If
           If supportedBBCodes.IndexOf(match) <> -1 Then
               Return match
           End If
       End If
       Return ""
   End Sub

   private Sub TextUntil(EndStr As String,str As String,index As Int) As String
       Dim sb As StringBuilder
       sb.Initialize
       Dim textLeft As String=str.SubString2(index,str.Length)
       If textLeft.Contains(EndStr) Then
           For i=index To str.Length - EndStr.Length
               Dim s As String=str.CharAt(i)
               If str.SubString2(i,i + EndStr.Length) = EndStr Then
                   sb.Append(EndStr)
                   Exit
               Else
                   sb.Append(s)
               End If
           Next
       End If
       Return sb.ToString
   End Sub

   private Sub CurrentChar(str As String,index As Int) As String
       Return str.CharAt(index)
   End Sub
   ```


测试项目代码：

<https://github.com/xulihang/BBCodeRichText>
