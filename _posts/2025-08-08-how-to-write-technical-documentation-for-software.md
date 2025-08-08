---
date: 2025-08-08 10:28:50+08:00
layout: post
title: 如何编写软件的技术文档
categories: 随笔
tags: 
---

软件的技术文档会详细记录软件的使用方式，为我们使用软件提供指导。

根据用法，软件可以分成很多类：

* 命令行软件
* 图形界面软件
* 软件类库/SDK

不同软件的文档的内容基本都是接近的，主要是各种指南，介绍如何操作软件，只是图形界面的软件截图会多一点。然后，软件类库或者SDK，会提供API文档。

下面我们会介绍下如何编写软件的技术文档。

## 工具选择

传统的文档形式有CHM、PDF、Word文档等等，使用FrameMaker、Microsoft Office等软件制作。

现在一般都是在线网页，有一系列的站点生成器，比如Sphinx、mkDocs、Docusaurus、Jekyll、GitBook等等，使用markdown、restructuredText等标记语言编写。这些工具通常还支持生成DITA、LaTex等文件。

针对API文档，也有专门的工具，可以直接根据程序源码生成文档，比如Sphinx、JSDoc、JavaDoc、Swagger等。

更多工具介绍可以见这篇文章：[技术传播领域的工具](https://blog.xulihang.me/tech-comm-tools/)。

## 内容安排

文档站点主要由目录树和内容页面构成。内容可以根据软件特点进行分类，比如软件介绍、使用指南、API文档、常见问题、变更记录等等。

API文档的内容安排上，除了单独的接口页面，还要有能显示所有接口列表的页面，方便浏览。

## 格式规范

技术文档通常需要遵循一定的规范。这里以JavaScript语言的API文档举例。

首先，API可以进行一个分类，比如按命名空间、类、接口、定义、事件、枚举进行划分。

然后不同类别的内容，也会有编写的规范。


命名空间主要列出它包含哪些静态方法、对象、类。

类主要包含它的属性、方法和继承关系。TypeScript中的接口（interface）和类相近。

事件主要描述它包含哪些参数，要怎么绑定事件。


### 示例文档

#### 命名空间

```md
## Namespace XLH.OCR

### Methods

* getOCREngines()
* on()

### Properties

* error
* version

### Members

* Enum_OutputFormat
* Enum_SegmentationMode

### Classes

* BaseOCR
* OCRSpaceOCR
* GoogleOCR

```

#### 类

```md
## Class GoogleOCR

Extends `BaseOCR`

## Constructor

Creates a new Google OCR object.

Syntax:

\```ts
new GoogleOCR()
\```


## Methods

### detect()

Detect text in a image.

Syntax:

\```ts
detect(source:HTMLCanvasElement|HTMLImageElement):OCRResult
\```

Parameters:

source: the image to detect. It can be a canvas element or an image element.

## Properties

### apiKey

The API key for Google Cloud OCR API.
```

#### 接口

```md
## OCRResult

Syntax:

\```ts
interface OCRResult{
  textLines:TextLineResult[];
}
\```
```


#### 事件

```md
## OCRProgressEvent

Triggered when the OCR progress info is updated.

Syntax:

\```ts
XLH.OCR.on("OCRProgress",function(event:OCRProgressEvent) {
  console.log("progress: "+event.progress);
})
\```

Instance properties:

progress: progress of the OCR action. The value is between 0 and 1.
```





