---
date: 2018-11-01 11:27:50+08:00
layout: post
title: java操作Word
categories: 技术随笔
tags: java
---

java操作微软的Office文档主要有两个类库，一个是[Apache POI](http://poi.apache.org/)，另一个是[docx4j](https://www.docx4java.org/)。POI对excel的支持较好，而docx4j从名字上就看得出，对Word的支持好。

docx4j使用JAXB将xml转换为java中的类，而apache poi使用的xml-beans。docx4j也利用了POI来支持doc、xls、ppt等旧版二进制格式。

docx4j提供了[在线工具](http://webapp.docx4java.org/)来解析Word格式，我们可以用它来了解docx文件的内部结构，这在使用docx来操作文档时很重要，我们要先了解有哪些元素，元素是怎么组合起来的，才能修改docx文件。

不过，只是为了达成某些操作，我们可以不用太深入地了解这些。比如要实现创建一个带表格的word，可以用以下代码调用POI库来实现：

```java
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFTable;
import org.apache.poi.xwpf.usermodel.XWPFTableRow;

public class Test {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
        XWPFDocument document= new XWPFDocument(); 
		   //Write the Document in file system
		XWPFTable table = document.createTable();
		//create first row
	    XWPFTableRow tableRowOne = table.getRow(0);
	    tableRowOne.getCell(0).setText("col one, row one");
	    tableRowOne.addNewTableCell().setText("col two, row one");
			
	    //create second row
	    XWPFTableRow tableRowTwo = table.createRow();
	    tableRowTwo.getCell(0).setText("col one, row two");
	    tableRowTwo.getCell(1).setText("col two, row two");

	    //create third row
	    XWPFTableRow tableRowThree = table.createRow();
	    tableRowThree.getCell(0).setText("col one, row three");
	    tableRowThree.getCell(1).setText("col two, row three");
	    
	    table.setWidth("100%");
		FileOutputStream out = new FileOutputStream(new File("D:\\createdocument.docx"));
		document.write(out);
        out.close();
		document.close();
		System.out.println("createdocument.docx written successully");
         
	}

}
```

创建后，再进行读取操作：

```java
public class Read {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		InputStream is= new FileInputStream(new File("D:\\createdocument.docx"));
		XWPFDocument document= new XWPFDocument(is); 

		XWPFTable table = document.getTables().get(0);

        for (XWPFTableRow row:table.getRows()){
        	System.out.println(row.getCell(0).getText());
        	System.out.println(row.getCell(1).getText());
        }
		document.close();
	}
}
```

以上主要是为了实现BasicCAR将片段导出到Word里供外部审校使用。

相关教程：

[Apache POI Word Tutorial](https://www.tutorialspoint.com/apache_poi_word/apache_poi_word_tables.htm)
