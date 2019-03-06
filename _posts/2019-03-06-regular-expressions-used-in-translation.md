---
date: 2019-03-06 10:41:50+08:00
layout: post
title: CAT工具收集
categories: 技术随笔
tags: CAT
---

### 处理用pandoc转换而来的markdown

处理以下内容：

```
[activation]{#0010}
-------------------

A short communication between an installed program and the
manufacturer’s website. The program sends your serial number and a few
anonymous details about your computer. The website checks that you own a
license or that you are just starting a free trial, and returns a code
to authorize the program to run on your computer.

See also: [CAL license](#0140)
```

1. 去掉开头和结尾都是`-`的行，使用以下表达式进行匹配

    `^-+$`

2. Markdown的段落需要用两个换行进行区分，段落可以是一行或多行文字。用pandoc转换后的markdown，段落里有多行文字。而我打算用BasicCAT以txt形式打开markdown文件，所以得吧段落中的换行替换掉，这个操作英文叫做reflow。

    1. 把连续的换行符换成一个标记
    
        `(\r\n){2,}`，替换为“段落标记”
        
    2. 去掉所有换行符为空格。markdown中段落里的换行相当于空格，不替换单词间会缺少空格
    
    3. 把“段落标记”替换回两个换行

3. 去掉锚点，把`[activation]{#0010}`改为`### activation`
    
    `\[(.*?)\]\{#\d+\}`，替换为`### \1`

4. 去掉链接，把`[CAL license](#0140)`改为`CAL license`

    `\[(.*?)\](#\d+)`，替换为`\1`

结果：

```
### activation

A short communication between an installed program and the manufacturer's website. The program sends your serial number and a few anonymous details about your computer. The website checks that you own a license or that you are just starting a free trial, and returns a code to authorize the program to run on your computer.

See also: CAL license
```
    