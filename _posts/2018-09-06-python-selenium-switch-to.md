---
date: 2018-09-06 19:01:50+08:00
layout: post
title: Python+Selenium切换iframe
categories: 技术随笔
tags: 网络
---

selenium对于有iframe的网页，需要切换iframe再进行进一步操作。

方法：

输入help(driver.switch_to)查看帮助文档可以得知，可以根据iframe的index、name或者selenium的webelement切换到iframe。

```
driver.switch_to.frame(1)
driver.switch_to.frame('frame_name') 
driver.switch_to.frame(driver.find_elements_by_tag_name("iframe")[0])
```

如果要切换回来，使用以下代码：

```
driver.switch_to.default_content()
```

参考网页：[Selenium webdriver定位iframe里面元素两种方法](https://www.cnblogs.com/ycyzharry/p/7218429.html)
