---
date: 2018-11-17 14:24:50+08:00
layout: post
title: 上传Java程序到微软应用商店
categories: 技术随笔
tags: Microsoft
---

参考[此篇文章](/package-java-programs/)，我们用launch4j和inno setup制作了支持静态安装的exe安装包。接下来，我们可以用它制作支持上传到Microsoft Store的appx文件。

测试Visual Studio只支持转换vs建立的项目，我们还是要用Desktop App Converter（DAC）来转换。

官方文档见此：<https://docs.microsoft.com/zh-cn/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter>

Desktop App Converter会在本地运行一个Windows10系统的容器，然后根据软件安装进去生成的文件、注册表内容制作一个PackageFiles的文件夹。增加的文件比如AppxManifest.xml，Assets文件夹以及resources.pri等。

下面简述步骤：

1. 安装[Desktop App Converter](https://aka.ms/converter)，下载对应系统版本的[映像](https://aka.ms/converterimages)。安装[Windows10 SDK](https://go.microsoft.com/fwlink/?linkid=821375)。
2. 运行Desktop App Converter，运行以下命令允许执行脚本：`Set-ExecutionPolicy bypass`。
3. 展开基础映像：`DesktopAppConverter.exe -Setup -BaseImage .\BaseImage-1XXXX.wim -Verbose`
4. 生成Package：`DesktopAppConverter.exe -Installer D:\setup.exe -InstallerArguments "/verysilent  /suppressmsgboxes" -Destination C:\Output\MyApp -AppId "xxxxx.xxxxx" -PackageName "MyApp" -Publisher "CN=MyPublisher" -Version 1.0.0.0`

    注意要提交到商店的话，需要从开发者中心找到以下内容，填入对应的appid，packagename和publisher等信息，不然上传软件包时会提示错误。不过在生成后修改AppxManifest.xml也可以。
    
    ![](/album/ms_store_app.JPG)
    
5. 打包成appx: `makeappx.exe /d PackageFiles /p out.appx`
    
    makeappx应该包含在windows10sdk中。

    
    
好了这个appx就是可以直接上传到商店的软件包了。