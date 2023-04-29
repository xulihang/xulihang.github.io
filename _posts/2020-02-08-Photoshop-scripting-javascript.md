---
date: 2020-02-08 14:56:50+08:00
layout: post
title: 使用JavaScript编写Photoshop脚本
categories: 技术随笔
tags: CAT
---

之前的文章[Photoshop文档本地化脚本](/adobe-photoshop-localization-script/)已经介绍过如何编写Photoshop的脚本。我这里再针对JavaScript做点补充。

使用JavaScript的好处是跨平台，弊端是不如VBScript和AppleScript那样可以和系统更好地结合起来。

另外，我电脑上装的Photoshop CS3的精简版，没有办法用COM进行调用，装完整版PS的话磁盘空间不够，用JS来写的话，因为是打开PS后选择脚本进行调用，不用考虑COM是否能调用的问题。

首先来一波文档和工具链接：

1. [Adobe ExtendScript API documentation](http://yearbook.github.io/esdocs/#/)。用在Adobe中的JavaScript叫做ExtendScript，补充了很多API接口，比如本地文件读写的接口。
2. [Learn How to Script Adobe Photoshop CS2](http://www.adobepress.com/articles/article.asp?p=433750&seqNum=12)，较为全面的教程。
3. [JSON在线工具](https://www.sojson.com/)，查看导出的json时可以使用。
4. [Script Arsenal for Photoshop](http://video-books.net/script-arsenal/en/overview.htm) Photoshop脚本兵器库，提供一系列脚本示例

下面是我觉得可以写一下的注意事项：

1. 默认不支持将JS对象转换为JSON字符串，可以把[json2.js](https://github.com/douglascrockford/JSON-js)下下来include：`#include json2.js`。
2. 用上述方法调用JSON.stringify不能处理中文，需要将中文做encodeURI处理。
3. 要注意单位问题，PS中可以以点(point)或者像素(pixel)为单位。

我编写了三个本地化PSD用的脚本([github](https://github.com/xulihang/ImageTrans_PhotoshopScripts))：

```
psd2jpg.jsx，遍历某个目录及子目录下的所有PSD文档，另存为JPG
readTextLayers.jsx，遍历某个目录及子目录下的所有PSD文档，将所有文字图层的图层名、文字和坐标信息导出为一个json文件
addLayers.jsx，根据ImageTrans导出的数据文件，给图片添加文字层或者用译文替换PSD里文字图层的原文
```

JavaScript不是我的主力语言，所以折腾起来还是比较费劲。有一款漫画翻译标号工具叫LabelPlus，对PS脚本的利用比较充分。脚本项目地址：[PS-Script](https://github.com/LabelPlus/PS-Script)

## 2023-04-29 更新

Photoshop文档里介绍的功能比较有限，很多功能，比如选中某段文字设置行内样式是没有讲怎么操作的。这个时候需要使用ActionDescriptor处理。

比如下面这段代码，设置当前文本图层前5个字符为仿斜体仿粗体，颜色为红色，文字大小为36：

```js
var idtextLayer = stringIDToTypeID("textLayer");
var idordinal = stringIDToTypeID("ordinal");
var idtargetEnum = stringIDToTypeID("targetEnum");
var idnull = charIDToTypeID( "null" );
var idfrom = charIDToTypeID("From");
var idto = stringIDToTypeID("to");
var idtextStyle = stringIDToTypeID("textStyle");
var idtextStyleRange = stringIDToTypeID("textStyleRange");
var idset = stringIDToTypeID("set");
var idsize = stringIDToTypeID("size");
var idpixelsUnit = stringIDToTypeID("pixelsUnit");
var idcolor = stringIDToTypeID("color");
var idRd = stringIDToTypeID("red");
var idGrn = stringIDToTypeID("grain");
var idBl = stringIDToTypeID("blue");
var idRGBColor = stringIDToTypeID("RGBColor");

var activeLayer = activeDocument.activeLayer;
var start = 0;
var end = 5;
var fontSize = 36;
if (activeLayer.kind === LayerKind.TEXT) {
    if ((activeLayer.textItem.contents !== "") && (start >= 0) && (end <= activeLayer.textItem.contents.length)) {

        var reference = new ActionReference();
        reference.putEnumerated(idtextLayer, idordinal, idtargetEnum);

        var action = new ActionDescriptor();
        action.putReference(idnull, reference);

        var textAction = new ActionDescriptor();

        var actionList = new ActionList();
        var textRange = new ActionDescriptor();
        textRange.putInteger(idfrom, start);
        textRange.putInteger(idto, end);

        var formatting = new ActionDescriptor();

        formatting.putUnitDouble(idsize, idpixelsUnit, fontSize);
        var idsyntheticItalic = stringIDToTypeID( "syntheticItalic" );
        formatting.putBoolean(idsyntheticItalic, true);
        var idsyntheticBold = stringIDToTypeID( "syntheticBold" );
        formatting.putBoolean(idsyntheticBold, true);
        
        var colorAction = new ActionDescriptor();
        colorAction.putDouble(idRd, 255);
        colorAction.putDouble(idGrn, 0);
        colorAction.putDouble(idBl, 0);
        formatting.putObject(idcolor, idRGBColor, colorAction);

        textRange.putObject(idtextStyle, idtextStyle, formatting);
        actionList.putObject(idtextStyleRange, textRange);
        textAction.putList(idtextStyleRange, actionList);
        action.putObject(idto, idtextLayer, textAction);
        executeAction(idset, action, DialogModes.NO);
    }
}
```

但我们要怎么知道如何写这些操作？Adobe官方有提供一个叫[ScriptingListener](https://helpx.adobe.com/photoshop/kb/downloadable-plugins-and-content.html#ScriptingListenerplugin)的插件，安装后可以在桌面输出在Photoshop中操作对应的动作脚本供开发参考。

有一个系列博客专门讲Photoshop脚本的开发，其中有介绍ActionDescriptor的部分：[【CEP教程-8】Action Manager从好奇到劝退 - 上篇](https://blog.cutterman.cn/2021/12/12/action-manager-part1/)。



