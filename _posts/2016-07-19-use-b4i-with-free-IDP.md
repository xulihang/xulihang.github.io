---
date: 2016-07-19 17:38:50+08:00
layout: post
title: B4i使用免费开发者调试账号
categories: 移动开发
tags: iOS B4X
---
 
嗯，最近配了一台黑苹果台式机，打算放在家里当作服务器，可以运行b4i的Buildserver。这样以后到学校，我可以直接在笔记本的windows系统上完成开发，而基本不用进OS X。

我的开发者账号已经过期了，但是苹果自Xcode7以后就支持普通用户免费真机调试应用。这个过程同样有用到开发证书和应用分发证书。

我先到b4x的论坛重温了一下如何建立keys文件夹，然后试验一下后发现可以成功使用这个免费的证书来调试应用。

具体操作如下：

1、打开Xcode7，在Preferences-Account里登录Apple ID。进Details里，创建iOS Development的signing identity。

2、建立一个项目，给它命名，要和以后b4i上调试的应用一样。连接iOS设备，项目设置的identity框里的Team选择自己的账号，运行。之后应该会获取到给该设备使用的provisioning file。如果提示没有signing identity，是因为开发者证书没有在钥匙串里，试试重启电脑。

3、打开Mac的钥匙串应用。导出已有的iPhone Developer开发者证书为.cer。同时备份所有证书一份，可以保存为.p12。到Xcode账号设置详情里，右键你要用的provisioning profiles文件，点击show in finder，复制一份该文件。provisioning profiles可以在~/Library/MobileDevice/Provisioning Profiles里找到。以上两份文件命名为ios.cer和B4i.mobileprovision放到b4i的key文件夹里。

4、Windows下打开B4i，点击Tools-Priviate Sign Key，输入你Apple ID的用户名信息（会显示在xcode项目文件设置的Team里），这样就在key文件夹里生成了B4i.p12。＃这一步错了，见下面的说明＃

5、B4i里，点击Project－build Configuration，Package Name和之前Xcode下生成的项目名一样。

6、之后就是设置server地址，设备地址和安装b4i-bridge到iOS设备上。我碰到了生成应用出错的问题，提示没有所需的signing identity。我发现mac buildserver把mac上现有的证书都删除了。还好我有备份，把证书再导回去就可以了。

话说B4i的调试功能挺好使的，修改过的代码不用重新编译就可以反映在设备上。我之前没有开发者账号时直接用xcode调试越狱设备挺费劲的，后来有了开发者账号也一直用的Xcode，因为我用到了cocoapods，而b4i会重新生成配置文件。现在开发者账号过期了，倒用b4i来直接调试了。

<p style="color:red;"> 更新:</p>

<p style="color:red;"> 后来发现，第4步的B4i.p12是会添加到系统钥匙串里的，我用了b4i生成的文件所以导致了后来提示没有所需的signing identity的错误。b4i自带的Priviate Sign Key工具是用来到苹果官网生成证书的。这里我们用xcode自动生成的证书，就不用Priviate Sign Key了。所以只要再导出iPhone Developer开发者证书为p12文件放倒key里就行了。</p>

<p style="color:red;"> 然后，provision profile如果不是如com.xx.*的话，b4i-bridge可能无法通过编译，因为identify bundle配不上，b4i-bridge的bundle是你的应用的bundle名加上.bridge。我们可以专门为安装bridge配一个provision profile，用xcode再建一个项目，bundle名是将来在b4i里开发的应用的bundle名加上.bridge。比如com.xulihang.test1.bridge。b4i不支持使用多个provision profile，要进行手工替换操作。</p>