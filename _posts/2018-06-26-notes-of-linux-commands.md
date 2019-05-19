---
date: 2018-06-26 14:42:50+08:00
layout: post
title: 常用Linux命令整理
categories: 技术随笔
tags: CAT NLP
---

Linux自带了很多有用的命令行工具，比如要重命名segment9.ts为segment09.ts，我们可以用Python来写脚本实现，但使用Linux自带的rename命令更加方便。这里做一个收集整理，会根据我碰到的实际问题不断更新。

更多内容可以见[The Art of Commandline](https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md)

## rename

用法：

```
rename [options] expression replacement file...

expression是要替换的文本

replacement是要被替换进去的文本

file是要进行替换操作的对象文件

可以使用正则表达式
```

示例：

m3u8的视频会被分为一个个编号了的ts文件片段。我们可以用linux的cat命令或者windows的copy命令对其进行合并，但默认的命名会影响合并的顺序。

```
sh-4.4$ ls -1
segment0.ts
segment1.ts
segment10.ts
segment11.ts
segment12.ts
segment13.ts
segment14.ts
segment15.ts
segment16.ts
segment17.ts
segment18.ts
segment19.ts
segment2.ts
segment20.ts
```

我们需要把segment1.ts转换成segment01.ts这样的。运行以下命令，就可以转为我们需要的格式了。

```
$ rename segment segment0 segment?.ts
```

## scp

利用ssh复制文件

从远程复制过来：

`scp root@hostname:/root/.ssh/pub id_rsa.pub `

从本地复制到远程：

`scp id_rsa.pub root@hostname:/root/.ssh/pub`

指定端口：

`scp -P 43999 id_rsa.pub root@hostname:/root/.ssh/pub`


