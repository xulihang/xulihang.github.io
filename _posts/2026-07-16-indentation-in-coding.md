---
date: 2026-07-16 14:27:50+08:00
layout: post
title: 代码缩进
categories: 随笔
tags: 
---

代码缩进，使用4个空格或者制表符（Tab）表示一个层级，用来让代码有更好的可读性。而Python这样的语言，缩进是其语义的一部分，替代{}这样的括号。

有缩进的C语言代码：

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

没有使用缩进的C语言代码：

```c
#include <stdio.h>

int main() {
printf("Hello, World!\n");
return 0;
}
```


现在一般都推荐用空格来缩进。因为使用tab，在不同编辑器，不同偏好设置的表现会不一样。有的人用两个空格宽度显示tab，有的人喜欢四个空格宽度。

代码编辑器一般都有自动调整缩进的功能。比如Visual Studio Code，使用SHIFT+ALF+F，就可以按偏好设置统一缩进，比如将四个空格缩进的改成两个空格缩进。



