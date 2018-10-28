---
date: 2018-10-26 10:45:50+08:00
layout: post
title: TMX、TBX、SRX，LISA的三大翻译标准
categories: 技术随笔
tags: CAT
---

LISA OSCAR(Open Standards for Container/Content Allowing Re-use)主要包括TMX、TBX、SRX、GMX和xml:tm五种标准。

LISA在2011年破产后，指定欧洲电信标准化协会继续维护系列标准，同时其它人或组织也可以遵循CC 3.0标准进行分享。

现在可以在GALA的网站上查询标准的技术说明：<https://www.gala-global.org/lisa-oscar-standards>

## TMX

TMX（Translation Memory eXchange）是可以用于在不同CAT软件之间交换翻译记忆的格式，一个TMX的文件例子如下：

```xml
<tmx version="1.4">
  <header
    creationtool="XYZTool" creationtoolversion="1.01-023"
    datatype="PlainText" segtype="sentence"
    adminlang="en-us" srclang="en"
    o-tmf="ABCTransMem"/>
  <body>
    <tu>
      <tuv xml:lang="en">
        <seg>Hello world!</seg>
      </tuv>
      <tuv xml:lang="fr">
        <seg>Bonjour tout le monde!</seg>
      </tuv>
    </tu>
  </body>
</tmx>
```

header里列出的属性都是必须填写的。其中adminlang不太好理解，意思是header标签里说明性内容所用的语言。而o-tmf指转换为tmx前是以什么格式存储的。


## TBX

TBX（TermBase eXchange）是术语交换格式，现在已经成为了ISO标准。以下截取自微软提供的术语库文件。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<martif type="TBX" xml:lang="en-US">
<martifHeader>
<fileDesc>
  <titleStmt>
    <title>Microsoft Terminology Collection Export</title>
  </titleStmt>
  <sourceDesc>
    <p>Microsoft Terminology Collection</p>
  </sourceDesc>
</fileDesc>
</martifHeader>

<text>
  <body>
    <termEntry id="6151_126">
      <langSet xml:lang="en-US">
        <descripGrp>
          <descrip type="definition">A printed circuit board that enables a personal computer to use a peripheral device, such as a CD-ROM drive, modem, or joystick, for which it does not already have the necessary connections, ports, or circuit boards. Commonly, a single adapter card can have more than one adapter on it.</descrip>
        </descripGrp>
        <ntig>
        <termGrp>
          <term id="126">adapter</term>
          <termNote type="partOfSpeech">Noun</termNote>
          </termGrp>
        </ntig>
      </langSet>
      <langSet xml:lang="zh-cn">
        <ntig>
          <termGrp>
            <term id="1165982">适配卡</term>
            <termNote type="partOfSpeech">Noun</termNote>
          </termGrp>
        </ntig>
      </langSet>
    </termEntry>
  </body>
</text>
</martif>
```

Martif是Machine Readable Terminology Interchange Format的缩写。martifHeader里包括对文件的描述信息，sourceDesc是关于文件的任意描述信息，titleStmt里包含文件的名字的定义。

tbx的主体还是看termEntry元素，langSet子元素包含了每种语言相关的内容。descripGrp里是对术语条目的描述信息，比如描述术语的概念、术语的领域，它可以包含在langset里，也可以包含在ntig里。ntig(nesting term information group)里可以存放包含术语的文本、备注信息。tig和ntig的区别是tig适用于简单的情况。

通过在langSet里并列存放tig元素，可以用来表示同义词、缩写等情况。

```xml
<langSet xml:lang="de">
  <tig>
    <term>Abtastglied</term>
  </tig>
  <tig>
    <term>Abtaster</term>
  </tig>
</langSet> 
```

```xml
<langSet xml:lang="de"> 
  <tig>
    <term>Proportionalglied plus Integrierglied</term>
  </tig>
  <tig>
    <term>PI-Glied</term>
    <termNote type="termType">abbreviation</termNote>
  </tig>
</langSet>
```

如果术语由多个单词组成，还可以在里面存放每个单词的信息，例子如下：

```xml
<langSet xml:lang="fr">
<ntig>
 <termGrp>
   <term>table des transitions d'états</term>
   <termCompList type="termElement">
     <termCompGrp>
       <termComp>table</termComp>
       <termNote type="grammaticalGender">feminine</termNote>
     </termCompGrp>
     <termCompGrp>
       <termComp>des</termComp>
       <termNote type="partOfSpeech">other</termNote> 
     </termCompGrp>
     <termCompGrp>
       <termComp>transitions</termComp>
       <termNote type="grammaticalNumber">plural</termNote>
       <termNote type="grammaticalGender">feminine</termNote>
     </termCompGrp>
     <termCompGrp>
       <termComp>de</termComp>
       <termNote type="partOfSpeech">preposition</termNote>
     </termCompGrp>
     <termComp>états</termComp>
   </termCompList>
 </termGrp>
</ntig>
</langSet>
```

因为TBX的格式较为复杂，解析起来会比较困难。

## SRX

SRX（Segmentation Rules eXchange）是专门用于表示句段分割规则的格式。关于句段分割，我在此文有一个基本的思路：[BasicCAT开发笔记（二）：句段分割](/basiccat-developing-notes-2-sentence-segmentation/
)。SRX的实现方法其实和我的类似。它也直接将正则表达式作为规则进行存储，而且处理的先后顺序很重要，另外它也有分例外规则和分割标准。

当然SRX想得要详细的多。比如分割规则，它有分在分割前出现的内容（beforebreak）和分割后出现的内容（afterbreak）。比如对于以下内容，句号是一个要分割的字符，但是句号前后如果是数字，或者后面是引号，就应该是例外规则。这时区分句号前后的内容可以方便地进行正确的分割。

>Mr. Xu is an English teacher. He is 1.7m tall.
>He likes teaching knowledge about CAT tools. For me, He is like a "Super." 

这样的设定和它的算法有关。下面是进行句段分割的伪代码：

```
for each inter-character position in the text 
   for each <rule> element in the list 
      if the current  <rule> matches the inter-character position then 
         if the <rule> element specifies a break then 
            break the text at this point 
         end if 
         exit for 
      end if 
   next 
next 
```

代码一个字符一个字符地读取文本，读取每一字符时，对每条规则进行匹配，如果匹配，则根据break属性决定是否进行断句，并跳到下一个字符上继续操作。

但其实大多数时候，aferbreak都是可以没有的，参见Customizing Sentence Segmentation In SRX Rules <http://wiki.languagetool.org/customizing-sentence-segmentation-in-srx-rules>。另外设置afterbreak和beforebreak也增加了复杂性。


以下是一个来自SRX标准文件的SRX文件的示例，包含了英、法、日三语的规则。

```xml
<?xml version="1.0"?>
<srx version="2.0" 
	xmlns="http://www.lisa.org/srx20"
	xsi:schemaLocation="http://www.lisa.org/srx20 srx20.xsd"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <header segmentsubflows="yes" cascade="yes">
        <formathandle type="start" include="no"/>
        <formathandle type="end" include="yes"/>
        <formathandle type="isolated" include="yes"/>
    </header>
    <body>
        <languagerules>
            <languagerule languagerulename="Default">
                <!-- Common rules for most languages -->
                <rule break="no">
                    <beforebreak>^\s*[0-9]+\.</beforebreak>
                    <afterbreak>\s</afterbreak>
                </rule>
                <rule break="yes">
                    <afterbreak>\n</afterbreak>
                </rule>
                <rule break="yes">
                    <beforebreak>[\.\?!]+</beforebreak>
                    <afterbreak>\s</afterbreak>
                </rule>
            </languagerule>
            <languagerule languagerulename="English">
                <!-- Some English abbreviations -->
                <rule break="no">
                    <beforebreak>\s[Ee][Tt][Cc]\.</beforebreak>
                    <afterbreak>\s[a-z]</afterbreak>
                </rule>
                <rule break="no">
                    <beforebreak>\sMr\.</beforebreak>
                    <afterbreak>\s</afterbreak>
                </rule>
                <rule break="no">
                    <beforebreak>\sU\.K\.</beforebreak>
                    <afterbreak>\s</afterbreak>
                </rule>
            </languagerule>
            <languagerule languagerulename="French">
                <!-- Some French abbreviations -->
                <rule break="no">
                    <beforebreak>\s[Mm]lle\.</beforebreak>
                    <afterbreak>\s</afterbreak>
                </rule>
                <rule break="no">
                    <beforebreak>\s[Mm]lles\.</beforebreak>
                    <afterbreak>\s</afterbreak>
                </rule>
                <rule break="no">
                    <beforebreak>\s[Mm]me\.</beforebreak>
                    <afterbreak>\s</afterbreak>
                </rule>
                <rule break="no">
                    <beforebreak>\s[Mm]mes\.</beforebreak>
                    <afterbreak>\s</afterbreak>
                </rule>
            </languagerule>
            <languagerule languagerulename="Japanese">
                <!-- Rules for breaking on Japanese punctuation
                
                \xff61: Halfwidth ideographic full stop
                \x3002: Ideographic full stop
                \xff0e: Fullwidth full stop
                \xff1f: Fullwidth question mark
                \xff01: Fullwidth exclamation mark
                -->
                <rule break="yes">
                    <beforebreak>[\xff61\x3002\xff0e\xff1f\xff01]+</beforebreak>
                    <afterbreak></afterbreak>
                </rule>
            </languagerule>
        </languagerules>
        <maprules>
            <!-- List exceptions first -->
            <languagemap languagepattern="[Ee][Nn].*" languagerulename="English"/>
            <languagemap languagepattern="[Ff][Rr].*" languagerulename="French"/>
            <!-- Japanese breaking rules -->
            <languagemap languagepattern="[Jj][Aa].*" languagerulename="Japanese"/>
            <!-- Common breaking rules -->
            <languagemap languagepattern=".*" languagerulename="Default"/>
        </maprules>
    </body>
</srx>
```

我们看body标签里，有languagesrules标签，里面的每个languagerule包含一种语言的分割规则。rule标签里是breakbreak和afterbreak标签，用正则表示分割的字符前后的内容。如果rule的break属性是no，说明是例外，不进行分割。

maprules里根据语言代码指定使用哪种语言的分割规则，比如en-US对应使用英语的分割规则。

然后我们再看header。利用formathandle属性，可以设置断句的前面或者后面有格式标记时，要不要进行包括。segmentsubflows表示一个断句单位里包含另一个单位时要不要进行分割，比如html的img元素里的alt属性。cascade设为yes时，如果匹配到一条规则，那么其它的规则就不再生效。

利用srx进行句段分割，这里还有一个开源项目segment可供参考：<https://github.com/loomchild/segment>

## 语言代码

上述标准都会用到如zh-cn这样的语言代码。

一般语言代码有两种表示方法，一种是en、zh这样遵循[ISO 639标准](http://www.loc.gov/standards/iso639-2/php/code_list.php)的语言代码，另一种是在前者的基础上添加[ISO 3166标准](https://www.iso.org/obp/ui/#search/code/)定义的国家代码而构成的代码，如en-us，zh-cn。