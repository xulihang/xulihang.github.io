---
date: 2019-11-11 09:34:50+08:00
layout: post
title: SQLite全文检索
categories: 技术随笔
tags: 
---

现在主流的数据库都提供了全文检索功能，比如PostgreSQL、Sql Server等。

SQLite也有全文检索模块FTS，最新版本是FTS5，不过本文主要讨论FTS3/4。FTS3于2007年加入SQLite，FTS4是2010年加入的对FTS3的加强。

全文检索因为使用了索引，可以大大提高数据检索速度。下面是官方文档中给出的示例：

```
CREATE VIRTUAL TABLE enrondata1 USING fts3(content TEXT);     /* FTS3 table */
CREATE TABLE enrondata2(content TEXT);                        /* Ordinary table */
```

```
SELECT count(*) FROM enrondata1 WHERE content MATCH 'linux';  /* 0.03 seconds */
SELECT count(*) FROM enrondata2 WHERE content LIKE '%linux%'; /* 22.5 seconds */
```

## 操作

### 建立索引表

建立一个使用fts4进行索引的虚拟表，包含key、source和target三列内容，key列不进行索引。

```
CREATE VIRTUAL TABLE IF NOT EXISTS idx USING fts4(key, source, target, notindexed=key)
```

从文本中抽取词语需要使用分词器(Tokenizer)，默认使用simple分词方法，其它还有porter、unicode61和icu，需要在建表的时候指定：

```
CREATE VIRTUAL TABLE porter USING fts3(tokenize=porter);
```

simple方法会将文本全部小写，并利用标点和空格进行分词。比如"Right now, they're very frustrated."的分词结果是"right now they re very frustrated"。

而porter分词是一种去除词尾获得词干的方法，上面的句子使用porter分词的结果是"right now thei veri frustrat"，这样可以使用英语词的不同屈折变化进行检索，比如frustrated和frustration使用porter后的都是frustrat，都可以检索到该条内容。

对于中文、日语和藏语这样词汇间没有空格的语言，可以使用icu分词，但一般的SQLite编译版本都没有包含这一分词器。

### 增删与更新

```
INSERT INTO idx VALUES('I am Tony!', 'I am Tony', '我 是 托 尼')) '插入
DELETE FROM idx '删除整张表的内容
DROP TABLE data '删除整张表
UPDATE idx SET key = 'Download SQLite' WHERE rowid = 54 '根据rowid进行更新
```

### 查询

使用FTS的表可以使用MATCH进行全文检索，并且有rowid这一主键。下面是对各种查询语句的速度的一个比较：

```
-- The examples in this block assume the following FTS table:
CREATE VIRTUAL TABLE mail USING fts3(subject, body);

SELECT * FROM mail WHERE rowid = 15;                -- Fast. Rowid lookup.
SELECT * FROM mail WHERE body MATCH 'sqlite';       -- Fast. Full-text query.
SELECT * FROM mail WHERE mail MATCH 'search';       -- Fast. Full-text query.
SELECT * FROM mail WHERE rowid BETWEEN 15 AND 20;   -- Fast. Rowid lookup.
SELECT * FROM mail WHERE subject = 'database';      -- Slow. Linear scan.
SELECT * FROM mail WHERE subject MATCH 'database';  -- Fast. Full-text query.
```

WHERE和MATCH之间可以是表的名字，也可以是列的名字。如果要获得列号，可以使用rowid这一隐藏的列的名字。

```
SELECT key, rowid FROM idx WHERE source MATCH 'text'
```

可以用通配符修饰查询的文本，比如`lin*`匹配以lin开头的词，`^lin*`表示第一个词的开头是lin的内容。

可以使用双引号进行短语查询，用NEAR/间隔字数限制两个词之间相隔的词数：

```
SELECT * FROM docs WHERE docs MATCH 'database NEAR/2 "ACID compliant"';
```

可以使用三个操作符：AND、OR、NOT

```
SELECT docid FROM docs WHERE docs MATCH '("sqlite database" OR "sqlite library") AND linux';
```

有三个辅助函数：Snippet, Offsets and Matchinfo。

offsets函数可以显示匹配到的词在第几列，在文本中的偏移量。snippet可以高亮匹配到的词。matchinfo提供详细的匹配信息，比如有多少词被匹配。具体用法见文档。

### 组合示例

根据匹配度排序，取前1000个条目：

```
SELECT key, rowid, quote(matchinfo(idx)) as rank FROM idx WHERE source MATCH 'text' ORDER BY rank DESC LIMIT 1000 OFFSET 0
```

## 和普通模式的比较

普通的表可以设置主键，相同主键的内容不能添加两次。而FTS模式可以重复添加内容。

建立索引过程耗费内容，而且数据会占用更多空间。

## 关于中文索引

在没有icu分词的情况下对中文索引的一个折中办法就是事先对中文进行分词，然后导入数据库。可以建两列内容，一列是中文分词结果，一列是中文原文，只对中文分词结果进行索引。另外，检索文本也需要进行分词。


参考文献：

* [SQLite FTS3 and FTS4 Extensions](https://sqlite.org/fts3.html)
* [sqlite get ROWID](https://stackoverflow.com/questions/15570096/sqlite-get-rowid/15570794)
* [SQLite FTS3/FTS4与一些使用心得 ](https://www.cnblogs.com/zyfd/p/9803303.html)
* [sqlite3 FTS全文索引按照相关性排序](https://www.cnblogs.com/alpiny/p/11291703.html)
* [Full Text Search (FTS) as it Applies to SQLite](https://www.b4x.com/android/forum/threads/full-text-search-fts-as-it-applies-to-sqlite.73578/#content)




