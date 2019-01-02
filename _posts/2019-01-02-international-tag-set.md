---
date: 2019-01-02 11:19:50+08:00
layout: post
title: 国际化标签集ITS
categories: 技术随笔
tags: CAT
---

国际化标签集（International Tag Set，ITS，[文档](https://www.w3.org/TR/its20/)）是w3c组织制定的一套本地化XML文件的标准，可以用来定义XML文件中哪些元素是需要翻译的，哪些是不需要的。也可以根据本地化的需要，补充元素的相关信息。

比如我们要翻译以下一个表示留言的xml文档：

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<!--  Copyright w3school.com.cn -->
<note>
	<to>George</to>
	<from>John</from>
	<heading>Reminder</heading>
	<body>Don't forget the meeting!</body>
</note> 
```

我们希望设置收件人和寄件人的名字为不需要翻译的内容，可以增加ITS信息，变成如下的内容：

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<!--  Copyright w3school.com.cn -->
<note xmlns:its="http://www.w3.org/2005/11/its" 
  its:version="2.0">
    <its:rules version="2.0">
      <its:translateRule selector="/note/to" translate="no"/>
    </its:rules>
	<to>George</to>
	<from its:translate="no">John</from>
	<heading>Reminder</heading>
	<body>Don't forget the meeting!</body>
</note> 
```

ITS的规则有全局规则和本地规则两种。全局规则在its元素里定义，使用XPath或者CSS-Selector等规则选择元素。本地规则直接作为元素的属性添加即可。

ITS规则还可以用于HTML5。不过HTML5也有自己的本地化属性translate。以下是一个示例：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset=utf-8>
    <title>Translate flag global rules example</title>
    <script type=application/its+xml id=ru1>
      <its:rules version="2.0" xmlns:its="http://www.w3.org/2005/11/its"
           xmlns:h="http://www.w3.org/1999/xhtml">
      <its:translateRule translate="no" selector="//h:code"/>
    </its:rules>
    </script>
  </head>
  <body>
    <p>This sentence should be translated, but code names like
      the <code>span</code> element should not be translated.
      Of course there are always exceptions: certain
      code values should be translated, e.g. to a value in
      your language like <code translate=yes>warning</code>.</p>
  </body>
</html>
```

标准需要具体的工具来实现，Okapi的XML和HTML Filter提供了对ITS标签的支持（[wiki](http://okapiframework.org/wiki/index.php?title=Open_Standards#ITS_-_Internationalization_Tag_Set)）。

比如以下内容：

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<doc>
 <its:rules xmlns:its="http://www.w3.org/2005/11/its" version="1.0">
  <its:translateRule selector="//head" translate="no"/>
  <its:withinTextRule selector="//b|//code|//img" withinText="yes"/>
 </its:rules>
 <head>
  <update>2009-03-21</update>
  <author>Mirabelle McIntosh</author>
 </head>
 <body>
  <p>Paragraph with <img ref="eg.png"/> and <b>bolded text</b>.</p>
  <p>Paragraph with <code>data codes</code> and text.</p>
 </body>
</doc>
```

使用Okapi可以转换为如下的xliff文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2" xmlns:okp="okapi-framework:xliff-extensions" xmlns:its="http://www.w3.org/2005/11/its" xmlns:itsxlf="http://www.w3.org/ns/its-xliff/" its:version="2.0">
<file original="test.xml" source-language="en-US" target-language="zh-CN" datatype="xml">
<body>
<trans-unit id="1">
<source xml:lang="en-US">Paragraph with <x id="1"/> and <g id="2">bolded text</g>.</source>
<target xml:lang="zh-CN">Paragraph with <x id="1"/> and <g id="2">bolded text</g>.</target>
</trans-unit>
<trans-unit id="2">
<source xml:lang="en-US">Paragraph with <g id="1">data codes</g> and text.</source>
<target xml:lang="zh-CN">Paragraph with <g id="1">data codes</g> and text.</target>
</trans-unit>
</body>
</file>
</xliff>
```

ITS为本地化XML文件提供了一个很好的标准，不过目前来看，似乎没有得到广泛的应用。






