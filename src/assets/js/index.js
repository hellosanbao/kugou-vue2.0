$(function(){
	$(document).scroll(function(){
		var changeTop=$(".top-change-data")[0].getBoundingClientRect().top;
		if(changeTop<=50){
			$(".opacted-bar").addClass('change-top-bg')
		}else{
			$(".opacted-bar").removeClass('change-top-bg')
		}
	})

	$(".show-more").click(function(){
		console.log()
		$(".list-js-text").toggleClass("hide-text")
	})
})