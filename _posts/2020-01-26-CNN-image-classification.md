---
date: 2020-01-26 21:19:50+08:00
layout: post
title: CNN图像分类
categories: 技术随笔
tags: 图像处理
---

卷积神经网络（Convolutional Neural Networks, CNN）是深度学习的常见算法，具有强大的特征提取功能，不需要做特征工程工作就可以运用到图像分类这类操作中。

本文主要讲一下用CNN做图像分类的一些较为简单的实践。

这类操作主要是基于一个预先训练好的模型进行微调和重训练。

1. 在线服务

	微软的[Azure Custom Vision](/azure-custom-vision/)提供用户自行训练图像分类模型的功能，只需上传图片并标上分类即可，能够提供多种格式的模型。百度、谷歌等公司也有类似的服务。
	
2. Tensorflow提供的图像分类工具

	Tensorflow提供了一个能基于预训练模型进行重训练的脚本：<https://github.com/tensorflow/hub/blob/master/examples/image_retraining/retrain.py>，只需提供图像即可完成训练，不用写代码，预训练模型可以使用inception v3，或者准确率相对较低但运行更快的mobilenet。

	目前这个脚本已经有了针对tensorflow 2.0的更新版本：[make_image_classifier.py](https://github.com/tensorflow/hub/tree/master/tensorflow_hub/tools/make_image_classifier)

	通过以下命令即可完成在几分钟内完成训练：

	```
	$ make_image_classifier \
	  --image_dir my_image dir \
	  --tfhub_module https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4 \
	  --image_size 224 \
	  --saved_model_dir my_dir/new_model \
	  --labels_output_file class_labels.txt \
	  --tflite_output_file new_mobile_model.tflite
	```

	下面讲下参数。

	`--image_dir`，存放训练图像的目录，结构如下：

	```
	my image_dir
	|-- cat
	|   |-- a_feline_photo.jpg
	|   |-- another_cat_pic.jpg
	|   `-- ...
	|-- dog
	|   |-- PuppyInBasket.JPG
	|   |-- walking_the_dog.jpeg
	|   `-- ...
	`-- rabbit
		|-- IMG87654321.JPG
		|-- my_fluffy_rabbit.JPEG
		`-- ...
	```

	`--tfhub_module`，指定使用的预训练模型，可以在[tfhub](https://tfhub.dev/s?module-type=image-feature-vector&q=tf2)上搜索到可以用的各种模型。
		
	`--image_size`，图像会被缩放以满足模型的输入要求。

	`--saved_model_dir`，将模型保存为Tensorflow Savedmodel格式，可以用于Tensorflow Serving服务器。

	`--tflite_output_file`，将模型保存为Tensorflow Lite格式。

	我用它训练了一个文字图像识别器，主要有两个类别：文字图像、非文字图像。因为有的文字图像并不是规则的正方形，还需要进行适当的裁剪。

	下面是调用生成的Tensorflow Lite模型进行识别的Python脚本。

	```
	"""label_image for tflite."""

	from __future__ import absolute_import
	from __future__ import division
	from __future__ import print_function
	import cv2
	import argparse
	import numpy as np
	import tensorflow as tf # TF2

	def imgData(filename,new_size):
		image = cv2.imread(filename)
		h=image.shape[0]
		w=image.shape[1]
		centerX=int(w/2)
		centerY=int(h/2)
		if h/w>1.5:
			image=image[int(centerY-w/2):int(centerY+w/2)]
		if w/h>1.5:
			image=image[:,int(centerX-h/2):int(centerX+h/2)]
		data=cv2.resize(image, new_size, interpolation = cv2.INTER_LINEAR)
		input_data=data[np.newaxis,:,:,:]
		return input_data

	def load_labels(filename):
		with open(filename, 'r') as f:
			return [line.strip() for line in f.readlines()]

	if __name__ == '__main__':
		parser = argparse.ArgumentParser()
		parser.add_argument(
				'-i',
				'--image',
				default='/tmp/grace_hopper.bmp',
				help='image to be classified')
		parser.add_argument(
				'-m',
				'--model_file',
				default='/tmp/mobilenet_v1_1.0_224_quant.tflite',
				help='.tflite model to be executed')
		parser.add_argument(
				'-l',
				'--label_file',
				default='/tmp/labels.txt',
				help='name of file containing labels')
		parser.add_argument(
				'--input_mean',
				default=127.5, type=float,
				help='input_mean')
		parser.add_argument(
				'--input_std',
				default=127.5, type=float,
				help='input standard deviation')
		args = parser.parse_args()

		interpreter = tf.lite.Interpreter(model_path=args.model_file)
		interpreter.allocate_tensors()

		input_details = interpreter.get_input_details()
		output_details = interpreter.get_output_details()

		# check the type of the input tensor
		floating_model = input_details[0]['dtype'] == np.float32

		# NxHxWxC, H:1, W:2
		height = input_details[0]['shape'][1]
		width = input_details[0]['shape'][2]
		new_size = (height, width)
		input_data=imgData(args.image,new_size)
		if floating_model:
			input_data = (np.float32(input_data) - args.input_mean) / args.input_std

		interpreter.set_tensor(input_details[0]['index'], input_data)

		interpreter.invoke()

		output_data = interpreter.get_tensor(output_details[0]['index'])
		results = np.squeeze(output_data)

		top_k = results.argsort()[-5:][::-1]
		labels = load_labels(args.label_file)
		for i in top_k:
			if floating_model:
				print('{:08.6f}: {}'.format(float(results[i]), labels[i]))
			else:
				print('{:08.6f}: {}'.format(float(results[i] / 255.0), labels[i]))
	```

	用法：

	```
	python label_image.py \
	  --input_mean 0 --input_std 255 \
	  --model_file new_mobile_model.tflite --label_file class_labels.txt \
	  --image my_image_dir/cat/a_feline_photo.jpg 
	```

### 其它

我写的基于bottle的服务器脚本：<https://github.com/xulihang/text-image-classifier>

训练好的文字图像识别模型：<https://pan.baidu.com/s/1AqWvsFIPnr4KVGuAAsnsYA>

