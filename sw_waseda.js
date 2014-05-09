// convert from sw_waseda_amd.js for running by node.js
// define(['toc'],function(toc) {
    var swjuanstart=[1,49,87,131,191,241,305,369,420,465,521,590,650,709,761,878];
    var swblankpage=[];
	var pageid2juan=function(pg) {
	   for (var i=0;i<swjuanstart.length;i++) {
	   	   if (pg<swjuanstart[i]) break;
	   }
	   return i;
	}
	var getblankpage=function(pg) {
	   for (var i=0;i<swblankpage.length;i++) {
	   	   if (pg<swblankpage[i]) break;
	   }
	   return i;
	}
	var digits=function(i,n){
		n=n||4, i=i.toString()
		return '0000000000'.substr(0,n-i.length)+i
	}
	var sw_waseda_imgsrc=function(pageid) {
		var page, subpage, juan, offset, fn
		page=pageid.split('-'), subpage=page[1], page=page[0]
		juan=pageid2juan(page);
		offset=Math.floor((page-swjuanstart[juan-1]) *2) + 3;
		if (juan=== 1) offset+=10;
		if (juan=== 8) offset+= 1; //原影像檔多一頁
		if (juan=== 6) offset-= 1; //原影像檔少一頁
		if (subpage==1 || subpage==2 ) offset+=1;
		if (subpage==3) offset+=2;
		switch(juan) { //修正萬卷樓多餘空白頁
			case  1: if (page> 21) { offset--; break }
			case  3: if (page>107) { offset--; break }
			case  4: if (page>159) { offset--; break }
			case  5: if (page>217) { offset--; break }
			case  7: if (page>338) { offset--; break }
			case  8: if (page>405) { offset--; break }
			case 11: if (page>572) { offset--; break }
		}
		if (!offset) {
			return "";
		}
		// var fn="http://archive.wul.waseda.ac.jp/kosho/ho04/ho04_00026/ho04_00026_"+toc.pad(juan,4) +'/ho04_00026_'+toc.pad(juan,4)+"_p"+toc.pad(offset+1,4)+".jpg";
		// var fn='file:///e:/ksana101/img/swjz/waseda/ho04_00026_'+toc.pad(juan,4)+'/-'+toc.pad(offset,3)+'.jpg';  //local
		fn="http://archive.wul.waseda.ac.jp/kosho/ho04/ho04_00026/ho04_00026_"+digits(juan)+"/ho04_00026_"+digits(juan)+"_p"+digits(offset+1)+".jpg"
		return fn;
	}
	module.exports = sw_waseda_imgsrc;
	// return sw_waseda_imgsrc;  // return waseda image src from wan juan luo pageid
// });