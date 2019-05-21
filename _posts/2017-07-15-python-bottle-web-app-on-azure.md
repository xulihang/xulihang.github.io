---
date: 2017-07-15 18:27:50+08:00
layout: post
title: 在Azure上建立Bottle Python应用
categories: 技术随笔
tags: 云
---


大概两年前开通的Dreamspark版Azure，那时还是淘宝找香港用户接受短信才开通的，可以建立免费的应用服务(App service)。现在把建立的过程记录一下。

1、进入[portal.azure.com](https://portal.azure.com/)网页管理azure。

2、搜索Bottle或点击左侧边栏应用服务，可以在Web app frameworks里找到bottle。点击创建。

![](/album/azure/1.PNG)

3、接下来要建立资源组和应用服务计划。网上的介绍如下。。可以选择服务的位置

>资源组是共享相同生命周期、权限和策略的资源的集合。应用服务计划是你的应用的容器。应用服务计划设置将确定与你的应用关联的位置、功能、成本和计算资源。

![](/album/azure/2.PNG)

4、接下来我想从本地git仓库进行部署。要在应用服务设置的部署选项里设置。具体见该网站[Local Git Deployment to Azure App Service](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-deploy-local-git#a-namestep3astep-3-enable-the-app-service-app-repository)。会需要设置部署凭据。

5、设置好后回到概览，就可以见到git部署地址了。将仓库克隆到本地后可以现在本地测试，然后再push到azure上。

以上。

azure官网还有更多的文档，默认的Python Web App是基于Flask的：[Create a Python web app in Azure](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-web-get-started-python)



