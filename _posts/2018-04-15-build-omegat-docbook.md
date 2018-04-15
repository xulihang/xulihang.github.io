---
date: 2018-04-15 20:38:50+08:00
layout: post
title: 从omegat的docbook构建成品文档
categories: 技术随笔
tags: 
---

OmegaT的文档使用docbook写的，使用的docbook版本距今已经有大约12年历史了。它可以从xml文件转换为html、pdf等常见文档格式。

文档的说明见此：[https://github.com/omegat-org/omegat/tree/master/doc_src](https://github.com/omegat-org/omegat/tree/master/doc_src)。

可以看到，只有windows和macos的操作说明，没有linux的。

windows下收集所需软件包是件费劲的事情，我还是直接用linux吧。

直接把omegat的源码下载下来，进入doc_src文件夹，运行gendoc.bat里的生成中文pdf的命令：`ant -Dlanguage=zh_CN pdf-cjk`，失败。主要是因为一些环境配置不对。

我们首先在debian系统上装必须的软件

`# apt-get install fop libxml2-utils docbook-xsl docbook-xml`

然后修改build.xml文件，把docbook-utf8.xsl和doc_src_paths.xml前的`../../`删掉。然后修改doc_src_paths.xml为以下内容：

```
<?xml version="1.0" encoding="UTF-8"?>

<project>
    <property name="fop.home" value="/home/git/Downloads/fop-1.1" />
    <property name="dbk" value="/usr/share/xml/docbook/stylesheet/docbook-xsl" />
    <property name="saxon" value="/usr/share/java/saxon-6.5.5.jar" />
</project>
```

以上请根据实际情况配置。fop我是直接下载的二进制包，地址如下：[https://mirrors.tuna.tsinghua.edu.cn/apache/xmlgraphics/fop/binaries/fop-1.1-bin.zip](https://mirrors.tuna.tsinghua.edu.cn/apache/xmlgraphics/fop/binaries/fop-1.1-bin.zip)。

另外还要修改docbook-utf8.xsl文件，把有c:\dbk的那行改为`<xsl:import href="/usr/share/xml/docbook/stylesheet/docbook-xsl/html/docbook.xsl"/>`

还有build.xml的以下部分要改：

```
<target name="pdf" depends="fo">
        <fop format="application/pdf"
             fofile="${language}/PDF/OmegaT_documentation.fo"
             outfile="${language}/PDF/OmegaT_documentation_${language}.PDF"
             basedir="${language}/"
             userconfig="fop.xconf"
             force="true" />
    </target>
```

主要是大写的PDF要改为小写，因为此前生成的.fo文件实在小写的pdf里。真是让人吐槽omegat的代码。

另外可以看到build.xml里使用了Arial Unicode MS这一字体来显示汉字，我们需要复制windows系统下的ARIALUNI.TTF到/usr/share/fonts里。

如果还遇到有错误就看提示解决吧，主要是文件路径问题。

运行ant -Dlanguage=zh_CN pdf-cjk生成pdf，ant -Dlanguage=zh_CN html生成网页，都没问题了。