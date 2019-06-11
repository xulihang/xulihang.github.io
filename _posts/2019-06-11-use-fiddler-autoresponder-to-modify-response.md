---
date: 2019-06-11 10:10:50+08:00
layout: post
title: 用Fiddler AutoResponder修改网络请求返回结果
categories: 网络
tags: 
---

最近碰到网易的一个表单系统提交图片失败的问题。于是我想研究下代码，看能否成功提交表单。该网站使用regularjs开发，生成的js文件没有minify，行数达到27000多行。对于本就不熟悉前端的我来说，调试的难度不小。

该表单除了基本的文字信息，还要传两张图片。使用的方法是利用form进行上传，然后返回服务器上的地址。因为上传会进行页面跳转，所以在上传时会先建立一个iframe用于上传，成功后再将其删除。

以下是上传部分的代码：

```js
/**
 * 上传
 * @param form
 * @param callback
 * @private
 */
__upload: function (form, callback) {

    var self = this,
        //$form = $(form),
        ifr = document.createElement('iframe'),
        rnd = (Math.random() + '').substr(-8),
        name = 'upload-ifr' + rnd;
    ifr.style.display = 'none';

    // 需要在 append 页面时, 对 name 属性赋值
    ifr.setAttribute('name', name);
    document.body.appendChild(ifr);
    form.setAttribute('target', name);
    ifr.onload = function () {
        var ifrBody = ifr.contentDocument.body,
            html = ifrBody.innerHTML,
            json;
        html = html.replace(/^<.+?>/, '').replace(/<.+?>$/, '');

        json = eval('(' + html + ')');
        callback && callback(json);
        ifr.remove();
    };
    // 延迟零毫秒，再次提交
    setTimeout(function () {

        form.submit();

    }, 0);
},
```

上传时报错，内容如下：

```
Uncaught SyntaxError: Unexpected identifier
    at HTMLIFrameElement.ifr.onload (index.js:482)
```

对应的内容是`json = eval('(' + html + ')');`。

于是我就网上搜索该错误，说是要把引号换成双引号。我直接在浏览器中修改js，发现不能生效。

我想起之前爬取netflix时使用的Fiddler，可以用本地文件替换请求的文件。因为Fiddler捕获流量是通过本地代理实现的，所以它可以在中间做操纵。

这一功能叫做AutoResponder。我们要设置需要截获的请求的URL和返回的本地文件的地址。

但是我直接替换js文件发现没有效果，可能是regularjs比较特殊。于是我转向修改文件上传请求的返回结果。因为是服务器返回的上传文件失败的错误，使得整个提交失败。

有两张图片需要上传，第一张可以上传成功，而第二张时会报错。我们可以把第一张的返回结果保存下来，以后上传的返回结果都用Fiddler修改为这一成功上传的结果，这样就可以成功保存信息。

但因为返回的结果中带有上传后的图片的服务器URL，这样两张图片的地址就一样了。好在上传两张图片时会出错，单独上传一张时可以成功。所以，只要重新单独上传那张图片就行了。

操作方法：

1. 保存成功上传图片时的返回结果

    ![](/album/web/fiddler_save_response.png)

    结果文件是个txt文件，内容如下：

    ```
    HTTP/1.1 200 OK
    Server: nginx
    Date: Tue, 11 Jun 2019 01:25:18 GMT
    Content-Type: text/html;charset=utf-8
    Connection: keep-alive
    Vary: Accept-Encoding
    Content-Length: 319

    {"code":"200","data":{"createTime":null,"description":"","id":14,"name":"图片名.jpg","nosKey":"715208-***","token":"","url":"图片URL"},"msg":""}
    ```

2. 添加AutoResponder规则

    ![](/album/web/fiddler_rule.png)
    

记得开启Fiddler的流量捕获。

