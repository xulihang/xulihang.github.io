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

JavaObject主要提供以下几种方法：

* GetField，获得Field（变量）。
* SetField，设置Field（变量）。
* InitializeStatic，初始化静态类
* InitializeNewInstance，新建一个类的实例
* RunMethod，运行一个方法
* CreateEvent，创建事件

后缀有JO的方法，返回的是JavaObject类，用于需要继续将返回对象当做JavaObject使用的情况。

下面以OpenCV的封装为例。

opencv是C++编写的计算机图形库，其提供的java类库就是一种绑定。有两个流行的java类库，一个是javacv，一个是官方的类库。后者是基于c++文件自动生成的[^opencv-java]，和c++的API 接口非常接近。这里我使用官方的类库。

我们的目标是实现以下Java代码[^csdn]的接口在B4J中的绑定：

```java
import org.opencv.core.Mat;
import org.opencv.imgproc.Imgproc;
import org.opencv.imgcodecs.Imgcodecs;

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

```vb
Dim cv2 As opencv
cv2.Initialize
Dim mat As cvMat
mat=cv2.imread(File.Combine(File.DirApp,"test.jpg"))
cv2.medianBlur(mat,mat,7)
cv2.imwrite(File.Combine(File.DirApp,"out.jpg"),mat)
```

# 步骤

## 1. 分析

查看OpenCV的[文档](https://docs.opencv.org/4.1.2/index.html)，可以知道它有很多的模块，比如core是核心功能模块，imgproc是图像处理模块，imgcodecs是图像读写模块。

因为B4J程序只会调用一小部分功能，我希望将会用到的功能整合进一个class。

Mat类是用于存储图像数据的矩阵，因为用到得较为频繁，可以单独建立一个class。

## 2. 编写

B4J中新建两个class模块，命名为opencv和cvMat，具体说明看代码和注释。

参数的命名和类型可以参照OpenCV的[Java API文档](https://docs.opencv.org/master/javadoc/)。

cvMat代码如下：

```vb
Sub Class_Globals
	Private matJO As JavaObject
End Sub

'Initializes the object. You can add parameters to this method if needed.
Public Sub Initialize(params() As Object)
	'Java 支持重载，一个方法可以有多种参数组合。
	'Mat的构建方法有多种，比如以下几个。
	'Mat()
	'Mat​(int[] sizes, int type)
	'Mat​(int rows, int cols, int type)
	'但B4J不支持，可以直接设置参数为一个array。
	matJO.InitializeNewInstance("org.opencv.core.Mat",params)
End Sub

'在供其他opencv方法调用时，需要提供Mat的JavaObject。
Public Sub getJO As JavaObject
	Return matJO
End Sub

Public Sub setJO(mat As JavaObject)
	matJO=mat
End Sub
```

opencv代码如下：

```vb
Sub Class_Globals
	Private Imgproc As JavaObject
	Private Imgcodecs As JavaObject
End Sub

'Initializes the object. You can add parameters to this method if needed.
Public Sub Initialize
	'初始化两个类，用于调用静态方法
	Imgproc.InitializeStatic("org.opencv.imgproc.Imgproc") 
	Imgcodecs.InitializeStatic("org.opencv.imgcodecs.Imgcodecs")
End Sub

Public Sub imread(path As String) As cvMat
	'使用RunMethod调用Java的方法
	Return matJO2mat(Imgcodecs.RunMethodJO("imread",Array(path)))
End Sub

Public Sub imwrite(path As String,img As cvMat)
	Imgcodecs.RunMethod("imwrite",Array(path,img.JO))
End Sub

Public Sub medianBlur(src As cvMat,dst As cvMat, ksize As Int)
	Imgproc.RunMethodJO("medianBlur",Array(src.JO,dst.JO,ksize))
End Sub

'将得到的mat javaobject封装为B4J中的cvMat类
Sub matJO2mat(jo As JavaObject) As cvMat
	Dim mat As cvMat
	mat.Initialize(Null)
	mat.JO=jo
	Return mat
End Sub
```

可以发现，wrapper是用于调用原有方法的很薄的一层内容。

## 3. 调用

```vb
Dim cv2 As opencv
cv2.Initialize
Dim mat As cvMat
mat=cv2.imread(File.Combine(File.DirApp,"test.jpg"))
cv2.medianBlur(mat,mat,7)
cv2.imwrite(File.Combine(File.DirApp,"out.jpg"),mat)
```

以上代码会将图片做模糊处理并另存。

查看medianBlur的Java API文档：

```
public static void medianBlur​(Mat src, Mat dst, int ksize)
Blurs an image using the median filter. The function smoothes an image using the median filter with the ksize×ksize aperture.
Parameters:
src - input 1-, 3-, or 4-channel image; when ksize is 3 or 5, the image depth should be CV_8U, CV_16U, or CV_32F, for larger aperture sizes, it can only be CV_8U.
dst - destination array of the same size and type as src.
ksize - aperture linear size; it must be odd and greater than 1, for example: 3, 5, 7 ... SEE: bilateralFilter, blur, boxFilter, GaussianBlur
```

可以知道这里的参数调用使用的是传参调用，传进去的目标mat会被修改，所以不用返回处理结果。

如果不想原来的mat被修改，就再建一个cvMat：

```vb
Dim cv2 As opencv
cv2.Initialize
Dim mat As cvMat
mat=cv2.imread(File.Combine(File.DirApp,"test.jpg"))
Dim blur As cvMat
blur.initialize(Null)
cv2.medianBlur(mat,blur,7)
cv2.imwrite(File.Combine(File.DirApp,"origin.jpg"),mat)
cv2.imwrite(File.Combine(File.DirApp,"out.jpg"),blur)
```

## 4. 打包

将项目编译为一个library类库或者打包为最新的b4xlib，放到库文件夹供使用。

还有很多JavaObject的方法没有使用，这里就不细讲了。

完整代码见此：<https://github.com/xulihang/OpenCV-B4J>

# OpenCV的安装

这里再附带OpenCV的安装方法：

1. 下载OpenCV的压缩包（[地址](https://opencv.org/releases/)），提取其中的java文件夹的内容，将jar放到B4J的类库目录，将dll或者so、dylib文件放到程序的目录。
2. 使用以下代码加载OpenCV的动态库：

```
Sub load
	Dim System As JavaObject
	System.InitializeStatic("java.lang.System")
	System.RunMethod("load",Array(File.Combine(File.DirApp,"opencv_java411.dll")))
End Sub
```

# 参考文献：

[^opencv-java]: <https://opencv.org/opencv-now-supports-desktop-java/>
[^csdn]: [Opencv——基于Java环境搭建](https://blog.csdn.net/wx19900503/article/details/93889510)

