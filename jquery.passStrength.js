(function($){ 
    $.fn.shortPass = 'Too short';
    $.fn.badPass = 'Weak';
    $.fn.goodPass = 'Good';
    $.fn.strongPass = 'Strong';
    $.fn.samePassword = 'Username and Password identical.';
    $.fn.resultStyle = "";
    
     $.fn.passStrength = function(options) {  
      
         var defaults = {
                userid:            "",                //required override
				msBar: $('#passStrength'),
				pwConfirm: $("#confirmPassword"),
				checkForm: $('#form')
            }; 
             var opts = $.extend(defaults, options);  
              
             return this.each(function() { 
                  var obj = $(this);
                 
                 $(obj).unbind().keyup(function()
                 {
                    
                    var results = $.fn.teststrength($(this).val(),$(opts.userid).val(),opts);
					opts.msBar.removeClass().addClass('length'+results);;
					if(results>1){
						opts.pwConfirm.removeClass('disabled').addClass('validate[required,equals[newPassword]]').attr('disabled',false);
					}else{
						opts.pwConfirm.addClass('disabled').removeClass('validate[required,equals[newPassword]]').attr('disabled',true).val('');
						opts.checkForm.validationEngine();
					}
                  });
                  
                 //FUNCTIONS
                 $.fn.teststrength = function(password,username,option){
                          var score = 0; 
                         
						 //password < 4
                        if (password.length < 1 ) {return 0; }
						 
                         //password < 4
                        if (password.length < 6 || password.match(/^[0-9]+$/) || password.match(/^.{3}$/) || (password.match(/^[a-zA-Z]+$/)&&password.length < 7)) {return 1;}
                         
                         //password == user name
						 if(username!=undefined)	
                         if(password.toLowerCase()==username.toLowerCase())
							return 1;
                         //password length
                         score += password.length * 4;
                         score += ( $.fn.checkRepetition(1,password).length - password.length ) * 1;
                         score += ( $.fn.checkRepetition(2,password).length - password.length ) * 1;
                         score += ( $.fn.checkRepetition(3,password).length - password.length ) * 1;
                         score += ( $.fn.checkRepetition(4,password).length - password.length ) * 1;
             
                         //password has 3 numbers
                         if (password.match(/(.*[0-9].*[0-9].*[0-9])/)){ score += 5;} 
                         
                         //password has 2 symbols
                         if (password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)){ score += 5 ;}
                         
                         //password has Upper and Lower chars
                         if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){  score += 10;} 
                         
                         //password has number and chars
                         if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)){  score += 15;} 
                         //
                         //password has number and symbol
                         if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/)){  score += 15;} 
                         
                         //password has char and symbol
                         if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-zA-Z])/)){score += 15;}
                         
                         //password is just a numbers or chars
                         if (password.match(/^\w+$/) || password.match(/^\d+$/) ){ score -= 10;}
                         
                         //verifying 0 < score < 100
                         if ( score < 0 ){score = 0;} 
                         if ( score > 100 ){  score = 100;} 
                         
                         if (score < 60 ){return 2;} 
                         if (score < 70 ){return 3}
                         
                        /* this.resultStyle= option.strongPass; */
                         return 3;
                         
                 };
          
          });  
     };  
})(jQuery); 


$.fn.checkRepetition = function(pLen,str) {
     var res = "";
     for (var i=0; i<str.length ; i++ ) 
     {
         var repeated=true;
         
         for (var j=0;j < pLen && (j+i+pLen) < str.length;j++){
             repeated=repeated && (str.charAt(j+i)==str.charAt(j+i+pLen));
             }
         if (j<pLen){repeated=false;}
         if (repeated) {
             i+=pLen-1;
             repeated=false;
         }
         else {
             res+=str.charAt(i);
         }
     }
     return res;
    };