---
date: 2018-10-12 09:09:50+08:00
layout: post
title: 树莓派控制舵机
categories: 技术随笔
tags: 
---

上篇提到用树莓派控制舵机来远程按按钮开机，我也买回了sg90舵机尝试。

需要买的配件除了sg90，还有公对母杜邦线。

sg90有三条线，黄色是控制线，棕色是地线，红色是电源线。可以参见树莓派的40Pin引脚对照表进行连接，注意编号是从远离USB口的那端开始的。舵机需要PWM信号来驱动，控制线我们可以随意接一个GPIO引脚，然后用树莓派进行PWM软件模拟。不过树莓派3的GPIO.1口是支持硬件PWM的，优先使用这个。

通过设置不同的占空比，可以控制舵机转动的角度。
