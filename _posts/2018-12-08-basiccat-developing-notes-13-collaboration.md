---
date: 2018-12-08 10:03:50+08:00
layout: post
title: BasicCAT开发笔记（十三）：团队协作
categories: 技术随笔
tags: CAT
---

团队协作主要是能够实时共享翻译记忆和术语库，同步工作文件。

利用[CloudKVS](https://blog.xulihang.me/B4X-technology-dissection-cloudkvs/)可以实现翻译记忆和术语库的共享。客户端向本地的KeyValueStore添加项目，该项目会被自动同步到远程服务器，并记录该条目的id。如果另一客户端提交了新的条目，该客户端本地没有，就会同步比本地存储的id更大的新条目。

这一工作方式和git的设计相类似，而git只适合对纯文本文件进行版本控制。

还有要解决的一个问题是句段的分割与合并情况的同步。我采用git进行文件的同步。因为使用git容易出现冲突问题，所以我利用共享翻译记忆库的同步事先根据新增的翻译记忆对工作文件进行更新。为了实现这些功能，我对BasicCAT的翻译记忆库和工作文件存储的内容进行了修改，主要是添加了创建者、创建时间、创建时对应的文件名和片段序号。

#### Git的流程

一般情况下提交修改：

1. git add .
2. git commit -m "message"
3. git pull --rebase
4. git push

如果遇到冲突，需要检测冲突是否解决了，解决冲突后执行如下操作：

1. git add .
2. git rebase --continue
3. git push

BasicCAT使用jgit来实现git的功能。jgit的api分为plumbing和porcelain两种，顾名思义，前者更加低层，后者更加简单，类似平时用命令行使用git。

可以在[jgit-cookbook](https://github.com/centic9/jgit-cookbook/tree/master/src/main/java/org/dstadler/jgit/porcelain)这个项目中了解具体的用法。

### 更新

9号添加了自动解决冲突的办法。主要是事先进行fetch，检测远程是否有尚未同步过来的提交。如果有，则建立一个临时工作文件夹并切换过去，checkout文件并执行rebase，然后对工作文件进行比对。比对的片段内容示例如下：

```
[
    "Page 1",
    "第1页",
    "Page 1\n\n",
    "超人总动员_short.txt",
    {
        "creator": "xulihang",
        "createdTime": "1544367110849"
    }
],
```

如果远程文件的createdTime比本地的新，那就更新本地的工作文件对应的片段。如果本地的片段更新，那就更新远程的文件。远程文件有更新的话就要执行push来同步更新远程的仓库。有一个特殊情况是文件进行了片段的分割与合并，这时不做任何修改。因为rebase后HEAD就跟上了远程仓库的HEAD，之后做的修改可以直接覆盖原来的内容，所以这种情况时进行提交有可能会覆盖更新的翻译内容。


参考资料：

* [Initializing Git Repositories with JGit ](https://www.codeaffine.com/2015/05/06/jgit-initialize-repository/)
* [CheckoutCommand](http://download.eclipse.org/jgit/docs/jgit-2.3.1.201302201838-r/apidocs/org/eclipse/jgit/api/CheckoutCommand.html#addPath(java.lang.String))


相关文件：

<https://github.com/xulihang/BasicCAT/blob/master/BasicCAT/Project.bas>

<https://github.com/xulihang/BasicCAT/blob/master/BasicCAT/git.bas>

<https://github.com/xulihang/BasicCAT/blob/master/BasicCAT/TM.bas>

<https://github.com/xulihang/BasicCAT/blob/master/BasicCAT/Term.bas>

<https://github.com/xulihang/BasicCAT/blob/master/BasicCAT/CloudKVS_Server/CloudKVS_Server.b4j>

