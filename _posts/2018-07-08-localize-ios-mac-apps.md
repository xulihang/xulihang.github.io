---
date: 2018-07-08 15:16:50+08:00
layout: post
title: iOS/macOS应用的本地化
categories: 技术随笔
tags: CAT
---


iOS和macOS的应用本地化还是非常方便的，以下是具体步骤：

1. 给项目添加要本地化的语言，在项目设置里操作。可以选择本地化storyboard文件

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/iosloc/project.png)

2. 在代码中使用NSLocalizedString来调用界面中显示的文本，有两个参数，key和comment。key是主要的参数，comment可以填default。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/iosloc/nslocalizedstring.png)

3. Xcode中选中项目，然后点击Editor，点击Export for Localization，会生成xliff文件供译员进行翻译。storyboard和NSLocallizedString里的文本都会被导出。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/iosloc/export.png)

4. 导入译好的xliff，完成本地化工作。程序可以正常显示系统语言设置里对应的语言。

![](https://github.com/xulihang/xulihang.github.io/raw/master/album/iosloc/app.png)

导入时会自动生成Localizable.string等资源文件。你如果想手写这个文件的话当然也是可以的。B4X也是采用的类似的key/value的本地化方案，只是它会用sqlite来存储结果。

以上只是粗浅的操作步骤，更多还是看苹果的文档吧：[Internationalization and Localization Guide](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPInternational/LocalizingYourApp/LocalizingYourApp.html)
