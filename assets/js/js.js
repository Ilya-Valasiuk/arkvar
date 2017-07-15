
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

    $('.site-nav').toggleClass('hidden');
    $('body').toggleClass('fixed');
    $('.main-wrapper').toggleClass('blured');

    if ( $(el).hasClass('close-button') ) {
        event.preventDefault();
        $(window).scrollTop(globalProp.currentPosition);
    }
}

var isSmall = $(window).width() < 768;
var slickExperts;
var slickBlog;

$( window ).resize(function() {
    globalProp.windowHeight = $(window).height();
    $('.site-nav').removeClass('fixed-nav');

    if ($(window).width() >= 768 && isSmall) {
        if(slickExperts.length) {
            slickExperts.off('beforeChange');
            slickExperts[0].slick.unslick();
        }

        if (slickBlog.length) {
            slickBlog.off('beforeChange');
            slickBlog[0].slick.unslick();
        }

        isSmall = false;
    } else if ( $(window).width() < 768 && !isSmall) {
        initExpertsSlick();
        initBlogSlick();


        isSmall = true;
    }

    //    others
});


$('.nav-trigger').on('click touch', function(event) {
    var isVisible = $('.mobile-nav').hasClass('mobile-nav--showed');
    $('.mobile-nav').toggleClass('mobile-nav--showed');
    toggleModalWindowVisibility(this);

    if (!isVisible) {
        $('.mobile-nav').addClass('animated fadeInLeft');
    }
});


$('.mobile-nav__list').on('click touch', '.mobile-nav__link', function(event) {
    event.preventDefault();
    $('.mobile-nav').toggleClass('show-flex');
    toggleModalWindowVisibility(this);

    var blockName = $(this).data('block');
    var scrollPosition = $('.' + blockName + '-wrapper').offset().top;
    $(window).scrollTop(scrollPosition - 75);
});


function initExpertsSlick() {
    slickExperts = $('.experts-grid-row').slick({
        prevArrow: '.experts-mobile-arrows .clients-carousel-prev',
        nextArrow: '.experts-mobile-arrows .clients-carousel-next'
    });

     slickExperts.on('beforeChange', function (event, slick, cur, next) {
        $('.experts-mobile-arrows .clients-carousel-number--selected').text(next + 1);
    });
}

function initBlogSlick() {
    slickBlog = $('.blog-row').slick({
        prevArrow: '.blog-mobile-arrows .clients-carousel-prev',
        nextArrow: '.blog-mobile-arrows .clients-carousel-next'
    });

    slickBlog.on('beforeChange', function (event, slick, cur, next) {
        $('.blog-mobile-arrows .clients-carousel-number--selected').text(next + 1);
    });
}

function initClientsSlick() {
    $('.clients-carousel-wrapper .clients-carousel').slick({
    prevArrow: '.clients-carousel-wrapper .clients-carousel-prev',
    nextArrow: '.clients-carousel-wrapper .clients-carousel-next'
    });

    var clientsMobileSlick = $('.clients-carousel-mobile .clients-carousel').slick({
        prevArrow: '.clients-mobile-arrows .clients-carousel-prev',
        nextArrow: '.clients-mobile-arrows .clients-carousel-next'
    });

    clientsMobileSlick.on('beforeChange', function (event, slick, cur, next) {
        $('.clients-mobile-arrows .clients-carousel-number--selected').text(next + 1);
    });
}

if (isSmall) {
    initExpertsSlick();
    initBlogSlick();
}

initClientsSlick();
