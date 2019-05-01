---
date: 2019-05-01 20:16:50+08:00
layout: post
title: 开发Trados插件
categories: 技术随笔
tags: CAT
---

SDL Trados是目前行业里占有率最好的CAT软件之一，给Trados开发插件比开发和推广一款新的软件要容易很多，有更多的实际需求，而我写的BasicCAT更适合对工具选择的自由权较大的用户。所以，还是得专门研究下主流CAT软件，以应对客户定制化的需求。下面是教程内容。

## 可以开发什么样的插件

Trados虽然闭源，但是开放了很多API，主要有以下几种[^apis]：

* Core，核心框架
* File Support Framework，定制文件过滤器，以支持新的文件格式
* Project Automation，定制项目的自动化操作
* Translation Memory，可以使用第三方的翻译记忆或者机器翻译
* Integration，定制界面，比如修改右键菜单、制作新的视图
* Verification，用于QA检查
* Batch Task，添加批处理操作
* Terminology Provider，提供第三方术语


## 环境要求 

Trados是使用Windows上的.net框架，用C#编写的，所以插件的开发也使用C#。开发插件需要以下环境：

* Windows
* Visual Studio
* Trados Templete for Visual Studio

目前虽然出了Trados 2019，主流的还是使用2015-2017版，需要搭配Visual Studio 2017使用，模板下载：<https://marketplace.visualstudio.com/items?itemName=sdl.TradosStudiotemplatesforVisualStudio>。


## 实战 —— 开发一个机器翻译插件

比较简单的就是开发机器翻译插件了，目标是做一个mymemory的插件，调用这个API: [MyMemory: API technical specifications](https://mymemory.translated.net/doc/spec.php)，实现以下效果：

![](/album/mt.png)

官网的示例可以参考：[Creating a Translation Service Provider Plug-in](http://producthelp.sdl.com/SDK/TranslationMemoryApi/2017/html/03670e46-3379-4005-baf3-7b1613115d60.htm)。

### 新建项目

安装完成后，打开Visual Studio，有四类SDL插件开发模板可选，要开发机器翻译选择Translation Provider。

![](/album/new_project.png)

项目结构如下：

```
│  SDL Translation Provider3.sln
│
├─SDL Translation Provider3
   │  MyTranslationProvider.cs
   │  MyTranslationProviderFactory.cs
   │  MyTranslationProviderLanguageDirection.cs
   │  MyTranslationProviderWinFormsUI.cs
   │  pluginpackage.manifest.xml
   │  PluginResources.resx
   │  SDL Translation Provider3.csproj
   │  packages.config
   │
   ├─Properties
   │      AssemblyInfo.cs
   │      PluginProperties.cs
```

pluginpackage.manifest.xml是项目的声明文件，定义了项目的描述、名称和作者等信息，这里我们还可以添加第三方的dll。比如添加如下内容[^3rd_Dll]以包括Newtonsoft.Json.dll。

```
  <Include>
    <File>Newtonsoft.Json.dll</File>
  </Include>
```

PluginResources.resx是项目的资源文件，可以用来存储图像和文字内容，主要是Trados插件的名字、图标等。

MyTranslationProvider是项目的主类，继承自ITranslationProvider[^ITPIF]，定义了插件是否支持某些功能，比如片段搜索、翻译等等，另外还有很多属性。

MyTranslationProviderLanguageDirection是针对一个语言对方向，提供翻译功能。

MyTranslationProviderFactory是一个插件的扩展类，定义了插件的URI Scheme，Trados使用这个Uri来区别不同的插件。

MyTranslationProviderWinFormsUI是UI相关的类，可以用WinFrom定制设置界面，比如机器翻译的API密钥。

### 构建插件

首先，在项目属性里添加一个强名称签名文件，满足构建的要求。然后点击生成，会自动生成.sdlplugin这个插件文件并进行安装。

### 具体的修改

大多数的属性和方法都还没有实现，使用了以下抛出错误的代码。


```csharp
throw new NotImplementedException();
```

这样插件没有办法正常运行，我们可以参考[TranslationMemoryApi](http://producthelp.sdl.com/SDK/TranslationMemoryApi/2017/html/888e7ee9-eee7-00c0-3cea-49cc0a2fbd00.htm)文档和这个[MT Enhanced Trados Plugin](https://github.com/patrickporter/MT-Enhanced-Trados-Plugin)的源代码进行修改。

这个机器翻译插件的主要功能就是利用mymemory提供的API，把原文片段发送给它，获得翻译，然后解析json格式的返回，把译文显示在Trados的TM视图。而提供片段翻译的方法是Direction类的SearchSegment，返回一个SearchResults类型的结果，以下是我改的Direction类的内容：

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sdl.LanguagePlatform.Core;
using Sdl.LanguagePlatform.TranslationMemory;
using Sdl.LanguagePlatform.TranslationMemoryApi;
using Sdl.Core.Globalization;
using System.Windows.Forms;
using System.Net;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace SDL_Translation_Provider1
{
    class MyTranslationProviderLanguageDirection : ITranslationProviderLanguageDirection
    {
        #region ITranslationProviderLanguageDirection Members

        private MyTranslationProvider _provider;
        private LanguagePair _languageDirection;
        private TranslationUnit inputTu;

        public MyTranslationProviderLanguageDirection(MyTranslationProvider provider, LanguagePair languages)
        {
            #region "Instantiate"
            _provider = provider;
            _languageDirection = languages;
            #endregion
        }

        private SearchResult CreateSearchResult(Segment searchSegment, Segment translation,
    string sourceSegment)
        {
            #region "TranslationUnit"
            TranslationUnit tu = new TranslationUnit();
            tu.SourceSegment = searchSegment.Duplicate();//this makes the original source segment, with tags, appear in the search window
            tu.TargetSegment = translation;
            #endregion

            tu.ResourceId = new PersistentObjectToken(tu.GetHashCode(), Guid.Empty);

            int score = 0; //score to 0...change if needed to support scoring
            tu.Origin = TranslationUnitOrigin.MachineTranslation;
            SearchResult searchResult = new SearchResult(tu);
            searchResult.ScoringResult = new ScoringResult();
            searchResult.ScoringResult.BaseScore = score;
            tu.ConfirmationLevel = ConfirmationLevel.Draft;

            return searchResult;
        }

        public ImportResult[] AddOrUpdateTranslationUnits(TranslationUnit[] translationUnits, int[] previousTranslationHashes, ImportSettings settings)
        {
            throw new NotImplementedException();
        }

        public ImportResult[] AddOrUpdateTranslationUnitsMasked(TranslationUnit[] translationUnits, int[] previousTranslationHashes, ImportSettings settings, bool[] mask)
        {
            throw new NotImplementedException();
        }

        public ImportResult AddTranslationUnit(TranslationUnit translationUnit, ImportSettings settings)
        {
            throw new NotImplementedException();
        }

        public ImportResult[] AddTranslationUnits(TranslationUnit[] translationUnits, ImportSettings settings)
        {
            throw new NotImplementedException();
        }

        public ImportResult[] AddTranslationUnitsMasked(TranslationUnit[] translationUnits, ImportSettings settings, bool[] mask)
        {
            throw new NotImplementedException();
        }

        public bool CanReverseLanguageDirection
        {
            get { throw new NotImplementedException(); }
        }

        public SearchResults SearchSegment(SearchSettings settings, Segment segment)
        {
            Segment translation = new Segment(_languageDirection.TargetCulture);//this will be the target segment

            SearchResults results = new SearchResults();
            results.SourceSegment = segment.Duplicate();
            
            translation.Add(DoTranslate(_languageDirection, inputTu.SourceSegment.ToPlain()));
            results.Add(CreateSearchResult(segment, translation, "source"));
            return results;

        }

        public SearchResults[] SearchSegments(SearchSettings settings, Segment[] segments)
        {
            SearchResults[] results = new SearchResults[segments.Length];
            for (int p = 0; p < segments.Length; ++p)
            {
                results[p] = SearchSegment(settings, segments[p]);
            }
            return results;
        }

        public SearchResults[] SearchSegmentsMasked(SearchSettings settings, Segment[] segments, bool[] mask)
        {
            if (segments == null)
            {
                throw new ArgumentNullException("segments in SearchSegmentsMasked");
            }
            if (mask == null || mask.Length != segments.Length)
            {
                throw new ArgumentException("mask in SearchSegmentsMasked");
            }

            SearchResults[] results = new SearchResults[segments.Length];
            for (int p = 0; p < segments.Length; ++p)
            {
                if (mask[p])
                {
                    results[p] = SearchSegment(settings, segments[p]);
                }
                else
                {
                    results[p] = null;
                }
            }

            return results;
        }

        public SearchResults SearchText(SearchSettings settings, string segment)
        {
            Segment s = new Sdl.LanguagePlatform.Core.Segment(_languageDirection.SourceCulture);
            s.Add(segment);
            return SearchSegment(settings, s);
        }

        public SearchResults SearchTranslationUnit(SearchSettings settings, TranslationUnit translationUnit)
        {
            //need to use the tu confirmation level in searchsegment method
            inputTu = translationUnit;
            return SearchSegment(settings, translationUnit.SourceSegment);
        }

        public SearchResults[] SearchTranslationUnits(SearchSettings settings, TranslationUnit[] translationUnits)
        {
            SearchResults[] results = new SearchResults[translationUnits.Length];
            for (int p = 0; p < translationUnits.Length; ++p)
            {
                //need to use the tu confirmation level in searchsegment method
                inputTu = translationUnits[p];
                results[p] = SearchSegment(settings, translationUnits[p].SourceSegment); //changed this to send whole tu
            }
            return results;
        }

        public SearchResults[] SearchTranslationUnitsMasked(SearchSettings settings, TranslationUnit[] translationUnits, bool[] mask)
        {
            List<SearchResults> results = new List<SearchResults>();

            List<KeyValuePair<string, string>> errors = new List<KeyValuePair<string, string>>();



            int i = 0;
            foreach (var tu in translationUnits)
            {
                if (mask == null || mask[i])
                {
                    var result = SearchTranslationUnit(settings, tu);
                    results.Add(result);
                }
                else
                {
                    results.Add(null);
                }
                i++;
            }

            if (errors.Count > 0)
            {
                string messages = "";
                foreach (KeyValuePair<string, string> pair in errors)
                    messages += pair.Key + ":  " + pair.Value + "\n";
                MessageBox.Show(messages);
            }

            return results.ToArray();
        }

        public System.Globalization.CultureInfo SourceLanguage
        {
            get { throw new NotImplementedException(); }
        }

        public System.Globalization.CultureInfo TargetLanguage
        {
            get { throw new NotImplementedException(); }
        }

        public ITranslationProvider TranslationProvider
        {
            get { return _provider; }
        }

        public ImportResult UpdateTranslationUnit(TranslationUnit translationUnit)
        {
            throw new NotImplementedException();
        }

        public ImportResult[] UpdateTranslationUnits(TranslationUnit[] translationUnits)
        {
            throw new NotImplementedException();
        }

        #endregion

        private String DoTranslate(LanguagePair langPair, String text)
        {

            string sourceLang = langPair.SourceCulture.Name;
            string targetLang = langPair.TargetCulture.Name;



            //create the url for the translate request
            string url;

            url = String.Format("https://api.mymemory.translated.net/get?q={0}&langpair={1}|{2}&de={3}", text, sourceLang, targetLang,"mail_address@163.com");

            
            string result = ""; //this will take the result from the webclient

            //delete the follwoing line for production...only to be able to trace http calls using Fiddler
            //ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

            using (WebClient webClient = new WebClient())
            {
                webClient.Encoding = Encoding.UTF8;
                try
                {
                    result = webClient.DownloadString(url);  //gets us the json data indicating supported source languages for this target
                }
                catch (WebException e) //will come back 400 bad request if there is a problem
                {
                    throw e;
                }
            }

            String returnedResult = parseReturnedResult(result);

            return returnedResult;
        }
        private string parseReturnedResult(string input)
        {

            JObject jo = (JObject)JsonConvert.DeserializeObject(input);
            String result = jo["responseData"]["translatedText"].ToString();
            return result;

        }

    }
}
```

因为我们只是实现机器翻译，其它什么对于翻译记忆使用的片段搜索等功能就可以略过。另外还有密钥的存储、设置界面的定制等等，我这里就不具体写了，官网文档更详细。


参考资料：


[^apis]: [SDL AppStore 开发人员计划 SDK ](https://appstore.sdl-china.cn/cn/language/developers/sdk.html)
[^3rd_Dll]: [3rd Party Assemblies and SDL Trados Studio Plugins](https://www.sdltrados.cn/blog/3rd-party-assemblies-and-sdl-trados-studio-plugins.html)
[^ITPIF]: [ITranslationProvider Interface](http://producthelp.sdl.com/SDK/TranslationMemoryApi/2017/html/7600ff21-d21e-1e4a-366c-51314b7ea07d.htm)

其它文档：

* [SDK合集](https://appstore.sdl-china.cn/cn/language/developers/sdk-collection.html)