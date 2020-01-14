---
date: 2020-01-14 16:16:50+08:00
layout: post
title: 编译OpenCV Java动态库
categories: 技术随笔
tags: 图像处理
---

OpenCV的Java接口绑定主要有两种，一种是bytedeco提供的JavaCV，另一种是opencv官方的jar包。前者提供各个平台上编译好的库，嵌在jar里，而后者需要手动加载动态库，并且只提供Windows的dll文件，并不提供linux和macos的动态库。

所以要在Linux和macOS等平台上用官方的Java API来调用OpenCV，需要自行编译支持java的opencv库。手动编译稍微复杂点，主要考验环境的配置。

主要流程：

1. 官网下载OpenCV的源码包
2. 安装cmake、ant、jdk，这三个可以直接去官网下载，并不一定要用包管理器
3. 在源码文件夹里新建build文件夹，运行cmake：
	
	```shell
	cmake -D CMAKE_BUILD_TYPE=RELEASE \
    -D CMAKE_INSTALL_PREFIX=~/opencv \
    -DBUILD_SHARED_LIBS=OFF \
    BUILD_EXAMPLES=OFF \
    BUILD_TESTS=OFF \
    BUILD_PERF_TESTS=OFF ..
	```
	
4. 在build文件夹下执行make -j8，８个线程并行进行编译

这里提供编译好的opencv4.1.1的java库的网盘下载：<https://pan.baidu.com/s/1D9EZMKqwgqQjdEjwYFkZQQ>

包含以下文件：

```
opencv-411.jar
opencv_java411.dll，jar和dll是官网提供的
libopencv_java412.so，我在ubuntu下没有编译成功，这是csdn上下载的，测试可以用4.1.1的jar
libopencv_java411.dylib，编译环境macOS Sierra
```

我一开始在macOS Sierra上是用推荐的homebrew方法编译的，可能系统版本比较老的缘故，大多数依赖包都要重新编译，什么python、gcc、ffmpeg，而且这些依赖其实是没有必要的。于是我转用macports，装了cmake。gcc其实不用装，可以直接用xcode提供的clang编译。

参考链接：

1. [opencv for Java在MacOS 10.10安装](https://blog.csdn.net/u014030117/article/details/41019631)
2. [在 Mac 上编译 OpenCV4 + Idea 使用Java调用](https://www.kikt.top/posts/java/mac/compile-opencv4/)
3. [Installing OpenCV for Java](https://opencv-java-tutorials.readthedocs.io/en/latest/01-installing-opencv-for-java.html)
4. [libopencv_java412.tar.gz](https://download.csdn.net/download/duzhanxiaosa/11974398)