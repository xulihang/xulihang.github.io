---
date: 2019-06-23 16:44:50+08:00
layout: post
title: Photoshop文档本地化脚本
categories: 技术随笔
tags: CAT
---

因为Photoshop使用的PSD格式并不是开放的格式，我们只有使用脚本工具将文字进行导入和导出。

Adobe的全系列产品基本都提供了脚本的支持，Photoshop支持使用三种语言编写脚本：用于macOS的AppleScript、用于Windows的VBScript以及两个平台都能用的JavaScript。

详细内容见官方文档：[Adobe Photoshop Scripting](https://www.adobe.com/devnet/photoshop/scripting.html)

我这里针对Windows平台，主要参考了VBScript的文档。VBScript是通过操作COM来完成任务的，所以我们也可以使用其他编程语言，比如Autoit、Java+Jacob等等，能操作COM就行。我习惯了Autoit，于是这次还是使用它来编写工具。

1. 将目录下所有PSD文档中的文字图层的内容导出，内容保存为txt，以psd的文件名命名。因为内容以换行分割，而原来图层的文本可能有换行，所以如果使用图层文本需要对换行做处理。这时可以选择使用文字图层的名字，基本上名词和内容是一样的，只是换行变成了空格。很多文字图层被包括进了组(LayerSet)里，这时还要使用递归遍历所有组里面的文字图层。

	```autoit
	#include <FileConstants.au3>
	#include <File.au3>

	Local $aFileList = _FileListToArray(@WorkingDir, "*.psd", $FLTA_FILES, True)
	If @error = 1 Then
	   MsgBox($MB_SYSTEMMODAL, "", "Path was invalid.")
	   Exit
	EndIf
	If @error = 4 Then
	   MsgBox($MB_SYSTEMMODAL, "", "No file(s) were found.")
	   Exit
	EndIf

	Dim $text=""
	For $i=1 to $aFileList[0]
	   $psdName=$aFileList[$i]
	   $fileName=StringReplace($psdName,".psd","",-1, $STR_NOCASESENSE)
	   ConsoleWrite("filename"&$fileName)
	   $text=""
	   Export($fileName)
	Next

	Func Export($fileName)
	   $app = ObjCreate("Photoshop.Application")
	   $doc=$app.open($fileName&".psd")
	   Local $hFileOpen = FileOpen($fileName&".txt", $FO_OVERWRITE)

	   If $hFileOpen = -1 Then
		  MsgBox($MB_SYSTEMMODAL, "", "An error occurred when reading the file.")
		  Return False
	   EndIf

	   $LayerSets=$doc.LayerSets
	   $ArtLayers=$doc.ArtLayers
	   handleLayerSets($LayerSets)
	   handleArtLayers($ArtLayers)
	   FileWrite($hFileOpen, $text)
	   FileClose($hFileOpen)
	   $doc.close()
	EndFunc

	Func handleLayerSets($LayerSets)
	   For $i=1 to $LayerSets.Count
		  $LayerSet=$LayerSets.Item($i)
		  handleArtLayers($LayerSet.ArtLayers)
		  handleLayerSets($LayerSet.LayerSets)
	   Next
	EndFunc


	Func handleArtLayers($ArtLayers)
	   For $i=1 to $ArtLayers.Count
		  $artLayer=$ArtLayers.Item($i)
		  if $artLayer.Kind=2 Then
			ConsoleWrite("name:" & $artLayer.name & @CRLF)
			Dim $content = $artLayer.name
			$content=StringRegExpReplace($content,"\r","<r/>")
			$content=StringRegExpReplace($content,"\n","<n/>")
			$content=StringReplace($content," ","")
			ConsoleWrite($content& @CRLF)
			$text=$text & $content & @CRLF ;& $Layer.name & @TAB
		  EndIf
	   Next
	EndFunc
	```


2. 将翻译导回每个PSD文档，根据每个图层的名字查找对应的翻译，相当于供完全匹配翻译记忆。除了单纯的文本替换，如果原来使用的字体不适用于译文，还要进行字体的修改。

	```autoit
	#include <FileConstants.au3>
	#include <File.au3>

	Local $oDictionary
	$oDictionary = ObjCreate("Scripting.Dictionary")

	Local $fsFileOpen = FileOpen("font.txt", $FO_READ)
	Local $font = ""
	If $fsFileOpen <> -1 Then
	   $font=FileRead($fsFileOpen)
	EndIf

	Local $aFileList = _FileListToArray(@WorkingDir, "*.psd", $FLTA_FILES, True)
	If @error = 1 Then
	   MsgBox($MB_SYSTEMMODAL, "", "Path was invalid.")
	   Exit
	EndIf
	If @error = 4 Then
	   MsgBox($MB_SYSTEMMODAL, "", "No file(s) were found.")
	   Exit
	EndIf


	Local $hFileOpen = FileOpen("完整版记忆.txt", $FO_READ)
	If $hFileOpen = -1 Then
	   MsgBox($MB_SYSTEMMODAL, "", "An error occurred when reading the file.")
	   Return False
	EndIf

	While True
	   $line=FileReadLine($hFileOpen)
	   if @error Then ExitLoop
	   $source=StringLeft($line, StringInStr($line,@TAB)-1)
	   $text=StringRight($line, StringLen($line) - StringInStr($line,@TAB))
	   if $source<>"" Then
		  $oDictionary.Add($source, $text)
	   EndIf
	WEnd

	FileClose($hFileOpen)


	 For $i=1 to $aFileList[0]
		$psdName=$aFileList[$i]
		$fileName=StringReplace($psdName,".psd","",-1, $STR_NOCASESENSE)
		ConsoleWrite("filename"&$fileName)
		$txtName=$fileName&".txt"
		if FileExists($txtName) Then
			ConsoleWrite($txtName)
			Import($fileName)
		EndIf
	 Next



	 Func Import($fileName)
	   $app = ObjCreate("Photoshop.Application")
	   $doc = $app.open($fileName&".psd")


	   $LayerSets=$doc.LayerSets
	   $ArtLayers=$doc.ArtLayers
	   handleLayerSets($LayerSets)
	   handleArtLayers($ArtLayers)


	   ;$doc.Save()
	   ;SaveAs($doc,$filename)
	   ;$doc.close()
	EndFunc

	Func handleLayerSets($LayerSets)
	   For $i=1 to $LayerSets.Count
		  $LayerSet=$LayerSets.Item($i)
		  handleArtLayers($LayerSet.ArtLayers)
		  handleLayerSets($LayerSet.LayerSets)
	   Next
	EndFunc

	Func handleArtLayers($ArtLayers)
	   ConsoleWrite("handling")
	   For $i=1 to $ArtLayers.Count
		  $ArtLayer=$ArtLayers.Item($i)
		  if $ArtLayer.Kind=2  Then
			 $source=$ArtLayer.name
			 $source=StringRegExpReplace($source,"\r","<r/>")
			 $source=StringRegExpReplace($source,"\n","<n/>")
			 $source=StringReplace($source," ","")
			 if $oDictionary.Exists($source) Then
				$ArtLayer.textItem.Contents = $oDictionary.Item($source)
				if $font<>"" Then
				   $ArtLayer.textItem.Font= "NotoSansHans-Regular"
				EndIf
				$ArtLayer.textItem.Justification=2 ;center
				$ArtLayer.textItem.Capitalization=2 ;capcase
				$ArtLayer.textItem.Kind=2 ;paragraph
			 Endif
		  EndIf
	   Next
	EndFunc

	 Func SaveAs($doc,$filename)
		Dim $ObjSaveOptions=ObjCreate("Photoshop.JPEGSaveOptions")
		;if @error Then Exit
		With $ObjSaveOptions
		   .EmbedColorProfile = True
		   .FormatOptions = 1
		   .Matte = 1
		   .Quality = 1
		EndWith
		Dim $path
		$path=$filename&".jpg"
		ConsoleWrite($path&@CRLF)
		$doc.SaveAS($path,$ObjSaveOptions,True,2)
	 EndFunc
	```

Adobe给了参考文档，但没有一个很好的脚本编辑器，只能根据文档查询各种对象和方法，开发稍微不方便一点。

相关链接：

* [Automate adobe photoshop](https://www.autoitscript.com/forum/topic/143283-automate-adobe-photoshop/)
* [Adobe Photoshop UDF](https://www.autoitscript.com/forum/topic/183601-adobe-photoshop-udf/)

