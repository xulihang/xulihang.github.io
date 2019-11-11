---
date: 2019-11-06 22:52:50+08:00
layout: post
title: 垂直投影与水平投影
categories: 技术随笔
tags: 图像处理
---

本文讲的是垂直投影和水平投影在图像处理中的应用。

垂直投影指将所有像素沿垂直方向投射到一个点（进行平均值、求和等操作），水平投影则是沿水平方向。

比如下图显示了一张做了二值化处理的图片的水平投影和垂直投影的直方图（这里清除了两边为零的数据）。

![](/album/image-processing/projection.jpg)

我们可以用OpenCV的reduce来实现垂直投影和水平投影。

C++和Java中的reduce操作需要5个参数，依次为原图矩阵、输出矩阵、维数、操作类型rtype、数据类型dtype。

```vb
Dim h,v as mat
h.initialize
v.initialize
cv2.reduce(thresh,h,1,0,cv2.cvType("CV_32S")) '水平投影
cv2.reduce(thresh,v,0,0,cv2.cvType("CV_32S")) '垂直投影
```

维数的取值：

* 1，投射到一列
* 0，投射到一行
* -1，根据输出矩阵的大小自动选择

操作类型：

* CV_REDUCE_SUM，求和
* CV_REDUCE_AVG，求均值
* CV_REDUCE_MAX，求最大值
* CV_REDUCE_MIN，求最小值

数据类型需要根据最终得到的值进行设置，像求和的话就不能取太小，否则会报错。

接下来讲一个具体的例子，用于检测两个文字区域间是不是被黑线分隔。

比如下面两张图，分别是左右和上下方向存在分隔：

![](/album/image-processing/sq.png)

![](/album/image-processing/balloon.png)

我们先对图像做二值化处理，并且反转颜色。之后做轮廓检测，对每个轮廓做reduce求和操作。如果轮廓是起到分隔作用的，那它是连接两端的连续的一段，坐标上每个点的值都要大于0。

下面是Python实现代码：


```python
import cv2
import numpy as np

def infer(direction):
    index=0
    if direction==1: #horizontal
        end=height
    else: # vertical
        end=width
        
    for cnt in contours:
        mask = np.zeros_like(img)
        cv2.drawContours(mask, [cnt], -1, (255,255,255), 1)
        sum = cv2.reduce(mask, direction, cv2.REDUCE_SUM, dtype=cv2.CV_32S)
        blocked=True
        for j in range(end):
            if direction==1:
                value=sum[j][0]
            else:
                value=sum[0,j]
            print("j:"+str(j))
            print("value:"+str(value))
            if value==0:
                blocked=False
                break

        if blocked==True:
            cv2.imwrite(str(index)+'MyPic.jpg', mask)
            cv2.imwrite('y.jpg', sum)
            print(sum)
            print("blocked")
            return True
        index=index+1
    return False
        
img = cv2.imread('balloon.png', cv2.IMREAD_GRAYSCALE)
height, width = img.shape[:2]
ret, thresh = cv2.threshold(img,127,255,cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)
contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

infer(0)
```

第一张图检测到的分割轮廓：

![](/album/image-processing/sq-contour.jpg)

reduce后的结果：

```
[[510]
 [510]
 [510]
 [510]
 [510]
 [510]
 [510]
 [510]
 [510]
 [255]
 [510]
 [510]
 [510]
 [510]
 [255]
 [510]
 [510]
 [510]
 [510]
 [510]
 [510]
 [510]]
```


第二张图检测到的分割轮廓：

![](/album/image-processing/balloon-contour.jpg)

reduce后的结果：

```
[[10710  3315  3060   765   510  1020   510   510   765   510   510   510
    510   510   510   510   510   510   510   510   510   510   510   510
    510   510   510   510   510   510   510   510   510   510   510   510
    510   510   510   510   510   510   510   510   510   510   510   510
    510   510   510   510   510   510   510   510   510   510   510   510
    510   510   510   510   510   510   510   510   510   510   510   510
    510   510   510   510   510   510   510   510   510   510   510   510
    510   510   510   510   510   510   510   510   510   510   510   510
    510   510   510   510   510   510   510  1020  8670]]
```


参考资料：


* [opencv3 reduce函数及其使用](https://blog.csdn.net/zfjBIT/article/details/84861497)
* [How to construct horizontal projection of binary image in OpenCV](https://stackoverflow.com/questions/54285839/how-to-construct-horizontal-projection-of-binary-image-in-opencv)
