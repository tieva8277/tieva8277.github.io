/*================
 Template Name: AppCo App Landing Page Template
 Description: AppCo is app and product landing page template.
 Version: 1.0
 Author: https://themeforest.net/user/themetags
=======================*/

// TABLE OF CONTENTS
// 1. fixed navbar
// 2. page scrolling feature - requires jQuery Easing plugin
// 3. closes the responsive menu on menu item click
// 4. magnify popup video
// 5. client testimonial slider
// 6. Screenshots slider
// 7. custom counter js with scrolling
// 8. client-testimonial one item carousel
// 9. our clients logo carousel
// 10. our clients logo carousel
// 11. wow js


jQuery(function ($) {

    'use strict';
    // 1. fixed navbar
    $(window).on( 'scroll', function () {
        // checks if window is scrolled more than 500px, adds/removes solid class
        if ($(this).scrollTop() > 60) {
            $('.navbar').addClass('affix');
        } else {
            $('.navbar').removeClass('affix');
        }
    });


    // 2. page scrolling feature - requires jQuery Easing plugin
    $(function() {
        $(document).on('click', 'a.page-scroll', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top-60
            }, 900, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // 3. closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function(event) {
        if (!$(this).parent().hasClass('dropdown'))
            $(".navbar-collapse").collapse('hide');
    });

  function submitGetQuoteForm(){
    // Initiate Variables With Form Content
    var name = $('#getQuoteFrm input[name="name"]').val();
    var email = $('#getQuoteFrm input[name="email"]').val();
    var subject = $('#getQuoteFrm input[name="subject"]').val();
    var message = $('#getQuoteFrm textarea[name="message"]').val();
    
    if (!$('#getQuoteFrm #exampleCheck1').is(":checked")) {
        submitMSG(false, '.sign-up-form-wrap');
        return;
    }

    $.ajax({
        type: "POST",
        url: "libs/quote-form-process.php",
        data: "name=" + name + "&email=" + email + "&subject=" + subject + "&message=" + message,
        success : function(text){
            if (text == "success"){
                quoteFormSuccess();
            } else {
                submitMSG(false, '.sign-up-form-wrap');
            }
        }
    });
  }

  function quoteFormSuccess(){
    $("#getQuoteFrm")[0].reset();
    submitMSG(true, '.sign-up-form-wrap');
  }


  // contact form
    if($("#contactForm").length) {
        $("#contactForm").validator().on("submit", function (event) {
            if (event.isDefaultPrevented()) {
            // handle the invalid form...
                submitMSG(false, '.contact-us');
            } else {
            // everything looks good!
                event.preventDefault();
                submitContactForm();
            }
        });
    }


    function submitContactForm(){
        // Initiate Variables With Form Content
        var name    = $("#contactForm #name").val();
        var email   = $("#contactForm #email").val();
        var phone   = $("#contactForm #phone").val();
        var company = $("#contactForm #company").val();
        var message = $("#contactForm #message").val();
        formSuccess();
    }
    function formSuccess(){
        $("#contactForm")[0].reset();
        submitMSG(true, '.contact-us');
    }

    function submitMSG(valid, parentSelector){
        if(valid){
            $(parentSelector + " .message-box").removeClass('d-none').addClass('d-block ');
            $(parentSelector + " .message-box div").removeClass('alert-danger').addClass('alert-success').text('Send successfully');
        } else {
            $(parentSelector + " .message-box").removeClass('d-none').addClass('d-block ');
            $(parentSelector + " .message-box div").removeClass('alert-success').addClass('alert-danger').text('Found error in the form. Please check again.');
        }
    }

}); // JQuery end