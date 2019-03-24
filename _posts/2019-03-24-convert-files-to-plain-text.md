---
date: 2019-03-24 16:43:50+08:00
layout: post
title: 将各种格式文件转换为纯文本内容
categories: 技术随笔
tags: CAT
---

一个搜索引擎要检索文件的内容，首先要把提取它的纯文本内容。

[Apache Tika](http://tika.apache.org/)就是这样一个工具，它可以提取doc、docx、pdf等格式文件的文本内容。

使用Tika facade，可以完成提取文本的操作：

```java
import java.io.File;
import java.io.IOException;

import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;

public class TikaExtraction {
    
   public static void main(final String[] args) throws IOException, TikaException {

      //Assume sample.txt is in your current directory              
      File file = new File("sample.txt");
      
      //Instantiating Tika facade class
      Tika tika = new Tika();
      String filecontent = tika.parseToString(file);
      System.out.println("Extracted Content: " + filecontent);
   }         
}
```

以上代码来自：<https://www.yiibai.com/tika/tika_content_extraction.html>。

Tika还支持处理音视频，提取元数据。

不过Tika也有不支持的文件，比如idml格式的文件。这时，可以选择okapi的[tikal](http://blog.xulihang.me/okapi-framework/)，把文件转换为xliff后再提取xliff的纯文本内容。

我制作了这样的一个把各种文件提取为纯文本的web工具all2txt，代码在此：<https://github.com/xulihang/all2txt>





