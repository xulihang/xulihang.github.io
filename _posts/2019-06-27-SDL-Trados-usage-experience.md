---
date: 2019-06-27 14:35:50+08:00
layout: post
title: SDL Trados使用踩坑
categories: 技术随笔
tags: CAT
---

虽然不喜欢用Trados，奈何部门的人都要用它，只好将就用一下，碰到各种坑，这里总结一下。

1. 术语库的制备

	Trados使用的术语库需要用Multiterm制作。

	具体操作流程是用MultiTerm Convert转换原格式文件为导入术语库用的特殊XML格式文件，然后用MultiTerm导入这一生成的XML文件。

	详细内容可以见这篇文章：[How to import a bilingual Excel glossary into MultiTerm – for use in Trados Studio](http://foxdocs.biz/BetweenTranslations/how-to-import-a-bilingual-excel-glossary-into-multiterm-for-use-in-trados-studio/)
	
	这里的一个坑就是导入的XLSX文件，要有表头，而且表头的名字要使用Multiterm术语库里定义的语言的名字，比如Chinese和English，否则导入失败，提示以下错误（错误中的表头我设置成了“中文”）：

	```
	-1	Does not conform to the target termbase definition.
	   Reason: 找不到输出表 'I_中文' 。
	   Source: MultiTerm150.Server.Termbase15.0
	```
	
	搜了下错误内容，发现proz上08年就有这一错误的讨论：[Does not conform to the target termbase definition](https://www.proz.com/forum/sdl_trados_support/105434-does_not_conform_to_the_target_termbase_definition.html)
	
   另一种方法是使用Glossary Converter，参加下一条。

2. 翻译记忆库的制备

	Trados只能导入ttx、tmx等双语格式的文档，不支持tab分割的txt和excel。这时一般Trados用户的做法是从SDL OpenExchange（现在叫SDL AppStore）下载Glossary Converter。这个工具可以转换Excel表格为Trados支持的翻译记忆和术语库格式。
	
3. 内嵌内容处理器

	Trados可以使用正则来处理文本中的标签。比如Excel文件常被用作数据库，单元格内会存储各种带标签的内容，有HTML标签，也有其他自定义标签。内容可以用正则识别，但是怎么处理有颇多的设置。比如标记里的内容是不是要翻译，最终显示在编辑器的内容需要什么样的设置等等。
	
	另外在写正则式时要注意转义，比如$是需要转义的。
	
	