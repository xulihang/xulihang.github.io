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

memoq便选择丢弃部分CharacterStyleRange信息。我测试Trados需要勾选“允许打开未支持的版本”来打开cs4之后版本的indesign导出的idml文件。而memoq没有问题。Omegat使用Okapi的话，会生成大量标签，而且如果标签处理得不好，很可能无法生成目标文件。商业软件还是有它强大的地方的。

```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<idPkg:Story xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="13.0">
	<Story Self="u1de62" AppliedTOCStyle="n" UserText="true" IsEndnoteStory="false" TrackChanges="false" StoryTitle="$ID/" AppliedNamedGrid="n">
		<StoryPreference OpticalMarginAlignment="false" OpticalMarginSize="12" FrameType="TextFrameType" StoryOrientation="Horizontal" StoryDirection="LeftToRightDirection" />
		<InCopyExportOption IncludeGraphicProxies="true" IncludeAllResources="false" />
		<ParagraphStyleRange AppliedParagraphStyle="ParagraphStyle/$ID/NormalParagraphStyle" Hyphenation="false" HyphenationZone="70.31454656574766" RuleAboveLineWeight="1.9531818490485455" RuleBelowLineWeight="1.9531818490485455" Justification="CenterAlign" SplitColumnInsideGutter="11.719091094291274" ParagraphBorderTopLeftCornerRadius="1.221788512786767" ParagraphBorderTopRightCornerRadius="1.221788512786767" ParagraphBorderBottomLeftCornerRadius="1.221788512786767" ParagraphBorderBottomRightCornerRadius="1.221788512786767" ParagraphShadingTopLeftCornerRadius="1.221788512786767" ParagraphShadingTopRightCornerRadius="1.221788512786767" ParagraphShadingBottomLeftCornerRadius="1.221788512786767" ParagraphShadingBottomRightCornerRadius="1.221788512786767" ParagraphBorderTopLineWeight="1.221788512786767" ParagraphBorderBottomLineWeight="1.221788512786767" ParagraphBorderLeftLineWeight="1.221788512786767" ParagraphBorderRightLineWeight="1.221788512786767">
			<Properties>
				<ParagraphShadingColor type="object">Color/C=100 M=100 Y=31 K=22</ParagraphShadingColor>
			</Properties>
			<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]" FillColor="Color/u1de8e" FontStyle="Black" PointSize="30.41629884874917" StrokeWeight="4.781663163425601" StrokeColor="Color/C=5 M=100 Y=85 K=0" MiterLimit="7.812727396194182" EndJoin="RoundEndJoin" RubyFontSize="-1.9531818490485455" KentenFontSize="-1.9531818490485455">
				<Properties>
					<Leading type="unit">53.33563679789722</Leading>
					<AppliedFont type="string">Burbank Big Regular</AppliedFont>
				</Properties>
				<Content>Th</Content>
			</CharacterStyleRange>
			<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]" FillColor="Color/u1de8e" FontStyle="Black" PointSize="30.41629884874917" StrokeWeight="4.781663163425601" Tracking="-25" StrokeColor="Color/C=5 M=100 Y=85 K=0" MiterLimit="7.812727396194182" EndJoin="RoundEndJoin" RubyFontSize="-1.9531818490485455" KentenFontSize="-1.9531818490485455">
				<Properties>
					<Leading type="unit">53.33563679789722</Leading>
					<AppliedFont type="string">Burbank Big Regular</AppliedFont>
				</Properties>
				<Content>e </Content>
			</CharacterStyleRange>
			<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]" FillColor="Color/u1de8e" FontStyle="Black" PointSize="30.41629884874917" StrokeWeight="4.781663163425601" StrokeColor="Color/C=5 M=100 Y=85 K=0" MiterLimit="7.812727396194182" EndJoin="RoundEndJoin" RubyFontSize="-1.9531818490485455" KentenFontSize="-1.9531818490485455">
				<Properties>
					<Leading type="unit">53.33563679789722</Leading>
					<AppliedFont type="string">Burbank Big Regular</AppliedFont>
				</Properties>
				<Content>Rea</Content>
			</CharacterStyleRange>
			<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]" FillColor="Color/u1de8e" FontStyle="Black" PointSize="30.41629884874917" StrokeWeight="4.781663163425601" Tracking="-25" StrokeColor="Color/C=5 M=100 Y=85 K=0" MiterLimit="7.812727396194182" EndJoin="RoundEndJoin" RubyFontSize="-1.9531818490485455" KentenFontSize="-1.9531818490485455">
				<Properties>
					<Leading type="unit">53.33563679789722</Leading>
					<AppliedFont type="string">Burbank Big Regular</AppliedFont>
				</Properties>
				<Content>l </Content>
			</CharacterStyleRange>
			<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]" FillColor="Color/u1de8e" FontStyle="Black" PointSize="30.41629884874917" StrokeWeight="4.781663163425601" StrokeColor="Color/C=5 M=100 Y=85 K=0" MiterLimit="7.812727396194182" EndJoin="RoundEndJoin" RubyFontSize="-1.9531818490485455" KentenFontSize="-1.9531818490485455">
				<Properties>
					<Leading type="unit">53.33563679789722</Leading>
					<AppliedFont type="string">Burbank Big Regular</AppliedFont>
				</Properties>
				<Content>Scienc</Content>
			</CharacterStyleRange>
			<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]" FillColor="Color/u1de8e" FontStyle="Black" PointSize="30.41629884874917" StrokeWeight="4.781663163425601" Tracking="-25" StrokeColor="Color/C=5 M=100 Y=85 K=0" MiterLimit="7.812727396194182" EndJoin="RoundEndJoin" RubyFontSize="-1.9531818490485455" KentenFontSize="-1.9531818490485455">
				<Properties>
					<Leading type="unit">53.33563679789722</Leading>
					<AppliedFont type="string">Burbank Big Regular</AppliedFont>
				</Properties>
				<Content>e </Content>
			</CharacterStyleRange>
			<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]" FillColor="Color/u1de8e" FontStyle="Black" PointSize="30.41629884874917" StrokeWeight="4.781663163425601" StrokeColor="Color/C=5 M=100 Y=85 K=0" MiterLimit="7.812727396194182" EndJoin="RoundEndJoin" RubyFontSize="-1.9531818490485455" KentenFontSize="-1.9531818490485455">
				<Properties>
					<Leading type="unit">53.33563679789722</Leading>
					<AppliedFont type="string">Burbank Big Regular</AppliedFont>
				</Properties>
				<Content>of</Content>
				<Br />
			</CharacterStyleRange>
			<CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]" FillColor="Color/u1de8f" FontStyle="Black" PointSize="60.05106423996018" StrokeWeight="4.781663163425601" StrokeColor="Color/C=5 M=100 Y=85 K=0" MiterLimit="7.812727396194182" EndJoin="RoundEndJoin" RubyFontSize="-1.9531818490485455" KentenFontSize="-1.9531818490485455">
				<Properties>
					<Leading type="unit">47.11735130636342</Leading>
					<AppliedFont type="string">Burbank Big Regular</AppliedFont>
				</Properties>
				<Content>Supers</Content>
			</CharacterStyleRange>
		</ParagraphStyleRange>
	</Story>
</idPkg:Story>
```


