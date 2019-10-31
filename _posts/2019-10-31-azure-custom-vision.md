---
date: 2019-10-31 16:58:50+08:00
layout: post
title: Azure定制计算机视觉模型
categories: 技术随笔
tags: 图像处理
---

微软Azure提供定制计算机视觉模型的功能，叫做Custom Vision（[文档](https://docs.microsoft.com/en-us/azure/cognitive-services/custom-vision-service/home)）。

目前主要提供两个功能，图像分类和目标检测。

在Azure里建立一个计算机视觉的资源就可以使用了，有免费的价格档位。

下面讲下定制的步骤：

1. 访问<https://www.customvision.ai/>，建立项目
2. 添加标签，上传图片并标注
3. 训练，可以设定训练时间，一般快速训练只要几分钟即可完成
4. 测试并优化

微软提供在线版标注工具，并且可以使用训练好的模型辅助标注。不过我的电脑屏幕太小了，标注界面看起来比较费劲，还是labelme之类的工具方便。

之前从百度easydl导出了yolo格式的标注数据，我基于微软提供的python sdk写了一个工具，可以批量上传图片和标注区域到azure上：<https://github.com/xulihang/azure-custom-vision-toolkit>

训练完成后可以查看预测结果，图中做的是对漫画气泡的检测：

![](/album/comics/balloon_detection_azure_test.jpg)

模型优化好后可以发布，并通过提供的预测API进行调用。










