---
date: 2016-07-17 17:07:50+08:00
layout: post
title: UEFI+GPT环境下安装Windows+Linux+OS X
categories: 电子数码
tags: Linux
---
 
前[一篇文章](http://blog.xulihang.me/my-first-DIY-computer/)讲到了我DIY了一台机子，配置如下。

| 部件          | 名称                                | 价格   |
|---------------|-------------------------------------|--------|
| CPU           | i3 3245                             | ￥530  |
| Motherboard   | 技嘉 H61M-DS2                       | ￥109  |
| RAM           | ADATA 4GB 1600MHZ DDR3              | ￥115  |
| HDD           | ADATA 120GB SSD                     | ￥245  |
| Case          | 乔思伯C2                            | ￥145  |
| Power         | 先马刺客430 300瓦                   | ￥109  |
| CPU FAN       | 终极者雪蝠                          | ￥15   |
| Wireless Card | BCM4322+台式机用mini-PCI-E转PCI-E卡 | ￥77   |
|               | 总价                                | ￥1345 |

因为HD4000在单VGA口的H61主板下尝试驱动失败，我又买了一块铭影的HD6450,直接可以驱动。

我预想UEFI+GPT下，单硬盘装三系统，实践之后觉得还是很容易的。

步骤如下：

1、先安装Windows10，对整块硬盘进行分区，会自动生成EFI分区。

2、安装OS X。把clover的EFI文件夹放到EFI分区里。这里我按平时做启动u盘的思路把/EFI/Boot/Bootx64.efi换成了Clover的，但开机仍然运行windows。

3、最后装Ubuntu，安装时选择安装引导程序到整个硬盘（注意是安装引导），这样会安装GRUB2到EFI分区并把GRUB2设置为默认引导。

4、GRUB2会识别Windows的引导文件，但可能没有识别CLOVER。这里需要手动处理一下GRUB2的菜单文件。

打开/boot/grub/grub.cfg找到以下相似代码：

```
menuentry 'Windows Boot Manager (on /dev/sda2)' --class windows --class os $menuentry_id_option 'osprober-efi-FE6B-528A' {
	insmod part_gpt
	insmod fat
	set root='hd0,gpt2'
	if [ x$feature_platform_search_hint = xy ]; then
	  search --no-floppy --fs-uuid --set=root --hint-bios=hd0,gpt2 --hint-efi=hd0,gpt2 --hint-baremetal=ahci0,gpt2  FE6B-528A
	else
	  search --no-floppy --fs-uuid --set=root FE6B-528A
	fi
	chainloader /EFI/Microsoft/Boot/bootmgfw.efi
}
```
复制该段代码，把`chainloader /EFI/Microsoft/Boot/bootmgfw.efi`改为`chainloader /EFI/Boot/Bootx64.efi`(尝试直接引导CLOVERX64.efi失败)，把`menuentry 'Windows Boot Manager (on /dev/sda2)'` 改为`menuentry 'CLOVER'`。

这样，三系统的引导就完成了。

