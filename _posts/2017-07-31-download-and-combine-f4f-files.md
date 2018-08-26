---
date: 2017-07-31 10:07:50+08:00
layout: post
title: 下载并合并f4f文件
categories: 技术随笔
tags: 
---

提取网上的视频，我一般用硕鼠、官方客户端等软件，实在没有别的办法就用浏览器的调试工具获得视频地址。但现在网站的在线视频都会将视频文件分为一段段的小文件，便于加载，也可以防止下载视频。

使用iPhone浏览视频，往往就会打开一个m3u8的文件，这是苹果的技术。而我这次要提取海宁大潮网上的一段视频：［[一起回娘家~袁花116名出嫁姑娘与进门媳妇共叙乡情](http://www.haining.tv/3g/news/folder205/2017-05-04/166244.html?_hgOutLink=news/newsDetail&id=166244&from=groupmessage&isappinstalled=0)。

使用浏览器调试工具，可以看到它有下载一个f4m文件和分段的视频文件。

```
http://vfile.haining.tv/2017/1493/9849/0498/149398490498.ssm/manifest.f4m

http://vfile.haining.tv/2017/1493/9849/0498/149398490498.ssm/149398490498-audio=44000-video=509000-Seg1-Frag1.mp4
......
http://vfile.haining.tv/2017/1493/9849/0498/149398490498.ssm/149398490498-audio=44000-video=509000-Seg1-Frag14.mp4

```

根据f4m文件，我们可以知道是采用了adobe 的hds技术，视频的扩展名虽然是mp4，但其实不是mp4文件，而是f4f文件。我们可以使用php脚本进行合并。

地址见此：[https://github.com/K-S-V/Scripts/wiki](https://github.com/K-S-V/Scripts/wiki)

将mp4文件批量下载后重命名为f4f文件，再运行如下命令即可。

`php AdobeHDS.php --fragments 509000-Seg1-Frag`

更简单的是根据f4m文件下载：

`php AdobeHDS.php --manifest "http://vfile.haining.tv/2017/1493/9849/0498/149398490498.ssm/manifest.f4m" --delete`


