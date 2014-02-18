/**
 * 官网一般小型插件
 *
 * jQuery global plugin
 *
 * @name jquery.global.js
 * @version 1.3
 * @author jamieTsnag
 * @date 2014-02-14
 * @Email:331252914@qq.com
 * @QQ:331252914
 *
 *
 **/

$(function(){
	//滚动分页卡插件
	jQuery.fn.gzlHoverShow = function(settings){
		settings = jQuery.extend({
		   width:80,//标签宽度
		   margin:0,//标签间隔
		   marginLeft : 0, //左面间隔
		   animateTime:300,//动画时间
		   customAttr:'role',//自定义属性标签名称
		   tabArrowName:$('#tab_arrow'),
		   keyWord:'hover',
		   tagClass:'p_blk_title'
		},settings);
		
		var target=this;
		
		function main(){
			var tagWidth=settings.tabArrowName.outerWidth()/2;
			target.hover(function(){
				var object=$(this);
				var objectName=$(this).selector;
				var tag=object.find('.'+settings.tagClass);
				object.addClass(settings.keyWord).siblings(':not('+settings.tabArrowName.selector+')').removeClass(settings.keyWord);
				var role=object.attr(settings.customAttr);
				object.siblings('#'+settings.tabArrowName.selector).stop(true,false).animate({'left':parseInt(tag.css('left'))+(tag.outerWidth()/2)-tagWidth},settings.animateTime);
				//console.log(parseInt(tag.css('left')));
			});
			return target;
		}
		
		return main();
	}
	//页面滚动固定插件
	jQuery.fn.fixedObject = function(settings){
		settings = jQuery.extend({
			paddingHeight:0,
			floatContent:$('#floatContent'),
			topFlame:this
		},settings);

		var target=this;
		var targetHeight=target.outerHeight();
		var positionY=target.offset().top;
		positionY=positionY+settings.paddingHeight;
		var stopPos=settings.floatContent.outerHeight()-targetHeight-35;
		var stopFix=stopPos+settings.topFlame.offset().top;
		
		function main(){
			window.onscroll = function(){
				checkScrollTop();
			}
			function checkScrollTop(){
				var pageScroll=$(document).scrollTop();
				if(pageScroll>stopFix){
					target.addClass('fixedBot').removeClass('fixed').css('top',stopPos);
				}
				else if(pageScroll>positionY){
					target.addClass('fixed').removeClass('fixedBot').css('top','');
				}
				else{
					target.removeClass('fixed').removeClass('fixedBot');
				}
			};
			checkScrollTop();
			return target;
		}

		return main();
	}
	//页面表单禁用或可用
	jQuery.fn.gzlInputToggle = function(settings){
		settings = jQuery.extend({
			abled:$('#needInvoice'),
			disabled:$('#noInvoice'),
			defaultInput:$('#defaultInput')
		},settings);

		var target=this;
		
		function main(){
			settings.abled.change(function(){
				var tg = $(this);
				checkeInput(tg);
			});
			
			settings.disabled.change(function(){
				var tg = $(this);
				if(tg.attr("checked")=="checked"){
					target.find('.abled').addClass("disabled").removeClass("abled").attr({'disabled':'disabled','checked':false}).val('');
				}
			});
			
			return target;
		}
		
		function checkeInput(tg){
			if(tg.attr("checked")=="checked"){
				target.find('.disabled').removeClass("disabled").addClass('abled').attr("disabled",false);
				settings.defaultInput.attr('checked','checked');
			}
		}

		return main();
	}
	//页面表单显示或不显示
	jQuery.fn.gzlInputVisible = function(settings){
		settings = jQuery.extend({
			controlName:'role',
			object:$("#tips"),
			item:$('.tips')
		},settings);

		var target=this;
		var item=settings.item.selector;
		
		function main(){
			var role=target.attr(settings.controlName);
			settings.object.find(item+':eq('+role+')').addClass('visible').siblings().removeClass('visible');
			
			return target;
		}

		return main();
	}
	//Object滚动插件 使用方法:$('#目标对象画框').announce($('#单位容器'),$('#跳转下一页'),$('#跳转上一页'),单位宽度,自动执行间隔时间);
	jQuery.fn.announce=function (settings) {
		settings = jQuery.extend({
			textCont:$('#textCont'),
			next:$('#next'),
			prev:$('#prev'),
			liWidth:0,
			time:4000,
			autoRoll:true,
			rollablefx:function(){return false;}
		},settings);
		var $_textContLi=settings.textCont.children();
		var ancNum=settings.textCont.children().length;
		var itv;
		if(settings.liWidth==0){
			settings.liWidth=$_textContLi.width();
		}
		settings.textCont.css('width',ancNum*settings.liWidth)
		function excute_Next(){
			settings.textCont.stop(true,false).animate({'left':-settings.liWidth},300,'swing',function(){$(this).children(':eq(0)').appendTo($(this));$(this).css('left',0);});
		}
		function setIntv(){
			if(settings.autoRoll)
			itv=setInterval(excute_Next,settings.time);
		}
		function clearIntv(e){
			if(settings.autoRoll)
			clearInterval(e);		
		}
		function excute_Prev(){
			var $_lastLi=settings.textCont.children(':last');
			$_lastLi.css({'position':'absolute','left':-settings.liWidth});
			settings.textCont.stop(true,false).animate({'left':+settings.liWidth},300,'swing',function(){$_lastLi.insertBefore($(this).children(':eq(0)')).attr('style','');$(this).css('left',0);});
		}
		if(ancNum>1){
			setIntv();
			settings.next.click(function(){
				clearIntv(itv);
				excute_Next();
				setIntv();
			});
			settings.prev.click(function(){
				clearIntv(itv);
				excute_Prev();
				setIntv();
			});
			settings.rollablefx();
		}else{
			settings.next.addClass('disabled').attr('cursor','default');
			settings.prev.addClass('disabled').attr('cursor','default');
		}
		return this;
	}
	//日期下拉框***使用方法:$(selector).dateSelect($('#年份选择'),$('#月份选择'),$('#日期选择'));
	jQuery.fn.dateSelect=function (settings) {
		settings = jQuery.extend({
			yearSelect:$('#year'),
			monthSelect:$('#month'),
			daySelect:$('#day')
		},settings);
		var now=new Date();
		var monthDate=[31,null,31,30,31,30,31,31,30,31,30,31]
		var year=settings.yearSelect.val(),month=settings.monthSelect.val();
		function main(){
			for(year=now.getFullYear();year>(1900-1);year--){
				creteOption(settings.yearSelect,year);
			}
			for(month=1;month<13;month++){
				creteOption(settings.monthSelect,month);
			}
			function creteOption(e,num){
				e.append('<option value="'+num+'">'+num+'</option>');
			}
			function creatDay(days){
				for(day=1;day<days+1;day++){
					creteOption(settings.daySelect,day);
				}
			}
			function judgeYearMonth(){
				year=settings.yearSelect.val();
				month=settings.monthSelect.val();
				settings.daySelect.find('option').remove();
				if(month!=2){
					creatDay(monthDate[month-1]);
				}else{
					var febDays=((year%4==0) && (year%100!=0)) || ((year%100==0) && (year%400==0))?29:28;
					creatDay(febDays);
				}
			}
			creatDay(31);
			settings.yearSelect.change(function(){
				judgeYearMonth();
			});
			settings.monthSelect.change(function(){
				judgeYearMonth();
			});
			return this;
		}
		return main();
	}
	//tab显示隐藏***使用方法:$(selector).dateSelect() @param String bind[绑定事件字符串] @param Array mainArr [jQuery DOM对象字符串] @param String keyWord[显示类名];
	jQuery.fn.tabSwitch=function (opts) {
		opts = jQuery.extend({
			bind:"click",
			mainArr:[""],//jQuery DOM对象字符串
			keyWord:"hover"
		},opts);
		
		this.bind(opts.bind,function(){
			var _this=$(this)
			var role=_this.parent().children().index(_this);
			$(opts.mainArr[role]).addClass(opts.keyWord).siblings().removeClass(opts.keyWord);
		});
		
		return this;
	}
	//页面计价
	jQuery.extend({
		changeNum:function (e,t){
			t.text(e.val());
			return e.val();
		},
		countPrice:function(opts){
			opts = jQuery.extend({
				price:[],
				num:[]
			},opts);
			function main(){
				var total=[0];
				var singal=0;
				for(var i = 0; i<opts.num.length; i++){
					singal=opts.price[i]*opts.num[i];
					total[0]+=singal;
					total.push(singal);
				}
				
				return total
			}
			
			return main();
		}		
    });
	/**
		 * jQuery EnPlaceholder plug
		 * EnPlaceholder是一个跨浏览器实现placeholder效果的jQuery插件
		 * version 1.0
		 * by Frans.Lee <dmon@foxmail.com>  http://www.ifrans.cn
		 */
	jQuery.fn.extend({
        "placeholder":function (options) {
            options = $.extend({
                placeholderColor:'#A8A8A8',
                isUseSpan:false, //是否使用插入span标签模拟placeholder的方式,默认false,默认使用value模拟
                onInput:true,  //使用标签模拟(isUseSpan为true)时，是否绑定onInput事件取代focus/blur事件
				lfpos:'auto'
            }, options);
			
            $(this).each(function () {
                var _this = this;
				var tagName=$(this).tagName;
                var supportPlaceholder = 'placeholder' in document.createElement('input');
                if (!supportPlaceholder) {
                    var defaultValue = $(_this).attr('placeholder');
                    var defaultColor = $(_this).css('color');
                    if (options.isUseSpan == false) {
                        $(_this).focus(function () {
							var pattern = new RegExp("^" + defaultValue + "$|^$");
							pattern.test($(_this).val()) && $(_this).val('').css('color', defaultColor);
                        }).blur(function () {
                                if ($(_this).val() == defaultValue) {
                                    $(_this).css('color', defaultColor);
                                } else if ($(_this).val().length == 0) {
                                    $(_this).val(defaultValue).css('color', options.placeholderColor)
                                }
                            }).trigger('blur');
                    } else {
                        var $imitate = $('<span class="wrap-placeholder" style="position:absolute; display:inline-block; overflow:hidden; color:'+options.placeholderColor+'; width:'+$(_this).outerWidth()+'px; height:'+$(_this).outerHeight()+'px;">' + defaultValue + '</span>');
                        $imitate.css({
                            'margin-left':$(_this).css('margin-left'),
                            'margin-top':$(_this).css('margin-top'),
							'left':options.lfpos,
                            'font-size':$(_this).css('font-size'),
                            'font-family':$(_this).css('font-family'),
                            'font-weight':$(_this).css('font-weight'),
                            'padding-left':parseInt($(_this).css('padding-left')) + 2 + 'px',
                            'line-height':_this.nodeName.toLowerCase() == 'textarea' ? $(_this).css('line-weight') : $(_this).outerHeight() + 'px',
                            'padding-top':_this.nodeName.toLowerCase() == 'textarea' ? parseInt($(_this).css('padding-top')) + 2 : 0
                        });
                        $(_this).before($imitate.click(function () {
                            $(_this).trigger('focus');
                        }));

                        $(_this).val().length != 0 && $imitate.hide();

                        if (options.onInput) {
                            //绑定oninput/onpropertychange事件
                            var inputChangeEvent = typeof(_this.oninput) == 'object' ? 'input' : 'propertychange';
                            $(_this).bind(inputChangeEvent, function () {
                                $imitate[0].style.display = $(_this).val().length != 0 ? 'none' : 'inline-block';
                            });
                        } else {
                            $(_this).focus(function () {
                                $imitate.hide();
                            }).blur(function () {
                                    /^$/.test($(_this).val()) && $imitate.show();
                                });
                        }
                    }
                }
            });
            return this;
        }
    });
	
	//展开/隐藏:$(selector).gzlToggleShow() @param Object content[展开隐藏容器对象] @param Number [隐藏时高度] @param Boolean [是否默认隐藏] @param String hideText [隐藏时文本] @param String openText [展开时文本]; @param Number animateTime [动画时间];	
	jQuery.fn.gzlToggleShow=function(settings,callback1,callback2){
		settings = jQuery.extend({
			content:$('#content'),
			shortHeight:583,
			defaultHide:true,
			hideText:'▼点击展开Tip列表',
			openText:'▲点击隐藏Tip列表',
			animateTime:'normal'
		},settings);
		
		var _this=this;
		var content=settings.content;
		var contentHeight=content.outerHeight();
			
		var set=[[settings.shortHeight,settings.hideText],[contentHeight,settings.openText]]
		
		function main(){
			content.css('overflow','hidden');
			if(settings.defaultHide){
				content.height(settings.shortHeight);
				_this.html(set[0][1]);
				_this.toggle(function(){
					if (typeof callback1 == 'function') // 确保类型为函数类型
						excute(false,callback1,1);
				},function(){
					if (typeof callback2 == 'function')
						excute(true,callback2,2);
				});
			}else{
				_this.html(set[1][1]);
				_this.toggle(function(){
					if (typeof callback2 == 'function')
						excute(true,callback2,2);
				},function(){
					if (typeof callback1 == 'function')
						excute(false,callback1,1);
				});
			}
			return _this;
		};
		
		function excute(e,f,n){
			var i=(e)?0:1;
			if(n==2)
			f.call(_this);
			content.stop(true,false).animate({"height":set[i][0]},settings.animateTime,function(){
				_this.html(set[i][1]);
				if(n==1)
				//console.log(n);
				f.call(_this);
			});
		}
		
		return main();
	}
	
	//滚动到指定位置:$(selector).scrollTo() @param string bind[绑定事件字符串]  @param string object[对象] @param number time[动画时间]
	jQuery.fn.scrollTo=function(bind,object,time,margin){
		var _this=$(this);
		function main(){
			if((typeof bind) =='string'&&(typeof object) =='string'&&(typeof time) =='number'&&(typeof margin) =='number'){
				_this.bind(bind,function(){
					$('body,html').animate({scrollTop:($(object).offset().top-margin)},time);
				});
			}
			return _this;
		};
		return main();
	}
});











