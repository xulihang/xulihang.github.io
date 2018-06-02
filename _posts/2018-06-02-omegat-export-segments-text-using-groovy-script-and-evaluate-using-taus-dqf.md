---
date: 2018-06-02 11:15:50+08:00
layout: post
title: OmegaT使用脚本导出片段并用TAUS DQF进行质量评价
categories: 技术随笔
tags: CAT
---

OmegaT使用java写的，autoit就不好使了，得用它支持的JavaScript或者Groovy写脚本。

默认已经带了一些Groovy脚本示例了，可以供我们参考。

我这次的目标是把原文片段和译文片段以Taus DQF要求的csv格式存储，并分成30份给同学们使用。

```groovy
import groovy.json.JsonOutput

files = project.projectFiles;
segment_count=0

fileLoop:
def map1 = [:]
for (i in 0 ..< files.size())
{
    fi = files[i];
    
    //console.println(fi.filePath);

    for (j in 0 ..< fi.entries.size())
    {
        if (java.lang.Thread.interrupted()) {
            break fileLoop;
        }

        ste = fi.entries[j];
        changer="没有修改者";
        source = ste.getSrcText();
        target = project.getTranslationInfo(ste) ? project.getTranslationInfo(ste).translation : null;

        changer=project.getTranslationInfo(ste).changer;
        if (changer==null){
        	changer="没有修改者";
        }
        if (target==null){
        	target="未翻译";
        }
        
        num=ste.entryNum()
        map1.put(num, [source,target,fi.filePath]) //结果保存在map里，以便导出为json。

        segment_count++;
    }

}

//获取项目路径，将结果保存为json文件
def prop = project.projectProperties
if (!prop) {
    showMessageDialog null, res.getString("noProjectMsg"), res.getString("noProject"), INFORMATION_MESSAGE
    return
}

def root = prop.projectRoot;

def srcTextFile = new File(root, 'project_source_content.txt');
def json = JsonOutput.toJson(map1);
  
console.println(json);
srcTextFile.write(json)
srcTextFile.close();
```

通过以上groovy代码，我们可以把结果导出。

然后我们按每人多少片段进行分割就可以了。

TAUS的DQF（Dynamic Quality Framework ）一般是用来评估机器翻译的，我们也可以用来评价人工翻译。它有几个维度：Fluency、Adequacy和Typology Errors。

以下是具体的介绍：

>**Fluency**: captures to what extent the translation is well-formed grammatically, contains correct spellings, adheres to common use of terms, titles and names, is intuitively acceptable and can be sensibly interpreted by a native speaker.: captures to what extent the translation is well-formed grammatically, contains correct spellings, adheres to common use of terms, titles and names, is intuitively acceptable and can be sensibly interpreted by a native speaker. 

Fluency的评分分为四级：Incomprehensible、Disfluent、Good和Flawless。

>**Adequacy**: captures to what extent the meaning in the source text is als expressed in the translation. 

Adequacy的评分也分为四级：None、Little、Most和Everything。

Typology Errors更加详细，需要数译文出现的错误。具体见以下表格：

High-level         |  Granular levels
-------------------|---------------------------------
Accuracy           |  Addition
                   |  Omission
                   |  Mistranslation
                   |  Over-translation
                   |  Under-translation
                   |  Untranslated
                   |  Improper exact TM match
Fluency            |  Punctuation
                   |  Spelling
                   |  Grammar
                   |  Grammatical register
                   |  Inconsistency
                   |  Link/cross-reference
                   |  Character encoding
Terminology        |  Inconsistent with termbase
                   |  Inconsistent use of terminology
Style              |  Awkward
                   |  Company style
                   |  Inconsistent style
                   |  Third-party style
                   |  Unidiomatic
Locale convention  |  Address format
                   |  Date format
                   |  Currency format
                   |  Measurement format
                   |  Shortcut key
                   |  Telephone format

DQF需要上传翻译记忆文件，tmx或者tab分割的文件都行。生成tmx比较麻烦，我导入后还报错，我就选择的tab分割文本。但是omegat的原文片段可以包含换行，tab等信息，需要进一步处理。这个问题我反馈给了[omegat](https://sourceforge.net/p/omegat/bugs/913/)，说片段是可以包含多行内容的。

建立审校项目需要分配给别人或自己，审校完成后，便可以查看报告了。





