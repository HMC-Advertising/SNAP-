(function($) {

	var newHashName;
	var hash = window.location.hash;
	
	switch(hash){
		case "#start":
			newHashName=0;
		break;
		case "#shop":
			newHashName=1;
		break;
		case "#store":
			newHashName=2;
		break;
		case "#prep":
			newHashName=3;
		break;
		case "#eat":
			newHashName=4;
		break;
		case "#resources":
			newHashName=5;
		break;
		default:
			newHashName=-1;
		break;
	}
	

	$('#content').accordion({
		oneOpenedItem	: true,
	 	open: newHashName
	});

	$("#navigation li[data-id='"+ hash +"']").addClass("active");
	$(hash).parent().addClass("minus");
	if(newHashName != -1){
		$(hash + " .plus i").removeClass("glyphicon-plus").addClass("glyphicon-minus");
	}

	
	$("#navigation li a").on("click", function(e){
		window.location.reload(true)
	});

	$(".panel .panel-heading a").on("click", function(e){
		
		$(".panel .panel-heading a").children().html("More");

		if($(this).hasClass("collapsed")){
			$(this).children().html("Close")
		}
		else{
			$(this).children().html("More")
		}
	});

	$(".st-arrow").on("click",function(e){
		
		var link = $(this).attr("id");

		$(".st-arrow").find("i").removeClass("glyphicon-minus").addClass("glyphicon-plus");

		$("#nav .nav li").removeClass("active");
		
		$(this).parent().toggleClass("minus");
		
		if($(this).parent().hasClass("minus")){
				$(this).find("i").removeClass("glyphicon-plus").addClass("glyphicon-minus");

		}
		else{
			$(this).find("i").removeClass("glyphicon-minus").addClass("glyphicon-plus");
		}
		
	
		
		$("#nav .nav li a[href='#"+link+"']").parent().toggleClass("active");
	})




}(jQuery));