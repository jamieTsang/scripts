function EKFadeAnim(A,B)
{
	this.opacity=0;
	this.interval=10;
	this.increment=25;
	this.elementStyle=A.style;
	if(B){this.relatedStyle=B.style}
	this.timer=null
}
EKFadeAnim.prototype.setOpacity=function(A,B)
{
	if(B==0){A.visibility="hidden"}
	else{A.visibility="visible"} 
	//A.opacity=(B/100);
	//A.MozOpacity=(B/100);
	//A.KhtmlOpacity=(B/100);
	//A.filter="alpha(opacity="+B+")"
};
EKFadeAnim.prototype.stop=function()
{
	if(this.opacity>0)
	{
		this.setOpacity(this.elementStyle,100);
		if(this.relatedStyle)
		{
			this.setOpacity(this.relatedStyle,100)
		}
	}
};
EKFadeAnim.prototype.fadeIn=function()
{
	if(this.timer==null)
	{
		//this.opacity=100;
		var A=this;
		//this.timer=window.setInterval(function(){A.fadeInTimer()},this.interval)
		A.fadeInTimer();
	}
};
EKFadeAnim.prototype.fadeInTimer=function()
{
/*
	if(this.opacity<100)
	{
		this.opacity=this.opacity+this.increment;
		this.setOpacity(this.elementStyle,this.opacity);
		if(this.relatedStyle)
		{
			this.setOpacity(this.relatedStyle,this.opacity)
		}
	}
	else
	{
		window.clearInterval(this.timer);
	    this.timer=null
	}
	*/
	this.setOpacity(this.elementStyle,100);
	if(this.relatedStyle)
	{
		this.setOpacity(this.relatedStyle,100)
	}
};
EKFadeAnim.prototype.fadeOut=function()
{
	if(this.timer==null)
	{
		//this.opacity=0;
		var A=this;
		//this.timer=window.setInterval(function(){A.fadeOutTimer()},this.interval)
		A.fadeOutTimer();
	}
};
EKFadeAnim.prototype.fadeOutTimer=function()
{
/*
	if(this.opacity>0)
	{
		this.opacity=this.opacity-this.increment;
		this.setOpacity(this.elementStyle,this.opacity);
		if(this.relatedStyle)
		{
			this.setOpacity(this.relatedStyle,this.opacity)
		}
	}
	else
	{
		window.clearInterval(this.timer);
		this.timer=null
	}
	*/
	this.setOpacity(this.elementStyle,0);
	if(this.relatedStyle)
	{
		this.setOpacity(this.relatedStyle,0)
	}
};



//MangoCalendar构造函数
function MangoCalendar()
{
	this.Config=function(){};
	//this.Config.imagePath="/images/calendar/";
	//this.Config.calendarImages=["iconleft.jpg","iconright.jpg"];
	this.Config.maxScreen=960;
	this.Config.txtClose="Close";
	this.Config.txtPrevMonth="Previous month";
	this.Config.txtNextMonth="Next month";
	this.Config.monthLong=["January","February","March","April","May","June","July","August","September","October","November","December"];
	this.Config.monthShort=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	this.Config.dayShort=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
	this.Config.firstDay=0;
	this.Config.monthDays=[31,28,31,30,31,30,31,31,30,31,30,31];
	this.Config.dateFormat="dd-MMM-yy";
	this.Config.dateFormatTitle="MMMM, yyyy";
	this.Config.templateHTML="";
	/*haochenyang 2009-03-18 start : 输入完毕,光标跳转到下一个输入框。*/	
	//if(this.nextDocument!=null&&this.nextDocument!=undefined){this.nextDocument.focus();}
	/*haochenyang 2009-03-18 end : 输入完毕,光标跳转到下一个输入框。*/
	//xiangyang.li 20090508 选择日期后执行回调事件 begin
	/*
	if(typeof(pickDateCallback) != "undefined"){
	   //如果页面需要在日期选择后做相应处理可以可以在页面定义此函数
	  // pickDateCallback(this);
	 
	}*/
	//xiangyang.li 20090508 选择日期后执行回调事件 end
}
MangoCalendar.prototype.stringFill=function(C,B)
{
	var A="";
	for(;;)
	{
		if(B&1)
		{A+=C}B>>=1;
		if(B)
		{C+=C}
		else
		{break}
	}
	return A
};
MangoCalendar.prototype.padLeft=function(D,B,A)
{
	var C=D+"";
	while(C.length<A)
	{C=B+C}
	return C
};
MangoCalendar.prototype.isNumeric=function(C)
{
	var A,B,E,D,F;A="0123456789";
	B=true;
	for(D=0,F=C.length;D<F&&B==true;D++)
	{
		E=C.charAt(D);
		if(A.indexOf(E)==-1)
		{B=false}
	}
	return B
};
MangoCalendar.prototype.findPos=function(A)
{
	var B=function(){};
	B.x=0;
	B.y=0;
	while(A.offsetParent)
	{
		B.x+=A.offsetLeft;
		B.y+=A.offsetTop;
		A=A.offsetParent
	}
	return B
};
MangoCalendar.prototype.getWindowSize=function()
{
	var A=function(){};
	A.width=0;
	A.height=0;
	if(typeof (window.innerWidth)=="number")
	{
		A.width=window.innerWidth;
		A.height=window.innerHeight
	}
	else
	{
		if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight))
		{
			A.width=document.documentElement.clientWidth;
			A.height=document.documentElement.clientHeight
	    }
		else
		{
			if(document.body&&(document.body.clientWidth||document.body.clientHeight))
			{
				A.width=document.body.clientWidth;
				A.height=document.body.clientHeight
			}
		}
	}
	return A
};
MangoCalendar.prototype.getScrollPosition=function()
{
	var A=function(){};
	A.x=0;
	A.y=0;
	if(typeof (window.pageYOffset)=="number")
	{
		A.x=window.pageXOffset;
		A.y=window.pageYOffset
	}
	else
	{
		if(document.body&&(document.body.scrollLeft||document.body.scrollTop))
		{
			A.x=document.body.scrollLeft;
			A.y=document.body.scrollTop
		}
		else
		{
			if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop))
			{
				A.x=document.documentElement.scrollLeft;
				A.y=document.documentElement.scrollTop
			}
		}
	}
	return A
};
MangoCalendar.prototype.leapYear=function(A)
{
	return((A%400)===0||((A%4)===0&&(A%100)!==0))
};
MangoCalendar.prototype.resolveMonth=function(C,B)
{
	for(var A=0;A<C.length;A++)
	{
		if(B.indexOf(C[A])!=-1)
		{return A}
	}
	return -1
};
MangoCalendar.prototype.cleanMonth=function(C,B)
{
	for(var A=0;A<C.length;A++)
	{
		if(B.indexOf(C[A])!=-1)
		{
			return B.replace(C[A],this.stringFill("M",C[A].length))
		}
	}
	return B
};
MangoCalendar.prototype.addMonth=function(B,C)
{
	var A=new Date(B.getTime());
	A.setDate(1);
	if(!C)
	{
		if(A.getMonth()===0)
		{
			A.setYear(A.getFullYear()-1);
		    A.setMonth(11)
		}
		else
		{
			A.setMonth(A.getMonth()-1)
		}
	}
	else
	{
		if(A.getMonth()==11)
		{
			A.setYear(A.getFullYear()+1);
			A.setMonth(0)
		}
		else
		{
			A.setMonth(A.getMonth()+1)
		}
	}
	return A
};
MangoCalendar.prototype.formatDate=function(D,C)
{
	var B=false;
	var H=-1;
	var G="";
	var E=C+" ";
	var I=E.split("");
	for(var F=0;F<I.length;F++)
	{
		if(F>0&&(I[F-1]!=I[F])&&!B)
		{
			H++;
			switch(I[F-1])
			{
				case"d":
					switch(H)
					{
						case 1:
							G=G+D.getDate();
							break;
						case 2:
							G=G+this.padLeft(D.getDate(),"0",2);
							break;
					}
			        break;
			    case"M":
				    switch(H)
					{
						case 1:
						   G=G+(D.getMonth()+1);
						   break;
						case 2:
						   G=G+this.padLeft(D.getMonth()+1,"0",2);
						   break;
						case 3:
						   G=G+this.Config.monthShort[D.getMonth()];
						   break;
						case 4:
						   G=G+this.Config.monthLong[D.getMonth()];
						   break
						   }
						break;
			    case"y":
				     var A=D.getFullYear()+"";
					 switch(H)
					 {
						 case 1:
						    if(A.substr(3,1)!="0")
							{
								G=G+A.substr(3,1)
							}
							else
							{
								G=G+A.substr(2,2)
							}
							break;
						 case 2:
						    G=G+A.substr(2,2);
							break;
						 default:
						    G=G+A;
							break
					  }
					  break;
				case"\\":
				     G=G+I[F];
					 B=true;
					 break;
			    default:
				     for(j=0;j<H;j++)
					 {
						 G=G+I[F-1]
					 }
					 break
			 }
			 H=0
		}
		else
		{
			H++;
			B=false
		}
	}
	return G
};
MangoCalendar.prototype.parseDate=function(D,B)
{
	var A=false;
	var K=-1;
	var I=0;
	var J="";
	var F=B+" ";
	var N=F.split("");
	var G=this.startDate.getDate();
	var M=this.startDate.getMonth();
	var O=this.startDate.getFullYear();
	var E=D;
	if(B.indexOf("MMMM")!=-1)
	{
		E=this.cleanMonth(this.Config.monthLong,D)
	}
	if(B.indexOf("MMM")!=-1)
	{
		E=this.cleanMonth(this.Config.monthShort,D)
	}
	for(var H=0,C=N.length;H<C;H++)
	{
		if(H>0&&(N[H-1]!=N[H])&&!A)
		{
			K++;
			switch(N[H-1])
			{
				case"d":
				     switch(K)
					 {
						 case 1:
						     if(this.isNumeric(E.substr(H+I-1,2)))
							 {
								 G=parseFloat(E.substr(H+I-1,2));
								 I++
							 }
							 else
							 {
								 G=parseFloat(E.substr(H+I-1,1))
							 }
							 break;
					     default:
						     G=parseFloat(E.substr(H+I-K,K))
					 }
					 break;
				case"M":
				     switch(K)
					 {
						 case 1:
						      if(this.isNumeric(E.substr(H+I-1,2)))
							  {
								  M=parseFloat(E.substr(H+I-1,2));
								  I++
							  }
							  else
							  {
								  M=parseFloat(E.substr(H+I-1,1))
							  }
							  M--;
							  break;
						  case 2:
						       M=parseFloat(E.substr(H-2,2));
							   M--;
							   break;
						  case 3:
						       M=this.resolveMonth(this.Config.monthShort,D);
							   if(M!=-1)
							   {
								   I=I+this.Config.monthShort[M].length-3
							   }
							   break;
						  case 4:
						       M=this.resolveMonth(this.Config.monthLong,D);
							   if(M!=-1)
							   {
								   I=I+this.Config.monthShort[M].length-3
							   }
							   break
					 }
					 break;
			   case"y":
			         O=parseFloat(E.substr(H+I-K,K));
					 if(O<100)
					 {
						 O=O+2000
					 }
					 break;
			   case"\\":
			         A=true;
					 break
			 }K=0
		}
		else
		{
			K++;
			A=false
		}
	}
	try
	{
		var P=new Date(O,M,G);
		if(P.getFullYear()==O&&P.getMonth()==M&&P.getDate()==G)
		{
			if(P<this.startDate)
			{
				P.setTime(this.startDate.getTime())
			}
			if(P>this.endDate)
			{
				P.setTime(this.endDate.getTime());
				P.setDate(1)
			}
			return P
		}
	}catch(L)
	{
		return this.startDate
	}
	return this.startDate
};
MangoCalendar.prototype.preloadImages=function()
{
	if(false)//document.images)
	{
		for(var B=0;B<this.Config.calendarImages.length;B++)
		{
			var A=new Image(1,1);
			A.src=this.Config.imagePath+this.Config.calendarImages[B]
		}
	}
};
MangoCalendar.prototype.initialize=function()
{
	var IE6=false /*@cc_on || @_jscript_version < 5.7 @*/;
	this.iframe=null;
	if(IE6)
	{
		this.iframe=document.createElement("IFRAME");
		this.iframe.className="calendar";
		this.iframe.border="0";
		document.body.appendChild(this.iframe)
	}
	this.calendarDiv=document.createElement("DIV");
	this.calendarDiv.id="calendarDiv";
	this.calendarDiv.onselectstart=function(){return false};
	this.calendarDiv.onmousedown=function(){return false};
	
	var oThis=this;
	this.oldKeyDown=document.onkeydown;
	document.onkeydown=function(oEvent)
						{
							oEvent=oEvent||window.event;
							return oThis.handleKeyDown(oEvent)
						};
	this.oldMouseDown=document.onmousedown;
	document.onmousedown=function(oEvent)
						{
							oEvent=oEvent||window.event;
							return oThis.handleMouseDown(oEvent)
						};
	this.calendarDiv.style.zIndex=-1000;
	document.body.appendChild(this.calendarDiv);
	
	this.calendarDiv.innerHTML=this.Config.templateHTML;
    //alert(this.calendarDiv.innerHTML)
	if(this.iframe)
	{
		this.fade=new EKFadeAnim(this.calendarDiv,this.iframe)   //实例化 EKFadeAnim 对象
	}
	else
	{
		this.fade=new EKFadeAnim(this.calendarDiv,null)
	}
    //alert(" 1 = "+this.calendarDiv.innerHTML);
	this.parseTemplate();
	//alert(" 2 = "+this.calendarDiv.innerHTML);
	//向div中的table里填充数据
	this.refreshData()
    //alert(this.calendarDiv.innerHTML)
};
MangoCalendar.prototype.handleKeyDown=function(A)
{
	if(A.keyCode==27)
	{
		this.closeCalendar()
	}
	if(this.oldKeyDown)
	{
		return this.oldKeyDown(A)
	}
};
MangoCalendar.prototype.handleMouseDown=function(B)
{
	var A=B.target||B.srcElement;
	bInCalendar=false;
	while(A)
	{
		if(A==this.calendarDiv||A==this.returnDateTo)
		{
			bInCalendar=true
		}
		A=A.parentNode
	}
	if(!bInCalendar)
	{
		this.closeCalendar()
	}
	if(this.oldMouseDown)
	{
		return this.oldMouseDown(B)
	}
	return true
};
MangoCalendar.prototype.parseTemplate=function()
{
	this.calendarLeft=document.getElementById("calendarLeft");
	this.calendarRight=document.getElementById("calendarRight");
	this.monthLeft=document.getElementById("monthLeft");
	this.monthRight=document.getElementById("monthRight");
	this.prevMonth=document.getElementById("prevMonth");
	this.nextMonth=document.getElementById("nextMonth");
	this.dataLeft=document.getElementById("dataLeft");
	this.dataRight=document.getElementById("dataRight");
	var C=document.getElementById("daysLeft");
	for(var B=0;B<this.Config.dayShort.length;B++)
	{
		C.cells[B].innerHTML=this.Config.dayShort[B]
	}
	var A=document.getElementById("daysRight");
	for(var B=0;B<this.Config.dayShort.length;B++)
	{
		A.cells[B].innerHTML=this.Config.dayShort[B]
	}
	this.prevMonth.title=this.Config.txtPrevMonth;
	this.nextMonth.title=this.Config.txtNextMonth
};
MangoCalendar.prototype.switchMonth=function(B)
{
	var A=B.target||B.srcElement;
	var C=this.outputDate.getFullYear();
	this.outputDate=this.addMonth(this.outputDate,A.id.indexOf("next")>=0);
	this.refreshData();
	return false
};
MangoCalendar.prototype.updateButtons=function()
{
	var B=this;
	var C=this.prevMonth;
	var A=this.nextMonth;
	if((this.outputDate.getFullYear()<=this.startDate.getFullYear())
																  &&this.outputDate.getMonth()<=this.startDate.getMonth())
	{
		C.className="arrowLeftDisabled";
		C.innerText = '';
		C.onclick=null;
		C.title=""
	}
	else
	{
		C.className="arrowLeft";
		C.innerText = '<<';
		C.onclick=function(D)
					{
						D=D||window.event;
						return B.switchMonth(D)
					};
		C.title=this.Config.txtPrevMonth
	}
	if(this.outputDate.getFullYear()>=this.endDate.getFullYear()
															   &&this.outputDate.getMonth()>=(this.endDate.getMonth()-1))
	{
		A.className="arrowRightDisabled";
		A.innerText = '';
		A.onclick=null;
		A.title=""
	}
	else
	{
		A.className="arrowRight";
		A.innerText = '>>';
		A.onclick=function(D)
					{
						D=D||window.event;
						return B.switchMonth(D)
					};
		A.title=this.Config.txtNextMonth
	}
};
MangoCalendar.prototype.highlightDay=function()
{
	switch(this.className)
	{
		case"activeDay":
		      this.className="activeDayOver";
			  break;
	    case"activeDayOver":
		      this.className="activeDay";
			  break;
	    case"Day":
		      this.className="DayOver";
			  break;case"DayOver":
			  this.className="Day";
			  break
	}
};
MangoCalendar.prototype.refreshData=function()
{
    //if(this.outputDate.getFullYear()>=this.outputDate.getFullYear() 
    //fix this bug
	if(this.outputDate.getFullYear()>=this.endDate.getFullYear()
															   &&this.outputDate.getMonth()>=this.endDate.getMonth())
	{
		this.writeCalendarContent(this.addMonth(this.outputDate,false),this.monthLeft,this.dataLeft);
		this.writeCalendarContent(this.outputDate,this.monthRight,this.dataRight)
	}
	else
	{
		this.writeCalendarContent(this.outputDate,this.monthLeft,this.dataLeft);
		this.writeCalendarContent(this.addMonth(this.outputDate,true),this.monthRight,this.dataRight)
	}
	this.resizeContent();
	this.updateButtons()
};
MangoCalendar.prototype.writeCalendarContent=function(B,L,D)
{
	var G=this;
	if(this.calendarLeft.style.removeProperty)
	{
		this.calendarLeft.style.removeProperty("height");
		this.calendarRight.style.removeProperty("height")
	}
	else
	{
		this.calendarLeft.style.removeAttribute("height");
		this.calendarRight.style.removeAttribute("height")
	}
	L.innerHTML=this.formatDate(B,this.Config.dateFormatTitle);
	var M=new Array();
	var K=new Date();
	K.setTime(B.getTime());
	K.setDate(1);
	var E=K.getDay();
	E=(7-(this.Config.firstDay-E))%7;
	var A=this.Config.monthDays[B.getMonth()];
	if(A==28)
	{
		if(this.leapYear(B.getFullYear()))
		{A=29}
	}
	var J=0;
	var I=1;
	var C=A;
	var tempCompDate;
	if(B.getFullYear()<=this.startDate.getFullYear()
												   &&B.getMonth()<=this.startDate.getMonth())
	{
		I=this.startDate.getDate()
	}
	if(B.getFullYear()>=this.endDate.getFullYear()
												 &&B.getMonth()>=this.endDate.getMonth())
	{
		C=this.endDate.getDate()
	}
	if(B.getFullYear()==this.inputDate.getFullYear()
												   &&B.getMonth()==this.inputDate.getMonth())
	{
		J=this.inputDate.getDate()
	}
	for(i=0;i<D.rows.length*7;i++)
	{
		var H=D.rows[parseInt(i/7)].cells[i%7];
		var F=i-E+1;
		if(i<E||F>A)
		{
			H.id="";
			H.className="inActiveDay";
			H.innerHTML="";
			H.onmouseover=null;
			H.onmouseout=null;
			H.onclick=null
		}
		else
		{
			H.id="day-"+F+"-"+B.getMonth()+"-"+B.getFullYear();
			H.innerHTML=F;H.className="inActiveDay";
			if(B.getFullYear()<this.startDate.getFullYear())
			{
	 				H.className="inActiveDay";
					H.onmouseover=null;
					H.onmouseout=null;
					H.onclick=null;
			}
			else
			{
			    if(B.getFullYear()<=this.startDate.getFullYear()&&B.getMonth()<this.startDate.getMonth())
			    {			
		 				H.className="inActiveDay";
						H.onmouseover=null;
						H.onmouseout=null;
						H.onclick=null
				}
				else
				{
                    tempCompDate = new Date(B.getFullYear(),B.getMonth(),F);	
					var weektemp=tempCompDate.getDay();					
					if(F>=I&&F<=C)
					{
						if(this.WeekShow){
							 if((weektemp+1)%7!=0 && weektemp%7!=0){
								H.onmouseover=this.highlightDay;
								H.onmouseout=this.highlightDay;
								H.onclick=function(N)
											{
												N=N||window.event;
												return G.pickDate(N)
											};
							    if(F==J)
								{
									H.className="activeDay"
								}
								else
								{
									H.className="Day"
								}
							}
						}else{
							H.onmouseover=this.highlightDay;
							H.onmouseout=this.highlightDay;
							H.onclick=function(N)
										{
											N=N||window.event;
											return G.pickDate(N)
										};
						    if(F==J)
							{
								H.className="activeDay"
							}
							else
							{
								H.className="Day"
							}
						}
					}
					else
					{
		 				H.className="inActiveDay";
						H.onmouseover=null;
						H.onmouseout=null;
						H.onclick=null
					}
				}
			}	
		}
	}
	if(A+E>5*7)
	{
		D.rows[D.rows.length-1].style.display=""
	}
	else
	{
		D.rows[D.rows.length-1].style.display="none"
	}
};
MangoCalendar.prototype.resizeContent=function()
{
	if(this.calendarRight.offsetHeight>this.calendarLeft.offsetHeight)
	{
		this.calendarLeft.style.height=(this.calendarRight.offsetHeight+4)+"px"
	}
	else
	{
		this.calendarLeft.style.height=(this.calendarLeft.offsetHeight+4)+"px"
	}
	if(this.iframe)
	{
		var B=parseFloat(this.calendarDiv.currentStyle.borderWidth);
		if(!isNaN(B))
		{
			this.iframe.style.width=(this.calendarDiv.clientWidth-(2*B))+"px";
			this.iframe.style.height=(this.calendarDiv.clientHeight+(2*B))+"px";
		}
		else
		{
			this.iframe.style.width=this.calendarDiv.clientWidth+"px";
			this.iframe.style.height=this.calendarDiv.clientHeight+"px"
		}
	}
	if(this.returnDateTo)
	{
		var G=this.findPos(this.returnDateTo);
		var A=this.getScrollPosition();
		var D=this.getWindowSize();
		var F=G.x;
		var C=G.y+this.returnDateTo.offsetHeight+2;
		var E=this.calendarDiv;
		if((E.offsetHeight+C)>(A.y+D.height))
		{
			window.scrollTo(A.x,A.y+(E.offsetHeight+C)-(A.y+D.height)+25)
		}
	}
};
MangoCalendar.prototype.positionCalendar=function(D)
{
	var G=this.findPos(this.returnDateTo);
	var A=this.getScrollPosition();
	var C=this.getWindowSize();
	var F=G.x;
	var B=G.y+this.returnDateTo.offsetHeight+2;
	var E=this.calendarDiv;if((E.offsetHeight+B)>(A.y+C.height+4))
	{
		window.scrollTo(A.x,A.y+(E.offsetHeight+B)-(A.y+C.height)+25)
	}
	if(this.Config.maxScreen!==0&&C.width>this.Config.maxScreen)
	{
		C.width=this.Config.maxScreen+(document.body.clientWidth-this.Config.maxScreen)/2
	}
	if((E.offsetWidth+F+20)>(A.x+C.width))
	{
		F=G.x+this.returnDateTo.offsetWidth-E.offsetWidth
	}
	this.calendarDiv.style.left=F+D+"px";
	this.calendarDiv.style.top=B+"px";
	if(this.iframe)
	{
		this.iframe.style.left=this.calendarDiv.style.left;
		this.iframe.style.top=this.calendarDiv.style.top
	}
};
MangoCalendar.prototype.pickDate=function(B)
{
	var A=B.target||B.srcElement;
	var C=A.id.split("-");
	this.outputDate.setDate(1);
	this.outputDate.setYear(C[3]);
	this.outputDate.setMonth(C[2]);
	this.outputDate.setDate(C[1]);
	var temp =this.formatDate(this.outputDate,this.Config.dateFormat);
	this.returnDateTo.value=temp;
	if(this.dependentDateTo&&this.dependentDaysDiff)
	{
		this.outputDate.setDate(this.outputDate.getDate()+this.dependentDaysDiff);
		if(this.outputDate>this.endDate)
		{
			this.outputDate.setDate(this.endDate.getDate())
		}
		if(this.outputDate<this.startDate)
		{
			this.outputDate.setDate(this.startDate.getDate())
		}
		this.dependentDateTo.value=this.formatDate(this.outputDate,this.Config.dateFormat)
	}
	this.returnDateTo.style.color="#000000";
	this.closeCalendar();
	/*haochenyang 2009-03-18 start : 输入完毕,光标跳转到下一个输入框。*/
	if(typeof(this.pickDateCallback) != "undefined"){this.pickDateCallback(temp,this.returnDateTo);this.pickDateCallback=undefined;}
	if(this.nextDocument!=null&&this.nextDocument!=undefined){this.nextDocument.focus();this.nextDocument.click();}
	/*haochenyang 2009-03-18 end : 输入完毕,光标跳转到下一个输入框。*/
};
MangoCalendar.prototype.ajaxac_getkeycode = function (e)
{
	var code;
	if (!e) var e = window.event;
	if (e.keyCode) code = e.keyCode;
	else if (e.which) code = e.which;
	return code;
};
/*
 *  B:当前控件对象 ; A:所能选择日期范围内的最小天数,为date对象 ; E:所能选择日期范围内的最大天数,为date对象 ;
 *  D:与B相关联的下一个日期控件对象 ; G:B与D相差的时间间隔(以天为单位); F:未知
 *  W:B结束后，将焦点聚集到W控件 ; e:事件event ; pickDateCallback:选择日期后的回调函数
 *  X:周六周日是否可选标志
 */
MangoCalendar.prototype.display=function(B,A,E,D,G,F,W,e,pickDateCallback,X)
{
	//alert("B = "+B+"  A = "+A+"  E="+E+"  D = "+D+"  G = "+G+"  F = "+F+"  d.value = "+D.value +"   B.value = "+B.value)
	if(!this.Config){return }
	/*haochenyang 2009-03-18 start : 输入完毕,光标跳转到下一个输入框。*/
	this.nextDocument=((W==undefined||W=='')?null:W);
	/*haochenyang 2009-03-18 end : 输入完毕,光标跳转到下一个输入框。*/
	if(typeof(pickDateCallback) != "undefined"){
	   //如果页面需要在日期选择后做相应处理可以可以在页面定义此函数
	   this.pickDateCallback=pickDateCallback;
	}
	if(typeof X=="undefined"){this.WeekShow=false;}
	else{this.WeekShow=X;}
	if(typeof D=="undefined"){D=null}
	if(typeof G=="undefined"){G=null}
	if(typeof F=="undefined"){F=0}
	this.startDate=new Date(A.getTime());
	this.endDate=new Date(E.getTime());
	/*haochenyang 2009-03-23 start : 回车键，光标跳转到下一个输入框。*/
    var inputkeys = this.ajaxac_getkeycode(e);
	switch(inputkeys){
		case 13: //对应回车键
		    this.closeCalendar();
		    if(this.nextDocument!=null) this.nextDocument.focus();
		    return;break;
		case 18: //对应Alt键
			this.closeCalendar();
		    return;break;
		case 27: //对应Esc键
			this.closeCalendar();
		    return;break;
	}
	/*haochenyang 2009-03-23 end : 回车键，光标跳转到下一个输入框。*/
	if(D&&!G&&D.value)
	{
		this.startDate=this.parseDate(D.value,this.Config.dateFormat)
	}
	this.outFlag=true;
	if(B&&B.tagName=="INPUT")
	{
	    this.outFlag=false;
		this.inputDate=this.parseDate(B.value,this.Config.dateFormat);
		this.outputDate=new Date(this.inputDate.getTime());
	}
	else if(B&&B.tagName=="A")
	{
	    this.outFlag=false;
	    this.inputDate=this.parseDate('',this.Config.dateFormat);
		this.outputDate=new Date(this.inputDate.getTime());
	}
	else{return }
	if(B.style.display=="none"||B.disabled=="true")
	{return }
	if(!this.calendarDiv)
	{this.initialize()}
    this.returnDateTo=B;
	this.dependentDateTo=D;
	this.dependentDaysDiff=G;
	var C=this.calendarDiv.style.visibility=="visible";
	this.calendarDiv.style.zIndex=-1000;
	this.calendarDiv.style.visibility="visible";
	this.refreshData();
	this.positionCalendar(F);
	if(!C)
	{this.calendarDiv.style.visibility="hidden"}
	this.calendarDiv.style.zIndex=1000;
	if(!C)
	{this.fade.fadeIn()}
};
MangoCalendar.prototype.closeCalendar=function()
{
	if(this.calendarDiv)
	{
		if(this.calendarDiv.style.visibility=="visible"){this.fade.fadeOut();}
	}
	if(this.outFlag)
	{
	    this.pickDateCallback=undefined;
	}
	return false
};
/*
function showSearchCalendarn(obj, type, event){
    if(type){
        if(obj.value==""){
            obj.style.color="#C1C1C1";
            obj.value="yyyy-mm-dd";
        }
    }else{
        if(obj.value=="yyyy-mm-dd"){
            obj.style.color="#000000";
            obj.value="";
        }
        if(MangoCalendar){
            MangoCalendar.display(obj, new Date(), AddDay('Y',1,new Date()), obj, 0, undefined, undefined, event); 
        };
    }
}
*/
function showSearchCalendarn(obj,type,start,end,relateObj,spanDay,nextObj,event,callBack,showRestDay)
{
	if(type)
	{
		if(obj.value=="")
		{
		    obj.style.color="#C1C1C1";
		    obj.value="yyyy-mm-dd";
		}
	}
	else
	{
		if(obj.value=="yyyy-mm-dd")
		{
		    obj.style.color="#000000";obj.value="";
		}
		if(MangoCalendar)
		{
			MangoCalendar.display(obj,start,end,relateObj,spanDay,undefined,nextObj,event,callBack,showRestDay)
		}
	}
}
var MangoCalendar=new MangoCalendar();
