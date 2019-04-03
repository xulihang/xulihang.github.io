---
date: 2019-04-03 16:09:50+08:00
layout: post
title: 技术传播领域的工具
categories: 收集
tags: 
---

技术传播的工具其实和常见的桌面出版工具有很多相似之处，不过主要的功能是用来写技术文档。技术传播者主要的工作应该是创造内容，但是我们往往会花费很多时间在工具的学习。而且，现在可以选择的工具真是太多了。现在，我打算做一个收集，并做简单的介绍。


## 商业软件

商业软件一般提供了很好的集成式的软件环境，用户只需要注重内容的写作。它们一般都支持DITA等标准XML格式，支持所见所得的方式进行编辑，也可以切换到代码编辑模式，支持从单一文件生成多种目标格式。商业软件也还是要花点时间学习的。


### Oxygen XML Editor

从名字可以看出，Oxygen是一款XML编辑器，在技术写作方面主要和DITA、Docbook等标准配合使用。它的界面清爽，可视化编辑工作做得不错。基于DITA-OT，它可以从DITA文件生成很多目标格式的成品文档。它的帮助文档也做得很丰富。

![](/album/techcomm/oxygen.jpg)

### Adobe Framemaker

Framemaker最近几年一直在推基于DITA的结构化文档。相比于以前像Word一样基于样式的，比较自由的方式，结构化的写作对使用的元素有严格要求。内容都是存储在结构化的元素里，用户不用管样式，更多的是要管用什么元素，元素有什么属性。

Framemaker有三种视图模式：XML View、Author View和WYSWYG View。XML模式就是XML代码编辑模式，这时菜单也会相应改变，添加XPath、XSLT等操作。WYSWYG View就是所见即所得模式，内容会被预览为一个A4 PDF的内容，有一个窗口，可以显示文档的结构。Author View也是所见即所得的，不过更像Word里的Web视图。

使用Framemaker可以打开上面Oxygen的实例文件，因为都是基于DITA，可以在两个软件中操作，不过Oxygen使用的一些自定义元素，比如修订用到的元素，就没有效果了。

![](/album/techcomm/framemaker.png)

Framemaker也算是一款老牌的商业软件，但是国内的教程很少，有的话大多是很早之前的了，所以只有看官方文档。这个视频介绍得不错：<https://my.adobeconnect.com/structuredframemaker17/>

另外还有官方推荐的免费的入门教程：<https://courses.techcommtools.com/p/fm2019intro/>


## 开源软件

开源软件更加丰富，而且衍生出一整套工具链和方法。一般采用的方法是docs-as-code，文档即代码，用写代码的方式写文档。

程序员应该更加喜欢这类模式：可以使用免费的称手的编辑器，比如visual studio code；使用简易化的标记语言，比如markdown、restructuredText、asciidoc；还可以用git来进行版本控制和团队协作，不需要复杂的CMS系统。

其实程序员写代码时，就通常把文档写在代码里。于是就产生了把用来说明程序的类、函数的内容，自动提取出来生成API文档的工具，比如Python语言有Sphinx，Java有javadoc，C有Doxygen。

另外还有一种API，是REST API，主要是一些网络接口，和上面提的API不一样，也有专门的工具，叫Swagger。

这样的方式对技术传播人员提高了要求，要掌握一些编程工具。

文档需要有发布机制，也要能像商业软件和DITA一样，从单个文件格式发布到多种目标格式（single sourcing）。上面提到的Sphinx、javadoc和doxygen都能将内容以网页的形式发布。Sphinx支持的格式更多，PDF、网页、LaTeX等都能支持。

另外，现在也流行静态网页生成器，比如jekyll，可以基于liquid语法定制一套主题，自动从配置文件、markdown文件生成网站。

有一篇讨论doc like code的主题演讲博客，可以看一下：<https://idratherbewriting.com/2018/03/09/docs-as-code-tools-and-workflows-denver-presentation/>，里面提到了如何解决文档即代码模式缺少的传统DITA模式具有的内容重用等功能。


## 在线软件

分为传统CMS和基于git类服务的系统。

### 在线CMS系统：

* easyDita

### docs-as-code：

* read the docs，sphinx项目的托管平台
* GitHub，一般都用GitHub托管git项目
* Gitbook，用git+markdown来写作，有一套自己的工具链

