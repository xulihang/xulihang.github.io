---
date: 2020-02-16 10:30:50+08:00
layout: post
title: 图像处理软件的互操作性
categories: 技术随笔
tags: 图像处理
---

此前的一篇[文章](http://blog.xulihang.me/interoperatability-of-CAT-tools/)提到了CAT工具的互操作性，今天再来说说图像软件的互操作性。

要实现图像软件的互操作性，首先一点是得有一个数据交换格式标准。

CAT工具中，Trados可以说是一家独大，但它仍然遵循XLIFF、TMX等数据交换标准，并且积极地兼容其它CAT软件的格式。而图像软件领域的老大自然是Adobe。提到图像编辑软件，大家会想到Photoshop，但很少知道其它软件。开源领域有不少多层图像编辑器，比如GIMP、Krita等等，但用的人相对少很多。这也使得多层图像的标准格式似乎只有PSD一种。

针对这一问题，Krita和KDE的作者与2006年提出了一种多层图像格式OpenRaster（拓展名ora）。

一个ora文件是一个zip文件，内部的文件结构如下：

```
example.ora
 ├ mimetype
 ├ stack.xml '描述图像信息的xml文件
 ├ data/
 │  ├ [png格式保存的图层，命名为layer*.png，其中星号是图层的序号]
 │  └ [其它数据文件]
 ├ Thumbnails/
 │  └ thumbnail.png '缩略图，宽和高不能超过256
 └ mergedimage.png '图层合并后的图像
```

stack.xml示例如下：

```xml
<?xml version='1.0' encoding='UTF-8'?>
<image version="0.0.3" w="300" h="177" xres="600" yres="600">
  <stack>
    <stack x="10">
      <stack>
        <layer name="OpenRaster Logo" src="data/hw.svg" x="5" y="5" />
        <text x="50" y="10">Use a Rich Text XML Specification to write cool text in your OpenRaster File</text>
      </stack>
    </stack>
    <!-- filters are syntactically permissible, but not valid for baseline -->
    <layer name="layer1" src="data/image1.png" />
  </stack>
</image>
```

目前Adobe Photoshop、Gimp和Krita均支持ora格式。但可惜的是，ora格式到现在也只是0.0.5版本的草稿阶段，很多内容都没有制定。比如文字图层就没有得到定义，文字图层都是导出为图像来进行处理的。因为不同软件有着不同的实现，对于图像处理这样的任务，很难制定统一的标准。想实现完全的互操作性是似乎是不太可能了。

在OpenRaster尚不完善的阶段，要想迁移一个软件中的图层到另一软件，可能只有使用脚本了。例如使用Photoshop的脚本将文字图层的坐标、字体设置等信息导出，然后再用Gimp的脚本导回，这个过程当然也需要制定数据交换格式。

相关链接：

1. [OpenRaster Specifications](https://www.openraster.org/)

