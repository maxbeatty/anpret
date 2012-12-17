$(function(){
		var lastId = 0;
		var mobileSuffix = "";
		var ver = "1.2"; /* version of screenshots per app store version */
		var ext = "jpg"; /* extension of screenshot images */
		
		// check if iPhone or iPod
		if((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1)){
			mobileSuffix = "-sm";
			var iPhoneTop = $('#screenshot').offset().top + 107;
			$('#screenshot').attr('src','img/screenshots/splash-sm.'+ext)
				.load(function(){
					$(this).fadeIn('slow');
				});
		} else {
			// fix appstore button to top of page when scroll down
			var appstore = $('#appstore');
			var appLower = $('#appstore_lower');
			var appUpper = $('#appstore_upper');
			//var top = appstore.offset().top + parseFloat(appstore.css('marginTop').replace(/auto/, 0));
			//var top = appstore.offset().top;
			var top = $("header").height();
			var lower = true;
			
			$(window).scroll(function (event) {
				// what the y position of the scroll is
				var y = $(this).scrollTop();
				
				if ((y >= top) && lower) {
					// fix to top
					appstore.fadeOut('fast',function(){
						$(this).prependTo(appUpper).fadeIn('fast');
						lower = false;
					});		
				} else if((y < top) && !lower){
					appstore.fadeOut('fast',function(){
						$(this).prependTo(appLower).fadeIn('fast');
						lower = true;
					});
				}
			});
		}
		
		$.fn.changeScreenshot = function(lastId) {
			$(this).fadeOut('fast', function() {
				$("#loading").show();
				$(this).attr('src','img/screenshots/'+ver+'/screenshot_' + lastId + mobileSuffix + '.'+ext)
				.load(function() {
					$("#loading").hide();
					if(mobileSuffix == "-sm") { //only scroll if on iPhone
						$('html, body').animate({scrollTop : iPhoneTop}, 400);
					}
					$(this).fadeIn('slow');
				});
			});
		}
		
		$('#feature_desc li').click(function() {
			if(lastId!=this.id){
				$(this).addClass('active');
				$('#'+lastId).removeClass('active');
				lastId = this.id;
				$('#screenshot').changeScreenshot(lastId);
			}
			return false;
		});
		
		$('#feature_desc li a').click(function(event){
			event.stopImmediatePropagation();
		});
});