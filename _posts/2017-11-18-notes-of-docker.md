---
date: 2017-11-18 20:40:50+08:00
layout: post
title: docker使用小记
categories: 技术随笔
tags: 
---

之前也试用过docker，但安装后看着一堆命令不知道怎么用。今天因为要安装ocserv-docker（未PN服务器），就再次使用了下这个时下流行的容器技术。以前在htc g1上有用chroot进入一个debian lenny镜像，在安卓上用vnc运行linux桌面。chroot应该是最古老的容器技术。

docker镜像省去了复杂的配置，可以让我们专注于使用，也可以说方便了很多伸手党，对配置过程不求甚解。当然容器和系统的隔离，也避免了更中配置把宿主系统搞得一团糟。

在实际使用过程中，我逐渐了解了docker的使用。

1、 建立docker镜像（docker build）。可以自己写Dockerfile来生成镜像文件，这个比debian的debootstrap好使很多。

2、 基于镜像运行一个新的容器（docker run）。容器是可修改的，而镜像是只读的。

3、 docker的其它操作一般都是基于已经有的容器。两条命令我觉得挺重要：

进入容器运行shell进行操作

`$ sudo docker exec -it 容器名字 /bin/bash`

查看容器，包括运行的和停止运行的

`$ sudo docker ps -a`

4、 容器的端口和系统的端口是两个概念。不像chroot，运行sshd后可以直接连接22端口。需要进行端口的绑定。

docker背后的技术还是挺复杂的，我光了解怎么用就费了不少功夫。

参考链接：

[通过 Docker 部署 OpenConnect 服务器 ](https://tommy.net.cn/2015/02/12/deploy-openconnect-server-with-docker/)

[wppurking/ocserv-docker ](https://github.com/wppurking/ocserv-docker)

[Docker 教程](http://www.runoob.com/docker/docker-tutorial.html)

[如何进入、退出docker的container](http://blog.csdn.net/dongdong9223/article/details/52998375)

[Get Docker CE for Debian](https://docs.docker.com/engine/installation/linux/docker-ce/debian/)

---

## 补充：创建、修改镜像与 layer 机制（2026 补记，AI生成）

后来用 docker 部署 image-translation-server，把镜像和容器的操作重新梳理了一遍，也顺便搞清楚了 layer 的机制，补记在这里。

### 一、创建镜像

写好 Dockerfile 后：

```bash
docker build -t imagetrans .
```

加 `--progress=plain` 可以看到每一步到底是 `CACHED`（命中缓存）还是真的执行了。

### 二、生成容器

镜像是只读的，容器才可写。基于镜像生成容器：

```bash
# 只创建不启动
docker create --name imagetrans -p 5000:5000 xulihang/imagetrans

# 创建并启动，一步到位
docker run -d -p 5000:5000 --name imagetrans xulihang/imagetrans
```

`-p 5000:5000` 是端口绑定，把容器里的 5000 映射到宿主的 5000。容器的端口和宿主的端口是两个概念，不像 chroot 那样跑个 sshd 就能连。

### 三、修改镜像

改了源码后有两种更新方式。

**方式一：重新 build**（推荐，可复现）

```bash
docker build -t imagetrans .
```

**方式二：改运行中的容器，再固化成镜像**

```bash
# 把文件拷进容器（容器停止状态也能拷）
docker cp server.py imagetrans:/app/server.py

# 重启进程让改动生效（Flask 没开 debug，不会热重载）
docker restart imagetrans

# 冻成新镜像
docker commit imagetrans xulihang/imagetrans:latest
```

注意 `docker cp` 改的是**容器层**，容器一删就没了，必须 `docker commit` 才能固化到镜像。

### 四、提交与推送

```bash
# 打 tag
docker tag xulihang/imagetrans:latest imagetrans:latest

# 推送（要先 docker login）
docker push xulihang/imagetrans:latest
```

推送成功的标志是最后一行出现 `latest: digest: sha256:...`。如果只看到 `Layer already exists` 而最后没有 digest，那说明没传完。

### 五、layer 机制

镜像不是一整块，而是**一层层叠起来的**。每条会改动文件系统的指令（`RUN`、`COPY`、`ADD`）都生成一层，只记录相对上一层的差量。而 `CMD`、`EXPOSE`、`WORKDIR` 不改文件系统，只存在 config 里，所以 `docker history` 里显示 `0B`。

```
    ┌──────────────────────┐
    │ 可写层（容器）         │ ← 运行时的改动
    ├──────────────────────┤
    │ COPY server.py       │
    ├──────────────────────┤
    │ RUN pip install      │
    ├──────────────────────┤
    │ RUN apt-get          │
    ├──────────────────────┤
    │ 基础镜像              │
    └──────────────────────┘
```

**每层按内容算一个 sha256**，这叫内容寻址（content-addressable）。内容一样，哈希就一样，registry 里只需存一份。所以：

* push 时 registry 已有的层直接显示 `Layer already exists` 跳过，不重传
* 这也是 `docker build` 快的原因 —— 不变的层命中缓存，只重跑变化那层之后的部分

运行时用 OverlayFS 把这些只读层按顺序叠起来，最顶上再盖一个可写层；改文件走 copy-on-write，所以**镜像层永远不会被容器污染**。

查看层：

```bash
docker history xulihang/imagetrans:latest
docker inspect xulihang/imagetrans:latest --format '{{range .RootFS.Layers}}{{println .}}{{end}}'
```

### 六、实测：commit 和 build 的差别

实测对比了一下的层：

| 镜像 | 层数 |
| --- | --- |
| commit 出来的镜像 | 14 |
| 重新 build 的镜像 | 12 |

结果**几乎零重叠**。原因是基础镜像漂移了：`python:3.11-slim` 是个滚动更新的 tag，隔了三个月，Debian 的版本和 apt/pip 拉到的依赖都变了，基础层一变，叠在上面的所有层哈希就全变了。

两个观察：

1. **push 传多少，只由「层哈希 registry 有没有」决定**，跟 build 还是 commit 没关系。重建后如果缓存是热的，改了 `server.py` 只有 `COPY server.py` 那层是新的，push 同样只传几十 KB。同理，`docker build` 并不是「每次都要全传」。
2. **commit 会累积层**。连续 commit 两次后，镜像里躺着两份 `server.py`（179kB + 80.8kB），因为 commit 是把整个文件覆盖成一个新层，历史只增不减。而且 commit 会把容器当时的整个可写层打进去，包括 `temp/` 里的临时文件。所以 commit 只适合临时热修，长期还是用 build。

另外，如果 Dockerfile 里的依赖没锁版本（apt 不锁、pip 用 `>=`），每次冷缓存 rebuild 结果都会不一样，既不可复现，也意味着每次都要全量重传。想稳定的话就把版本锁上。

### 附：常用排查命令

```bash
docker ps -a              # 所有容器（含已停止）
docker ps -as             # 带容器可写层大小
docker system df          # 镜像 / 容器 / 构建缓存的占用
docker buildx du          # buildkit 缓存详情
docker logs <容器>        # 看日志，能验证请求有没有真的打到这个容器
docker images --format '{{.Repository}}:{{.Tag}}\t{{.ID}}\t{{.CreatedSince}}'
```

小坑：如果 WSL 里跑着服务和 Docker 容器同时在跑，两边都会往宿主的 localhost 转发，端口会打架。用 `netstat -ano | grep :5000` 查一下到底是谁在监听。

