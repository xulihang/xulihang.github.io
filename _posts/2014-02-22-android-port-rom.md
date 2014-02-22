---
date: 2014-02-22 13:30:17+00:00
layout: post
title: '[GUIDE]How to port roms simply' 
categories: Android
tags: 经验 分享 移植     
---

这本来是我用中文写的教程，现在用英语来写。中文版见[我的百度空间](http://hi.baidu.com/xulihanghai/item/ae2edd3f4bc0babc623aff63)

This guide is written in Chinese at first , and now, I try to write it in English. [Here is the Chinese Version](http://hi.baidu.com/xulihanghai/item/ae2edd3f4bc0babc623aff63)

Thanks to Suifeng(随风)'s guide, I can port LEWA, MIUI and other MT6589 Chips' ROMs to my ZTE U956. I just add some specific changes to his guide. 

This guide may suit andoird 4.x 's porting , especially MTK based devices' roms.

Some roms' download links:

Lewa:[ZTE V987's rom](http://bbs.lewaos.com/down_detail.php?id=1)

MIUI: [RedMi's rom](http://www.miui.com/getrom-82.html)

#Preparation

Download target rom,such as ZTE V987's Lewa ROM.

Download your device's rom,which can be flashed using recovery.

Extra these two zips.Target rom to LEWA directory, and your device's to U956, for example.

Some tools for windows: UltraEdit, Beyond Compare, android kitchen.

#Edit script

Open LEWA/META-IND/com/google/android/updater-script and do these:

##1.

Delete something like this,which makes sure that the rom can not be flashed to other device(If this does not exist,then go to the next):

assert(getprop("ro.product.device") == "v987_jb2" || getprop("ro.build.product") == "v987_jb2" || 
       getprop("ro.product.device") == "ztenj89_we_jb2" || getprop("ro.build.product") == "ztenj89_we_jb2" || 
       getprop("ro.product.device") == "v987" || getprop("ro.build.product") == "v987" || 
       getprop("ro.product.device") == "V987" || getprop("ro.build.product") == "V987" || 
       getprop("ro.product.device") == "P188F04" || getprop("ro.build.product") == "P188F04");
       
##2.

Delete something like this,which will flash recovery(If this does not exist,then go to the next):

assert(package_extract_file("recovery.img", "/tmp/recovery.img"),
write_raw_image("/tmp/recovery.img", "recovery"),
delete("/tmp/recovery.img"))

##3.

Sometimes,the partition table is different.It's more often if the two roms' devices are produced by diffenent companies.

The target rom's:

format("ext4", "EMMC", "/dev/block/mmcblk0p4", "0", "/system");
mount("ext4", "EMMC", "/dev/block/mmcblk0p4", "/system");

My device's rom's:

format("ext4", "EMMC", "/dev/block/mmcblk0p5", "0", "/system");
mount("ext4", "EMMC", "/dev/block/mmcblk0p5", "/system");


How to know your device's file system table? I know it by unpacking my device's recovery.img,and know it through etc/recovery.fstab.You can unpack it with bootimg.py or android kitchen.

##4.

Delete something like this,which will flash uboot(If this does not exist,then go to the next):

assert(package_extract_file("uboot.img", "/tmp/uboot.img"),
       write_raw_image("/tmp/uboot.img", "uboot"),
       delete("/tmp/uboot.img"));
       
#Replace and add some files

##1.Replace

Replace these (I think you can know these files' functions by their names. ):

Directories:

/system/lib/modules , /system/lib/hw, /system/lib/soundfx, /system/etc/firmware, /system/usr/keychars, /system/usr/keylayout

Files:

/system/lib/libcameracustom.so, /system/lib/libaudio*.so

##2. Add

Add the files your device rom has while the target rom doesn't using Beycond Compare.


#Modify /system/build.prop

You can change the device's name , the rom version and so on.

In my case , I found I must change `ril.telephony.mode=1` to `ril.telephony.mode=2`, or the radio doesn't work.


#Port boot.img

It is a key step and maybe is the most difficult step. Sometimes you just unpack the two boot.img and replace the target rom's kernel with your device rom's kernel. But sometimes you need to do something with ramdisk. Then, it's recommended that you should do these in linux.

#Final

Zip LEWA and flash it. If you port well, then it should boot.


#Some advice:

Beycond Compare is a excellent tool in windows. Use it properly and found the differences. There must be some diffences that cause your rom not bootable. My guide is not universal,but you are flexible and smart.

       



