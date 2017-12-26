---
date: 2017-11-08 22:00:50+08:00
layout: post
title: 批量下载m3u8的ts文件
categories: 技术随笔
tags: 
---

目标是下载欧洲委员会的翻译论坛的视频：https://webcast.ec.europa.eu/translating-europe-forum-2017-07-nov-2017

可以知道播放的视频文件是以m3u8索引的。网上有m3u8 downloader，但是使用ffmpeg命令下载，下载速度较慢。于是我考虑直接批量下载ts流文件。测试可以用idm的批量下载功能进行下载。

另外我想用我的linux vps进行下载，于是网上搜索了一下，发现一个用shell脚本调用wget进行批量下载的文章。但复制下来运行失败，我不懂shell，于是转用python。

python使用os.system不是很好控制wget，于是转用python wget模块。提示SSL Certificates错误，需要pip install certif。


具体代码其实很简单：

```
#!/usr/bin/env python
import wget
count=0
while count<5: #count的值表示总共要下多少ts文件，要查阅m3u8文件
    try:
        result=wget.download("https://stream.scic.ec.europa.eu/vod/_definst_/smil:11066_12470_5a01687c2dbff.smil/media_w442363958_b466000_"+str(count)+".ts?tracks=or&clientip=218.247.220.230&smvplayersession=80c4681f-acac-4906-5611-52d0af6818f0")
        count=count+1
    except:
        continue
        
    
```

更新：下载最好还是要有一个队列。我现在改用B4J来进行批量下载，使用最新增加的wait for语句，并且记录下下载失败的文件。

下载下来的TS文件需要合并，网上有ts merger这个软件。其实ts文件直接用windows copy命令就可以合并了。不过事先要处理一下文件名，让它按播放顺序排列。主要是要把0.ts这样的补全为0000.ts这样的名字。我这次下载的ts文件总共有2946个。

重命名：

```
#!/usr/bin/env python
import os
filelist=os.listdir("./")
for file in filelist:
    orgName=file
    file=file.split("_")
    if len(file[3])<7:
        for i in range(7-len(file[3])):
            file[3]="0"+file[3]
        print(file)
        filename="_".join(file)
        print(filename)
        os.rename(orgName,filename)
    else:
        pass
```



合并：

```
copy /b *.ts E:\new.ts
```


