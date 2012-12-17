$(function () {
	$('#slideshow').cycle({
			fx:      'scrollLeft',
		    next:   '#slideshow',
		    timeout:  1000
	});
	$('.sendBTN').attr("disabled","disabled").parent().addClass("btn-disabled");
	
	$("form#contact textarea").bind("keyup", function() {
		if ($(this).val() == ""){
			$('.sendBTN').attr("disabled","disabled").parent().addClass("btn-disabled");
    	} else {
			$('.sendBTN').removeAttr("disabled").parent().removeClass("btn-disabled");
		};
	});
	
	$('.error').hide();
	$(".sendBTN").click(function () {});
	$("form#contact").submit(function () {
		$('label').css("color","#CCC");
		$('.input-text').attr("disabled", "disabled");
		$('.error').hide();
		var from = $("input#from").val();
		if (from == "") {
			$("#label_from").css("color","#D40D12");
			$('.input-text').removeAttr("disabled");
			$("input#from").focus();
			return false
		}
		var email = $("input#email").val();
		if (email == "") {
			$("#label_email").css("color","#D40D12");
			$('.input-text').removeAttr("disabled");
			$("input#email").focus();
			return false
		}
		var note = $("textarea#note").val();
		if (note == "") {
			$("#label_note").css("color","#D40D12");
			$('.input-text').removeAttr("disabled");
			$("input#note").focus();
			return false
		}
		var dataString = 'from=' + from.toString() + '&email=' + email.toString() + '&note=' + note.toString();
		$.ajax({
			type: "POST",
			url: "email.php",
			data: dataString,
			success: function (msg) {
				$('#contact').ajaxComplete(function (event, request, settings) {
					if (msg == 'OK') {
						result = "<div id='message'><p>Thanks! We'll get back to you in the future.</p></div>";
						$("#contact_form").hide();
						$(this).empty()
					} else {
						result = msg;
						$('.input-text').attr("disabled", false)
					}
					$(this).fadeIn(1500, function () {
						$(this).append(result)
					})
				})
			}
		});
		return false
	})
});