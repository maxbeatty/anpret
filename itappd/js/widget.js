$(function(){

	$("#genWid").click(function(e){
		e.preventDefault();
		
		$.ajax({
			type : 'POST',
			url : 'php/untappd_api.php',
			dataType : 'JSON',
			data : {user : $("input#username").val()},
			success : function(data){
				$("#userResult").append(data);
				// first_name
				// last_name
				// user_name
				// user_avatar
				// date_joined
				// total_badges
				// total_friends
				// total_checkins
				// total_beers
				// total_created_beers
			},
			error : function(e, xhr, settings, exception){
				$("#userResult").append("AJAX error");
			}
		});
	});
	
});