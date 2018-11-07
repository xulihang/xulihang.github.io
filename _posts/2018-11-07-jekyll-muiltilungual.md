---
date: 2018-11-07 15:34:50+08:00
layout: post
title: 用jekyll构建多语言网站
categories: 网络
tags: CAT
---

BasicCAT的网站打算利用jekyll做一个双语的版本放在github pages上。之前我做英文版博客是直接另建一个仓库，然后把中文的界面内容翻译为英文，再绑定二级域名en。

这次我打算做一个可以在页面点击语言进行切换的版本。

网上搜到一个方法是在post文件开头的yaml配置里加上lang：语言代码，通过不同的语言代码来切换显示的内容。原文[在此](https://www.sylvaindurand.org/making-jekyll-multilingual/)。

代码类似这样：

```yaml
---
title: Hello world!
lang: en
ref: hello
---

---
title: 你好，世界！
lang: zh
ref: hello
---
```

```liquid
{% raw %} 
{% assign posts=site.posts | where:"lang", page.lang %}
<ul>
{% for post in posts %}
    <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
{% endfor %}
</ul>
{% endraw %} 
```

但这样的坏处是不同语言的文件都要放在同一个_posts文件夹里，而且还不能重名，也不能通过/zh这样的路径来进行区别。

于是我研究了下jekyll的文档，发现可以用collection结合permalink实现。

# 建立Collection

首先看一下什么是Collection。

>Collections are a great way to group related content like members of a team or talks at a conference.

同一语言的文档正好可以作为一个集合。

我们在根目录建立一个_zh文件夹，将index.md、原来放在_posts里的文档还有其它feed.xml之类的文档都放进去。

修改_config.yml，添加以下内容：

```yaml
collections:
  zh:
    output: true
    permalink: /:collection/:title/
```

添加zh集合，并开启该集合下文件的生成(output)，然后链接设置为集合的名字加上文件的标题，这里就是/zh/post文件名去掉日期。

然后修改index.md，让其添加在zh里生成的post文件。下面第一行代码是我添加的内容，利用layout过滤掉其它文件。

```html
{% raw %} 
{% assign posts=site.zh | where:"layout", "post" %}
{% for post in posts  %}
<li>
    <a href="{{ post.url | prepend: site.baseurl | prepend: site.url }}">{{ post.title }}</a> <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %d, %Y" }}</time>
</li>
{% endraw %} 
```

feed.xml除了要做上述一行代码的添加，还要添加permalink，指向/zh/feed.xml。

# 修改模板文件

下面还要修改_layouts和_includes里的内容。为了方便翻译，我们不能采用修改default.html为default-zh.html这样的办法。我们可以把要翻译的内容存放进_data文件夹。在根目录存放英文内容的text.yml，在zh目录存放中文对应的text.yml。

根据html文件里的内容制作类似这样文件：

```yaml
home: 首页
intro: 使用Basic开发的CAT软件
about: 关于
rss: 订阅
```

然后修改html，让其根据当前路径是否包含/zh/来自动加载对应的语言文本。

例如以下是nav.html导航栏部分的内容：

```html
{% raw %} 
  {% if page.url contains '/zh/' %}
   {% assign home=site.data.zh.text.home %}
   {% assign about=site.data.zh.text.about %}
   {% assign rss=site.data.zh.text.rss %}
   {% assign homelink='/zh/' %}
  {% else %}
   {% assign home=site.data.text.home %}
   {% assign about=site.data.text.about %}
   {% assign rss=site.data.text.rss %}
   {% assign homelink='/' %}
  {% endif %}

<p class="site-nav">
<a href="{{ homelink | prepend: site.baseurl | prepend: site.url }}">{{home}}</a> / 
<a href="{{ homelink | append: 'about' | prepend: site.baseurl | prepend: site.url }}">{{about}}</a> / <a href="{{ homelink | append: 'feed.xml' | prepend: site.baseurl | prepend: site.url }}">{{rss}}</a>
</p>
{% endraw %} 
```

我们还要在右上角添加一个语言切换器，让用户选择使用哪种语言。可以在default.html里添加以下内容：

```html
{% raw %} 
  {% if page.url contains '/zh/' %}
    {% assign enurl=page.url | replace:'/zh/','/' %}
    {% assign zhurl=page.url %}
  {% else %}
    {% assign enurl=page.url %}
    {% assign zhurl=page.url | prepend:'/zh' %}
  {% endif %}
<div class="language-chooser">
  <a href="{{enurl}}">en</a>
  <a href="{{zhurl}}">zh</a>
</div>
{% endraw %} 
```

对应的css：

```css
.language-chooser{
    float:right;
    margin: 2rem;
}
```

最终的效果可以看这个网站：<https://basiccat.xulihang.me>

相关参考教程：

* Liquid 语言：<https://liquid.bootcss.com/>
* jekyll 文档：<https://jekyllrb.com/docs/>
