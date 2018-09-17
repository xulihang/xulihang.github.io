---
date: 2018-09-17 16:23:50+08:00
layout: post
title: 使用Applescript自动导出Indesign文件为PDF
categories: 技术随笔
tags: 出版
---

因为专业人士大多是在mac上使用InDesign的，我主要研究了如何在mac上批量处理indesign文件。以下是appplescript代码，实现打开idml并导出为pdf：

```applescript
tell application "Adobe InDesign CC 2018"
	set theDesk to path to desktop as string
	set filePath to theDesk & "test.idml"
	set outPath to theDesk & "out.pdf"
	set myDocument to open filePath
	tell active document
		export format PDF type to outPath without showing options
	end tell
	close active document saving no
end tell
```

在终端运行代码文件：

```
$ osascript exportIndesign.scpt
```

更多复杂操作见Adobe的文档：Adobe InDesign CS6 Scripting Guide: AppleScript  <https://www.adobe.com/content/dam/acom/en/devnet/indesign/sdk/cs6/scripting/InDesign_ScriptingGuide_AS.pdf>

