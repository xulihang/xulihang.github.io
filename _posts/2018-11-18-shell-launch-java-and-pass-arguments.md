---
date: 2018-11-18 20:49:50+08:00
layout: post
title: 编写支持传递参数的Java启动用Shell脚本
categories: 技术随笔
tags: 
---

BasicCAT要安装到linux上，需要用shell来进行调用，我参考omegat的启动脚本，做了点修改。让它支持以下三种方式启动：

`$ BasicCAT project.bcp #打开当前目录的项目文件`

`$ BasicCAT /path/project.bcp #打开某个路径的项目文件`

`$ BasicCAT #默认启动，不打开文件`

BasicCAT装在/opt/BasicCAT里。

脚本如下：

```shell
#!/bin/bash

# readlink follows any symbolic links to get the real file
RealBasicCATPATH=`dirname "$(readlink -nf $0)"`

currentPATH="$(pwd)"

JAVA="java"
BUNDLED_JAVA="${RealBasicCATPATH}/jre/bin/java"
[ -f "${BUNDLED_JAVA}" ] && JAVA="${BUNDLED_JAVA}"

cd "${RealBasicCATPATH}"

result=$(echo "$@" | grep /)

if [[ "$result" != ""  ]]
then
    projectPATH="$@"
else
    projectPATH="$currentPATH/$@"
fi

bcpresult=$(echo "$projectPATH" | grep ".bcp" )

if [[ "$bcpresult" = "" ]]
then
    "${JAVA}" -jar "BasicCAT.jar"
else
    "${JAVA}" -jar "BasicCAT.jar" "$projectPATH"
fi

```

通过检测路径有没有包含分割符来判断路径是不是完整路径。通过检测参数有没有bcp来判断是否传递该参数。