
var globalProp = {
    windowHeight: $(window).height(),
    currentSectionId: 1,
    isAnimation: false,
    sections: $('.main-section'),
    siteNav: $('.site-nav'),
    currentPosition: 0
};

function toggleModalWindowVisibility(el) {

    if ( !$(el).hasClass('close-button') ) {
        globalProp.currentPosition = $(window).scrollTop();
    }

    $('.site-nav').toggleClass('hidden')
    $('body').toggleClass('fixed');
    $('.main-wrapper').toggleClass('blured');

    if ( $(el).hasClass('close-button') ) {
        event.preventDefault();
        $(window).scrollTop(globalProp.currentPosition);
    }
}


$( window ).resize(function() {
    globalProp.windowHeight = $(window).height();
    $('.site-nav').removeClass('fixed-nav');

    //    others
});


$('.nav-trigger').on('click touch', function(event) {
    var isVisible = $('.mobile-nav').hasClass('show-flex');
    $('.mobile-nav').toggleClass('show-flex');
    toggleModalWindowVisibility(this);

    if (!isVisible) {
        $('.mobile-nav').addClass('animated fadeIn');
    }
});



$('.clients-carousel').slick({
    prevArrow: '.clients-carousel-prev',
    nextArrow: '.clients-carousel-next'
});