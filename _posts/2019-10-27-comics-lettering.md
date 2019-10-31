---
date: 2019-10-27 10:27:50+08:00
layout: post
title: 漫画嵌字
categories: 技术随笔
tags: 
---

漫画嵌字就是在漫画中添加对话、特效字和气泡等内容。如果是翻译过程中的嵌字，还需要去除或替换原来的文本。

国内漫画多是在线漫画，主要使用Photoshop，而国外漫画多为需要印刷出版的漫画书，主要使用Adobe InDesign和Illustrator。

前者可以看4W的嵌字教程和Pinkiesparkle的[漫画翻译教程](https://tieba.baidu.com/p/6222009795)，后者可以看Adobe讲师Sean Glumace的[letteringcomics](http://letteringcomics.com/)网站上的视频教程。

Photoshop嵌字流程较为明了就不提了，主要讲下国外的这套。国外漫画使用InDesign来整合整个文档，而嵌字并不在InDesign中处理，是使用的Illustrator。

嵌字师拿到漫画的脚本（含有场景描述、对白）、以及绘制好的漫画图像（tiff格式），然后就可以进行嵌字了。每页内容都对应一个Illustrator的AI文件或者成品eps文件。嵌字师建立一个和漫画文档尺寸相同的AI文件，导入图像文件然后在对应位置添加内容，之后去掉背景图像，只保留添加的气泡、对话和特效字，以供InDesign导入。

下面讲下对话处理要注意的内容。

## 对话文字

* 字的大小和间距一般都是统一的，除非空间实在不够或者需要突出效果才进行调整。
* 可以通过加粗来反映语气。
* Photoshop中有点文本和段落文本的区别。一般漫画都用的点文本，便于调整样式。段落文本可以自动换行，是好处也是坏处。
* 汉字和日文常需要竖排，需要根据分词做好断行。除此以外还有数字和双标点等特殊问题需要处理，常常需要采用再建一个图层这样的折中方法。



