(function ($) {
    "use strict";

// Windows load

    $(window).load(function () {

// Site loader 

        $(".loader-inner").fadeOut();
        $(".loader").delay(200).fadeOut("slow");

    });

// Document ready

    $(document).ready(function () {


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

        const works = $('.works');
        $('.popup-youtube, .popup-vimeo').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });


        $('.filter ').on("click", "li a", function () {
            $(this).addClass('active');
            $(this).parent().siblings().find('a').removeClass('active');
            const filters = $(this).attr('data-filter');
            $(this).closest(works).find('.item').removeClass('disable');

            if (filters !== 'all') {
                const selected = $(this).closest(works).find('.item');
                for (let i = 0; i < selected.length; i++) {
                    if (!selected.eq(i).hasClass(filters)) {
                        selected.eq(i).addClass('disable');
                    }
                }
            }

            return false;
        });


// Search input

        $('.search-form i').on("click", function () {
            $(this).closest('.search-form').find('input[type="text"]').focus();
            if ($(this).closest('.search-form').find('input[type="text"]').val()) {
                $(this).closest('.search-form').find('input[type="submit"]').trigger('click');
            }
        });

// Form validation 

        const inputName = $('input#name');
        const inputEmail = $('input#email');
        const textArea = $('textarea#message');
        const contactForm = $('.contact-form');


        $('.submit').on("click", function () {

            inputName.removeClass("errorForm");
            textArea.removeClass("errorForm");
            inputEmail.removeClass("errorForm");

            let error = false;
            const name = inputName.val();
            if (name === "" || name === " ") {
                error = true;
                inputName.addClass("errorForm");
            }


            const msg = textArea.val();
            if (msg === "" || msg === " ") {
                error = true;
                textArea.addClass("errorForm");

            }

            const email_compare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
            const email = inputEmail.val();
            if (email === "" || email === " ") {
                inputEmail.addClass("errorForm");
                error = true;
            } else if (!email_compare.test(email)) {
                inputEmail.addClass("errorForm");
                error = true;
            }

            if (error === true) {
                return false;
            }

            const data_string = contactForm.serialize();

            $.ajax({
                type: "POST",
                url: contactForm.attr('action'),
                data: data_string,

                success: function (message) {
                    if (message === 'SENDING') {
                        $('#success').fadeIn('slow');
                    } else {
                        $('#error').fadeIn('slow');
                    }
                }

            });

            return false;
        });

    });


})(jQuery);
