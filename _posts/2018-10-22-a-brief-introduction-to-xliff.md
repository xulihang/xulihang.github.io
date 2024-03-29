---
date: 2018-10-22 16:02:50+08:00
layout: post
title: XLIFF简介
categories: 技术随笔
tags: CAT
---


XLIFF (XML Localization Interchange File Format)，是一种基于XML的文件格式，旨在为不同翻译工具提供一种存储和交换可翻译数据的中间格式。我们可以把不同格式的文件都转换为XLIFF，以后翻译只要在XLIFF文件操作即可。

XLIFF由oasis组织制定，oasis还制定了DITA等标准。1.0版在2002年提出，为广大CAT软件使用并修改出自己的版本，比如sdlxliff(trados)，mxliff(memoq)。2.0版2014年提出，并不向后兼容，目前主流软件尚没有很好的支持。

一个基本的XLIFF文件如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xliff version='1.2'
       xmlns='urn:oasis:names:tc:xliff:document:1.2'>
<file original='hello.txt' source-language='en' target-language='fr'
       datatype='plaintext'>
    <body>
        <trans-unit id='hi'>
                <source>Hello world</source>
                <target>Bonjour le monde</target>
                <alt-trans>
                    <target xml:lang='es'>Hola mundo</target>
                </alt-trans>
        </trans-unit>
    </body>
</file>
</xliff>
```

可以看到，首先有一个根元素xliff，然后每个文件是一个file元素。语言句对存储在trans-unit元素里。alt-trans用来存储来自翻译记忆或者机器翻译的结果。trans-unit标签里还可以存储不少属性，比如该片段是不是需要翻译的片段。

XLIFF比较复杂的另一点在于行内标签。如何用标签表示原文的格式，XLIFF提供了继承自[opentag](http://www.opentag.com/otspecs.htm#inline_elem)的一系列标签。比如以下是使用okapi从idml文件提取出的一个片段：

```xml
<file original="Stories/Story_u1c52c.xml" source-language="en-US" target-language="zh-CN" datatype="xml">
    <body>
        <trans-unit id="NE9BA6C2E-tu1" xml:space="preserve">
            <source xml:lang="en-US"><g id="1">Conte<g id="2">n</g>ts</g></source>
            <target xml:lang="zh-CN"><g id="1">Conte<g id="2">n</g>ts</g></target>
        </trans-unit>
    </body>
</file>
```

主要使用g标签来表达原来文件中的一对标签，其中的id表示其在原文标签中的顺序。g标签是一种占位性质的抽象标签，还有一种是封装标签，包含bpt、ept等。以下是两种标签的例子。

抽象标签：

```xml
<trans-unit id="1">
<source>This is <g id="1" ctype="bold">bold</g>.</source>
</trans-unit>
```

封装标签：

```xml
<trans-unit id="1">
<source>This is <bpt id="1" ctype="bold">\b</bpt>bold<ept id="1">\b0</ept>.</source>
</trans-unit>
```

抽象标签的好处是针对不同格式，抽象出来的内容可以一样。比如html、rtf中表示加粗，html是`<b>`，而rtf中是`\b`，抽象之后都变成了g标签。但是抽象之后，原文标签中的含义也被隐去了。

这些标签能起到占位的作用，不同的软件处理后可能会删去一些标签的信息，但只要这些标签能让CAT软件知道对应的标签内容，比如加粗和斜体，一般就还是有效的。

xliff还提供了用于句段分割的标签，我觉得这个应该交由CAT软件完成，存储在trans-unit里即可。

### 1/2更新

关于分割的句段，因为CAT软件直接将数据存储在xliff文件中，所以还是有必要的。seg-source标签一般配合mrk标签使用。

另外xliff还有skeleton标签，指定skl文件的地址。比如你打开heartsome translation studio翻译idml文件，可以看到项目文件里存放的skeleton文件。其实就是删去了要翻译的文件后重新压缩的idml。在opentag格式的时候，skeleton里会存放翻译内容的ref信息，方便重新把内容填回去。不过heartsome 似乎并没有添加ref信息，可能是有别的办法替换译文，那这样在我看来生成skeleton文件没有什么意义。

![](/album/CAT/heartsome_project.png)

相关链接：

1. XLIFF Version 1.2 <http://docs.oasis-open.org/xliff/v1.2/os/xliff-core.html>
2. Use XLIFF to translate documents <https://www.ibm.com/developerworks/library/x-localis2/index.html>
3. XLIFF 2.x… the translator’s panacea? <https://multifarious.filkin.com/2018/08/23/xliff-2-x-the-translators-panacea/>
4. OASIS XML Localisation Interchange File Format TC <https://www.oasis-open.org/committees/xliff/faq.php#inlineFormatting>


