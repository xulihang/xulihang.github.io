---
date: 2018-12-04 10:08:50+08:00
layout: post
title: x86版树莓派，功耗仅4w的mini主机
categories: 电子数码
tags: 
---

我一直关注着基于x86架构的低功耗主机，偶然淘宝给我推送了wintel box w8 pro。这是intel atom x5-z8350 CPU，cherry trail架构的一台主机，2GB内存，32GB emmc，realtek 8723bs无线网卡，重量200多克，长宽不到10厘米，平时运行的功耗只有4w。

而相比于我之前买的[intel compute stick](http://blog.xulihang.me/intel-compute-stick-full-pc-on-the-go/)，它的好处在于更加丰富的接口和64位系统的支持。它提供1个USB2.0，1个USB3.0口，microsd插槽，还有有线端口，hdmi接口和音频接口。这样平时就不用再接一个USB HUB。

和树莓派相比，性能更好，而且能运行x86的windows程序。不过没有树莓派那么丰富的拓展，而且如果装linux，驱动目前并不好找。

以下是在linux下输出的相关配置信息。

```
xulihang@debian:~$ uname -a
Linux debian 4.12.0-041200rc1-generic #201705131731 SMP Sat May 13 21:32:36 UTC 2017 x86_64 GNU/Linux
xulihang@debian:~$ lspci
00:00.0 Host bridge: Intel Corporation Atom/Celeron/Pentium Processor x5-E8000/J3xxx/N3xxx Series SoC Transaction Register (rev 36)
00:02.0 VGA compatible controller: Intel Corporation Atom/Celeron/Pentium Processor x5-E8000/J3xxx/N3xxx Series PCI Configuration Registers (rev 36)
00:03.0 Multimedia controller: Intel Corporation Atom/Celeron/Pentium Processor x5-E8000/J3xxx/N3xxx Series Imaging Unit (rev 36)
00:0b.0 Signal processing controller: Intel Corporation Atom/Celeron/Pentium Processor x5-E8000/J3xxx/N3xxx Series Power Management Controller (rev 36)
00:14.0 USB controller: Intel Corporation Atom/Celeron/Pentium Processor x5-E8000/J3xxx/N3xxx Series USB xHCI Controller (rev 36)
00:1a.0 Encryption controller: Intel Corporation Atom/Celeron/Pentium Processor x5-E8000/J3xxx/N3xxx Series Trusted Execution Engine (rev 36)
00:1f.0 ISA bridge: Intel Corporation Atom/Celeron/Pentium Processor x5-E8000/J3xxx/N3xxx Series PCU (rev 36)
xulihang@debian:~$ lsusb
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 001 Device 005: ID 1d57:fa20 Xenta 
Bus 001 Device 004: ID 1a40:0101 Terminus Technology Inc. Hub
Bus 001 Device 003: ID 0bda:8152 Realtek Semiconductor Corp. 
Bus 001 Device 002: ID 0bda:8179 Realtek Semiconductor Corp. RTL8188EUS 802.11n Wireless Network Adapter
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
xulihang@debian:~$ cat /proc/cpuinfo
processor	: 0
vendor_id	: GenuineIntel
cpu family	: 6
model		: 76
model name	: Intel(R) Atom(TM) x5-Z8350  CPU @ 1.44GHz
stepping	: 4
microcode	: 0x40a
cpu MHz		: 1482.890
cache size	: 1024 KB
physical id	: 0
siblings	: 4
core id		: 0
cpu cores	: 4
apicid		: 0
initial apicid	: 0
fpu		: yes
fpu_exception	: yes
cpuid level	: 11
wp		: yes
flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx rdtscp lm constant_tsc arch_perfmon pebs bts rep_good nopl xtopology tsc_reliable nonstop_tsc cpuid aperfmperf tsc_known_freq pni pclmulqdq dtes64 monitor ds_cpl vmx est tm2 ssse3 cx16 xtpr pdcm sse4_1 sse4_2 movbe popcnt tsc_deadline_timer aes rdrand lahf_lm 3dnowprefetch epb tpr_shadow vnmi flexpriority ept vpid tsc_adjust smep erms dtherm ida arat
bugs		:
bogomips	: 2880.00
clflush size	: 64
cache_alignment	: 64
address sizes	: 36 bits physical, 48 bits virtual
power management:
……
```

z8350集成了一系列驱动，稳定版的linux内核不够新，还不能很好地支持。我参考[这里](https://github.com/mopplayer/lattepanda-mainline-4.11)下载了ubuntu的内核，装上后可以驱动声卡。不过耳机孔没有声音，hdmi输入正常。平时hdmi转vga外接显示器，转接器要带音频输出，这样才能外接音频设备使用。

但是无线网卡还是没有驱动，最新的linux内核已经将rtl8723bs的驱动放在staging里了，只是我用的debian9还没有采用。我测试安装sid版debian的内核是可以驱动无线的，但在debian9上还不稳定。

