---
date: 2017-11-08 22:00:50+08:00
layout: post
title: 批量下载m3u8的ts文件
categories: 技术随笔
tags: 
---

目标是下载欧洲委员会的翻译论坛的视频：https://webcast.ec.europa.eu/translating-europe-forum-2017-07-nov-2017

可以知道播放的视频文件是以m3u8索引的。网上有m3u8 downloader，但是使用ffmpeg命令下载，下载速度较慢。于是我考虑直接批量下载ts流文件。测试可以用idm的批量下载功能进行下载。

另外我想用我的linux vps进行下载，于是网上搜索了一下，发现一个用shell脚本调用wget进行批量下载的文章。但复制下来运行失败，我不懂shell，于是转用python。

python使用os.system不是很好控制wget，于是转用python wget模块。提示SSL Certificates错误，需要pip install certif。


具体代码其实很简单：

```
#!/usr/bin/env python
import wget
count=0
while count<5: #count的值表示总共要下多少ts文件，要查阅m3u8文件
    try:
        result=wget.download("https://stream.scic.ec.europa.eu/vod/_definst_/smil:11066_12470_5a01687c2dbff.smil/media_w442363958_b466000_"+str(count)+".ts?tracks=or&clientip=218.247.220.230&smvplayersession=80c4681f-acac-4906-5611-52d0af6818f0")
        count=count+1
    except:
        continue
        
    
```

更新：下载最好还是要有一个队列。我现在改用B4J来进行批量下载，使用最新增加的wait for语句，并且记录下下载失败的文件。

下载下来的TS文件需要合并，网上有ts merger这个软件。其实ts文件直接用windows copy命令就可以合并了。不过事先要处理一下文件名，让它按播放顺序排列。主要是要把0.ts这样的补全为0000.ts这样的名字。我这次下载的ts文件总共有2946个。

重命名：

```
#!/usr/bin/env python
import os
filelist=os.listdir("./")
for file in filelist:
    orgName=file
    file=file.split("_")
    if len(file[3])<7:
        for i in range(7-len(file[3])):
            file[3]="0"+file[3]
        print(file)
        filename="_".join(file)
        print(filename)
        os.rename(orgName,filename)
    else:
        pass
```

或者使用linux的rename命令，具体见此:<http://blog.xulihang.me/notes-of-linux-commands/>

合并：

```
copy /b *.ts E:\new.ts
```

在linux下可以用cat命令：

```
cat *.ts>out.ts
```

## 2026年更新

因为直接在浏览器里下载比较方便，不会被限制。我选择在浏览器控制台用JavaScript下载m3u8的ts文件。然后合并，再用ffmpeg转为mp4。

下载文件的JavaScript：

```js
/**
 * 在浏览器控制台运行，下载 m3u8 中的所有 ts 文件
 * 使用方法：
 * 1. 打开包含目标视频的页面（确保同源，或已处理CORS）
 * 2. 将本代码复制到控制台，按需修改 m3u8Url 变量
 * 3. 回车执行
 */
(async function downloadM3U8TsFiles() {
    // ========== 配置区域 ==========
    const m3u8Url = 'https://cdn3.jiuse3.cloud/hls/334613/index.m3u8?t=1792152693&m=0pH5KBg4vo5C1moklPGAXA'; // 替换为你的 m3u8 地址
    const downloadDelay = 300;      // 每个文件下载间隔(毫秒)，防止浏览器拦截
    const maxConcurrent = 1;        // 同时下载数，建议 1~3
    const renamePrefix = '';        // 重命名前缀，如 'video_'，留空则保持原文件名
    // ==============================

    // 解析 m3u8 内容
    async function fetchM3U8(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`获取 m3u8 失败: ${response.status}`);
        return await response.text();
    }

    // 从 m3u8 文本中提取 ts 文件名（或完整URL）
    function parseTsFiles(m3u8Text, baseUrl) {
        const lines = m3u8Text.split(/\r?\n/);
        const tsFiles = [];
        const base = new URL(baseUrl);

        for (let line of lines) {
            line = line.trim();
            if (!line || line.startsWith('#')) continue; // 跳过注释和空行
            // 如果是相对路径，拼接成绝对URL
            if (!/^https?:\/\//i.test(line)) {
                // 处理相对路径（如 index0.ts）
                const absoluteUrl = new URL(line, base).href;
                tsFiles.push(absoluteUrl);
            } else {
                tsFiles.push(line);
            }
        }
        return tsFiles;
    }

    // 从 URL 中提取文件名
    function getFileNameFromUrl(url) {
        try {
            const pathname = new URL(url).pathname;
            const parts = pathname.split('/');
            let fileName = parts.pop() || 'video.ts';
            // 如果文件名没有 .ts 后缀，补上
            if (!fileName.endsWith('.ts')) fileName += '.ts';
            return fileName;
        } catch {
            return 'video.ts';
        }
    }

    // 下载单个文件
    async function downloadFile(url, index) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = blobUrl;
            let fileName = getFileNameFromUrl(url);
            if (renamePrefix) fileName = renamePrefix + fileName;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // 释放 blob URL
            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
            console.log(`[${index + 1}] 下载完成: ${fileName}`);
        } catch (err) {
            console.error(`[${index + 1}] 下载失败: ${url}`, err);
        }
    }

    // 主流程
    try {
        console.log('正在获取 m3u8 文件...');
        const m3u8Text = await fetchM3U8(m3u8Url);
        console.log('m3u8 内容获取成功，正在解析 ts 列表...');

        const tsUrls = parseTsFiles(m3u8Text, m3u8Url);
        if (tsUrls.length === 0) {
            console.warn('未找到任何 ts 文件，请检查 m3u8 内容。');
            return;
        }
        console.log(`共找到 ${tsUrls.length} 个 ts 文件，开始下载...`);

        // 控制并发下载
        const queue = [...tsUrls.entries()]; // [index, url]
        const workers = Array(Math.min(maxConcurrent, queue.length))
            .fill(null)
            .map(async () => {
                while (queue.length > 0) {
                    const [index, url] = queue.shift();
                    await downloadFile(url, index);
                    // 每个文件下载后延迟，避免浏览器拦截
                    await new Promise(resolve => setTimeout(resolve, downloadDelay));
                }
            });

        await Promise.all(workers);
        console.log('所有 ts 文件下载任务已完成。');
    } catch (err) {
        console.error('执行出错:', err);
    }
})();
```

合并：

```py
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
合并 MPEG-TS 分片文件为一个完整的 .ts 文件。

用法:
    python merge_ts.py                      # 合并当前目录 index*.ts -> merged.ts
    python merge_ts.py -o out.ts            # 指定输出文件名
    python merge_ts.py -d D:\\hls -o D:\\out.ts   # 指定输入目录
    python merge_ts.py a001.ts a002.ts ...  # 显式指定要合并的文件（按给定顺序）

特性:
    - 按文件名中的数字自然排序（index2 在 index10 之前）
    - 校验每个分片是否为 188 字节的整数倍（TS 包大小），不一致会警告
    - 流式拷贝，内存占用低，支持大文件
    - 校验文件头同步字节 0x47，可选剥离 ID3 头
"""
import argparse
import os
import re
import sys

TS_PACKET = 188
ID3_MAGIC = b"ID3"


def natural_key(name: str):
    """把文件名按其中出现的数字分段，实现自然排序。"""
    base = os.path.basename(name)
    parts = re.split(r"(\d+)", base)
    return [int(p) if p.isdigit() else p.lower() for p in parts]


def find_parts(directory: str):
    files = [
        os.path.join(directory, f)
        for f in os.listdir(directory)
        if f.lower().endswith(".ts") and os.path.isfile(os.path.join(directory, f))
    ]
    # 排除输出文件本身
    files = [f for f in files if not os.path.basename(f).startswith("merged")]
    return sorted(files, key=natural_key)


def copy_ts(src: str, dst, strip_id3: bool, stats: dict):
    with open(src, "rb") as f:
        head = f.read(3)
        if head == ID3_MAGIC and strip_id3:
            # 跳过 ID3v2 头: 10 字节头 + syncsafe 长度
            f.seek(0)
            hdr = f.read(10)
            if len(hdr) < 10:
                return
            size = (
                (hdr[6] & 0x7F) << 21
                | (hdr[7] & 0x7F) << 14
                | (hdr[8] & 0x7F) << 7
                | (hdr[9] & 0x7F)
            )
            f.seek(10 + size)
            stats["id3_stripped"] += 1
        else:
            f.seek(0)

        first = f.read(1)
        if first and first[0] != 0x47:
            stats["bad_sync"].append(os.path.basename(src))
        f.seek(0 if not (head == ID3_MAGIC and strip_id3) else 10 + size)

        # 流式拷贝
        while True:
            chunk = f.read(1024 * 1024)
            if not chunk:
                break
            dst.write(chunk)


def main():
    ap = argparse.ArgumentParser(description="合并 MPEG-TS 分片文件")
    ap.add_argument("inputs", nargs="*", help="显式指定分片文件（按顺序）。留空则自动查找目录中的 *.ts")
    ap.add_argument("-d", "--dir", default=".", help="输入目录，默认当前目录")
    ap.add_argument("-o", "--output", default="merged.ts", help="输出文件名，默认 merged.ts")
    ap.add_argument("-s", "--sorted", action="store_true",
                    help="使用文件名自然排序（默认即开启，此参数保留兼容）")
    ap.add_argument("--keep-id3", action="store_true",
                    help="保留分片开头的 ID3 标签（默认会剥离，避免污染 TS 流）")
    args = ap.parse_args()

    if args.inputs:
        parts = args.inputs
        for p in parts:
            if not os.path.isfile(p):
                sys.exit(f"错误: 找不到文件 {p}")
    else:
        parts = find_parts(args.dir)
        if not parts:
            sys.exit(f"错误: 在 {os.path.abspath(args.dir)} 中未找到 .ts 文件")

    out_path = args.output
    if os.path.isdir(out_path):
        out_path = os.path.join(out_path, "merged.ts")
    if os.path.abspath(out_path) in [os.path.abspath(p) for p in parts]:
        sys.exit("错误: 输出文件与输入文件相同，请用 -o 指定其它文件名")

    strip_id3 = not args.keep_id3
    stats = {"id3_stripped": 0, "bad_sync": []}

    print(f"共 {len(parts)} 个分片 -> {out_path}")
    print("-" * 60)

    total_bytes = 0
    misaligned = []
    with open(out_path, "wb") as out:
        for i, p in enumerate(parts, 1):
            size = os.path.getsize(p)
            if size % TS_PACKET != 0:
                misaligned.append((os.path.basename(p), size))
            copy_ts(p, out, strip_id3, stats)
            total_bytes += size
            print(f"[{i:>3}/{len(parts)}] {os.path.basename(p):<20} {size:>12,} 字节")

    print("-" * 60)
    print(f"完成: {total_bytes:,} 字节 ({total_bytes / 1024 / 1024:.1f} MiB) -> {out_path}")

    if stats["id3_stripped"]:
        print(f"已剥离 {stats['id3_stripped']} 个分片开头的 ID3 标签")
    if stats["bad_sync"]:
        print(f"警告: 以下分片未以 0x47 同步字节开头（可能已损坏）: {', '.join(stats['bad_sync'])}")
    if misaligned:
        print(f"警告: 以下分片长度不是 {TS_PACKET} 的整数倍，可能导致播放器解码错位:")
        for name, size in misaligned:
            print(f"        {name} ({size} 字节, 余 {size % TS_PACKET})")


if __name__ == "__main__":
    main()
```

转换：

```
FF="C:/Users/xulih/Documents/GitHub/Silhouette/Objects/ffmpeg/ffmpeg.exe"
"$FF" -i merged.ts -c copy -bsf:a aac_adtstoasc -movflags +faststart merged.mp4
```




