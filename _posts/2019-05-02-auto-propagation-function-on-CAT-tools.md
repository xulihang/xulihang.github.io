---
date: 2019-05-02 14:16:50+08:00
layout: post
title: CAT的自动传播功能
categories: 技术随笔
tags: CAT
---

CAT工具一般有提供一个叫做自动传播的功能，它的英文原文是auto-propagation。我一直觉得这个词翻译得不好，听起来很别扭。在Trados、Deja Vu和OmegaT中，它被翻译为自动传播，而memoQ中则被翻译为自动沿用。

我们看一下词典里的释义：

1. Multiplication or increase, as by natural reproduction.
2. The process of spreading to a larger area or greater number; dissemination.
3. *Physics* The act or process of propagating, especially the process by which a disturbance, such as the motion of electromagnetic or sound waves, is transmitted through a medium such as air or water.

第一个释义对应于中文的繁殖，一个变成多个。第二个释义是散布到更广泛的区域。第三个释义是物理意义上的传播，比如声音的传播。

中文的传播含义比较广泛，可以对应英文的communication、dissemination等词。现代汉语词典的解释是广泛散布、推广。

那么CAT里auto-propagation的作用是什么呢？当一个片段被翻译后，如果下文有相同内容的片段，就会用译文进行填充。其实就相当于在向别的相同片段推广这个译文。

所以翻译为自动传播还是合理的。这也是CAT中广泛使用一个术语了。

在OmegaT中，翻译是以翻译记忆格式进行存储的。打开项目文件时，会自动读取翻译记忆，把译文填充进去。这样的一个好处是如果原文更新了，还是能把翻译过的内容自动填进去。而基于XLIFF的项目文件往往需要执行重新填充的操作，比如memoQ提供的X-translate功能。

建立项目时可以选择是否传播翻译。如果不传播，那么存储的每条翻译记忆都会带上上下文信息，如下：

```xml
 <tu>
      <prop type="file">Apple.docx</prop>
      <prop type="prev">Processing</prop>
      <prop type="next">I love my country.</prop>
      <tuv lang="EN">
        <seg>Capacity</seg>
      </tuv>
      <tuv lang="ZH" changeid="xulihang" changedate="20190502T061438Z" creationid="xulihang" creationdate="20190502T061438Z">
        <seg>能力</seg>
      </tuv>
    </tu>
    <tu>
      <prop type="file">Apple.docx</prop>
      <prop type="prev">Storage</prop>
      <prop type="next">Processing</prop>
      <tuv lang="EN">
        <seg>Capacity</seg>
      </tuv>
      <tuv lang="ZH" changeid="xulihang" changedate="20190502T061430Z" creationid="xulihang" creationdate="20190502T061430Z">
        <seg>容量</seg>
      </tuv>
    </tu>
```

这样基本可以解决片段文本相同、需要的译文不同的问题。

如果选择传播翻译，那么译文会有默认翻译和可选翻译这两个选项。

![](/album/omegat/optional.png)

默认翻译会用于自动传播，可以根据时间知道两个片段是同时修改的，而修改一个片段也会影响另一个片段。

![](/album/omegat/propagation.png)

可选翻译保存时会包含上下文信息，以做区别。翻译记忆中是这样保存默认翻译和可选翻译的：

```xml
<!-- Default translations -->
    <tu>
      <tuv lang="EN">
        <seg>Capacity</seg>
      </tuv>
      <tuv lang="ZH" changeid="xulihang" changedate="20190502T032959Z" creationid="xulihang" creationdate="20190502T032959Z">
        <seg>容量</seg>
      </tuv>
    </tu>
    <tu>
<!-- Alternative translations -->
    <tu>
      <prop type="file">Apple.docx</prop>
      <prop type="prev">Processing</prop>
      <prop type="next">An&lt;t0/&gt; Updated Version.</prop>
      <tuv lang="EN">
        <seg>Capacity</seg>
      </tuv>
      <tuv lang="ZH" changeid="xulihang" changedate="20190502T033532Z" creationid="xulihang" creationdate="20190502T033414Z">
        <seg>能力</seg>
      </tuv>
    </tu>    
```

OmegaT的传播功能，更多可以参考官方文档：[Propagation and one-to-many matching HowTo](https://omegat.org/en/howtos/prop12m.html)

