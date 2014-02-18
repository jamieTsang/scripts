/**
 * 官网幻灯片『焦点图』插件
 *
 * jQuery gzlSlideShow plugin
 *
 * @name jquery.gzlSlideShow.js
 * @version 1.0
 * @author jamieTsnag
 * @date 2013-05-12
 * @Email:331252914@qq.com
 * @QQ:331252914
 *
 *
 **/
(function($) {
	$.fn.gzlSlideshow = function(settings){
		settings = jQuery.extend({
		   intervalTime : 5, //切换展示间隔时间 【单位：秒】
		   moveSpeedTime : 400,//切换一张图片所需时间，【单位：毫秒】
		   gzlSlideShow_btnList:"btnlist",//控制焦点图滑块
		   isHasMiniSildeShow:true,//是否含有迷你焦点图
		   miniSlideshow:$('#gzlMiniSlideshow'),//迷你焦点图对象
		   miniSlideDiff:5//迷你焦点图间隔
		},settings);
	/*私有变量*/
	var gzlSlideShow_BoxObject = this;
	var gzlSlideShow_BoxObjectSelector = this.selector;
	var gzlMiniSlideShow_BoxObjectSelector = settings.miniSlideshow.selector;
	var gzlSlideShow_Size =new Array();
	var gzlSlideShow_changeFlag = 0;
	var gzlSlideShow_setInterval;
	var gzlSlideShow_a=$(gzlSlideShow_BoxObjectSelector+" a");
	
	function gzlSlideShow_initialize(){
		 $(gzlSlideShow_BoxObject).css({visibility:"hidden"});
		 $(gzlSlideShow_BoxObjectSelector+" a img").css({border:0});
		 gzlSlideShow_start();
		 gzlSlideShow_btnMouseover();
		 gzlMiniSlideShow_start();
	};
	
    function gzlSlideShow_start(){
		 gzlSlideShow_imgaeLength = gzlSlideShow_a.length;
		 gzlSlideShow_miniImgaeLength = $(gzlMiniSlideShow_BoxObjectSelector+" li").length;
		 gzlSlideShow_Size.push($(gzlSlideShow_BoxObjectSelector+" a img").height());
		 gzlSlideShow_Size.push($(gzlMiniSlideShow_BoxObjectSelector+" a img").width());
		$(gzlSlideShow_BoxObjectSelector+" a").wrapAll("<div id='gzlSlideShow_content' class='gzlSlideShow_content'></div>");
		gzlSlideShow_setBtn();
		if(gzlSlideShow_imgaeLength>1)
			gzlSlideShow_setInterval=setInterval(gzlSlideShow_action,settings.intervalTime*1000);
		$(gzlSlideShow_BoxObject).css({visibility:"visible"});
	};
	
	function gzlMiniSlideShow_start(){
		settings.miniSlideshow.width(gzlSlideShow_Size[1]*gzlSlideShow_miniImgaeLength*settings.miniSlideDiff);
	};
	
	function gzlSlideShow_setBtn(){
		if(gzlSlideShow_imgaeLength >= 1){
			var gzlSlideShow = '<li class="current">1</li>';
			for(i=2;i<=gzlSlideShow_imgaeLength;i++){
				gzlSlideShow+="<li>"+i+"</li>";
			}
			$('#'+settings.gzlSlideShow_btnList).append(gzlSlideShow);
		}
	};
	
	function gzlSlideShow_btnMouseover(){
		$('#'+settings.gzlSlideShow_btnList+' li').mouseover(function(){
			$(this).unbind('mouseover');
			clearInterval(gzlSlideShow_setInterval);
			var curLiIndex = $('#'+settings.gzlSlideShow_btnList+' li').index($(this));
			gzlSlideShow_action_to(curLiIndex);
			$(this).addClass('current').siblings().removeClass('current');
			//console.log("flag:"+gzlSlideShow_changeFlag);
		});
	}
	
	function gzlSlideShow_action(){
		gzlSlideShow_BoxObject.stop(true,false).animate({'top':-gzlSlideShow_Size[0]},settings.moveSpeedTime,function(){
			$('#gzlSlideShow_content a:eq(0)').appendTo($(gzlSlideShow_BoxObjectSelector+' div'));
			$(gzlSlideShow_BoxObjectSelector).css('top',0);
			if(gzlSlideShow_changeFlag >= gzlSlideShow_imgaeLength-1){
				gzlSlideShow_changeFlag = 0;
			}else{
				gzlSlideShow_changeFlag++;
			}
			$('#'+settings.gzlSlideShow_btnList+' li:eq('+gzlSlideShow_changeFlag+')').addClass('current').siblings().removeClass('current');
		});
		if(settings.isHasMiniSildeShow)
			gzlMiniSlideShow_right();
	}
	
	function gzlMiniSlideShow_right(){
		settings.miniSlideshow.stop(true,false).animate({'left':-gzlSlideShow_Size[1]},settings.moveSpeedTime,function(){
			$(gzlMiniSlideShow_BoxObjectSelector+" li:eq(0)").appendTo(settings.miniSlideshow);
			settings.miniSlideshow.css('left',0);
		});	
	}
	
	function gzlMiniSlideShow_left(){
		var $_lastLi=$(gzlMiniSlideShow_BoxObjectSelector+" li:last");
		$_lastLi.css({'position':'absolute','left':-gzlSlideShow_Size[1]-settings.miniSlideDiff});
		settings.miniSlideshow.stop(true,false).animate({'left':+gzlSlideShow_Size[1]},settings.moveSpeedTime,function(){
			$_lastLi.insertBefore($(this).find('li:eq(0)')).attr('style','');
			$(this).css('left',0);
		});	
	}
	
	function gzlSlideShow_action_to(num){
		var moveStep=0;
		if(num>gzlSlideShow_changeFlag){
			moveStep=num-gzlSlideShow_changeFlag;
			gzlSlideShow_top(moveStep,num);
			if(settings.isHasMiniSildeShow)
			gzlMiniSlideShow_right();
		}else if(num<gzlSlideShow_changeFlag){
			moveStep=gzlSlideShow_imgaeLength+num-gzlSlideShow_changeFlag;
			gzlSlideShow_down(moveStep,num);
			if(settings.isHasMiniSildeShow)
			gzlMiniSlideShow_left();			
		}	
	}
	
	function gzlSlideShow_top(moveStep,num){
		gzlSlideShow_BoxObject.stop(true,false).animate({'top':-gzlSlideShow_Size[0]*moveStep},settings.moveSpeedTime,function(){
				gzlSlideShow_changeFlag=num;
				$('#gzlSlideShow_content a:lt('+moveStep+')').appendTo($('#gzlSlideShow_content'));
				gzlSlideShow_BoxObject.css('top',0);
				afterAnimation();
			});
	}
	
	function gzlSlideShow_down(moveStep,num){
		var _target=$(gzlSlideShow_BoxObjectSelector+" a:eq("+moveStep+")");
		var _targetAfter=$(gzlSlideShow_BoxObjectSelector+" a:gt("+(moveStep-1)+")");
		_target.css({'position':'absolute','top':-gzlSlideShow_Size[0]});
		gzlSlideShow_BoxObject.stop(true,false).animate({'top':gzlSlideShow_Size[0]},settings.moveSpeedTime,function(){
			gzlSlideShow_changeFlag=num;
			_targetAfter.insertBefore($('#gzlSlideShow_content').find('a:eq(0)'));
			gzlSlideShow_a.attr('style','');
			$(this).css('top',0);
			afterAnimation();
		});
	}
	
	function afterAnimation(){
		if(gzlSlideShow_imgaeLength>1)
		gzlSlideShow_setInterval=setInterval(gzlSlideShow_action,settings.intervalTime*1000);
		gzlSlideShow_btnMouseover();
	}
	
	return gzlSlideShow_initialize();
  };
})(jQuery);