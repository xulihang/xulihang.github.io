---
date: 2020-12-04 21:39:50+08:00
layout: post
title: 训练一个图像分类器并在OpenCV中调用
categories: 技术随笔
tags: 
---

单纯的记录。

目标：训练一个判断图片内是否包含文字的分类器，并让ImageTrans能通过OpenCV进行调用

步骤：

1. 使用TensorFlow训练图片分类模型

	使用ImageTrans导出包含文字的图像和不包含文字的图像用于训练。使用TensorFlow提供的[make_image_classifier](https://github.com/tensorflow/hub/tree/master/tensorflow_hub/tools/make_image_classifier)脚本进行训练，会生成tflite和savedmodel格式的模型文件。
	
2. 转换savedmodel格式的模型为frozen graph

	```python
	import tensorflow as tf

	from tensorflow.python.framework.convert_to_constants import convert_variables_to_constants_v2

	loaded = tf.saved_model.load('my_model')
	infer = loaded.signatures['serving_default']

	f = tf.function(infer).get_concrete_function(input_1=tf.TensorSpec(shape=[None, 224, 224, 3], dtype=tf.float32))
	f2 = convert_variables_to_constants_v2(f)
	graph_def = f2.graph.as_graph_def()

	# Export frozen graph
	with tf.io.gfile.GFile('frozen_graph.pb', 'wb') as f:
	   f.write(graph_def.SerializeToString())
	```
	
3. 使用OpenCV的DNN模块进行调用

	```python
	import numpy as np
	import cv2

	net = cv2.dnn.readNet('frozen_graph.pb')
	image = cv2.imread(filename)
	img_tensor =  cv2.dnn.blobFromImage(image, 1 / 255.0, (224, 224), swapRB=True, crop=False) 
	net.setInput(img_tensor)
	out = net.forward()
	print(out[0][1])
	print(out.shape)
	```








