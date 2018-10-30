(function($) {
  "use strict";

// Windows load

$(window).load(function() { 

// Site loader 

$(".loader-inner").fadeOut(); 
$(".loader").delay(200).fadeOut("slow"); 

});

// Document ready

$(document).ready(function(){
		

// Site slider 

$("#testimonial-carousel").owlCarousel({
    navigation : false,
    slideSpeed : 300,
    paginationSpeed : 400,      
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window,
    pagination: true,
	autoPlay:true,
    singleItem: true   
});
  
  
$("#block-slider").owlCarousel({
    navigation : true,
    slideSpeed : 300,
    paginationSpeed : 400,      
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window,
    pagination: false,
	autoPlay:true,
    singleItem: true,
    navigationText: ["<span class='icon-left-open-big'></span>","<span class='icon-right-open-big'></span>"]  
});

//Portfolio setup 

$('.popup').magnificPopup({
	type: 'image',
	fixedContentPos: false,
	fixedBgPos: false,
	mainClass: 'mfp-no-margins mfp-with-zoom',
	image: {
		verticalFit: true
	},
	zoom: {
		enabled: true,
		duration: 300
	}
});

var works = $('.works');
$('.popup-youtube, .popup-vimeo').magnificPopup({
	disableOn: 700,
	type: 'iframe',
	mainClass: 'mfp-fade',
	removalDelay: 160,
	preloader: false,
	fixedContentPos: false
});
				

$('.filter ').on("click", "li a",function(){
	$(this).addClass('active');
	$(this).parent().siblings().find('a').removeClass('active');
    var filters = $(this).attr('data-filter');
    $(this).closest(works).find('.item').removeClass('disable');

    if (filters !== 'all') {
       var selected =  $(this).closest(works).find('.item');
        for(var i = 0; i < selected.length; i++){
        if (!selected.eq(i).hasClass(filters)) {
           selected.eq(i).addClass('disable');
		}
    }	
}
   
   return false;
});


// Search input
	
$('.search-form i').on("click", function(){
	$(this).closest('.search-form').find('input[type="text"]').focus();
	if($(this).closest('.search-form').find('input[type="text"]').val()){
		$(this).closest('.search-form').find('input[type="submit"]').trigger('click');
	}
});

// Form validation 

var inputName = $('input#name');
var inputEmail = $('input#email');
var textArea = $('textarea#message');
var contactForm = $('.contact-form');


$('.submit').on("click", function(){

	inputName.removeClass("errorForm");
	textArea.removeClass("errorForm");
	inputEmail.removeClass("errorForm");
	
	var error = false; 
	var name = inputName.val(); 
	if(name == "" || name == " ") { 
		error = true; 
		inputName.addClass("errorForm");
	}
	
	
	var msg = textArea.val(); 
	if(msg == "" || msg == " ") {
		error = true;
		textArea.addClass("errorForm");
			
	}
	
	var email_compare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i; 
	var email = inputEmail.val(); 
	if (email == "" || email == " ") { 
		inputEmail.addClass("errorForm");
		error = true;
	}else if (!email_compare.test(email)) { 
		inputEmail.addClass("errorForm");
		error = true;
	}

	if(error == true) {
		return false;
	}

	var data_string = contactForm.serialize(); 
	
	$.ajax({
		type: "POST",
		url: contactForm.attr('action'),
		data: data_string,
		
		success: function(message) {
				if(message == 'SENDING'){
					$('#success').fadeIn('slow');
				}
				else{
					$('#error').fadeIn('slow');
				}
					}
			
	});

	return false; 
});

});


})(jQuery);
