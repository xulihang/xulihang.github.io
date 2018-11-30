---
date: 2018-11-30 10:00:50+08:00
layout: post
title: B4X技术解析——CloudKVS
categories: 技术随笔
tags: B4X
---

[KeyValueStore](https://www.b4x.com/android/forum/threads/b4x-keyvaluestore-2-simple-powerful-local-datastore.63633/)是B4X的一个跨平台类库，它对sqlite方法进行封装，使得我们可以像使用map一样，用键/值的形式读取和存储数据。数据存储在sqlite里可以永久保存，同时可以享受sqlite的高性能。

KeyValueStore的Value是使用B4XSerializator生成的二进制数据，这样数据可以在iOS/Android/Jre等多个平台上进行交换，Value可以是b4x的map、list、bytes、string和用户定义的类型等等。

而[cloudkvs](https://www.b4x.com/android/forum/threads/b4x-cloudkvs-synchronized-key-value-store.63536/#content)是基于KeyValueStore进行修改而来的支持与服务器进行数据同步的类库。

![](https://www.b4x.com/basic4android/images/SS-2016-02-15_13.23.32.png)

用户可以在本地存储数据，如果联网的话，把修改的数据同步到服务器，同时也定时从服务器获得修改过的数据。下面我们来解析代码。

B4J服务器端：

主要由三个文件组成，main、action和db。

main类里可以通过传递的参数设定端口，添加了一个叫Action的Handler用来接收更新数据或者获得更新数据的请求。DB负责相关数据库的操作。

数据库的分析：

我们看服务器端db文件的代码，首先是数据库的创建，开启wal模式，创建一个叫data的表，表里的字段分别是user，key，value，id，time。数据库的主键是user和key。另外还根据id建立了索引。其中id记录了添加记录的总次数，这样可以检索到最后一次添加的记录。

```vb
Private Sub CreateDatabase
	If sql.ExecQuerySingleResult("SELECT count(name) FROM sqlite_master WHERE type='table' AND name='data'") = 0 Then
		sql.ExecNonQuery("PRAGMA journal_mode = wal") 'best mode for multithreaded apps.
		Log("Creating new database!")
		Log($"journal mode: ${sql.ExecQuerySingleResult("PRAGMA journal_mode")}"$)
		sql.ExecNonQuery("CREATE TABLE data (user TEXT, key TEXT, value BLOB, id INTEGER, time INTEGER, PRIMARY KEY (user, key))")
		sql.ExecNonQuery("CREATE INDEX id_index ON data (id)")
	End If
End Sub
```

使用SqliteSpy查看如下：

![](/album/B4X/cloudkvs_item.png)

添加数据的代码如下，它会获得上次修改的id并加1，添加新的条目。如果这个条目是3分钟前添加到客户端数据库的，有可能已经在服务器里存了更新的数据，如果发现更新的数据就不进行添加。

```vb
Public Sub AddItem(item As Item)
	lock.WriteLock
	Try
		Dim lastId As String = sql.ExecQuerySingleResult2("SELECT max(id) FROM data WHERE user = ?", Array(item.UserField))
		If lastId = Null Then lastId = 0
		Dim id As Long = lastId + 1
		If item.TimeField < DateTime.Now - 3 * DateTime.TicksPerMinute Then
			Log("checking old record")
			'this is an old record. Maybe there is a newer one...
			Dim rs As ResultSet = sql.ExecQuery2("SELECT time, value FROM data WHERE user = ? AND key = ?", Array(item.UserField, item.KeyField))
			If rs.NextRow Then
				Dim currentTime As Long = rs.GetLong("time")
				If currentTime > item.TimeField Then
					Log("Old record discarded.")
					item.ValueField = rs.GetBlob("value")
					item.TimeField = currentTime
				End If
			End If
			rs.Close
		End If
		
		sql.ExecNonQuery2("INSERT OR REPLACE INTO data VALUES (?, ?, ?, ?, ?)",  _
			Array (item.UserField, item.KeyField, item.ValueField, id, Min(item.TimeField, DateTime.Now)))
	Catch
		Log(LastException)
	End Try
	lock.WriteRelease
End Sub
```

以下代码从服务器获得条目，获取的是服务器的数据库有，本地数据库没有的条目，根据lastid进行判断。

```vb
Public Sub GetUserItems (user As String, lastId As Int) As List
	Dim items As List
	items.Initialize
	Dim rs As ResultSet = sql.ExecQuery2("SELECT key, value, id, time FROM data WHERE user = ? AND id > ?", Array(user, lastId))
	Do While rs.NextRow
		Dim item As Item
		item.Initialize
		item.UserField = user
		item.KeyField = rs.GetString("key")
		item.ValueField = rs.GetBlob("value")
		item.idField = rs.GetLong("id")
		item.TimeField = rs.GetLong("time")
		items.Add(item)
	Loop
	rs.Close
	Return items
End Sub
```

Action Handler根据传递过来的数据判断进行获取条目还是添加条目的操作。添加数据时，TaskItem.KeyField是键值，获取数据时则是lastid。

```vb
Sub Handle(req As ServletRequest, resp As ServletResponse)
	Dim task As Task = serializator.ConvertBytesToObject(Bit.InputStreamToBytes(req.InputStream))
	Log($"Task: ${task.TaskName}, User: ${task.TaskItem.UserField}, Key: ${task.TaskItem.KeyField}, IP: ${req.RemoteAddress}"$)
	If task.TaskName.StartsWith("getuser") Then
		'the lastid value is stored in the key field
		Dim items As List = DB.GetUserItems(task.TaskItem.UserField, task.TaskItem.KeyField)
		Dim bytes() As Byte = serializator.ConvertObjectToBytes(items)
		resp.OutputStream.WriteBytes(bytes, 0, bytes.Length)
	Else If task.TaskName = "additem" Then
		DB.AddItem(task.TaskItem)
	End If
End Sub
```

B4J客户端：

本地客户端的数据库除了存储数据的data表，还有一张存储队列的叫做queue的表。

```vb
Private Sub CreateDatabase
	If sql.ExecQuerySingleResult("SELECT count(name) FROM sqlite_master WHERE type='table' AND name='data'") = 0 Then
		Log("Creating new database!")
		sql.ExecNonQuery("CREATE TABLE data (user TEXT, key TEXT, value BLOB, id INTEGER, time INTEGER, PRIMARY KEY (user, key))")
		sql.ExecNonQuery("CREATE INDEX id_index ON data (id)")
		sql.ExecNonQuery("CREATE TABLE queue (qid INTEGER PRIMARY KEY AUTOINCREMENT, task BLOB, taskname TEXT, user TEXT, key TEXT)")
		sql.ExecNonQuery("CREATE INDEX id_index2 ON queue (user, key)")
	End If
End Sub
```

给本地数据库添加数据的同时，会在queue表中添加队列，用来把数据更新给服务器。

```vb

'Similar to Put. If the IsDefault parameter is set to True then the item will not replace an existing item on the server.
Public Sub Put2 (user As String, key As String, Value As Object, IsDefault As Boolean)
	Dim item As Item = CreateItem(user, key, ObjectToBytes(Value))
	If IsDefault Then item.TimeField = 0
	sql.BeginTransaction
	Try
		InsertItemIntoData(item, False)
		Dim task1 As Task
		task1.Initialize
		task1.TaskName = "additem"
		task1.TaskItem = item
		sql.ExecNonQuery2("DELETE FROM queue WHERE user = ? AND key = ?", Array (user, key))
		AddTaskToQueue(task1)
		sql.TransactionSuccessful
	Catch
#if B4J or B4I
		sql.Rollback
#end if
		Log(LastException)
	End Try
#if B4A
	sql.EndTransaction
#end if
	HandleQueue
End Sub
```

从服务器同步数据有一个定时器，定时添加获取数据的队列。

```vb
Private Sub AutoRefresh_Tick
	For Each user As String In AutoRefreshUsers
		If sql.ExecQuerySingleResult2("SELECT count(*) FROM queue WHERE taskname = ?", Array As String("getuser_" & user)) = 0 Then
			RefreshUser(user)	
		End If
	Next
End Sub

'Sends a refresh request for the given user.
Public Sub RefreshUser(user As String)
	Dim task1 As Task
	task1.Initialize
	task1.TaskName = "getuser_" & user
	Dim lastId As String = sql.ExecQuerySingleResult2("SELECT max(id) FROM data WHERE user = ?", Array As String(user))
	If lastId = Null Then lastId = 0
	task1.TaskItem = CreateItem(user, lastId, Null)
	AddTaskToQueue(task1)
	HandleQueue
End Sub
```

如果队列请求成功，则执行相关操作，并将其从队列中删除。如果失败则等待30秒后重试。

```vb
Private Sub HandleQueue
	If SendingJob = True Then
		Return
	End If
	Dim rs As ResultSet = sql.ExecQuery("SELECT qid, task, taskname FROM queue ORDER BY qid")
	If rs.NextRow Then
		Dim queue_id As Long = rs.GetLong("qid")
		Dim Job As HttpJob
		Job.Initialize("job", Me)
		Job.PostBytes(url,rs.GetBlob("task"))
		Job.Tag = CreateMap("queue_id": queue_id, "taskname": rs.GetString("taskname"))
		SendingJob = True
	End If
	
	rs.Close
End Sub

Private Sub JobDone(job As HttpJob)
	SendingJob = False
	If job.Success Then
		Dim m As Map = job.Tag
		Dim taskname As String = m.Get("taskname")
		Dim queue_id As Long = m.Get("queue_id")
		If taskname.StartsWith("getuser") Then
			changedItems.Clear
			Dim ser As B4XSerializator
			ser.Tag = m
			ser.ConvertBytesToObjectAsync(Bit.InputStreamToBytes(job.GetInputStream), "ser")
		Else
			DeleteFromQueue(queue_id)
			HandleQueue
		End If
	Else
		Log($"Error sending task: ${job.ErrorMessage}"$)
		csu.CallSubDelayedPlus(Me, "HandleQueue", 30000)
	End If
	job.Release
End Sub
```




