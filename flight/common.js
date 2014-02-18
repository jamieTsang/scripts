/**
 * 用正则表达式将前后空格 用空字符串替代。
 * @return {去空字符串后的字符串}
 */
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, '');
}
/**
 * 用正则表达式将所有空格 用空字符串替代。
 * @return {去空字符串后的字符串}
 */
String.prototype.mm = function (){
	return this.replace(/\s/g, '');
}
/**
 * 把中文字符替换两个星号，可以用来计算中文字符串的长度。
 * @return 字符串长度
 */
String.prototype.len=function(){   
    return this.replace(/[^\x00-\xff]/g,"**").length;
}
/**
 * 判断是否日期格式
 * @return {Boolean} 符合日期格式返回<code>true</code>,否则返回<code>false</code>
 */
String.prototype.isDateString = function() {
	var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var iaDate = new Array(3);
	var year, month, day;
	if (this == undefined || this == null || this.trim() == "")
	{
		return false;
	}
	var reg = /^\d{4}-\d{2}-\d{2}$/;
	var sDateTemp = this.trim();
	var reTemp = reg.test(sDateTemp);
	if (!reTemp)
		return false;
	iaDate = this.toString().split("-");
	if (iaDate.length != 3)
		return false;
	if (iaDate[1].length > 2 || iaDate[2].length > 2)
		return false
	if (isNaN(iaDate[0]) || isNaN(iaDate[1]) || isNaN(iaDate[2]))
		return false
	year = parseFloat(iaDate[0])
	month = parseFloat(iaDate[1])
	day = parseFloat(iaDate[2])
	if (year < 1900 || year > 2100)
		return false
	if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
		iaMonthDays[1] = 29;
	if (month < 1 || month > 12)
		return false
	if (day < 1 || day > iaMonthDays[month - 1])
		return false
	return true
}
/**
 * 字符串日期转日期对象 2005-12-15 09:41:30或20070203
 * @return {Date} 日期对象
 */
String.prototype.parseDate = function(){
	if(this.length == 8){
		return new Date(Date.parse(this.substring(0,4) + '/' + this.substring(4,6) + '/' + this.substring(6,8)));	
	}else{
  		return new Date(Date.parse(this.replace(/-/g,"/")));
	}
}
/**
 * 是否有中文字符
 * @return {Boolean} 含有中文返回<code>true</code>
 */
String.prototype.hasChsChar = function(){
	return /[\u0100-\uffff]/.test(this);
}
/**
 * 是否为电子邮件
 * @return {Boolean} 是电子邮件格式返回<code>true</code>
 */
String.prototype.isEmail = function() {
	var reg = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
	return reg.test(this)
};
/**
 * 是否为手机号码
 * @return {Boolean} 是手机号码格式返回<code>true</code>
 */
String.prototype.isMobile = function() {
	var reg = /^(0?1[358]\d{9})$|^((0(10|2[1-3]|[3-9]\d{2}))?[1-9]\d{6,7})$/;
	return reg.test(this)
};
/**
 * 严格身份证校验(对于18位的身份证校验第18位的效性)
 * @return {Boolean} 如果通过校验返回<code>true</code>
 */
String.prototype.isIDCard = function() {
	var a = this.toLowerCase().match(/./g);
	if (this.match(/^\d{17}[\dx]$/i)) {
		var c = 0, d = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
		for (var f = 0; f < 17; f++)
			c += parseInt(a[f], 10) * d[f];
		if ("10x98765432".charAt(c % 11) != a[17]){
			return false;
		}
		return !!this.replace(/^\d{6}(\d{4})(\d{2})(\d{2}).+$/, "$1-$2-$3")
				.isDateString();
	}
	if (this.match(/^\d{15}$/))
		return !!this.replace(/^\d{6}(\d{2})(\d{2})(\d{2}).+$/,
				"19$1-$2-$3").isDateString();
	return false;
};
/**
 * 简单身份证校验(对于18位的身份证不校验第18位的效性)
 * @return {Boolean} 如果通过校验返回<code>true</code>
 */
String.prototype.isIDCardBySimple = function() {
	var a = this.toLowerCase().match(/./g);
	if (this.match(/^\d{17}[\dx]$/i)) {
		return !!this.replace(/^\d{6}(\d{4})(\d{2})(\d{2}).+$/, "$1-$2-$3")
				.isDateString();
	}
	if (this.match(/^\d{15}$/))
		return !!this.replace(/^\d{6}(\d{2})(\d{2})(\d{2}).+$/,
				"19$1-$2-$3").isDateString();
	return false;
};
/**
  *验证是否有效的中国身份证号码
  */
String.prototype.isValidChinaIDCard = function($certiNo,options) {
    if(this.length == 15){        
      if(!this.isValidDate("19"+this.substr(6,2),this.substr(8,2),this.substr(10,2),$certiNo,options)){return false;}      
     }else if(this.length == 18){     
       if (!this.isValidDate(this.substr(6,4),this.substr(10,2),this.substr(12,2),$certiNo,options)){return false;}   
     }else{   
       $certiNo.alert("输入的身份证号码必须为15位或者18位！", options);   
       return false;
    }
  
     if (this.length==18)   
     {   
      var a,b,c   
      if (!checkIsNumber(this.substr(0,17))){$certiNo.alert("身份证号码错误,前17位不能含有英文字母！", options);return false;}   
         a=parseInt(this.substr(0,1))*7+parseInt(this.substr(1,1))*9+parseInt(this.substr(2,1))*10;   
         a=a+parseInt(this.substr(3,1))*5+parseInt(this.substr(4,1))*8+parseInt(this.substr(5,1))*4;   
         a=a+parseInt(this.substr(6,1))*2+parseInt(this.substr(7,1))*1+parseInt(this.substr(8,1))*6;     
         a=a+parseInt(this.substr(9,1))*3+parseInt(this.substr(10,1))*7+parseInt(this.substr(11,1))*9;     
         a=a+parseInt(this.substr(12,1))*10+parseInt(this.substr(13,1))*5+parseInt(this.substr(14,1))*8;     
         a=a+parseInt(this.substr(15,1))*4+parseInt(this.substr(16,1))*2;   
         b=a%11;   
         if (b==2)   //最后一位为校验位   
         {   
           c=this.substr(17,1).toUpperCase();   //转为大写X   
         }   
         else   
        {   
          c=parseInt(this.substr(17,1));   
        }   
        switch(b)   
        {   
          case 0: if ( c!=1 ) {$certiNo.alert("身份证号码填写错误！", options);return false;}break;   
          case 1: if ( c!=0 ) {$certiNo.alert("身份证号码填写错误！", options);return false;}break;   
          case 2: if ( c!="X") {$certiNo.alert("身份证号码填写错误！", options);return false;}break;   
          case 3: if ( c!=9 ) {$certiNo.alert("身份证号码填写错误！", options);return false;}break;   
          case 4: if ( c!=8 ) {$certiNo.alert("身份证号码填写错误！", options);return false;}break;   
          case 5: if ( c!=7 ) {$certiNo.alert("身份证号码填写错误！", options);return false;}break;   
          case 6: if ( c!=6 ) {$certiNo.alert("身份证号码填写错误！", options);return false;}break;   
          case 7: if ( c!=5 ) {$certiNo.alert("身份证号码填写错误！", options);return false;}break;   
          case 8: if ( c!=4 ) {$certiNo.alert("身份证号码填写错误！", options);return false;}break;   
          case 9: if ( c!=3 ) {$certiNo.alert("身份证号码填写错误！", options);return false;}break;   
          case 10: if ( c!=2 ){$certiNo.alert("身份证号码填写错误！", options);return false;}   
       }   
      } else {//15位身份证号   
       if (!checkIsNumber(this)) {$certiNo.alert("身份证号码错误,前15位不能含有英文字母！", options);return false;}     
      }  
     return true;
};

String.prototype.isValidDate = function(iY, iM, iD,$certiNo,options) {
   if (iY>2200 || iY<1900 || !checkIsNumber(iY)){
            $certiNo.alert("证件号码,年度"+iY+"非法！", options);
            return false;
        }
   if (iM>12 || iM<=0 || !checkIsNumber(iM)){
            $certiNo.alert("证件号码,月份"+iM+"非法！", options);
            return false;
        }
   if (iD>31 || iD<=0 || !checkIsNumber(iD)){
            $certiNo.alert("证件号码,日期"+iD+"非法！", options);
            return false;
        }
  return true;
  };
/**
 * 据身份证号码获取性别和出生日期字符
 * @return {Array} 性别为M或F,日期格式字符串yyyy-MM-dd
 */
String.prototype.parseIdCard = function(){
	if(this.isIDCardBySimple()){
		if (this.length == 15){
			x = parseInt(this.charAt(14),10)%2?'M':'F';
			b = this.replace(/^\d{6}(\d{2})(\d{2})(\d{2}).+$/,"19$1-$2-$3");
		}else{
			x = parseInt(this.charAt(16),10)%2?'M':'F';
			b = this.replace(/^\d{6}(\d{4})(\d{2})(\d{2}).+$/,"$1-$2-$3");
		}
		return [x,b];
	}
	return null;
}
/**
 * 返回克隆的当前日期对象
 * @return {Date Object} 克隆的当前日期对象
 */
Date.prototype.clone = function () {
  return new Date(this.getTime());
}
/**
 * 当前日期对象与另一日期对象的值相比较
 * @param {Date} date1 当前日期对象
 * @param {Date} date2 另一日期对象
 * @return {Boolean} 两个日期值是否相等
 */
Date.prototype.equals = function(date){
	 return (this.valueOf()==date.valueOf());
};
/**
 * 在当前日期上增加(正)或减少(负)<code>days<code>天数
 * @param {int} days 要增加或减少的天数
 * @return {Date} 增加或减少天数后的日期对象
 */
Date.prototype.addDate = function(days) {
	return new Date(this.getFullYear(), this.getMonth(), this.getDate() + days);
};
/**
 * 将日期时间格式字符串转换为日期对象 * 
 * @param {String} dateStr 日期格式2009-11-10 
 * @param {String} timeStr 时间格式 0830或12:30
 * @return {Date} 日期对象
 */
function parseDateTime(dateStr, timeStr){
	// 如果不含:,则给时间加上:
	if(timeStr.indexOf(':') == -1){
		timeStr = 	timeStr.substring(0, 2) + ':' + timeStr.substring(2, 4);
	}
	var dateTimeStr = dateStr + ' ' + timeStr;
	// 将日期字符串转换为日期对象
	return dateTimeStr.parseDate();
}
/**
 * 计算两个日期对象间隔天数
 * 要求传入两个日期对象
 * @param {Date} date1 日期对象1
 * @param {Date} date2 日期对象2
 * @return {Float} 间隔天数
 */
function calcDays(date1, date2){
	var	days = (date1 .getTime() - date2.getTime())/(1000*60*60*24);
	return days;
}
/**
 * 计算两个日期对象间隔小时数
 * 要求传入两个日期时间对象
 * @param {Date} date1 日期对象1
 * @param {Date} date2 日期对象2
 * @return {Float} 间隔小时数
 */
function calcHours(dateTime1, dateTime2){
	var	hours = (dateTime1 .getTime() - dateTime2.getTime())/(1000*60*60);
	return hours;
}
/**
 * 简化版的evalJSON
 * @param {String} jsonStr json格式字符串
 * @return {JSON Object} json对象
 */
function evalJSON(jsonStr){
	if(jsonStr != '' && jsonStr != "null" && jsonStr != 'undefined'){
		return eval('(' + jsonStr + ')');
	}
	return null;
}
/**
 * 克隆json对象
 * @param {Object} jsonObj 需要克隆的对象
 * @return {Object} 克隆的对象
 */
function clone(jsonObj) {
	var buf;
	if (jsonObj instanceof Array) {
		buf = [];
		var i = jsonObj.length;
		while (i--) {
			buf[i] = clone(jsonObj[i]);
		}
		return buf;
	} else {
		if (jsonObj instanceof Object) {
			buf = {};
			for (var k in jsonObj) {
				buf[k] = clone(jsonObj[k]);
			}
			return buf;
		} else {
			return jsonObj;
		}
	}
}
function mouseMove(ev) {
	ev = ev || window.event;
	var mousePos = mouseCoords(ev);
	var obj = document.getElementById("mydiv");
	x = mousePos.x;
	y = mousePos.y;
	obj.style.left = x + "px";
	obj.style.top = y + "px";
	obj.style.display = "";
}
function mouseCoords(ev) {
	if (ev.pageX || ev.pageY) {
		return {
			x : ev.pageX,
			y : ev.pageY
		};
	}
	return {
		x : ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y : ev.clientY + document.body.scrollTop - document.body.clientTop
	};
}

function strLength(str, len) {
    return strLength(str,0,len);
}
function strLength(str, begin,end) {
    return str.substring(begin,end);
}

function checkNum(input) {
    var re = /^[0-9]*$/;   //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/  

    if (!re.test(input)) {        
        return false;
    }
    return true;
}

/**
 * 判断是不是有效的数字（检查证件号码，密码用）
 */
function checkIsNumber(str){
   //正则表达式
    var pattern = /[^0-9\s]/g;
    if(pattern.test(str)) {
    	return false;
    }
   	return true;
}
function checkIsLetter(str){
   //正则表达式
    var pattern = /[^a-zA-Z\s]/g;
    if(pattern.test(str)) {
    	return false;
    }
   	return true;
}
function checkEnglishName(str){ //wangzhe 2007-12-6 for td 3911
    var pattern = /[a-zA-Z\s]*/g;
    if(pattern.test(str)) {
    	return true;
    }else{
   	    return false;
   	}
}
// 判断是否整个字符串都是中文
function checkChinese(str){
     var reg=/^[\u0391-\uFFE5]+$/;    
     if(!reg.test(str)){    
         return false;
     }
	 //判断字符串中有无包含全角字符
     for(var i=0; i<str.length; i++){ 
       var c = str.charCodeAt(i);
       if(c == 12288 || (c >65280 && c <65375))
         return false;
     }
     return true;   
}
// 判断字符串中是否包含中文,碰到一个中文字符就退出，认为这是一个中文字符串
function isChinese(str){
     var reg=/^[\u0391-\uFFE5]+$/;    
     for(var i=0;i<str.length;i++){
       var temp = str.charAt(i);
       if(reg.test(temp)){    
         return true;
       }
     }
     return false;   
}
// 组件获得焦点时样式
function focusStyle($obj, tip){
	$obj.select().removeClass('disabled');
	if($obj.val() == tip){
		$obj.val('');	
	}
}
// 组件失去焦点时样式
function blurStyle($obj, tip){
	var value = $obj.val();
	if(value == ''){
		$obj.val(tip).addClass('disabled');
	}else if(value != tip){
		$obj.removeClass('disabled');
	}
}
/**
 * 将<code>optionMap</code>追加到下拉列表框中
 * @param {String} 			id   		下拉列表框的ID
 * @param {JSON Object} 	optionMap   JSON格式对象
 * @return {DOM Element}	tempOption	文档碎片对象(需由document.createFragment()方法创建)
 */
function addOptions(id, optionMap){
	var tempOption = document.createDocumentFragment();
	if(optionMap != null){
		jQuery.each(optionMap, function(key, value){
			tempOption.appendChild(jQuery('<option />').val(key).text(value)[0]);
		});
	}
	jQuery('#' + id).empty().append(tempOption);
}