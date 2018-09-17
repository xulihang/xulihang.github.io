---
date: 2018-09-17 14:17:50+08:00
layout: post
title: IDML格式分析
categories: 技术随笔
tags: 出版
---

IDML是Adobe开发的桌面出版软件InDesign使用的文件格式，基于XML，由INX发展而来。INDD是现在版本InDesign的默认格式，导出IDML可以供旧版InDesign使用。

因为IDML基于XML，可以较为方便的为其它软件读取，并自动进行文件生成和处理。开源的DTP工具Scribus在1.5版中添加了对IDML的支持。而主流的CAT软件也都支持翻译IDML文件。

关于IDML的具体信息，可以参见Adobe Indesign CS6 SDK的相关文件：

1. IDML Cookbook: <http://wwwimages.adobe.com/content/dam/acom/en/devnet/indesign/sdk/cs6/idml/idml-cookbook.pdf>
2. IDML Specification: <http://wwwimages.adobe.com/content/dam/acom/en/devnet/indesign/sdk/cs6/idml/idml-specification.pdf>
3. 完整的SDK：<https://www.adobe.com/devnet/indesign/sdk/eula_cs6.html>

# 相关概念

一些InDesign中使用的术语：

Spread：一个对页，可以由1到n页组成。一般是两页。创建文件时，需要勾选facing pages来启用两页一个对页的模式。

Story：文字框中的文本。



# 示例

我们这里新建一个5页的Document，使用对页，然后在第二、三页上画5个文字框，然后导出为IDML。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/indesign_example.png)

IDML文件是一个zip压缩的文件夹，里面包含了功能不同的xml文件。解压IDML，可看到文件的结构如下：

```
.
├── META-INF
│   ├── container.xml
│   └── metadata.xml
├── MasterSpreads
│   └── MasterSpread_udd.xml
├── Resources
│   ├── Fonts.xml
│   ├── Graphic.xml
│   ├── Preferences.xml
│   └── Styles.xml
├── Spreads
│   ├── Spread_uc8.xml
│   ├── Spread_uce.xml
│   └── Spread_ucf.xml
├── Stories
│   ├── Story_u106.xml
│   ├── Story_u11d.xml
│   ├── Story_u134.xml
│   ├── Story_u151.xml
│   └── Story_ued.xml
├── XML
│   ├── BackingStory.xml
│   └── Tags.xml
├── designmap.xml
└── mimetype
```

我们需要关注的是designmap.xml、Stories和Spreads。

designmap.xml包含了一个Document标签，里面又用idPkg标签包含了spreads、stories和resources里的各种设置文件。

导出的idml里的内容很啰嗦，其实一个简单designmap.xml只需以下内容（例子来自cookbook）：

```
<?xml version="1.0" encoding="utf-8"?>
<?aid style="50" type="document" readerVersion="6.0" featureSet="257"?>
<Document 
xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging"
DOMVersion="7.0" Self="d">
    <idPkg:Spread src="Spreads/Spread_spread1.xml"/> 
    <idPkg:Story src="Stories/Story_story1.xml"/>
</Document>
```

然后是stories文件，内容也很简单。其中Self属性可以便于不同文本框引用同样的内容。

```
<?xml version="1.0" encoding="utf-8"?>
<idPkg:Story xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging"
DOMVersion="7.0"> 
<Story Self="story1">
    <Content>Hello World!</Content> 
</Story>
</idPkg:Story>
```

如果Content是页码，对应的内容是`<?ACE 18?>`。

最后是Spread文件：

```
<?xml version="1.0" encoding="utf-8"?>
<idPkg:Spread xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging"
DOMVersion="7.0">
<Spread Self="spread_1" PageCount="1">
<TextFrame Self="textframe1" ParentStory="story1" ContentType="TextType" ItemTransform="1 0 0 1 -612 -396">
                       <Properties>
                           <PathGeometry>
<GeometryPath PathOpen="false"> <PathPointArray>
<PathPoint Anchor="36 36" LeftDirection="36 36" RightDirection="36 36"/>
<PathPoint Anchor="36 186" LeftDirection="36 186" RightDirection="36 186"/>
<PathPoint Anchor="172 186" LeftDirection="172 186" RightDirection="172 186"/>
<PathPoint Anchor="172 36" LeftDirection="172 36" RightDirection="172 36"/>
                                       </PathPointArray>
                                   </GeometryPath>
                               </PathGeometry>
                           </Properties>
                       </TextFrame>
               </Spread>
           </idPkg:Spread>
```

其中PageCount代表这个对页里有多少页，TextFrame里的ParentStory对应的使用的Story的ID。注意，这里TextFrame出现的顺序是按生成TextFrame的顺序来的，不是页面中从左上到右下这样的位置顺序。

IDML里的定位（geometry）比较复杂，有ItemTransform和PathPoint这些概念。首先，idml里是以中心为原点的，如下图所示：

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/idml_coordinate.png)

坐标是ItemTransform属性中后面的两个数值，分别是x坐标和y坐标。而前面的1 0 0 1表示方向。而PathGeometry的内容则定义了形状的大小。

以上只是大致的介绍，在上面列出的资料中有更详细的说明。
