---
date: 2020-02-14 13:25:50+08:00
layout: post
title: 纯前端全文检索
categories: 技术随笔
tags: CAT
---

使用ImageTrans翻译好漫画后需要进行后期的管理和展示。

我预想将其传到Github Pages上，再做几个页面用于浏览和检索。因为不涉及后端，是个纯前端项目，如果做全文检索的话得先在发布的时候创造索引文件供调用。

下面是大致的一个目录结构：

```
根目录
│  come_to_me_love.itp #ImageTrans项目文件
│  come_to_me_love.itp-images.json #生成的图片列表，排好序的
│  index.json #生成的索引
│  viewer.html #浏览页面
│  search.html #索引页面
│
└─come_to_me_love #图片目录
    │  2.jpg
    │  3.jpg
    │  4.jpg
    │  5.jpg
    │  6.jpg
    │  7.jpg
    │  8.jpg
    │
    └─out #译文图片目录
            2.jpg
            3.jpg
            4.jpg
            5.jpg
            6.jpg
            7.jpg
            8.jpg
```

我选择[lunr.js](https://lunrjs.com/)提供全文检索的支持。lunr.js默认支持多个语种的索引，但并不支持中文，一位网友根据其多语言接口制作了中文支持的库：[Add Chinese support](https://github.com/MihaiValentin/lunr-languages/pull/53)，这个库使用nodejieba对中文进行分词。

下面是操作过程：

1. 首先处理ImageTrans的项目文件，把每个文本框作为一个文档导出为json。有三个属性，名称、原文和译文。名称为用冒号分隔的项目名称、图片名称和文本框序号。

	```
	[
		{
			"name": "come_to_me_love.itp:8.jpg:13",
			"source": "IT WAS THE FIRST TIME, BABy...I...I WANTED TO BUy THINGS FOR yOU! I WANTED TO BE ABLE TO OFFER YOU AS MUCH AS BART!",
			"target": "这是第一次，宝贝，我想给你买东西！我想给你像巴特给的一样多的东西！"
		}
	]
	```

2. 使用node调用lunr.js生成索引。

	生成索引部分的js：

	```js
	var lunr = require("./lunr.js");
	var fs = require('fs');
	require("./lunr.stemmer.support.js")(lunr)
	require('./lunr.multi.js')(lunr)
	require("./lunr.zh.js")(lunr)

	var data = fs.readFileSync("./doc.json", "utf-8");
	var documents = JSON.parse(data);

	var idx = lunr(function () {
	  this.use(lunr.zh)
	  this.ref('name')
	  this.field('source')
	  this.field('target')

	  documents.forEach(function (doc) {
		this.add(doc)
	  }, this)
	})

	fs.writeFile('./index.json', JSON.stringify(idx))
	```

3. 检索测试

	```js
	var lunr = require('./lunr.js'),
		fs = require('fs');
	var idx = lunr.Index.load(JSON.parse(fs.readFileSync("./index.json")));
	idx.search("moon")
	```
	
	结果：
	
	```	
	[	
	    {
	        "ref":"come_to_me_love.itp:6.jpg:38",
			"score":3.99,
			"matchData":{"metadata":{"moon":{"source":{}}}}},
	    {
	        "ref":"come_to_me_love.itp:6.jpg:9",
		    "score":3.361,
		    "matchData":{"metadata":{"moon":{"source":{}}}}
		}
	]
	```
	
我把上述代码封装为了一个检索页面：<http://comics.xulihang.me/search.html>

用户获得匹配后，可以点击链接跳转到漫画浏览页面，浏览页面根据name属性跳转到对应的图片。

JavaScript实现的纯前端全文检索还是有挺多的应用的，特别是做成静态页面的技术文档，比如Sphinx、mkdocs都提供全文检索功能。

相关链接：
	
[mkdocs如何支持中文搜索](https://www.jianshu.com/p/d5308e4c8841)

[使用lunr.js为Wiki系统增加全文搜索支持](https://zohead.com/archives/wiki-lunr-js/)

