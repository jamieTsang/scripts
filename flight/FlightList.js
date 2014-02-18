//(function($){
//	var initLayout = function() {
//	    $('#search_departdate').DatePicker({
//		    format:'Y-m-d',
//		    calendars: 2,
//		    date: $('#search_departdate').val(),
//		    current: $('#search_departdate').val(),
//		    starts: 1,
//		    //position: 'top',
//		    onChange: function(formated, dates){
//			    $('#search_departdate').val(formated);
//			    $('#search_departdate').DatePickerHide();
//			    //$('#search_arrivedate').DatePickerShow();
//		    }
//	    });
//	    $('#search_arrivedate').DatePicker({
//		    format:'Y-m-d',
//		    calendars: 2,
//		    date: $('#search_arrivedate').val(),
//		    current: $('#search_arrivedate').val(),
//		    starts: 1,
//		    //position: 'top',
//		    onChange: function(formated, dates){
//			    $('#search_arrivedate').val(formated);
//			    $('#search_arrivedate').DatePickerHide();
//		    }
//	    });
//	};
//	EYE.register(initLayout, 'init');
//})(jQuery);

$("#search_begincity").blur(function(){
  if($(this).val()==""){
    $(this).val("中文/拼音");
  }
});

$("#search_begincity").focus(function(){
  if($(this).val()=="中文/拼音"){
    $(this).val("");
  }
});
/*
$("#search_begincity").autocomplete('/Ajax.aspx?action=getcity', {
    dataType: "json",
    selectFirst: true,
    scroll: false,
    parse: function(data) {
		return $.map(data, function(row) {
			//alert(row.CName);
			return {
			    
				data: row,
				value: row.CName,
				result: row.CName + " (" + row.ShortName + ")"
			}
		});
	},
	formatItem: function(item) {
		return  item.CName + " (" + item.ShortName + ")";
	}
}).result(function(e, item) {
	$("#search_begincity").val(item.CName);
	$("#search_begincityh").val(item.Code);
	//$("#content").append("<p>selected " + format(item) + "</p>");
});
*/
$("#search_endcity").blur(function(){
  if($(this).val()==""){
    $(this).val("中文/拼音");
  }
});

$("#search_endcity").focus(function(){
  if($(this).val()=="中文/拼音"){
    $(this).val("");
  }
});
/*
$("#search_endcity").autocomplete('/Ajax.aspx?action=getcity', {
        dataType: "json",
        selectFirst: true,
        scroll: false,
        parse: function(data) {
		return $.map(data, function(row) {
			//alert(row.CName);
			return {
			    
				data: row,
				value: row.CName,
				result: row.CName + " (" + row.ShortName + ")"
			}
		});
	},
	formatItem: function(item) {
		return  item.CName + " (" + item.ShortName + ")";
	}
}).result(function(e, item) {
	$("#search_endcity").val(item.CName);
	$("#search_endcityh").val(item.Code);
	//$("#content").append("<p>selected " + format(item) + "</p>");
});*/

//list
/*查看更多 JavaScript Document */
function _g(id){return document.getElementById(id)};
function gL(x){var l=0;while(x){l+=x.offsetLeft;x=x.offsetParent;}return l};
function gT(x){var t=0;while(x){t+=x.offsetTop;x=x.offsetParent;}return t};
document.getElementsByClassName=function(tag,cName){var els= [];var myclass=new RegExp("\\b"+cName+"\\b");var elem=this.getElementsByTagName(tag);for(var h=0;h<elem.length;h++){if(myclass.test(elem[h].className))els.push(elem[h])}return els};
function xmlHttp(Url,xmlBack){	var xObj=null;try{xObj=new ActiveXObject("MSXML2.XMLHTTP")}catch(e){try{xObj=new ActiveXObject("Microsoft.XMLHTTP")}catch(e2){try{xObj=new XMLHttpRequest()}catch(e){}}};with(xObj){open("get",Url, true);onreadystatechange=function(){if(readyState==4&&status==200){xmlBack(responseText)}};send(null)}};
function jsLoad(_src,_back){var spt= document.createElement("script");spt.type = "text/javascript";spt.src=_src;document.body.appendChild(spt);spt.onload=spt.onreadystatechange=_back;}


var tabs,dplay;
function vsFlight(n,as){
    if($(as).html()=="显示全部舱位 ▼")
    {
        $(as).html('关闭更多舱位 ▲');
        $("tr[name^=tr"+n+"_]").show("fast", "swing");
    }
    else
    {
        $(as).html('显示全部舱位 ▼');
        $("tr[name^=tr"+n+"_]").hide("fast", "swing");
    }
}
/*查看更多 JavaScript Document  end*/


function showDiv(name){
		if(document.getElementById(name).style.display=="none")
			document.getElementById(name).style.display="block";
		else
			document.getElementById(name).style.display="none";
	}



<!--弹出提示信息-->
function showDisplayLayers(id){
    var v,top;
    var obj = document.getElementById(new String(id));
    if(obj.style.display == ""){
		v = "none";
    } else {
        v = "";
    }
    obj.style.display=v;
}
<!-- end-->

<!--国内机票往返程-->
function change_flightReturnSearchObject(flightReturnMode)
{
	if(flightReturnMode==1)
	{
	flightReturnSearchkey1.background="/Static/images/Common/i_datebg4.gif";
	flightReturnSearchkey2.background="/Static/images/Common/i_datebg3.gif";

	flightReturnSearch1.style.display="block";
	flightReturnSearch2.style.display="none";

	}
	if(flightReturnMode==2)
	{
	flightReturnSearchkey1.background="/Static/images/Common/i_datebg3.gif";
	flightReturnSearchkey2.background="/Static/images/Common/i_datebg4.gif";

	flightReturnSearch1.style.display="none";
	flightReturnSearch2.style.display="block";

	}

}
<!--国内机票往返程 end-->

function changeMode(flightReturnMode)
{
	if(flightReturnMode==1)
	{
	    var dt=$("#dt1");
	    if(dt!=undefined && dt!=null)
	        dt.show()
        $("#ddatrrdt").show();
        $("#ddatrrdd").show();
	    $("#dd1").show();

	}
	else
	{
	    var dt=$("#dt1");
	    if(dt!=undefined && dt!=null)
	        dt.hide()
	    $("#dd1").hide();
	}    
}