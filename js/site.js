/*
 * SweetPea Site Scripts
 * Version: 0.0.0
 *
 * Author: Chris Rivers
 * xxcriversxx@gmail.com
 *
 * Changelog: 
 * Version: 1.0.0
 *  Init Build
 *
 */

var startedInstagram = 0;

function goToByScroll(id, speed){
	$('html,body').animate({scrollTop: ($(".slide."+id).offset().top) }, speed);
}

$(function(){
	
	// Navigation Animation
	$(window).scroll(function(){

		if( $("#header").hasClass("minimized") ){

			if( $(this).scrollTop() < 800 ){
				$("#header").stop().animate({ top: "0" });
				$("#header").removeClass("minimized");
			}

		} else {
			if($(this).scrollTop() > 800){
				$("#header").stop().animate({ top: "-38px" });
				$("#header").addClass("minimized");
			}
			
			if($(this).scrollTop() > 200){
				$("#header .scroll-glyph").animate({ top: "1000px" }, 1000, function(){
					$("#header .scroll-glyph").remove();
					clearTimeout(interval);
				});
			}
		}
		
		if($(this).scrollTop() > 9452){
			if( startedInstagram == 0 ){
				// Instagram Theatre
				$('.instagram-theatre').instagramTheatre({
					mode : 'popular',
				});
				
				startedInstagram = 1;
			}
		}

	});
	
	// Adds flexiblity for slide backgrounds.
	$("#middle .slide").not(".no-bg").each(function(){
		$(this).css("background-image", "url("+ $(this).find(".slide-bg img").attr("src") +")");
	});
	
	// Navigation
	var headerNavSpeed = parseInt($("#header .navigation").attr("rel"));
	if( headerNavSpeed == ""){ headerNavSpeed = 1000; } // Default
		
	$("#header .navigation a, #header .logo a, a.scrollTo").click(function(){
		goToByScroll( ($(this).attr("rel")), headerNavSpeed );
		return false;
	});
	
	// Form Validation
	$(".miniSurveyView").validationEngine({scroll: false});
	
	// Demo Purposes only
	$(".miniSurveyView").submit(function(){
		if( $('.miniSurveyView').validationEngine('validate') == true ){
			
			// Store Data
			var formData = $(this).serialize();

			// Ajax
			$.ajax({  
				type: "POST",
				url: "form-process.php", // Make sure this point to the correct location.
				data: formData,
				success: function( data, textStatus, jqXHR ){

				}
			});
						
			var newhtml = "<div class='thanks' style='text-align:center;'>";
			newhtml += 		"<h2 style='margin-bottom: 19px;'>Thank You</h2>";
			newhtml += 		"<p>We will get back to you soon!</p>";
			newhtml +=    "</div>";

			$("#middle .slide.contact .content").html(newhtml);
			$("#middle .slide.contact .content .thanks").hide().fadeIn();
			
			return false;
		}
	});
	
	// Scroll Glyph
	var interval = setInterval(animateGlyph, 700);
	function animateGlyph() { $("#header .scroll-glyph").toggleClass('on'); }
	
	// Customization Bar
	$("#middle #customization-bar").css("top", 1000).delay(500).animate({
		top: '180px'
	}, 400);

	// Skins
	var mySkins = new Array();
	mySkins[0] = "night";
	mySkins[1] = "ocean";
	mySkins[2] = "fierce";
	mySkins[4] = "earth";
	mySkins[5] = "future";

	$("#customization-bar select.choose-theme").change(function(){
		// Out with old
		$.each(mySkins, function(i,e){
			$("body").removeClass(e);
		});

		// In with the new
		$("body").addClass($(this).val());
	});
});
