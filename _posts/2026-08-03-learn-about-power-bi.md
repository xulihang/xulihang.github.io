---
date: 2026-08-03 15:39:50+08:00
layout: post
title: 学习PowerBI
categories: 笔记
tags: 
---

Power BI是微软推出的一套强大的商业分析工具。它最早可追溯到Excel中的Power Pivot，Power Query。它在2015年正式发布，包含网页端的Power BI Service、桌面端的Power BI Desktop和移动版本。

Power BI专注于数据导入、清洗、呈现这一整个流程，和Excel相比，更适合可视化和分析数据。

比如我有个在线的demo，将每天统计的数据以csv的格式，保存为一个个文件，命名为YYYYMMDD.txt，例如下方示例：

```csv
2026/07/14 18:53:00, IP, Country, UserAgent, OCR
2026/07/14 18:53:00, IP, Country, UserAgent, Save
```

原始数据包含事件时间，访问者IP，访问者国家，浏览器UserAgent和事件名字，比如OCR、保存等等。

可以在Power BI中先建一个Semantic Model，通过Web获取这些数据，然后解析并保存。可以使用高级编辑器，使用以下命令进行存储：

```
```


以上存储的是原始数据，我们如果想基于原始数据计算出更多列，可以新建一个列，比如根据UserAgent计算操作系统：

```
OS = 
VAR UA = LOWER(RawLogs[UserAgent])
RETURN
SWITCH(
    TRUE(),
    CONTAINSSTRING(UA,"windows"),"Windows",
    CONTAINSSTRING(UA,"android"),"Android",
    CONTAINSSTRING(UA,"iphone") || CONTAINSSTRING(UA,"ipad"),"iOS",
    CONTAINSSTRING(UA,"macintosh"),"macOS",
    CONTAINSSTRING(UA,"linux"),"Linux",
    "Other"
)
```


一个经常用到的概念叫Measure，它不是存储在表格中的数据，而是需要用到时，会动态计算的一个指标。比如以下计算唯一IP数量的指标。在可视化报表中，Measure可以根据各种条件，比如时间进行动态计算。

```
Visitors = 
DISTINCTCOUNT(RawLogs[IP])
```

有了Semantic Model后，我们可以基于这个数据创建可视化报表了。有常见的饼图、折线图、漏斗图等等。




## 相似产品

* Apache Superset
* 帆软FineBI
* Tableau

