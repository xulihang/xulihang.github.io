---
date: 2019-01-19 15:56:50+08:00
layout: post
title: B4J Web开发之ABMaterial
categories: 技术随笔
tags: B4X
---

B4J支持使用[WebSocket](https://blog.xulihang.me/b4x-websocket/)开发WebApp，利用服务器来处理一切操作。而[ABMaterial](https://alwaysbusycorner.com/abmaterial/)是一个B4J WebApp开发框架，利用它，使用者不需要HTML、CSS和Javascript的知识，单纯用B4J就能开发出不错的网页应用。

ABMaterial集成了[Materialize CSS](https://materializecss.com/)框架，所以叫做ABMaterial，可以在Objects\www文件夹里看到css、js、font等文件夹。我们写的Basic语句，会被用来生成HTML和CSS，并利用Websocket操作DOM以及执行从Basic转译过去的JavaScript语句。

在[此](https://www.b4x.com/android/forum/threads/abmaterial-framework-for-webapps.60072/)下载ABMaterial。

使用文档：

1. <http://abmaterial.com/>，这是用ABMaterial写的用作文档的WebApp。

2. [ABMaterial For Dummies](https://www.b4x.com/android/forum/threads/abmaterial-for-dummies-beginner-lessons.88346/)，B4X论坛的Harris网友写的新手教程。



## 模板分析

下载ABMaterial for Dummies的[模板](http://gorgeousapps.com/ABMaterialForDummies.zip)，我们对它进行分析。

项目主要有以下文件:

```

ABMPageTemplate.bas
AboutPage.bas
ABMShared.bas
Template.b4j
ABMApplication.bas

ABMCacheControl.bas
ABMCacheScavenger.bas
ABMErrorHandler.bas
ABMRootFilter.bas
DBM.bas
```

开头五个文件是平时会修改的文件，之后几个是ABMaterial运行需要的class文件，平时不需修改。

这个模板项目中，ABMPageTemplate.bas和AboutPage.bas是两个ABMPage的实例，是用户能看到的页面，我们在这类文件里修改网页的内容。ABMShared.bas包含所有Page共享的操作，比如程序的导航栏是共享的，主题是共享的。ABMApplication类是WebApp的主体，管控其它的子页面，这里可以设置整个App的属性。而在程序的Main类里，我们平时需要做的是添加页面，Template.b4j的内容如下：



```vb
Sub Process_Globals
	Public srvr As Server
	
End Sub

Sub AppStart (Args() As String)
	' the user needs to login
	'ABMShared.NeedsAuthorization = True
	
	' Build the Theme
	ABMShared.BuildTheme("mytheme")	
	
	' create the app
	Dim myApp As ABMApplication
	myApp.Initialize
		
	' create the pages
	Dim myPage As ABMPageTemplate
	myPage.Initialize	
		
	Dim about As AboutPage
	about.Initialize
		
	' add the pages to the app
	myApp.AddPage(myPage.Page)
	myApp.AddPage(about.page)
	
	' start the server  - server name and port.
	myApp.StartServer(srvr, "srvr", 51045)	
	
	' When running on a remote server, uncomment this line below to record your log messages to a file!!!
	' Helps you debug remotely...		
	'ABMShared.RedirectOutput(File.DirApp, "errlogs.txt")
			
	StartMessageLoop
End Sub
```

然后是ABMPage页面类的分析，它主要包含以下Sub：

```vb
'Initializes the object. You can add parameters to this method if needed.
Public Sub Initialize
	BuildPage
End Sub

public Sub BuildTheme()

public Sub BuildPage()

Private Sub WebSocket_Connected (WebSocket1 As WebSocket)

Private Sub WebSocket_Disconnected


public Sub ConnectPage()

Sub Page_ParseEvent(Params As Map)

' clicked on the navigation bar
Sub Page_NavigationbarClicked(Action As String, Value As String)

' this is the event that is fired when associated button is clicked... 
Sub guessbtn_clicked(Target As String)
```

在main类里实例化页面类时，完成了页面的Build工作，在用户通过WebSocket连接后，运行ConnectPage过程，渲染页面。ABMaterial会截获客户端的javascript事件，利用Page_ParseEvent，调用对应的B4J的事件Sub。

源代码中都有具体的注释。

## 开发流程

我们以开发一个猜数字的页面，简单介绍下开发流程。

1. 新建一个Server Websocket的class，把template页面的代码复制进去，并修改Name属性为页面的名字。

2. 使用ABMGridBuilder构建布局。ABMaterial采用Grid布局，一个行（row）的宽度被分为12等分，可以添加指定份宽度的列（column）。这里我选择以page为生成对象，生成3行，每行都只有占满12宽度的一列内容，分别存放Label、Input和Button组件。生成的布局代码如下：

    ```vb
    Page.AddRows(3,true,"").AddCells12(1,"")
    Page.BuildGrid ' IMPORTANT!
    ```

3. 在ConnectPage Sub里创建组件，并将它们添加到Page里，代码如下：

    ```vb
    Dim lbl As ABMLabel
    lbl.Initialize(page,"resultlbl","Input a number and press the button to guess. You have 10 chances to guess.",ABM.SIZE_PARAGRAPH,False,"")
    page.Cell(1,1).AddComponent(lbl)
    Dim inp As ABMInput
    inp.Initialize(page,"numinput",ABM.INPUT_NUMBER,"Num:",False,"")
    page.Cell(2,1).AddComponent(inp)
    Dim btn As ABMButton
    btn.InitializeFlat(page,"guessbtn","","","Guess","")
    page.Cell(3,1).AddComponent(btn)
    ```

    ABM.INPUT_NUMBER、ABM.SIZE_PARAGRAPH等都是特定组件需要用到的值，可以通过ABMaterial类调用。

4. 添加按钮的响应代码，实现输入的数字不等于生成的随机数时提示是大了还是小了，超过10次尝试次数就提示失败并重置，如果猜对了就获胜：

    ```vb
    Sub guessbtn_clicked(Target As String)
        Log("clicked")
        Dim inp As ABMInput
        inp=page.Component("numinput") '通过设置的id获得某个元素
        If inp.Text="" Then
            myToastId = myToastId + 1
            page.ShowToast("toast" & myToastId, "toastgreen", "Input a num to guess.", 5000, False)
            Return
        End If
        times=times+1
        Dim usernum As Int
        usernum=inp.Text
        Dim chances As Int
        chances=10-times
        If usernum=num Then
            myToastId = myToastId + 1
            page.ShowToast("toast" & myToastId, "toastgreen", "You win! Game reset.", 5000, False)
            num=Rnd(1,100)
            times=0
        Else
            If times>10 Then
                myToastId = myToastId + 1
                page.ShowToast("toast" & myToastId, "toastgreen", "You lose. The num is "&num&". Game reset.", 5000, False)
                num=Rnd(1,100)
                times=0
                Return
            End If
            If usernum>num Then
                myToastId = myToastId + 1
                page.ShowToast("toast" & myToastId, "toastgreen", "Too big. "&chances&" chances left.", 5000, False)
            Else
                myToastId = myToastId + 1
                page.ShowToast("toast" & myToastId, "toastgreen", "Too small. "&chances&" chances left.", 5000, False)
            End If
        End If
    End Sub
    ```

5. 在Main类里添加该页面。另外还可以修改ABMShared.bas里创建导航栏的代码，添加这个猜数字页面的链接。

    通过<http://127.0.0.1/template/GuessNum>这样的路径访问，template是应用的名字，GuessNum是页面的名字。以下是运行的效果：

    ![](/album/B4X/abmaterial.png)

ABMaterial的好处在于组件丰富、功能强大，且只需用户会用B4J。但缺点在于严重依赖于服务器，如果服务器的ping值高，响应会很慢，如果断网，网页就不能运作。另外服务器要处理所有操作，负担也会比较重，不过ABMaterial的B4JS可以在客户端运行javascript，可以一定程度解决这个问题。


