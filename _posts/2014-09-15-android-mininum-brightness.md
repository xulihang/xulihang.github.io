---
date: 2014-09-15 18:58:17+00:00
layout: post
title: Android修改屏幕亮度
categories: 技术随笔
tags: 系统优化 framework 反编译
---

习惯苹果的屏幕亮度后再用我的U956，感觉即使是最低亮度也要闪瞎眼睛了。于是想到修改屏幕亮度。

以前看别人做的rom，提到自动亮度调节优化，调低最低亮度什么的，我也网上搜索了一下，是通过反编译framework-res.apk，改亮度数据来实现。

网上教程很多，我就讲下自己的经验吧。

用apktool进行反编译与打包操作。数据只需修改/res/values/integers.xml内最低亮度的数值。改成10就可以了，因为步进值我不改了，还是10。我解开后发现我的乐蛙rom的最低亮度是30。。

```
<integer name="config_screenBrightnessSettingMinimum">10</integer>  最低亮度
<integer name="config_screenBrightnessSettingMaximum">255</integer> 最高亮度
<integer name="config_screenBrightnessSettingDefault">102</integer> 开机默认亮度
<integer name="config_screenBrightnessDim">10</integer>      步进值

```

在windows下打包成品也有点讲究。用winrar把生成的apk和原版的apk打开，把生成的apk里的resources.arsc替换到原版apk，压缩方式选择存储。

接下来把apk放到系统里。

我这里讲下命令行的操作方法，用root explorer感觉一不小心就会死机，而且要是重启开不了机也可以进recovery用命令操作。

简单点直接上命令吧：

```
C:\adb push framework-res.apk /system/framework-res.apk 

# chmod 644 /system/framework-res.apk 
# cp /system/framework-res.apk /system/framework
# reboot
 
```

操作正确的话基本能进系统了，而且亮度降低了。

接下来再讲一个修改亮度的方法，直接引用下原文：

>手机的最低亮度是多少？是0，也就是完全黑屏。调整为1晚上看书刚刚好调整方法如下/sys/class/leds/lcd-
>backlight/brightness。brightness就是存储亮度值的文件，我们用文本编辑器打开，修改数值为1，晚上看书不刺眼
>，修改后将这个文件改为只读模式，防止锁屏后系统重新修改。只要不重启，他就一直是1。为了方便修改，我们可
>以用re创建快捷方式到桌面，方便下次修改！

root后使用adb shell命令行修改：

```
# cd /sys/class/leds/lcd-backlight
# echo "25" > brightness
```


相关链接：
[反编译+回编译教程，DIY美化你的手机【反编译framework-res.apk为例】](http://bbs.dospy.com/thread-14553818-1-435-1.html)

[安卓反编译framework-res.apk修改配置文件解决最低自动屏幕亮度太亮  ](http://blog.163.com/kukwkukw@126/blog/static/97095900201421392258869/)

[教你如何手动修改安卓手机的最低亮度值，很实用，很简单！](http://wenwen.sogou.com/z/q532285925.htm)









