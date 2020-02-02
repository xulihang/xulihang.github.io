---
date: 2019-11-12 10:59:50+08:00
layout: post
title: BasicCAT开发笔记（十五）：全文检索
categories: 技术随笔
tags: CAT
---

在BasicCAT中，全文检索主要有两个用途：1. 在模糊匹配过程中先筛选出包含部分关键词的句子，减少需要计算编辑距离的句子数量，提高匹配响应速度。2. 加强翻译记忆管理器的检索功能。

此前写的相关文章：

* [SQLite全文检索](/sqlite-full-text-search/)
* [翻译记忆服务器探究 ](/exploration-of-translation-memory-servers/)

这里主要基于B4X的KeyValueStore改造出一个专门的TMDB类，在数据库中增加启用SQLite FTS全文检索的表，并提供翻译记忆检索的相关操作。

下面是具体添加的内容：

1. 初始化时添加一个FTS的Virtual Table，包含三列内容，原文，分词后的原文和译文

	```vb
	Private Sub CreateTable
		sql1.ExecNonQuery("CREATE TABLE IF NOT EXISTS main(key TEXT PRIMARY KEY, value NONE)")
		sql1.ExecNonQuery("CREATE VIRTUAL TABLE IF NOT EXISTS idx USING fts4(key, source, target, notindexed=key)")
	End Sub
	```

2. 打开旧的数据库时会使用原有数据建立新的索引表

	```vb
	Sub Initialize 
	   '...
	   
		If checkIsFTSEnabled=False Then
			CreateTable
			createIdx
		Else
			CreateTable
		End If
	End Sub

	Sub checkIsFTSEnabled As Boolean
		Try
			sql1.ExecQuery("SELECT * FROM idx")
			Return True
		Catch
			Log(LastException)
			Return False
		End Try
	End Sub
	```

3. 预先分词

	因为sqlite-jdbc的Sqlite不支持中文分词，只能事先进行分词。这里把汉语分为每个单字，并不包含多个字组成的词。

	根据语言代码分词：

	```vb
	Sub getStringForIndex(source As String,lang As String) As String
		Dim sb As StringBuilder
		sb.Initialize
		Dim words As List=LanguageUtils.TokenizedList(source,lang)
		For index =0 To words.Size-1
			sb.Append(words.Get(index)).Append(" ")
		Next
		Return sb.ToString.Trim
	End Sub
	```

	添加条目：

	```vb
	Public Sub Put(source As String, targetMap As Map)
		Dim ser As B4XSerializator
		Dim bytes() As Byte=ser.ConvertObjectToBytes(targetMap)
		sql1.ExecNonQuery2("INSERT OR REPLACE INTO main VALUES(?, ?)", Array (source,bytes))
		sql1.ExecNonQuery2("INSERT OR REPLACE INTO idx VALUES(?, ?, ?)", Array (source,getStringForIndex(source,sourceLang),getStringForIndex(targetMap.Get("text"),targetLang)))
	End Sub
	```

4. 检索

	模糊匹配时，因为是以原文句子为检索内容，寻找包含原文词语多的句子，需要将原来的句子拆分为词，并用OR操作符连接。

	而检索翻译记忆时，则是根据用户输入的词汇进行检索，需要AND操作符连接。


	生成检索表达式：


	```vb
	Sub getQuery(words As List,operator As String) As String
		Dim sb As StringBuilder
		sb.Initialize
		For index =0 To words.Size-1
			Dim word As String=words.Get(index)
			If word.Trim<>"" Then
				sb.Append(word)
				If index<>words.Size-1 Then
					sb.Append(" "&operator&" ") ' AND OR NOT
				End If
			End If
		Next
		Return sb.ToString
	End Sub
	```

	获得检索结果，检索翻译记忆时matchAll是True，同时检索原文和译文，模糊匹配时matchAll是False，只检索原文：


	```vb
	Public Sub GetMatchedMapAsync(text As String,isSource As Boolean,matchAll As Boolean) As ResumableSub
		Dim sqlStr As String
		Dim matchTarget As String
		Dim operator As String
		Dim lang As String
		Dim words As List
		words.Initialize
		If isSource Then
			lang=sourceLang
			matchTarget="source"
		Else
			lang=targetLang
			matchTarget="target"
		End If
		If matchAll Then
			matchTarget="idx"
			operator="AND"
			If text.StartsWith($"""$) And text.EndsWith($"""$) Then
				words.Add(text)
			Else
				words=getWordsForAll(text)
			End If
		Else
			operator="OR"
			words=LanguageUtils.TokenizedList(text,lang)
		End If
		text=getQuery(words,operator)
		
		sqlStr="SELECT key, rowid, quote(matchinfo(idx)) as rank FROM idx WHERE "&matchTarget&" MATCH '"&text&"' ORDER BY rank DESC LIMIT 1000 OFFSET 0"
		Log(sqlStr)
		Dim SenderFilter As Object = sql1.ExecQueryAsync("SQL", sqlStr, Null)
		Wait For (SenderFilter) SQL_QueryComplete (Success As Boolean, rs As ResultSet)
		Dim resultMap As Map
		resultMap.Initialize
		Dim result As Object = Null
		If Success Then
			Do While rs.NextRow
				result=GetDefault(rs.GetString2(0),Null)
				If result<>Null Then
					resultMap.Put(rs.GetString2(0),result)
				Else
					Log("not exist")
					DeleteIdxRow(rs.GetInt2(1))
				End If
			Loop
			rs.Close
		Else
			Log(LastException)
		End If
		Return resultMap
	End Sub
	```

5. 多个词语匹配结果的高亮展示

	用`<--->`包裹匹配的词语，用正则得到匹配词和其它部分相分割的列表，可用于在Searchview中高亮显示。

	```vb
	Sub splitByStrs(strs() As String,text As String) As List
		For Each str As String In strs
			Dim matcher As Matcher
			matcher=Regex.Matcher(str.ToLowerCase,text.ToLowerCase)
			Dim offset As Int=0
			Do While matcher.Find
				Dim startIndex,endIndex As Int
				startIndex=matcher.GetStart(0)+offset
				endIndex=matcher.GetEnd(0)+offset
				text=text.SubString2(0,endIndex)&"<--->"&text.SubString2(endIndex,text.Length)
				text=text.SubString2(0,startIndex)&"<--->"&text.SubString2(startIndex,text.Length)
				offset=offset+"<--->".Length*2
			Loop
		Next
		Dim result As List
		result.Initialize
		For Each str As String In Regex.Split("<--->",text)
			result.Add(str)
		Next
		Return result
	End Sub
	```
	
6. 中英混合检索

	有的时候检索内容同时包含中文和英文，这时需要对中文和英文进行区别处理。

	比如对于这么一条检索内容：
	"computer 电脑"，需要拆分为computer、电、脑这三个检索词。

	我们先用空格进行拆分，得到computer和电脑，之后根据汉字是多字节字符的特点，去除汉字结果。

	```vb
	Sub removeMultiBytesWords(words As List)
		Dim newList As List
		newList.Initialize
		For Each word As String In words
			If word.Length>1 Then
				If getBytesLength(word.CharAt(0))>1 Then
					Continue
				End If
			End If
			newList.Add(word)
		Next
		words.Clear
		words.AddAll(newList)
	End Sub
	```

	然后再把检索内容拆分为单字，并去掉单个英文字母的结果。

	```vb
	Sub removeCharacters(source As List)
		Dim newList As List
		newList.Initialize
		For Each text As String In source
			If text.Length=1 Then
				If Regex.IsMatch("[a-z]",text.ToLowerCase)=True Then
					Continue
				End If
			End If
			newList.Add(text)
		Next
		source.Clear
		source.AddAll(newList)
	End Sub
	```
	
更新：

基于SQLite的全文检索，开发了一个在线翻译记忆检索器：[地址](/online-translation-memory-search/)
