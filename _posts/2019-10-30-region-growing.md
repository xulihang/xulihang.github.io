---
date: 2019-10-30 20:41:50+08:00
layout: post
title: 区域生长
categories: 技术随笔
tags: 图像处理
---

区域生长是一种图像分割方法。选择一个种子点，判断邻近区域的8个点或4个点是否和该像素点具有相似的属性，如果符合则标记，并将这一点作为种子点继续计算。

用途比如可以将下面这张漫画截图中的气泡和背景相分割。

原图：

![](/album/image-processing/text.png)

目标（外面一圈红色保存为png时是透明的）：

<img style="background:#ff0000" alt="" src="/album/image-processing/mask.png">

以下代码修改自：[Python实现区域生长算法（regionGrow）](https://blog.csdn.net/qq_38784098/article/details/82143117)

```python
import numpy as np
import cv2

class Point(object):
    def __init__(self,x,y):
        self.x = x
        self.y = y

    def getX(self):
        return self.x
    def getY(self):
        return self.y

def getGrayDiff(img,currentPoint,tmpPoint):
    return abs(int(img[currentPoint.x,currentPoint.y]) - int(img[tmpPoint.x,tmpPoint.y]))

def selectConnects(p):
    if p != 0:
        connects = [Point(-1, -1), Point(0, -1), Point(1, -1), Point(1, 0), Point(1, 1), \
                    Point(0, 1), Point(-1, 1), Point(-1, 0)]
    else:
        connects = [ Point(0, -1),  Point(1, 0),Point(0, 1), Point(-1, 0)]
    return connects

def regionGrow(img,seeds,thresh,p = 1):
    height, weight = img.shape
    seedMark = np.zeros(img.shape,np.uint8)
    seedList = []
    for seed in seeds:
        seedList.append(seed)
    label = 255
    connects = selectConnects(p)
    while(len(seedList)>0):
        currentPoint = seedList.pop(0)

        seedMark[currentPoint.x,currentPoint.y] = label
        for i in range(8):
            tmpX = currentPoint.x + connects[i].x
            tmpY = currentPoint.y + connects[i].y
            if tmpX < 0 or tmpY < 0 or tmpX >= height or tmpY >= weight:
                continue
            grayDiff = getGrayDiff(img,currentPoint,Point(tmpX,tmpY))
            if grayDiff < thresh and seedMark[tmpX,tmpY] == 0:
                seedMark[tmpX,tmpY] = label
                seedList.append(Point(tmpX,tmpY))
    return seedMark

def removeInnerParts(binaryImg):
    Y=binaryImg.shape[0]
    X=binaryImg.shape[1]
    for y in range(0,Y):
        start=0
        end=0
        for x in range(0,X):
            if binaryImg[y][x]==255:
                start=x
                break
        for x in range(X-1,-1,-1):
            if binaryImg[y][x]==255:
                end=x
                break
        if start<end:
            for x in range(start,end+1):
                binaryImg[y][x]=255
    return binaryImg
    
if __name__=="__main__":
    img = cv2.imread('ttt.png',0)
    Y=img.shape[0]
    X=img.shape[1]
    seeds = [Point(int(X/2),int(Y/2))]
    binaryImg = regionGrow(img,seeds,10)
    binaryImg = removeInnerParts(binaryImg)
    image = cv2.cvtColor(binaryImg,cv2.COLOR_GRAY2BGRA)
    for x in range(0,X):
        for y in range(0,Y):
            if image[y][x][0]==0:
                image[y][x][3]=0
                
    cv2.imwrite('out.png', image)
    cv2.imshow('region grow',image)
    cv2.waitKey(0)
```

