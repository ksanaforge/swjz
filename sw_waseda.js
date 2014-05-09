define(['toc'],function(toc) {
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
	var sw_waseda_imgsrc=function(pageid) {
		var subpage=toc.getsubpage(pageid);
		var juan=pageid2juan(subpage.page);
		var offset=Math.floor((subpage.page-swjuanstart[juan-1]) *2) + 3;
		if (juan===1) offset+=10;
		if (juan===8) offset+=1;//原影像檔多一頁
		if (juan===6) offset-=1;  //原影像檔少一頁
		if (subpage.subpage==1 || subpage.subpage==2 ) offset+=1;
		if (subpage.subpage==3) offset+=2;
		
		switch(juan) { //修正萬卷樓多餘空白頁
			case 1: if (subpage.page>21) offset--;
			case 3: if (subpage.page>107) offset--;
			case 4: if (subpage.page>159) offset--;
			case 5: if (subpage.page>217) offset--;
			case 7: if (subpage.page>338) offset--;
			case 8: if (subpage.page>405) offset--;
			case 11: if (subpage.page>572) offset--;
		}
		if (!offset) {
			return "";
		}
		//var fn="http://archive.wul.waseda.ac.jp/kosho/ho04/ho04_00026/ho04_00026_"+toc.pad(juan,4) +'/ho04_00026_'+toc.pad(juan,4)+"_p"+toc.pad(offset+1,4)+".jpg";
		var fn='file:///e:/ksana101/img/swjz/waseda/ho04_00026_'+toc.pad(juan,4)+'/-'+toc.pad(offset,3)+'.jpg';  //local
		return fn;
	}
	return sw_waseda_imgsrc;  // return waseda image src from wan juan luo pageid
});