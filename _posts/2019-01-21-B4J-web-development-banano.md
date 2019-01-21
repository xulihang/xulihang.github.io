---
date: 2019-01-21 16:02:50+08:00
layout: post
title: B4J Web开发之BANano
categories: 技术随笔
tags: B4X
---

[BANano](https://www.b4x.com/android/forum/threads/banano-website-app-wpa-library-with-abstract-designer-support.99740/)是用来开发渐进式Web应用（[Progressive Web App](https://developers.google.cn/web/progressive-web-apps/), PWA）的一个类库，和前文的ABMaterial都是由alwaysbusy创作。PWA的特点是可以离线使用，能像普通的应用一样出现在主屏，甚至安卓的应用列表里，拥有推送等本地化的功能。当然，BANano也能用来开发普通的网页。

BANano的读法类似banana，最后的一个音是o。

一般开发网页，需要使用HTML、CSS和Javascript。使用Bootstrap等框架，我们不用写复杂的CSS就能完成布局，而且能根据设备的尺寸调整显示的内容的尺寸，做到自动响应式布局。现在的网页一般基于div标签使用的一个网格式布局（grid layout），一个例子如下：

```html

<div class="container">
   <h1>Hello, world!</h1>
 
   <div class="row">
 
      <div class="col-md-6 col-lg-4">
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit
         </p>
 
         <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
         </p>
      </div>
 
      <div class="col-md-6 col-lg-8">
         <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
            accusantium doloremque laudantium.
         </p>
      </div>
   </div>
</div>
```

一般div依次是container、row和column。column的尺寸由col-md-6中的数字决定，一般一行分为12等份，所有colum的数字加起来是12。更多可以看bootstrap的教程。

BANano可以把各种组件封装成B4J里的类，然后我们就可以像写B4J程序一样写网页，甚至使用B4J的界面设计器。这类似于使用jade生成html、coffeescript生成javascript。

BANano提供的例子中对Skeleton CSS进行了封装，可以方便地使用界面设计器进行设计。它参考了之前tchart
写的[Skeleton (CSS + Library)](https://www.b4x.com/android/forum/threads/skeleton-css-library.82128/)。比如使用下面的B4J代码：

```vb
	Dim skc2a As SK_Column
	Dim skc2b As SK_Column
	Dim skc2c As SK_Column
	skc2a.Initialize(4)
	skc2b.Initialize(4)
	skc2c.Initialize(4)
	
	skc2a.AddContent("Light as a feather at ~400 lines & built with mobile in mind.")
	skc2b.AddContent("Styles designed to be a starting point, not a UI framework.")
	skc2c.AddContent("Quick to start with zero compiling or installing necessary.")
	
	Dim row As SK_Row
	row.Initialize
	row.Columns.Initialize
	row.Columns.Add(skc2a)
	row.Columns.Add(skc2b)
	row.Columns.Add(skc2c)

	Dim c1 As SK_Container
	c1.Initialize
	c1.Align = "center"
	c1.MarginTop = 3
	c1.Padding = 1
	c1.Rows.Initialize
	c1.Rows.Add(row)
```

可以生成如下的HTML代码：

```html
<div class="section" align="center" style="margin-top:3rem;padding:1rem;">
    <div class="container">
        <div class="row">
            <div class="four columns">
                <p>Light as a feather at ~400 lines & built with mobile in mind.</p>
            </div>
            <div class="four columns">
                <p>Styles designed to be a starting point, not a UI     framework.</p>
            </div>
            <div class="four columns">
                <p>Quick to start with zero compiling or installing necessary.</p>
            </div>
        </div>
    </div>
</div>
```

上述代码描述了在一行里三等分的三个段落。不过，目前BANano偏向于使用设计器，对使用代码创建组件的设计并不完善。

BANano还可以把Basic语言转译（transpile）为JavaScript。

比如以下代码：

```vb
Sub test
	Dim style As String
	style=$"{"background":"green"}"$
	BANano.GetElement("#sklabel1").SetStyle(style)
End Sub
```

会转译为：

```
this.test= function() {
    if (self==null) self=this;
    var _style;
    _style='';
    _style = "{\"background\":\"green\"}";
    u("#sklabel1").css(JSON.parse(_style));
};
```

我开发了一个语音转文字的应用测试，发的[帖子](https://www.b4x.com/android/forum/threads/banano-text-to-speech.101705/#post-638552)很快就得到了不少B4X论坛用户的点赞。可以访问[这里](https://pwa.xulihang.me/tts/)查看。













