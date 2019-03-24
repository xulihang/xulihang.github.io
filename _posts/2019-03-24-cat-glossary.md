---
date: 2019-03-24 16:41:50+08:00
layout: post
title: CAT术语大全
categories: 技术随笔
tags: CAT
---

这篇文章翻译自memoQ的产品经理Gabor的[The ultimate CAT tool jargon buster](https://jealousmarkup.xyz/texts/cat-tool-glossary/)，已经得到了作者的翻译许可。

目前还在翻译中。


目录
=================

* [激活（activation）](#激活activation)
* [对齐（alignment）](#对齐alignment)
* [分析（analysis）](#分析analysis)
* [应用程序编程接口（API）](#应用程序编程接口api)
* [在服务器上自动保存（auto save on server）](#在服务器上自动保存auto-save-on-server)
* [自动检索（automatic concordance）](#自动检索automatic-concordance)
* [AutoPick](#autopick)
* [自动填充（auto-propagation）](#自动填充auto-propagation)
* [自动可译元素处理（auto-translatables）](#自动可译元素处理auto-translatables)
* [BiDi](#bidi)
* [双语Excel（bilingual Excel）](#双语excelbilingual-excel)
* [双语RTF（bilingual RTF）](#双语rtfbilingual-rtf)
* [CAL许可证（CAL License）](#cal许可证cal-license)
* [计算机辅助翻译（Computer-aided Translation）](#计算机辅助翻译computer-aided-translation)
* [CJJK](#cjjk)
* [检出（check out）](#检出check-out)
* [内容管理系统（CMS）](#内容管理系统cms)
* [评论（comment）](#评论comment)
* [检索（concordance）](#检索concordance)
* [已确认（confirmed）](#已确认confirmed)
* [上下文ID（content ID）](#上下文idcontent-id)
* [上下文匹配（context match）](#上下文匹配context-match)
* [CSV](#csv)
* [自定义字段（custom fields）](#自定义字段custom-fields)
* [交付（deliver）](#交付deliver)
* [听写（dictation）](#听写dictation)
* [听写错误（dicto）](#听写错误dicto)
* [DITA](#dita)
* [桌面出版（DTP）](#桌面出版dtp)
* [编辑距离（edit distance）](#编辑距离edit-distance)
* [ELM许可证（ELM license）](#elm许可证elm-license)
* [完全匹配（exact match）](#完全匹配exact-match)
* [导出（export）](#导出export)
* [外部标签（external tags）](#外部标签external-tags)
* [文件格式过滤器（file format filter）](#文件格式过滤器file-format-filter)
* [查找/替换列表（find/replace listing）](#查找替换列表findreplace-listing)
* [字体替换（font substitution）](#字体替换font-substitution)
* [片段组合（fragment assembly）](#片段组合fragment-assembly)
* [模糊（fuzzy）](#模糊fuzzy)
* [全局查找/替换（global find/replace）](#全局查找替换global-findreplace)
* [词汇表（glossary）](#词汇表glossary)
* [高亮（highlight）](#高亮highlight)
* [均匀性（homogeneity）](#均匀性homogeneity)
* [水平布局（horizontal layout）](#水平布局horizontal-layout)
* [导入（import）](#导入import)
* [内联标签（inline tags）](#内联标签inline-tags)
* [国际化（internationalization;i18n）](#国际化internationalizationi18n)
* [互操作性](#互操作性)
* [合并句段（join segments）](#合并句段join-segments)
* [关键字上下文检索（KWIC）](#关键字上下文检索kwic)
* [利用（Leverage）](#利用leverage)
* [轻量资源（light resources）](#轻量资源light-resources)
* [语言专家（linguist）](#语言专家linguist)
* [LiveAlign](#livealign)
* [LiveDocs语料（LiveDocs corpus）](#livedocs语料livedocs-corpus)
* [本地化（localization;l10n）](#本地化localizationl10n)
* [本地化工程师（localization engineer）](#本地化工程师localization-engineer)
* [锁定使用了不同语言的句段（lock segments in different languages）](#锁定使用了不同语言的句段lock-segments-in-different-languages)
* [锁定的（locked）](#锁定的locked)
* [语言质量保证（LQA）](#语言质量保证lqa)
* [LSC](#lsc)
* [语言服务提供商（LSP）](#语言服务提供商lsp)
* [机器翻译（MT）](#机器翻译mt)
* [机器翻译后编辑（machine translation post-editing）](#机器翻译后编辑machine-translation-post-editing)
* [主翻译记忆（master TM）](#主翻译记忆master-tm)
* [匹配率（match rate）](#匹配率match-rate)
* [MatchPatch](#matchpatch)
* [元数据（metadata）](#元数据metadata)
* [移动端许可证（mobile license）](#移动端许可证mobile-license)
* [单语审校（monolingual review）](#单语审校monolingual-review)
* [MQXLIFF](#mqxliff)
* [多语言Excel（multilingual Excel）](#多语言excelmultilingual-excel)
* [MultiTrans XML](#multitrans-xml)
* [Muse](#muse)
* [神经网络机器翻译（NMT）](#神经网络机器翻译nmt)
* [不换行空格（non-breaking space）](#不换行空格non-breaking-space)
* [非打印字符（non-printing characters）](#非打印字符non-printing-characters)
* [非译元素（non-translatables）](#非译元素non-translatables)
* [光学字符识别（OCR）](#光学字符识别ocr)
* [在线项目](#在线项目)
* [在线翻译记忆（online TM）](#在线翻译记忆online-tm)
* [即时过滤（on-the-fly filter）](#即时过滤on-the-fly-filter)
* [PDF](#pdf)
* [PEMT; post-edited machine translation](#pemt-post-edited-machine-translation)
* [惩罚](#惩罚)
* [永久许可证（perpetual license）](#永久许可证perpetual-license)
* [插件（plugin）](#插件plugin)
* [填充纯数字片段（populate number-only segments）](#填充纯数字片段populate-number-only-segments)
* [译后分析（post-translation analysis）](#译后分析post-translation-analysis)
* [输入预测（predictive typing）](#输入预测predictive-typing)
* [预翻译的（pre-translated）](#预翻译的pre-translated)
* [预翻译（pre-translation）](#预翻译pre-translation)
* [预览（preview）](#预览preview)
* [项目主页（project home）](#项目主页project-home)
* [项目管理系统（project management system）](#项目管理系统project-management-system)
* [项目模板（project templates）](#项目模板project-templates)
* [伪翻译（pseudo-translation）](#伪翻译pseudo-translation)
* [译后分析（PTA）](#译后分析pta)
* [质量保证（QA; quality assurance; automatic QA）](#质量保证qa-quality-assurance-automatic-qa)
* [参考翻译记忆（reference TM）](#参考翻译记忆reference-tm)
* [正则表达式（regular expressions; regex）](#正则表达式regular-expressions-regex)
* [拒绝的（rejected）](#拒绝的rejected)
* [重复（repetition）](#重复repetition)
* [从右往左文本（RTL; right-to-left）](#从右往左文本rtl-right-to-left)
* [软件开发套件（SDK; software development kit）](#软件开发套件sdk-software-development-kit)
* [句段（segment）](#句段segment)
* [句段状态（segment status）](#句段状态segment-status)
* [句段分割（segmentation）](#句段分割segmentation)
* [同时翻译与审校（simultaneous translation and review）](#同时翻译与审校simultaneous-translation-and-review)
* [支持与维护协议（SMA; support &amp; maintenance agreement）](#支持与维护协议sma-support--maintenance-agreement)
* [统计机器翻译（SMT; statistical machine translation）](#统计机器翻译smt-statistical-machine-translation)
* [分割句段（split segments）](#分割句段split-segments)
* [句段分割规则（SRX; Segmentation Rules eXchange）](#句段分割规则srx-segmentation-rules-exchange)
* [子片段的利用（subsegment leverage）](#子片段的利用subsegment-leverage)
* [统计信息（statistics）](#统计信息statistics)
* [文本（String）](#文本string)
* [结构标签（structural tags）](#结构标签structural-tags)
* [同步（synchronize）](#同步synchronize)
* [表格RTF（table RTF）](#表格rtftable-rtf)
* [标签错误（tag error）](#标签错误tag-error)
* [标签插入模式（tag insertion mode）](#标签插入模式tag-insertion-mode)
* [清理标签（tag soup）](#清理标签tag-soup)
* [标签（tags）](#标签tags)
* [TB](#tb)
* [术语库交换格式（TBX; TermBase eXchange）](#术语库交换格式tbx-termbase-exchange)
* [修订匹配（TC match）](#修订匹配tc-match)
* [翻译编辑校对（TEP; translation-editing-proofreading）](#翻译编辑校对tep-translation-editing-proofreading)
* [术语库（term base）](#术语库term-base)
* [术语抽取（term extraction）](#术语抽取term-extraction)
* [术语数据库（terminology  database）](#术语数据库terminology--database)
* [翻译记忆（TM; translation memory）](#翻译记忆tm-translation-memory)
* [翻译记忆匹配类型（TM match types）](#翻译记忆匹配类型tm-match-types)
* [翻译记忆驱动的句段分割（TM-driven segmentation）](#翻译记忆驱动的句段分割tm-driven-segmentation)
* [翻译管理系统（TMS; translation management system）](#翻译管理系统tms-translation-management-system)
* [翻译记忆交换格式（TMX; Translation Memory eXchange）](#翻译记忆交换格式tmx-translation-memory-exchange)
* [跟踪修订（track changes）](#跟踪修订track-changes)
* [翻译单元（translation unit）](#翻译单元translation-unit)
* [垃圾进，垃圾出（trash in, trash out）](#垃圾进垃圾出trash-in-trash-out)
* [两列Excel（two-column Excel）](#两列exceltwo-column-excel)
* [Unicode](#unicode)
* [UTF-8](#utf-8)
* [提供商（vendor）](#提供商vendor)
* [视图（view）](#视图view)
* [网络编辑器（web editor）](#网络编辑器web-editor)
* [字数统计（word count）](#字数统计word-count)
* [工作、主和参考翻译记忆（working, master and reference TM）](#工作主和参考翻译记忆working-master-and-reference-tm)
* [XLIFF](#xliff)
* [XML; eXtensible Markup Language](#xml-extensible-markup-language)
* [X-translate](#x-translate)


## 译文

CAT终极术语大全

2017年5月16日

精心挑选的150个术语，涵盖各种表达和缩写，帮助你深入了解CAT工具。

### 免责声明

我编写这份词汇表主要是出于自己的爱好（是的，我知道，我的爱好有点奇怪），同时也是为了帮助那些试图快速了解翻译行业术语的人。 作为一群开发CAT软件，致力于帮助人们交流的人，我们确实创造了很多专业领域的词汇，是吧？

希望读者不要完全相信本文的内容。 很多都只是我的一面之词，而且我还是[memoq](https://memoq.com)的员工。 客观地说，memoQ是世界上最棒的CAT工具。 但我会尽量做到内容和具体的工具无关。 我加入了尽可能少的memoQ术语，不过我没有用到其它工具的术语。 我只是觉得我对于其它工具并不了解，也没有这个权威性，对于未知领域要保持谨慎。

如果你喜欢本文，欢迎分享给你的朋友、同事和对手。 如果你发现任何错误或者不准确的地方，可以选择你喜欢的沟通方式给我反馈。

### 激活（activation）

激活一般需要访问制造商的网站。 本地程序向远程网站发送一串序列号以及关于你计算机的一些匿名信息。 如果你拥有证书或者选择的试用版，网站就会返回一串代码，授权程序在你的电脑上运行。

另见：CAL许可证（CAL License）

### 对齐（alignment）

一般你收到一份要翻译的文件时，你还会收到很多之前翻译过的文件和对应的原文，或者你在网络上能找到匹配的内容。 这些文件内容很大程度可以用作翻译记忆使用，在模糊匹配和检索时发挥作用。 问题是，翻译记忆是对齐了的句段，而你现在有的是整个文档。 对齐指将源文档和目标文档拆分成片段，并利用算法找出目标片段对应于哪个源文片段。 这可不是一件简单的事！ 高级CAT软件可以做到大致的句段自动对齐，并帮助你修正对齐错误的句段。

另见：LiveAlign

### 分析（analysis）

在你接受一份任务前，你需要知道有多少文本需要翻译。 但是你已经有了包含过去翻译的翻译记忆，所以您还想知道有多少新的文本需要翻译，有多少模糊匹配和精确匹配。 这就是分析所做的：它对要翻译的文本和翻译记忆与语料库中的文本进行比对，并给你一个清晰的统计结果，包括句段、词和字符数。

“分析”有时也可以和“统计”这个词互换使用，在这种情况下，统计并不是一门高深的学科。

### 应用程序编程接口（API）

一个计算机术语，指一个程序允许其它程序通过某种方式使用它的功能，就像用户通过点击按钮来使用程序。 如果一个程序没有API，那么它就不能与其它系统集成，用户最终会因为大量完全不必要的点击而患上肌腱炎。 确保你考虑的基于云的工具提供API，这一点尤为重要。 如果不提供，你就没有获得你的数据并和其它程序进行数据交换的简便方法。

### 在服务器上自动保存（auto save on server）

当你在一个memoQ在线项目中工作时，你的翻译最初只保存在你的计算机上。 您可以选择每天进行几次同步。如果启用自动保存，在保存时，你的翻译将立即发送到服务器，且不会耽误你的工作。 这样别人就可以看到你的工作，且\*几乎*\就像你在实时编辑一个谷歌文档。 有什么比这更好的方法来保持翻译的一致性？

### 自动检索（automatic concordance）

如果你想知道某个表达是怎么翻译的，你可以使用检索（concordance）功能。 但是一个好的CAT工具可以做得更多：它可以搜索到在许多句段都存在的内容，并进行高亮。 这就像是在说，“嘿！ 这些短语似乎到处都是，马上对它们进行检索可能是个好主意！” 如果你非常*幸运*，这些短语还作为整个原文句段出现，这样可以自动调用翻译记忆或语料库进行翻译。

### AutoPick

我不知道各位读者是不是也是这样，我不喜欢在翻译的时候输入数字，我也不喜欢在中途从原文复制一段内容到译文。 除了数字，原文句段中还会包含其它需要直接复制到译文的内容，比如标签、非译元素和一些术语。 在memoQ中，如果你按下并释放CTRL键，它的AutoPick功能会列出所有原文中的这些特殊内容，你可以用方向键来选择内容，把它们插入到译文中。 它还能重新格式化数字以匹配目标语言的格式。

### 自动填充（auto-propagation）

需要翻译的文本基本上都有重复。很多片段会出现多次。 在一些技术文本中，重复片段的比例会更高。 翻译记忆的一个作用就是能重复利用翻译过的内容。不过CAT工具可以做得更好。 如果你启用了自动填充，那么确认一个句段后，工具就会立即填充文档中的所有其他相同片段，并将其标记为已确认状态。

### 自动可译元素处理（auto-translatables）

大多数文本（特别是技术、法律和财务类）都有遵循某种模式的重复出现的内容。比如日期：05/27/1978会被翻译为27.5.1978。自动翻译规则允许你利用正则表达式自动进行这类转换。

### BiDi

BiDi，双向文本，是bidirectional text的缩写。阿拉伯语、希伯来语和波斯语是从右往左书写的， 但同时，数字和一些用拉丁字母书写的名词是从左往右书写的。

### 双语Excel（bilingual Excel）

参见多语言Excel（multilingual Excel）

### 双语RTF（bilingual RTF）

一种特殊格式的Word文档，包含翻译的源文句段和目标句段，通常还包括注释和其他信息。 这样，翻译人员可以和没有CAT软件的客户或领域专家进行合作。 反过来，CAT工具可以读取修改过的双语RTF，并将更新的内容导回翻译软件环境中。 有些旧格式依赖于隐藏文本，并且很容易被一个错误的编辑所破坏。 如今，一个包含三列或更多列的表格的文档更为常见。

### CAL许可证（CAL License）

CAL是“并发访问许可证（concurrent access license）”的缩写。 个人许可证允许个人用户运行单个程序，作为组织则可以购买CAL许可证，这些许可证可以按需分发给任何终端用户。 限制主要在于有多少人可以同时使用这个工具。不管他们是谁，或者在哪里工作都没有限制。

### 计算机辅助翻译（Computer-aided Translation）

提高译员和审校翻译速度和质量的软件，多人同时处理一个大型文本也不在话下。 有时，该名称会简化为“翻译记忆工具”，因为翻译记忆是CAT工具关注的第一个功能。 Jost Zetzsche喜欢使用*翻译环境工具*或TEnT。这个叫法我也同意。 翻译管理系统（TMS）经常被用作同义词，它们的边界实际上非常模糊。

### CJJK

CJJK指东亚语言，包含汉语、日语和韩语。 有两个C是因为中文有简体中文和翻译中文两种存在。

### 检出（check out）

When a translator or reviewer checks out an online project in memoQ, the tool downloads the assigned documents and sets up a correctly configured working environment. This eliminates saving email attachments and going through an error-prone series of steps, saving time and ensuring all project participants work with the right resources and settings.

### 内容管理系统（CMS）

Software used to edit, organize and publish large amounts of content. A CMS typically tracks who is responsible for what content, whether it is approved or obsolete, what the content applies to, and much more. Often, CMSes break down content into smaller chunks, which are reused in several related documents. CMSes are important because an incredible amount of text that gets translated comes from them, typically as small chunks of XML and often in the DITA format.

### 评论（comment）

In a CAT tool you can mark entire documents, source or target segments, or just a short part within a segment. You can add a remark, or use the function to simply highlight something. This way you can communicate with other translators, reviewers or even clients, or just bookmark something for yourself to return to later. You can keep comments private, or choose to export them as part of the finished translation.

### 检索（concordance）

A function of translation memories and LiveDocs corpora that allows you to search for a word or expression, retrieving all translated segments where it occurs. This is nothing short of a small wonder, allowing you to “Google” existing translations. memoQ also highlights the expression's most probable translation within the target segments, just like Linguee, but from your own private data.

### 已确认（confirmed）

See segment status

### 上下文ID（content ID）

Usually a short machine-readable text that identifies a string that belongs to a specific place in an app or a game. It's crucial to distinguish between, say, “Open” on a label (translated into German as “Offen”) or on a button (translated as “Öffnen”). The TM stores the ID and returns a context match if the same text occurs with the same ID later.

### 上下文匹配（context match）

See TM match types

### CSV

A seemingly simple text-based format that stores several values in each line, separated by commas. It's still widely used to exchange glossaries, and sometimes even for translatable content. In spite of its apparent simplicity it's very easy to mess up; the most common problem is using the wrong code page instead of Unicode.

### 自定义字段（custom fields）

See metadata

### 交付（deliver）

The translator or reviewer's action to signal that they are finished with their task, such as the translation of a given document. Delivery is not a symbolic step: in a system like memoQ, it usually triggers a series of actions like automated QA checks or emailing the finished translation back to the end client.

### 听写（dictation）

Technology that allows you dictate text, instead of typing it on a keyboard. Commercial tools have become incredibly good for major languages. Dictation is preferred by a minority of translators; they, however, report a productivity boost of 50% or more over typists.

### 听写错误（dicto）

dicto是从typo发展出来的一个新词。 表示听写软件的错误听写。 打字错误可以容忍，但是听写错误是很严重的错误，因为它们虽然听起来像原文的短语，但意义却完全不同，就像一个不成熟的中学生笑话。 想想Uranus。

### DITA

Short for Document Information Typing Architecture, DITA is exactly as unsexy as it sounds, but tremendously useful. It is an open standard that defines how to structure and reuse content in CMS systems. The format is based on XML, and if your CAT tool supports it, you can deal with a huge share of the content coming from several different CMSes.

### 桌面出版（DTP）

DTP tools include the likes of FrameMaker and InDesign, used to produce professionally typeset printed documents. In the industry DTP typically means an activity after translation and review. Translated text looks really bad in the original format unless you adjust the typesetting to accommodate longer paragraphs, different special characters, or even a complete left/right directional swap.

### 编辑距离（edit distance）

A number that expresses how different one text is from another, usually derived from the number of insertions, deletions and swaps needed to get from here to there. While similar TM matches are qualified by fuzzy match rates, edit distance is sometimes used to measure the extent of a reviewer's changes.

### ELM许可证（ELM license）

见：CAL许可证（CAL License）

### 完全匹配（exact match）

See TM match types

### 导出（export）

See file format filter

### 外部标签（external tags）

See tags

### 文件格式过滤器（file format filter）

One key benefit of CAT tools is that you always translate in the same familiar editor, regardless of the file format your text came in. That means CAT tools must somehow extract the text from all the different file formats. The component that does this is called a file format filter: it “filters” text from all the other stuff in the file. Bringing the text into the CAT tool is called *importing* a file; retrieving the translation in the original format is called *exporting* it.

Every filter comes with its own options that affect how it works (“Do you want to extract the hidden text from this Word file?”), and for some formats, notably XML, these settings make an enormous difference.

### 查找/替换列表（find/replace listing）

In memoQ, the Find function has an option that puts all occurrences on a separate list, instead of walking through them one by one from the pop-up window. The outcome is the find/replace listing, where you can review each segment comfortably and decide where to replace and where to leave as is.

### 字体替换（font substitution）

Many file formats, particularly from DTP tools, tend to use fonts that look really good, but cannot draw a lot of special characters. If your target language happens to have a lot of these, the translated file will look ugly, or skip letters outright. Font substitution is a function of file format filters that tweaks the file, replacing the original font with one that has the right glyphs for your target language.

### 片段组合（fragment assembly）

可能对于一个句段，您的记忆库或语料库没有精确或模糊匹配的片段，但这一句段的部分内容可能仍然与术语库的内容想匹配，或者有非译元素或自动可译内容。 片段组合功能可以识别这些部分内容并用合适的译文进行替换，这样和重头翻译相比应该还是能节省不少工作。

### 模糊（fuzzy）

First impressions are correct here: this is one of the fuzziest words in the entire industry jargon. Initially a *fuzzy match* was used in contrast to an exact match from a TM: you get a translation that is fully legit, except it's the translation of something more or less different from your current source segment. Just how different is expressed by the fuzzy match rate. Eventually fuzzy matching was also extended to terminology, where it can be pretty useful if your language is in the habit of changing letters in the middle of words.

See also: TM match types

### 全局查找/替换（global find/replace）

In the olden days, the find function only worked if you first opened a document. Global find & replace searches through all documents in your project: a massive difference if, for instance, your job entails hundreds of tiny XML files from a CMS.

### 词汇表（glossary）

See term base

### 高亮（highlight）

See comment

### 均匀性（homogeneity）

常规的项目分析可以告诉你，你的文本中有多少模糊匹配或者完全匹配。匹配的内容是现有的翻译记忆和语料库。 但是，即时你一开始的翻译记忆库是空的，随着你不断的翻译，片段也会得到越来越多匹配的内容。 均匀性功能可以把这些“内部”匹配作为分析的一部分进行处理，而不仅仅是检测重复内容。

### 水平布局（horizontal layout）

A two-column grid layout where you see source on the left and target on the right has engulfed CAT tools like a flash flood washing away a hapless creekside camper's stock of ABC soup. But many a translator still prefers to see their target text below the source. The horizontal layout option reshuffles the active segment's dominos, so source and target show up one below the other.

### 导入（import）

See file format filter

### 内联标签（inline tags）

See tags

### 国际化（internationalization;i18n）

Localizing a product entails more than just translation: it includes things like showing dates in the right format, displaying temperatures in Celsius vs. Fahrenheit, writing first name last or vice versa, and the like. It requires extra effort to enable a product to do all this; that effort is called internationalization.

### 互操作性

The ability of CAT tools to understand each other's formats and APIs, and to support standard formats well, so that people using software from different manufacturers can work together without drama, tears and major tragedies.

### 合并句段（join segments）

See segments

### 关键字上下文检索（KWIC）

A layout for concordance results where the search term is in the middle, with preceding and following text on both sides, row after row.

### 利用（Leverage）

leverage是一个时髦的表达，To leverage past translations的意思是CAT工具提供了我已经翻译的内容，我不需要再翻一遍了。

### 轻量资源（light resources）

这是一个memoq的术语，指代非译元素、句段分割规则等内容。 而重量资源指翻译记忆、LiveDocs语料、Muses，和它们相比，轻量资源的数据量更小。 在许多其它的工具里，它们在设置里出现，而在memoQ中，它们是一种资源。它们有名字，可以被导进导出，可以在不同项目中被重复利用，也能通过memoQ服务器进行在线共享。

### 语言专家（linguist）

This term is probably the single biggest crime of the translation industry against proper English usage. For every educated person, a linguist means someone like Noam Chomsky, William Labov, Daniel Everett, or Arrival's Amy Adams: a scientist studying language in the mind, or language in society. In the translation industry, “linguist” is sloppy shorthand for translator or reviewer.

### LiveAlign

memoQ's approach to alignment, where you simply throw a bag of source and target documents at the tool, and start translating. The tool aligns fist the documents, then their segments, and indexes them in the background so they immediately give you lookup results in the editor. There will inevitably be errors, but you only spend time fixing those that actually give you matches.

### LiveDocs语料（LiveDocs corpus）

memoQ's alternative to TMs. While a TM holds a homogenous mass of translated segments in no particular order, a LiveDocs corpus preserves entire translated documents, but gives you the same kinds of matches. If you want to check the context of a past translation, you can jump directly to the full document from the translation editor. TMs have one big advantage: they only store every translation once. If your content has a lot of repetitions, LiveDocs can become cumbersome.

### 本地化（localization;l10n）

Sometimes used as a synonym for translation, localization entails a bit more: it includes showing dates in the right format, money in the right currency, and the like. In order to localize a product, it must first enable doing all this, which is called internationalization.

### 本地化工程师（localization engineer）

A person who knows the ins and outs of CAT tools, nasty file formats, regular expressions and other arcana. Many are not shy to code either. They make sure that before a complex project is launched, all the content is imported correctly, the segmentation is right, untouchable segments are locked, and a lot more. Without localization engineers, complex projects would never be finished on time and budget, and translators would tear out their hair and move to a farm to raise pigs.

### 锁定使用了不同语言的句段（lock segments in different languages）

没有一个CAT工具能够处理好源文使用了混合语言的情况。 在memoQ中隐藏着一个很好的功能可以锁定句段。 这个不显眼的选项将检测每个句段的语言，如果它不同于文档的原文语言，则将其锁定。

### 锁定的（locked）

In practically every CAT tool segments have a status like *new, pre-translated* or *confirmed*. Independently from this, segments can also be locked, which makes them read-only. If a localization engineer has populated some segments with translations approved (and mandated) by the client, then locking makes sure these do not get changed accidentally. Locked segments are also easy to exclude from the word count during analysis.

### 语言质量保证（LQA）

In addition to merely reviewing and correcting translations, human reviewers can also mark every error they find, indicating the error's type from a pre-defined list; the error's severity; and possibly other details. This information can later be evaluated to assess quality objectively. LQA is the function that facilitates this in CAT tools.

### LSC

See automatic concordance

### 语言服务提供商（LSP）

A business that sells translation services to its clients.

### 机器翻译（MT）

A computer system that transforms a sequence of characters into a different sequence of characters that is recognizable, to a human, as text in another language, with relevant clues about the information in the original text. MT systems come in three main flavors. In rules-based (RBMT) systems, humans hand-craft grammatical rules. In statistical (SMT), a statistical system is trained on large amounts of human-translated text. Neural (NMT) systems are also trained on human-translated data, but they need a lot more computation, and have been reported to produce superior results.

Tools like Google MT are generic. In the translation industry it is more common to train specialized systems that do really well on a single type of content. This needs MT experts and a body of relevant, high-quality human translations for the training data.

One way in which MT is used is human post-editing: the MT system produces a rough translation that is often incorrect and ungrammatical, but is cheaper/faster to fix by humans than to translate from scratch. Another way is interactive MT, where the human translator receives suggestions from the MT system while she is translating text in a CAT tool.

### 机器翻译后编辑（machine translation post-editing）

One way to utilize machine translation, where the MT system produces a rough “translation” that is often incorrect and ungrammatical, and is then post-edited by a human to remove major errors and improve fluency.

### 主翻译记忆（master TM）

See working, master and reference TM

### 匹配率（match rate）

See TM match types

### MatchPatch

A memoQ function that improves fuzzy matches from a TM or a corpus by replacing the phrases that are different, relying on term base matches, auto-translatables and non-translatables.

### 元数据（metadata）

Additional details about a piece of stored information, like “who translated this, when, and for what client” in the case of a translation unit, or “what source did this come from and did the client approve it” for a term base entry. CAT tools usually support a set of standard fields like the ones above, but also allow users to define their own custom fields and categories for more detail.

### 移动端许可证（mobile license）

见：CAL许可证（CAL License）

### 单语审校（monolingual review）

A function where you export your translation into its original format, make changes outside the CAT tool, and can then bring those changes back into the translation environment from the edited target-language file. It is particularly useful when you need to send your work for client review but even a Word-based bilingual file is “too complicated.”

Why do you want to bring such changes back into the CAT tool? To make sure your TM contains only final, approved translations. Otherwise you may end up with trash in, trash out.

### MQXLIFF

An XLIFF file than contains additional, non-standard information specific to memoQ, such as segment statuses, QA warnings, LQA errors, comments etc.

### 多语言Excel（multilingual Excel）

An Excel file with source text, translations, comments and other information. Sometimes it's a small, innocuous file with two columns for source and target text, but we have reliable eyewitness reports of files out there with 50,000 rows and 25 columns for different languages. Such monstrous files often come from computer games.

### MultiTrans XML

The XML-based format used by SDL MultiTrans to export and import terminology. Although not an official standard, it is widely used for terminology exchange even between completely different systems.

### Muse

One of the resources powering predictive typing in memoQ. A Muse is built by analyzing existing TMs and corpora, with the aim of extracting words and phrases that correspond to each other in the two languages. When you translate a new source segment, the Muse looks at the phrases in it and gives you a list of suggestions that might be the translation of a phrase in the source text.

### 神经网络机器翻译（NMT）

See machine translation

### 不换行空格（non-breaking space）

一种特殊的字符，看起来像一个普通的空格，但作用不同，因为它不允许句子在单词的左右两边换行。 在法语中，冒号前面必须有一个非换行空格（你不希望一行内容的开头是“：”），数字和度量单位之间也必须有一个非换行空格（你也不希望开头是“cm”）。 在大多数文字处理器中，您可以通过按ctrl+space来键入它。

### 非打印字符（non-printing characters）

空格、非换行空格、制表符和换行符。 另外，在双向文本中使用的一些不可见字符。 它们都是空白的，你通常看不到它们。 和Word一样，CAT工具也有一个显示它们的选项，这样您就不会意外地键入两个空格，或者在该输入非断行空格的地方插入了一个正常的空格。

### 非译元素（non-translatables）

Somewhat similar to terms, except that they are identical in all languages. Most often they are brand names that are to be left alone.

### 光学字符识别（OCR）

Software whose original function is to turn an image (e.g., a scanned page) into editable text, usually a Word document. In translation OCR is used to turn documents in the one-way PDF format into a Word document that you can edit or import into a CAT tool.

### 在线项目

A memoQ project that stores documents in a server, allowing multiple people to simultaneously translate and review them, working together in real time. Online projects also make it really simple to assign work because they eliminate sending files around in email, and they prevent trivial errors because they make sure everyone in the project uses the right settings and resources.

### 在线翻译记忆（online TM）

A translation memory shared through a server or in the cloud. They allow organizations to store their translations centrally (and always find them when they are needed). They also make sure that translators working together in real time on different parts of a project get to see each other's translations instantly, ensuring their work will be consistent.

### 即时过滤（on-the-fly filter）

A function present in all advanced CAT tools (though usually called differently) that allows you to filter the segments of the document you're working in. It is “find” on steroids: you can quickly skim segments that contain a particular word or expression, and make changes if you changed you mind about a translation. It's also useful to eliminate, say, segments that are already confirmed so you can just focus on what needs work.

### PDF

Portable document format by its maiden name, it is meant to make sure a document looks exactly the same no matter where you view or print it. The price of that consistency is that it's extremely hard (nigh-impossible) to change the text inside it. In other words, it's a one-way format, which makes it one of the biggest nuisances for the translation industry. Apart from a few innovative solutions like TransPDF, your best bet is to convert a PDF into a Word file with an OCR tool, then translate that. Or, if you have the chance, to get the source (InDesign, FrameMaker or similar DTP file) from your client and work on that.

### PEMT; post-edited machine translation

See machine translation post-editing

### 惩罚

Some translations are to be trusted less than others. They may be too old, coming from the wrong translator, or applicable to a different client or domain. A penalty means reducing the translation's natural match rate so it gets ranked lower than others.

### 永久许可证（perpetual license）

A license that allows you to use a piece of software you have purchased forever. Perpetual licenses typically belong to a specific version of the software: to make sure the developer stays in business, it needs to finance its work by charging an [upgrade fee](1130) for new versions.

### 插件（plugin）

A small module in a larger piece of software that performs a specific task. The point, usually, is that anyone can develop a plugin without the need to involve the main software's developer. A typical example in CAT tools is machine translation plugins: the providers of the machine translation make their service available through plugins for the CAT tools used by translators, LSPs or companies. Whatever the purpose, you can create plugins if the CAT tool's developer opened up a part of their application by creating and publishing an SDK.

### 填充纯数字片段（populate number-only segments）

Quite often a source document has lots of segments that all contain only numbers – think financial reports. Numbers are funny. They don't need translation in the traditional sense, but they also cannot go straight into the translated text: the target language's conventions for decimal separators and the like are different. This function processes all the segments with numbers in one go, adjusting their format along the way.

### 译后分析（post-translation analysis）

PTA for short, it is similar to analysis, but is performed once the translation is finished, not up front. Every large text will yield a lot of “internal” TM matches, both fuzzy and exact. When two or more translators work together, there's no way to say in advance who will translate a segment from scratch, and who will get a match because someone else was there first. memoQ keeps track of this in its online projects, and gives a precise and fair breakdown when all the work is done.

Incidentally, the numbers in the pre-translation analysis match very closely those from homogeneity. The difference is that PTA's breakdown shows *who* got how many of the internal matches that homogeneity predicted at the start.

### 输入预测（predictive typing）

One of CAT tools' most sexy functions with the least sexy name. Predictive typing makes you both faster (by eliminating keystrokes) and more consistent (by offering the right things to type). It looks at the characters that you have typed so far and offers a list of continuations from the current segment's term base matches, auto-translatables, non-translatables, Muse hints and other such sources.

### 预翻译的（pre-translated）

See segment status and pre-translation

### 预翻译（pre-translation）

A function that processes every segment in a document and automatically inserts the best translation from the project's TMs and corpora.

### 预览（preview）

A screen area in your CAT tool that shows the document in its original format, or a close approximation. A premise of CAT tools is to rip text to segments and let you translate these in the same efficient environment, regardless of the original file format. But one thing is lost through this: visual context. The solution to this self-inflicted pain is the preview, which magicks visual context right back into your environment.

### 项目主页（project home）

The screen in memoQ where you can add or remove documents to translate, pick TMs, term bases, Muses and other resources, and fiddle with your working environment in countless other ways, whenever you have an urge to procrastinate.

### 项目管理系统（project management system）

Software that keeps track of jobs, prices, customers, vendors, deadlines, invoices, and a host of other things that you need to run a translation business or department.

### 项目模板（project templates）

If you get recurring or at least similar translation jobs (and you do), you are forced to do the same things over and over again: pick the right TMs, term bases, light resources, settings, people etc., and also perform the same actions like analysis, pre-translation and the like. Project templates define rules for all of these and a lot more, so you don't make embarrassing mistakes, don't get tendonitis from incessant clicking, and have a fighting chance to stay sane in the midst of it all. Also, project templates allow you to reuse the work of experts like localization engineers and make it a lot simpler for new hires to get up to speed.

### 伪翻译（pseudo-translation）

Translation is the fun part, but if you're dealing with complex file formats from esoteric systems, you need to make sure your work will also make it back to the original system at the end and not crash your client's multimillion-dollar flagship app right before the deadline. Pseudo-translation allows you to test the whole process without actually translating anything. It replaces source text with funny characters, words spelled backwards, and made-up stuff to inflate strings.

### 译后分析（PTA）

See post-translation analysis

### 质量保证（QA; quality assurance; automatic QA）

Machines cannot even come close to humans in crafting a message that resonates, but humans are really bad at getting numbers and other boring and repetitive things right. Quality assurance checks come to the rescue: they verify that you got your numbers right, that you didn't type two spaces, that you used MegaCorp Ltd's official terminology, that you translated the same thing the same way throughout the text, that you didn't forget a mission-critical tag, and a lot more. And if the dumb machine didn't get it right, you always have the option to ignore (suppress) individual QA warnings.

### 参考翻译记忆（reference TM）

See working, master and reference TM

### 正则表达式（regular expressions; regex）

Even texts written by humans are full of patterns that have well-defined moving parts. Think dates: Number(1-12)/Number(1-31)/Number(four digits) is a date in the US. For German, you have the same numbers in there, you just need to rearrange them and use dots instead. Regular expressions are a super counter-intuitive but super-useful way to describe exactly these kinds of patterns. No wonder CAT tools support them across the board, from defining file format filters through auto-translatables to find/replace. You can get half a localization engineer's career just out of knowing your regex.

### 拒绝的（rejected）

See segment status

### 重复（repetition）

Any segment that occurs at least twice in your source text is a repetition. They are a delight because usually you need to translate the same thing only once. That's how repetitions gave rise to auto-propagation and exact matches. And for the cases where the same thing must be translated differently, you have context IDs to differentiate.

### 从右往左文本（RTL; right-to-left）

见BiDi。

### 软件开发套件（SDK; software development kit）

A set of tools and documentation that allows developers to build their own module to work together with a different piece of software. SDKs are what allows third parties to develop plugins for CAT tools, for instance.

### 句段（segment）

When we translate text, we almost always proceed sentence by sentence. If you try to get to the bottom of it, however, nobody really knows what a sentence precisely is. Also, when you translate a single word in a bullet-point list, is that a sentence? CAT tools decided to sidestep this can of worms altogether, so we speak about *segments* instead.

Generally (though not always), a segment is the essential unit of translation: you proceed segment by segment in the editor, and you store the translation of segments in the TM. Your TM and corpus matches also refer to the segment you are translating at the moment.

Segments are born with the active cooperation of regular expressions, in a special incarnation called *segmentation rules*. As all regex, they look gibberish to the uninitiated eye, but they basically elaborate a single theme: “If you find sentence-final punctuation like a period followed by one or more spaces followed by a capital letter, start a new segment right there. Except if the last word before the period is a known abbreviation.” Segmentation normally happens quietly, behind the scenes, when your CAT tool's file format filter imports a source document.

No matter how elaborate, segmentation rules will inevitably get it wrong from time to time. To help get around this, CAT tools have a function to join neighboring segments, and to split a single segment into two.

### 句段状态（segment status）

From the moment you import a document into your CAT tool all through the steps of translation, review, client review, proofreading after a good night's sleep, and additional review by your pet, up to the point of exporting it for delivery to your client, the text lives in the form of segments. In this form, there's a whole lot to know about segments beside the text itself: does the target come from a TM, or from you? Have you confirmed it already? Was it rejected by a reviewer? Is it halfway edited but not quite finished yet? That is the kind of information that you can see in the form of colors and icons within the translation environment.

For several years after they arrived, my friends from Mars were convinced translators were in the business of turning empty (grey) segments into confirmed (green) ones, and they thought this was a terribly appealing job. By now they know they were wrong, but they still think the job is awesome.

### 句段分割（segmentation）

See segment

### 同时翻译与审校（simultaneous translation and review）

A function of online collaborative CAT tools that allows several people to edit the same document together in real time. You can think of this as Google Docs on steroids, customized for the two-column, source-and-target world of translation.

### 支持与维护协议（SMA; support & maintenance agreement）

While a license agreement entitles you to use a piece of software, the SMA that usually goes along with it grants you access to support from a human and to new versions of the software. Normally, perpetual licenses have a one-off fee; SMA, in contrast, is charged on an annual basis.

### 统计机器翻译（SMT; statistical machine translation）

See machine translation

### 分割句段（split segments）

见句段（segment）。

### 句段分割规则（SRX; Segmentation Rules eXchange）

An XML-based standard that allows different CAT tools to read each other's segmentation rules.

### 子片段的利用（subsegment leverage）

This is a strong contender for the industry's most fuzzy word, right there after fuzzy itself. When a CAT tool vendor uses it, they basically want to say, “We're doing something extremely advanced and useful here.” In prosaic terms it means lookup results and suggestions (aka leverage) that refer to a shorter bit of the source segment. In all earnestness, often the machinery that generates such matches really is pretty advanced, extrapolating knowledge from past translations in ways that are far from obvious.

### 统计信息（statistics）

见分析（analysis）。

### 文本（String）

In developer-talk, a string is a sequence of characters. When you translate the user interface of a software application or a game, all the chunks of text that appear in different places are called “strings.” Typically, a string shows up as a single segment, and it has an associated context ID to disambiguate it.

### 结构标签（structural tags）

See tags

### 同步（synchronize）

When you work in a memoQ online project, you have the option not to save every translated segment in the server immediately, but instead gather a lot of changes locally, and exchange news with the server in one go. That action is called *synchronizing* the project.

### 表格RTF（table RTF）

见双语RTF（bilingual RTF）。

### 标签错误（tag error）

Some inline tags are optional: maybe that bold formatting in the source text is not needed in your translation at all. Others, however, are mission-critical: if they represent N in the sentence “You have N enemies left”, then if you omit the tag, the translated game will crash and the outrage of gamers will put your client out of business. To avoid such an outcome, the QA module of CAT tools gives you a tag error right in the editor, and won't let you deliver your translation until you fix it.

### 标签插入模式（tag insertion mode）

Tags can be a real nuisance as you translate: you need to think about where they must go, you need special shortcuts to insert them, and generally, they throw you out of the flow. So in memoQ you can just focus on translating a segment's text first, then activate tag insertion mode and sprinkle your target segment with tags in the right places.

### 清理标签（tag soup）

An unfortunate but all too frequent situation when a document that you have just imported is chock full of tags that are unexpected, pointless, or both. This most often happens with Word documents that an OCR tool produced from a PDF because it wanted to make sure everything is shown exactly in the right place, down to a hundredth of a millimeter. You can make things better by tweaking the OCR tool's settings, running a cleanup macro like Dave Turner's CodeZapper, or pestering your CAT tool's developers to do something about it. Only the first two have been conclusively shown to work.

### 标签（tags）

The content we need to translate consists mostly of text – but not exclusively. One oddity is formatting changes: how do you represent a change of text color in the middle of a sentence? The other oddity is a consequence of structured content, where text is intertwined with markup like hyperlinks, cross-references, or placeholders that will be substituted with, say, a number when a piece of software runs.

CAT tools cope with all this by introducing tags: symbols inside your segments that act like a character in the editor, but look completely different. These creatures are called *inline* or *internal* tags.

Then you have formats like XML or HTML that have tags woven into their own DNA. Some of these tags define structure (“this is a headword”, “this is a caption”), always enclosing text from the outside. These are called *structural* or *external* tags, and should never show up in your segments. They only do if the XML filter was not configured properly before the import. You can fix that by hiring a good localization engineer.

The analysis output of well-behaved CAT tools has a separate section that shows how many tags the text contains in addition to good old-fashioned characters. This is important, because tags can be a lot of work and really slow you down as you translate.

### TB

参见术语库。

### 术语库交换格式（TBX; TermBase eXchange）

一种基于XML的标准，允许CAT工具和其他软件交换术语。

### 修订匹配（TC match）

A bit of a schizophrenic creature that cannot completely make up its mind whether it's a match rate or a segment status. It rears its head in the complicated scenario when you need to translate a source segment that contains tracked changes, which you need to reproduce in the translation too. A TC match is basically an exact match for the original form of the source segment, pretending those tracked changes were never put in there.

See also: track changes

### 翻译编辑校对（TEP; translation-editing-proofreading）

A widely used workflow that involves a translator and two different people subsequently reviewing her work, with the aim of ensuring a high-quality translation, and giving feedback for the translator to improve.

### 术语库（term base）

A “database” or a component of CAT tools that allows users to store important words/expressions and their equivalents. It saves the hassle of researching the same term twice. It also helps translators adhere to terminology mandated by their clients, or at least stay consistent with themselves. In fact, it's indispensable for consistency if different people are translating the same large text simultaneously, collaborating online from different locations.

Often used interchangeably with *glossary*, but they're not quite the same. A glossary is usually just a word list in two languages, while term bases have structure and metadata too.

### 术语抽取（term extraction）

A function of advanced CAT tools that looks at new source text or a body of existing translations and extracts important words and expressions. The output typically contains a lot of “false positives,” but it allows a translator to research important terms before starting to translate, include them in a term base, and make sure they are then translated both correctly and consistently.

### 术语数据库（terminology  database）

参见术语库。

### 翻译记忆（TM; translation memory）

The idea that initially gave rise to commercial translation technology. Why translate the same sentence twice? The TM is a “database” of segments and their translations. TMs quickly evolved to give a hint also for segments that are only similar (see TM match types), to allow concordance searches, and to support subsegment leverage.

### 翻译记忆匹配类型（TM match types）

Translation memories are big bags full of source segments and their translations. When a new segment comes along, CAT tools rack these bags for segments that were translated before, and return these as matches. If the same sentence is there in the bag, that's an *exact* match, whose match rate is 100%. It can get even better: if there's a translation of not only the same segment, but the same segment from the exact same context, that's a *context match* (aka “ICE” for in-context exact). If the best there is is the translation of something similar but not identical, that's a *fuzzy* match with a match rate below 100%. Often, *high fuzzies* are distinguished: these matches only differ in punctuation, capitalization or numbers, and are therefore easier to fix.

### 翻译记忆驱动的句段分割（TM-driven segmentation）

An advanced function of memoQ that dynamically splits or joins segments during pre-translation to get better TM matches. It's a simple idea. What if a translator joined two segments before storing the translation in the TM, and now the same two segments show up again? By recognizing this on the spot, the two segments can be joined in the current document too for a perfect match, without human intervention.

### 翻译管理系统（TMS; translation management system）

Software that helps you manage translations and organize resources. Re: manage, think “these 1500 files must be translated into 25 languages, with 6 translators and 2 reviewers working in parallel for each, making sure that nobody overrides approved translations from the past, and ready by next Monday, with real-time visibility into the project's progress until then.” Re: organize, think “I must find the right translation memories and term bases from among the 2000 resources I have around for various clients and language pairs.”

### 翻译记忆交换格式（TMX; Translation Memory eXchange）

An XML-based format to, well, exchange translation memories. The adoption of this standard was a crucial step in the industry towards interoperability, and at this point virtually all tools support it.

### 跟踪修订（track changes）

Many regulated industries (like pharma) are required by law to track every change they make to crucial documents, such as the usage instructions and side effects of a medicament. Not only that, but when they sell to multiple markets, they must reproduce all these changes in translated materials too. As a translator or LSP, the only way to achieve this without losing your sanity and/or getting sued out of your profits is if your CAT tool has special functions to both cope with change-tracked documents and preserve the benefits of TMs, term bases, QA and everything else.

See also: TC match

### 翻译单元（translation unit）

In a CAT tool, you translate documents segment by segment. Once you store the translation of a source segment in your TM, the two together, plus some metadata like “who translated this and when,” are bundled up and transmogrified into a translation unit.

### 垃圾进，垃圾出（trash in, trash out）

Imagine you store a nonsense translation in your TM. When you receive an updated document, pre-translation picks it up as a perfect match, and you don't even get to see it. If you train an MT engine with this data, it will produce nonsense translations. Once trash gets into the system, it perpetuates itself. How do you avoid that? Through QA, through TEP, through separating working and master TMs, and other similar efforts. All of which are only possible if you use a CAT tool that allows you centralize your resources, define the right processes, and eliminate error-prone manual steps.

### 两列Excel（two-column Excel）

参见多语言Excel（multilingual Excel）

### Unicode

According to Wikipedia, *Unicode is a computing industry standard for the consistent encoding, representation, and handling of text expressed in most of the world's writing systems.*

According to me, Unicode is the best thing that has happened since sliced bread. It means if you write a text with your own language's special characters, that text can be read by people anywhere in the world, using any gadget with a CPU and a display. Even (usually) in Excel.

Nonetheless, to prove that our world is not the best of all possible worlds, you must keep in mind that while Unicode doesn't support Klingon, it does have a character for the handgun emoji.

### UTF-8

See Unicode

### 提供商（vendor）

In our industry, a person or a business that offers translation services to other persons or businesses.

### 视图（view）

Since CAT tools are apparently great fans of deconstructivism and start their day by tearing text into chunks called segments, you might as well max this out by slicing and dicing the living daylight out of those poor segments. As in: “I have just turned this User Guide into 1300 segments and pre-translated them. Now give me those segments that have no TM match, occur at least twice, and have the words ‘squinting squirrels' in them. Also, show me each segment only once, and order them alphabetically.” That is the kind of thing that views allow you to do.

### 网络编辑器（web editor）

A component of CAT tools that allows translators and reviewers in an online project to work from a browser, without installing software on their own computer. A web editor is to traditional desktop tools as Google Docs is to Word, except advanced CAT tools offer both options (even within the same project) and don't force you to choose between two incompatible companies.

### 字数统计（word count）

See analysis

### 工作、主和参考翻译记忆（working, master and reference TM）

Keeping stuff organized is an age-old challenge. If you don't get it right, you end up with trash in, trash out. One way to stay on top of data within a translation project is to designate one TM as the master (translations coming from there get precedence over others); another one as the working TM (new, as-yet unrevised translations get stored there, keeping the master pristine); and the rest as reference (to fill in the gaps that the master does not cover).

### XLIFF

Short for XML Localization Interchange File Format, a standard maintained by OASIS. In practice, it is a file format that allows translatable text to be passed between tools in a source/target, bilingual form.

### XML; eXtensible Markup Language

An extremely versatile format for storing structured information in files that are readable by machines and not *completely* unreadable by humans. A tremendous amount of content that gets translated comes from XML files, particularly if the content's source is a CMS system. You generally don't need to understand the dirty details unless you are a localization engineer, in which case you are a wizard who knows all about file format filters and don't need this glossary anyway.

### X-translate

So you're half done translating a file, with tons of comments in there and segments in all imaginable statuses. At this point your client calls you and says, “Hey, our editors have been busy, we have a revised source file, we actually need you translate that instead of the one from last week.” If your CAT tool has X-translate, this is not a problem. The function compares the original source document with the updated source document, going segment by segment, and recreates your work, including comments, ignored QA warnings, segment statuses and all the rest. Whatever changed in the source text is left empty, so you can catch up with the changes and continue where you left off.
