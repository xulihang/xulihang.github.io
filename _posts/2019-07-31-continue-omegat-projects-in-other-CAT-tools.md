---
date: 2019-07-31 11:29:50+08:00
layout: post
title: 在其他CAT中继续处理OmegaT项目
categories: 技术随笔
tags: 
---

Trados的项目文件存储为SDLXLIFF，我们可以使用其他CAT工具通过SDLXLIFF来继续翻译。而OmegaT并不没有中间格式文件。

这时我们可以利用脚本来手动生成一个中间格式文件。

使用以下脚本，可以将OmegaT项目的所有片段导出。每个片段存储为一行，并替换原来文本的换行为\n。

```groovy
files = project.projectFiles;
segment_count=0

def prop = project.projectProperties
if (!prop) {
    showMessageDialog null, res.getString("noProjectMsg"), res.getString("noProject"), INFORMATION_MESSAGE
    return
}
def root = prop.projectRoot;
def srcTextFile = new File(root, 'project_source_content.txt');
def out = "";

fileLoop:


for (i in 0 ..< files.size())
{
    fi = files[i];
    
    for (j in 0 ..< fi.entries.size())
    {
        if (java.lang.Thread.interrupted()) {
            break fileLoop;
        }

        ste = fi.entries[j];
        source = ste.getSrcText();
        source = source.replace("\n","\\n")
        
        out <<= source;
        out <<= "\n";
        segment_count++;
    }

}

srcTextFile.write(out.toString(),"UTF-8");
```

使用其它CAT翻译这一文件，然后生成翻译记忆，将tmx文件放到OmegaT项目的/tm/auto可以自动填充翻译。






