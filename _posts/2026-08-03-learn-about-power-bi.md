---
date: 2026-08-03 15:39:50+08:00
layout: post
title: 学习Power BI
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

```powerquery
let
    // 1. 定义基础域名和相对路径
    // 使用 RelativePath 参数实现相对路径引用
    BaseUrl = "https://blog.xulihang.me",
    
    // 2. 定义获取数据的日期范围（最近30天）
    Days = 30,
    EndDate = Date.AddDays(Date.From(DateTime.LocalNow()), -1),
    StartDate = Date.AddDays(EndDate, -(Days - 1)),
    
    // 3. 生成日期列表
    DateList = List.Dates(StartDate, Days, #duration(1,0,0,0)),
    
    // 4. 定义读取单个日志文件的函数
    GetLog = (LogDate as date) as nullable table =>
        let
            // 将日期转为 YYYYMMDD 格式
            DateStr = Date.ToText(LogDate, "yyyyMMdd"),
            
            // 使用 Web.Contents 和 RelativePath 获取文件
            Response = try Web.Contents(
                BaseUrl,
                [
                    RelativePath = "/" & DateStr & ".txt"
                ]
            ),
            
            // 如果文件不存在则返回 null
            Result = if Response[HasError] then
                null
            else
                let
                    // 读取文件内容并按行分割
                    Lines = Lines.FromBinary(Response[Value], null, null, 65001),
                    
                    // 解析每一行 CSV
                    ParseLine = (line as text) =>
                        let
                            Parts = Text.Split(line, ","),
                            Count = List.Count(Parts),
                            
                            // 假设至少有5列：时间, IP, 国家, UserAgent, 事件名称
                            // 如果列数多于5，将中间多余列合并（处理 UserAgent 中可能包含逗号的情况）
                            Result = if Count >= 5 then
                                {
                                    Parts{0},  // 事件时间
                                    Parts{1},  // IP
                                    Parts{2},  // 国家
                                    Text.Combine(List.Range(Parts, 3, Count - 4), ","),  // UserAgent（可能包含逗号）
                                    Parts{Count-1}  // 事件名称（最后一列）
                                }
                            else
                                null
                        in
                            Result,
                    
                    // 过滤掉空行和解析失败的行
                    Parsed = List.RemoveNulls(List.Transform(Lines, each ParseLine(_))),
                    
                    // 转换为表格
                    TableData = Table.FromRows(
                        Parsed,
                        {"事件时间", "IP", "国家", "UserAgent", "事件名称"}
                    ),
                    
                    // 添加日志日期列
                    AddDate = Table.AddColumn(
                        TableData,
                        "日志日期",
                        each LogDate,
                        type date
                    )
                in
                    AddDate
        in
            Result,
    
    // 5. 遍历所有日期，获取数据
    Tables = List.RemoveNulls(List.Transform(DateList, each GetLog(_))),
    
    // 6. 统一所有表的结构（确保列一致）
    CleanTables = List.Transform(
        Tables,
        each Table.SelectColumns(
            _,
            {"事件时间", "IP", "国家", "UserAgent", "事件名称", "日志日期"},
            MissingField.UseNull
        )
    ),
    
    // 7. 合并所有表
    Combined = Table.Combine(CleanTables),
    
    // 8. 设置正确的数据类型
    ChangedType = Table.TransformColumnTypes(
        Combined,
        {
            {"事件时间", type datetime},
            {"IP", type text},
            {"国家", type text},
            {"UserAgent", type text},
            {"事件名称", type text},
            {"日志日期", type date}
        }
    )
in
    ChangedType
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

