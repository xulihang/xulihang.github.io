---
date: 2018-12-05 14:16:50+08:00
layout: post
title: Git学习笔记
categories: 技术随笔
tags: 
---

Git和版本控制，在听雨技术部的时候[气体](http://blog.xen0n.name/)就一直给我们强调，但我平时也就仅仅会使用基础的git操作。也是不需要和很多人协作，平时做的事也不用什么分支之类进阶的功能。现在BasicCAT打算使用git来进行协作翻译，得深入了解一下。

原理方面可以看[progit](https://git-scm.com/book/zh/v2/)这本书，我这里主要讲操作。

### 基本操作：

* 新建空的仓库：`git init`。这样可以建立.git文件夹。
* 添加文件：`git add filename`，这样以后会记录这个文件的变化
* 查看工作状态：`git status`，可以显示当前工作区的状态。
* 提交记录：`git commit -m "commit message"`，如果不加-m，会跳出编辑器界面让你手动输入提交信息。
* 查看工作区的文件有哪些变动：`git diff`。适用于还没有用add来stage文件的情况。如果add并commit了，需要使用`git show`。
* 给仓库打标签：`git tag 给标签取的名字`，可以标记重要节点的commit。
* 查看记录：`git log`，可以显示commits的历史。

如果commit后想再修改这个commit，比如添加文件，修改commit message，可以使用`git commit --amend`。

下面是远程git仓库相关操作。

* 新建一个bare仓库，没有工作文件夹，可以用作远程仓库使用：`git init --bare`
* 给本地仓库添加远程仓库记录：`git remote add origin https://github.com/xulihang/git-playground.git`，名字叫做origin。
* 将本地的修改提交到远程仓库：`git push`
* 将远程仓库的新内容下来到本地仓库：`git fetch`
* 将远程仓库的新内容下来到本地仓库并进行合并操作：`git pull`
* 克隆远程仓库到本地：`git clone https://github.com/xulihang/git-playground.git`，同时会添加remote记录。

### 进阶操作

#### reset

以下是reset的命令说明

```
PS D:\git\playground> git reset -h
usage: git reset [--mixed | --soft | --hard | --merge | --keep] [-q] [<commit>]
   or: git reset [-q] [<tree-ish>] [--] <paths>...
   or: git reset --patch [<tree-ish>] [--] [<paths>...]

    -q, --quiet           be quiet, only report errors
    --mixed               reset HEAD and index
    --soft                reset only HEAD
    --hard                reset HEAD, index and working tree
    --merge               reset HEAD, index and working tree
    --keep                reset HEAD but keep local changes
    --recurse-submodules[=<reset>]
                          control recursive updating of submodules
    -p, --patch           select hunks interactively
    -N, --intent-to-add   record only the fact that removed paths will be added later
```

用法示例：`git reset HEAD~1`，HEAD指向前一次commit，但本地文件没有变动。而添加--hard选项后，工作区的本地文件也会回退。这里HEAD~1可以用具体的commit代码进行替换。

#### revert

和git reset删除显示的commit记录不一样，revert是添加commit。只是新的commit提交后，内容是进行回滚后的内容，这样每次撤销的记录也会保存下来。

用法示例：`git revert HEAD`，撤销当前HEAD对应的commit的内容。

#### branch 和 merge

git可以高效地使用分支，我们平时可以把代码提交到测试分支，比如叫testing，测试可以发布后再提交到生产线分支，比如默认的master。

* 建立分支：`git branch testing`
* 切换到该分支：`git checkout testing`，工作区的文件会变成该分支版本的

以上两条命令和这条命令效果一样：`git checkout -b testing`

如果要将testing分支的修改合并到master分支，运行以下命令：

```
PS D:\git\playground> git checkout master
PS D:\git\playground> git merge testing
Updating fe185c0..5ed6517
Fast-forward
 readme.md | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

因为testing分支和master的父commit是一样的，所以显示Fast-forward，本质是将master的head指向testing的最新commit。

如果master又有了提交，这样合并testing时可能会产生冲突：

```
PS D:\git\playground> git merge testing
Auto-merging readme.md
CONFLICT (content): Merge conflict in readme.md
Automatic merge failed; fix conflicts and then commit the result.
```

运行git status，会有如下内容：

```
PS D:\git\playground> git status
On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)

        both modified:   readme.md

no changes added to commit (use "git add" and/or "git commit -a")
```

这时打开出现冲突的文件，会是以下内容：

```
<<<<<<< HEAD
Hello!!
你好！
=======
Hello!!！
>>>>>>> testing
```

我们需要手动解决冲突，然后进行git add和git commit就不会提示错误了。解决冲突只需保留需要的内容，然后把添加的注释删去。

利用`git log  --pretty=oneline --graph`命令可以以字符图像的形式显示分支合并的结果。可以看到master合并了testing的内容，新建了一个merge后的commit记录。

```
PS D:\git\playground> git log  --pretty=oneline --graph
*   34f98a17ba05f3b0a1e7b2c650eae7c2a58ed774 (HEAD -> master) Merge branch 'testing'
|\
| * bc1d74f900a7036b06f557ee5872d129256a91cf (testing) update
* | 1db49bbdc2f018b7dc9aac3d59f9a4c61666f6a3 update
|/
* 5ed65172d3a7a984635691ea8f733a30229a627f update
* fe185c0ae591b4067dfe9e5e193b6a33418c5264 Revert "update"
* 62526fc0ee0c16e636e2d690300909275920bd30 update
* 2e19cc94366869c5eb2df02862bfd6c20be01524 (tag: dd) init
```

#### rebase

rebase和merge的功能相似，不过使用merge会生成较为复杂的历史，而rebase则保持commit只有一条历史。

用的还是上面的例子，以下代码将testing的基础commit变成master分支最新的commit。同样会提示冲突。

```
PS D:\git\playground> git checkout testing
Switched to branch 'testing'
PS D:\git\playground> git rebase master
First, rewinding head to replay your work on top of it...
Applying: update
Using index info to reconstruct a base tree...
M       readme.md
Falling back to patching base and 3-way merge...
Auto-merging readme.md
CONFLICT (content): Merge conflict in readme.md
error: Failed to merge in the changes.
Patch failed at 0001 update
Use 'git am --show-current-patch' to see the failed patch

Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".
```

按照提示解决冲突，可以完成rebase。

我们切换回master分支，把testing分支merge进来：

```
PS D:\git\playground> git checkout master
Switched to branch 'master'
PS D:\git\playground> git merge testing
Updating 493b0ce..45319f7
Fast-forward
 readme.md | 4 ++--
 1 file changed, 2 insertions(+), 2 deletions(-)
```

因为已经rebase过了，所以merge显示的是Fast-forward。我们再查看commit记录会是这样的，一条线，比较简洁：

```
PS D:\git\playground> git log  --pretty=oneline --graph
* 45319f7b3c7f35ebdaf816a62e7c9ff353dded10 (HEAD -> master, testing) update
* 493b0ced12b54bae7acd0a0cedf068481ac3987f update
* 5ed65172d3a7a984635691ea8f733a30229a627f update
* fe185c0ae591b4067dfe9e5e193b6a33418c5264 Revert "update"
* 62526fc0ee0c16e636e2d690300909275920bd30 update
* 2e19cc94366869c5eb2df02862bfd6c20be01524 (tag: dd) init
```

#### checkout

checkout除了切换分支，把仓库里的文件提取到工作文件夹，还可以撤销对工作区没有add过的文件进行的修改。
