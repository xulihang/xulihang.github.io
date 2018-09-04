---
date: 2018-09-04 22:40:50+08:00
layout: post
title: Python+Selenium自动化操作网页
categories: 技术随笔
tags: 网络
---

最近听我所在出版公司的编辑说用erp系统填表单，书籍名字前多了个空格被退回。我想系统没有对文本做strip，只有自己来实现了。

本来想这种自动化操作可以用autoit，但autoit的语言风格我现在实在不适应，而且没有java和python这样有众多的类库。于是转用python。

用python自动操作网页，就可以用selenium了。官网介绍现在的浏览器都附带了对它的支持，可以利用webdriver api来操作网页。

# 安装：

1、Python下安装Selenium。

`pip install selenium`

2、下载对应的浏览器的webdriver。

# 使用：

以下代码检测所有输入框中的文本，如果开头和结尾有空格就进行输出。

```
from selenium import webdriver


driver = webdriver.Chrome()
driver.get("https://forum.51nb.com/forum.php")
print(driver.title)
inputs = driver.find_element_by_tag_name("input")
for input in inputs:
    if input.is_displayed():
        value=tag.get_attribute("value")
            if value.startswith(" ") or value.endswith(" "):
                print(value+" has redundant spaces.")
driver.close()
```


# 配置：

我的目标是使用绿色版的Chrome，要进行一些路径的配置。

官方说明见此：<https://sites.google.com/a/chromium.org/chromedriver/capabilities#TOC-Using-a-Chrome-executable-in-a-non-standard-location>

Python如何使用参见此：[selenium+python配置chrome浏览器的选项](https://blog.csdn.net/zwq912318834/article/details/78933910)

添加的Python代码如下：

```
options = webdriver.ChromeOptions()
options.binary_location="F:\Programs\ChromePortable\App\Google Chrome\chrome.exe"
driver = webdriver.Chrome("e:\chromedriver.exe",chrome_options = options)
```



