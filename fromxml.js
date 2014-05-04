var sourcepath="../../swjzz/xml/"; // github.com/ksanaforge/swjzz
var targetpath="./duanzhu/";
var lstfile=sourcepath+"swjzz.lst";
var fs=require('fs');
var D=require('ksana-document');

var normalize={
	"形":/"形"/g,
	"者":/"者"/g,
	"即":/卽/g
}

var replaces=[
	[/<wh>/g,"【"],
	[/<\/wh>/g,"】"],
	[/<說文字頭>/g,"【"],
	[/<\/說文字頭>/g,"】"],
	[/<段玉裁注>/g,"﹝"],
	[/<\/段玉裁注>/g,"﹞"]

]


var processfile=function(fn) {
	var content=fs.readFileSync(fn,'utf8');

	content=content.replace(/\r\n/g,'\n');
	content=content.replace(/卽/g,"即");
	content=content.replace(/形/g,"形");
	content=content.replace(/者/g,"者");
	content=content.replace(/直/g,"直");
	content=content.replace(/既/g,"既");
	
  content=content.replace(/（.*?）/g,"");
	content=content.replace(/<wh>/g,"【")
	content=content.replace(/<\/wh>/g,"】")

	content=content.replace(/<說文字頭>/g,"【");
	content=content.replace(/<\/說文字頭>/g,"】");
	content=content.replace(/<段玉裁注>/g,"﹝");
	content=content.replace(/<\/段玉裁注>/g,"﹞");
	content=content.replace(/\n\n(【.+?】)\n/g,function(m,m1){
		return m1;
	});


	//remove punc
	content=content.replace(/[『』〔〕「」。，、！《》〈〉；：]/g,'');
	content=content.replace(/\[.*?\]/g,'');
	content=content.replace(/<pb(.*?)>/g,function(m,m1){return '['+m1+']'});

	var sep=/\[(.*?)\]/g   // page break tag
	content=content.replace(/<.*?>/g,'')
	var doc=D.xml.importXML(content,{template:'accelon',sep:sep});
	fn=fn.substring(fn.lastIndexOf('/'));
	var filename=targetpath+fn.substring(7);
	filename=filename.substring(0,filename.length-4)+'.kd';
	D.persistent.saveDocument(doc,filename);
	D.persistent.saveDocumentTags(doc,filename+'x');
}

var lst=fs.readFileSync(lstfile,'utf8').replace('\r\n','\n').split('\n');
var main=function() {
	for (var i=0;i<lst.length;i++){
		 processfile(sourcepath+lst[i]);
		 if (i>22) break;
	}
}
main();