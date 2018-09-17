---
date: 2018-08-26 14:50:50+08:00
layout: post
title: 翻译InDesign文件
categories: 技术随笔
tags: CAT 出版
---

InDesign是常用的排版软件，我翻译的许多儿童绘本都是用它来制作的。

最新的InDesign默认使用indd格式保存，并不被大多数CAT软件支持。我们需要将其转换为idml格式文件。idml基于xml，可以用来兼容旧版的InDesign，而开源的scribus1.5版也支持了idml。

生成idml后，就可以直接导入Trados等CAT软件了。我们也可以使用Okapi将其转换为XLIFF文件，这样所有主流CAT软件都支持这一格式。如何使用Okapi可以参见此文：[面向本地化工程师的开源CAT工具教程](http://blog.xulihang.me/guide-of-open-source-cat-tools-for-localization-engineers/)

最后生成目标语言的idml文件，使用排版软件打开查看结果。

注意事项：

1. Translating Indesign Files - Sending back IDML to the INDD format https://forums.adobe.com/message/4130893 这里提到了indd文件如果使用了内嵌图片，需要先取消内嵌，改为链接本地图片。
2. 使用Scirbus打开生成的idml文件，会无法显示中文，这时需要手动修改中文字体。
3. 用CAT软件打开后，文本的顺序可能和原文有差别。比如第二页的文字出现的垂直位置比第一页的靠前，结果在第二页的文字会被排在前面。这点在自由性上不如直接翻译纯文本，纯文本可以随便调顺序。

其它：

1. Redokun支持在线将Indesign文件导出为xlsx或者xliff文件。https://forums.adobe.com/message/8744798#8744798
2. Incopy是Adobe允许作家、编辑和设计共同编辑一个indesign文件的软件，更加适合文字编辑工作。


# 2018-09-04更新：

打开一个idml中的story文件，我们可以看到以下内容。可以发现，正文的文字会因为格式不同被分割开来。比如标题中每个单词的首字母大写。这样导入CAT软件中，会有标签过多，以及一句话被分为多个片段的问题。

memoq便选择丢弃CharacterStyleRange的信息。我测试Trados需要勾选“允许打开未支持的版本”来打开cs4之后版本的indesign导出的idml文件。而memoq没有问题。Omegat使用Okapi的话，会生成大量标签，而且如果标签处理得不好，很可能无法生成目标文件。商业软件还是有它强大的地方的。

```
<Story Self="u5b4" AppliedTOCStyle="n" UserText="true" IsEndnoteStory="false" TrackChanges="false" StoryTitle="$ID/" AppliedNamedGrid="n">
		<StoryPreference OpticalMarginAlignment="false" OpticalMarginSize="12" FrameType="TextFrameType" StoryOrientation="Horizontal" StoryDirection="LeftToRightDirection" />
		<InCopyExportOption IncludeGraphicProxies="true" IncludeAllResources="false" />
		<XMLElement Self="di3i4" MarkupTag="XMLTag/Story" XMLContent="u5b4">
			<ParagraphStyleRange AppliedParagraphStyle="ParagraphStyle/Body Copy">
				<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]">
					<Br />
					<Content>Your body has three different types of muscles. Two types, the </Content>
				</CharacterStyleRange>
				<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/Body Copy Bold" FontStyle="300">
					<Content>smooth</Content>
				</CharacterStyleRange>
				<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]">
					<Content> muscles (muscles found in your organs) and the </Content>
				</CharacterStyleRange>
				<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/Body Copy Bold" FontStyle="300">
					<Content>cardiac</Content>
				</CharacterStyleRange>
				<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]">
					<Content> muscle (your heart), work automatically. This means you can’t control them. You </Content>
				</CharacterStyleRange>
				<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/Body Copy Italic" FontStyle="300">
					<Content>can</Content>
				</CharacterStyleRange>
				<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]">
					<Content> control the third type</Content>
				</CharacterStyleRange>
				<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]" KerningValue="-60">
					<Content>—</Content>
				</CharacterStyleRange>
				<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]">
					<Content>the </Content>
				</CharacterStyleRange>
				<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/Body Copy Bold" FontStyle="300">
					<Content>skeletal</Content>
				</CharacterStyleRange>
				<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]">
					<Content> muscles. There are about 650 skeletal muscles in your body. These are the muscles that make you move.</Content>
					<Br />
				</CharacterStyleRange>
			</ParagraphStyleRange>
		</XMLElement>
	</Story>
```


