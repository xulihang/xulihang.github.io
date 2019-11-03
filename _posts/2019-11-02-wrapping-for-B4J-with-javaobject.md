---
date: 2019-11-02 22:44:50+08:00
layout: post
title: B4J类库封装之JavaObject
categories: 技术随笔
tags: B4X
---

所谓类库封装就是将一个类库的功能进行封装，从而改变它原来的功能或是供另一种语言调用。本文主要讲的是后者。这一操作也有叫做绑定(bindings)，封装出来的类库叫做wrapper。常见的例子有Java的JNI和Python的ctypes。

B4J的wrapper是用于在B4J中调用jar类库，因为B4J生成的语言是Java，所以还是比较容易处理的。

封装类库有两种方法，一种是直接使用Java编写，一种是使用JavaObject。JavaObject直接使用B4J编写，相对简单。官网教程：[Accesing third party Jar with #Additionaljar and JavaObject - Picasso](https://www.b4x.com/android/forum/threads/accesing-third-party-jar-with-additionaljar-and-javaobject-picasso.40904/)

下面以OpenCV的封装为例。

opencv是C++编写的计算机图形库，其提供的java类库就是一种绑定。有两个流行的java类库，一个是javacv，一个是官方的类库。后者是基于c++文件自动生成的[^opencv-java]，和c++的API 接口非常接近。这里我使用官方的类库。

我们的目标是实现以下Java代码的接口在B4J中的绑定：

```java
public class TestOpencvDemo {   
    @Test    
    public void TestMatRead() {
        Mat img = Imgcodecs.imread("/Users/wuxi/Pictures/medianBlur.png");
        Imgproc.medianBlur(img, img, 7);
        Imgcodecs.imwrite("/Users/wuxi/Pictures/medianBlur1.png",img);         img.release();     
	}
}
```

封装好后，以上代码对应的B4J代码：

```basic
Dim cv2 As opencv
cv2.Initialize
Dim mat As cvMat
mat=cv2.imread(File.Combine(File.DirApp,"test.jpg"))
cv2.medianBlur(mat,mat,7)
cv2.imwrite(File.Combine(File.DirApp,"out.jpg"),mat)
```

完整代码见此：<https://github.com/xulihang/OpenCV-B4J>

待更新……



参考文献：

[^opencv-java]: <https://opencv.org/opencv-now-supports-desktop-java/>
[^csdn]: [Opencv——基于Java环境搭建](https://blog.csdn.net/wx19900503/article/details/93889510)

