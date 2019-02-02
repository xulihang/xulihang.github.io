---
date: 2019-01-31 21:36:50+08:00
layout: post
title: B4X游戏开发
categories: 技术随笔
tags: B4X
---

最近研究了以下如何用B4X开发2D游戏。2D游戏本质其实就是不断地在屏幕上显示新的图像。图像的显示一般都要使用图形库，比如javafx。

一个简单的记忆力对对碰游戏（若干张牌，只显示背面，点击可以显示正面。如果连续点击的两张正面相同则消除，不同则恢复为背面。），使用自带的ImageView控件就能搞定。

![](/album/games/memory_puzzle.png)

利用B4X的[XUI](https://www.b4x.com/android/forum/threads/b4x-xui-views-cross-platform-views-and-dialogs.100836/)，可以用通用的类B4XView表示对应平台的图形组件，这样跨平台时可以共用代码。

[B4XCanvas](https://www.b4x.com/android/forum/threads/b4x-xui-drawing-with-b4xcanvas.85113/)、[BitmapCreator](https://www.b4x.com/android/forum/threads/b4x-drawing-with-bitmapcreator.98887/)和[GameView](https://www.b4x.com/android/forum/threads/gameview-create-2d-android-games-part-i.20038/)都是用来画图的类库。Canvas简单，BitmapCreator的功能更加强大，而GameView可以使用硬件加速。GameView是安卓的类库，点进它的Tutorial页，可以知道Erel推荐开发安卓游戏用libGDX。

[How to make games](https://www.b4x.com/android/forum/threads/how-to-make-games.32593/)是论坛的游戏开发者写的教程，列举了游戏开发要注意的事项和可以使用的资源。

一般2D游戏会有一个Sprite精灵的概念，相当于游戏里的一个对象，对应的代码要负责它的图像更新、动画等细节。然后一个游戏控制的代码文件，管控游戏的逻辑。图像的更新一般通过计时器来实现，还有用户输入的按键等信息，也在计时器的时间里处理。

为了让游戏具有真实性，我们还可以引入物理引擎，这里推荐的是[Box2D](https://www.b4x.com/android/forum/threads/b4x-x2-xui2d-box2d-game-engine.95208/)，Erel已经封装好，我们可以直接使用。利用Box2D进行跨平台开发的一系列类文件统一叫做XUI2D，这里可以看到示例文件：[[XUI2D] Example Pack](https://www.b4x.com/android/forum/threads/xui2d-example-pack.96454/)

复杂的游戏都推荐使用XUI2D来完成。要学习XUI2D，首先的了解Box2D。我们可以先阅读它的[手册](http://box2d.org/manual.pdf)，然后找几个示例来研究。

XUI2D主要包含以下几个bas类：

```
X2Utils.bas	X2的主要模块，有各种方法
X2BodyWrapper.bas	管理Box2D的物体（Body）
X2SoundPool.bas	管理音乐文件
X2SpriteGraphicCache.bas	缓存图片
X2TileMap.bas	利用TileMap来生成物体
X2DebugDraw.bas	Debug用
ScoreLabel.bas	处理状态栏信息
```

示例文件里项目结构按照这篇跨平台方案如下：

![](https://www.b4x.com/basic4android/images/SS-2018-09-03_12.55.20.png)

对应平台的代码主要是一个main类，负责针对平台处理输入输出以及设计界面。共享代码部分，Game.bas是游戏的主体，然后可以有很多的Body Degelate类。

这里再结合代码简单介绍一下Box2D，它是一个c++的物理引擎类库，变量命名方法是有一个B2的前缀，比如B2Vec2，B2World。

使用Box2D，首先要创建一个世界（B2World），这个世界的大小是以米（meter）为单位而不是像素，所以图片导入进去是都要做一个像素到米的转换。世界有一些属性，其中重力属性是必需的。

B4X中建立世界的代码如下：

```vb
Public world As B2World
world.Initialize("world", world.CreateVec2(0, -20))
```

建立好世界后我们再往里面添加物体，我们需要先使用B2BodyDef定义这个物体。Box2D的物体都是刚体（rigid body），坚硬不易变形，主要分为3类：Static、Kinematic、Dynamic。Static就是静止不动的物体，Kinematic物体可以拥有速度，而Dynamic物体除了速度，还可以添加力。此外，还要定义物体的位置、形状、大小和摩擦系数等。形状、摩擦系数等信息保存在固定装置（fixture）里，

以下代码建立一个地面。

```vb
Private Sub CreateGround
	Dim GroundBox As B2Vec2 = X2.CreateVec2(9.6, 0.96)
	Dim sb As X2ScaledBitmap = X2.LoadBmp(File.DirAssets, "ground.png", GroundBox.X, GroundBox.Y, False)
	X2.GraphicCache.PutGraphic("Ground", Array(sb))
	Dim bd As B2BodyDef
	bd.BodyType = bd.TYPE_STATIC 'the engine should not move it
	bd.Position = X2.CreateVec2(X2.ScreenAABB.Center.X, X2.ScreenAABB.BottomLeft.Y + GroundBox.Y / 2)
	Ground = X2.CreateBodyAndWrapper(bd, Null, "Ground")
	Ground.GraphicName = "ground"
	Dim rect As B2PolygonShape
	rect.Initialize
	rect.SetAsBox(GroundBox.X / 2, GroundBox.Y / 2)
	Ground.Body.CreateFixture2(rect, 1)
	GroundLevel = X2.ScreenAABB.BottomLeft.Y + GroundBox.Y
	Dim edge As B2EdgeShape
	edge.Initialize(X2.CreateVec2(-20, X2.ScreenAABB.TopRight.Y - bd.Position.Y - 0.01), _
		X2.CreateVec2(20, X2.ScreenAABB.TopRight.Y - bd.Position.Y - 0.01))
	Ground.Body.CreateFixture2(edge, 1)
End Sub
```

两个物体可以通过关节或叫连接装置（joint）连接起来。比如坦克的炮台可以转动，是通过连接装置连接起来的。以下面便是建立这个连接的代码：

```vb
Private Sub CreateRevJoint
	Dim template As X2TileObjectTemplate = TileMap.GetObjectTemplateByName(ObjectLayer, "hinge")
	Dim revdef As B2RevoluteJointDef
	revdef.Initialize(Tank.Body, Kane.Body, template.BodyDef.Position)
	revdef.SetLimits(0, cPI * 2/3) '设置可以转动的范围
	revdef.LimitEnabled = True
	revdef.MaxMotorTorque = 10
	revjoint = world.CreateJoint(revdef)
	revjoint.MotorEnabled = True
	Kane.Body.GravityScale = 0
End Sub
```

这里使用了[多层地图TiledMap](https://www.b4x.com/android/forum/threads/xui2d-x2tilemap-tiled-maps.95508/)制作地图，通过读取对象层的对象来建立hinge这个连接装置，不用手写具体的代码。

以上代码来自clumsy bird和tank这两个示例项目。





