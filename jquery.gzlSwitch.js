/**
 * 官网切换页面插件
 *
 * jQuery gzlSwitch plugin
 *
 * @name jquery.gzlSwitch.js
 * @version 1.0
 * @author jamieTsnag
 * @date 2013-05-15
 * @Email:331252914@qq.com
 * @QQ:331252914
 *
 *
 **/
$(function(){
	$.fn.gzlSwitch=function(opts){
		opts=jQuery.extend({
			frame:$('#frame'),
			content:$('#content'),
			tab_arrow:$('#tab_arrow'),
			events:'click',
			btn_pos:[0,10]
		},opts);
		
		var _this=this;
		var item_num=opts.content.children().length;
		var item_width=opts.content.width();
		var _this_width=_this.width();
		var cur_num=0;
		var arrow_dst=_this_width+opts.btn_margin;
		
		function initial(){
			opts.content.css('width',item_width*item_num);
			
			_this.bind(opts.events,function(){
				var this_index=$(this).parent().find('a').index($(this));
				var snum=Math.abs(cur_num-this_index);
				var diff=item_width*snum;
				opts.tab_arrow.css('width',_this_width);
				if(cur_num<this_index){
					execute(-diff,this_index,$(this));
				}else{
					execute(parseInt(opts.content.css('left'))+diff,this_index,$(this));
				}
				arrow_execute(opts.btn_pos[this_index]);
			});
			return this
		};
		
		function execute(diff,index,_object){
			opts.content.stop(true,false).animate({'left':diff},300,function(){
				_object.addClass('hover').siblings().removeClass('hover');
				cur_num=index;
			});
		}
		
		function arrow_execute(distance){
			opts.tab_arrow.stop(true,false).animate({'left':distance},300);
		}
		
		return initial();
	}

});