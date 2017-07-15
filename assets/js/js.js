
var globalProp = {
    windowHeight: $(window).height(),
    currentSectionId: 1,
    isAnimation: false,
    sections: $('.main-section'),
    siteNav: $('.site-nav'),
    currentPosition: 0
};

var allBlocks = $('[data-scroll-block]');
var bodyEl = $('body');


var isSmall = $(window).width() < 768;
var slickExperts;
var slickBlog;

function toggleModalWindowVisibility(el) {

    $('.mobile-nav').toggleClass('mobile-nav--showed');
    $('body').toggleClass('fixed');
    $('.main-container').toggleClass('blured');
}


$(window).on('scroll', function (event) {
    if ($(window).width() <= '1020') {
        if ($(window).scrollTop() <= 0) {
            $('.site-nav').removeClass('site-nav--scrolled');
        } else {
            $('.site-nav').addClass('site-nav--scrolled');
        }
    }
});

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
});


$('body').on('click touch', '.blured',function(event) {
    toggleModalWindowVisibility();
});

var navMobileItems = $('.mobile-nav__list');
var scrollPosition = 0;

$('.nav-trigger').on('click touch', function(event) {
    event.preventDefault();
    var isVisible = $('.mobile-nav').hasClass('mobile-nav--showed');

    if(!isVisible) {
        scrollPosition = $('body').scrollTop();
    }

    toggleModalWindowVisibility(this);

    if (!isVisible) {
        $('.mobile-nav').addClass('animated fadeInLeft');

        if (document.body.offsetWidth < 1024) {
            navMobileItems.find('.mobile-nav__link--current').removeClass('mobile-nav__link--current');
            var currentItem = navMobileItems.find('[data-block="' + window.location.hash.split('#')[1] + '"]');
            currentItem.addClass('mobile-nav__link--current');
            event.stopPropagation();
        }
    }
});


$('.site-nav__list .site-nav__link, .mobile-nav__list .mobile-nav__link, .mobile-nav__logo, .site-nav__logo').on('click touch', function (event) {
    event.preventDefault();
    var isMobileNav = $(window).width() < 1024;

    if (isMobileNav) {
        if ($('.mobile-nav').hasClass('mobile-nav--showed')) {
            toggleModalWindowVisibility(this);
            $('body').scrollTop(scrollPosition ? scrollPosition : 0);
        }
    }
    var scrollTo = $(this).data('block');
    var element = $('[data-scroll-block="' + scrollTo + '"]');
    var offset = element.length ? element.offset().top : 0;

    $('body').animate({scrollTop: isMobileNav ? offset - 75 : offset}, function () {
        window.location.hash = scrollTo;
    });
    event.stopPropagation();
});





$('.contact-form').on('focus', 'input', function(event) {
    $( this ).siblings( ".input-hint" ).addClass('input-hint--small');
});

$('.contact-form').on('blur', 'input', function(event) {
    if ( !this.value ) {
        $( this ).siblings( ".input-hint" ).removeClass('input-hint--small');
    }
});
$('.contact-form').on('click touch', '.input-hint', function(event) {
    $( this ).siblings( "input" ).focus();
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

function checkVisible(elm, threshold, mode) {
  threshold = threshold || 0;
  mode = mode || 'visible';

  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  var above = rect.bottom - threshold < 0;
  var below = rect.top - viewHeight + threshold >= 0;

  return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
}


var scrollHandler = function () {
    if (bodyEl.hasClass('fixed')) return;
    var el = [].find.call(allBlocks, function(item) {
        return checkVisible(item, isSmall ? 80 : 0);
    });

    if (document.body.scrollTop < (isSmall ? 75 : 441)) {
        window.location.hash = 'header';
        return;
    }
    window.location.hash = el ? $(el).attr('data-scroll-block') : 'header';
};

$(document).on('scroll', $.throttle(200, true, scrollHandler));

$('.site-nav__list, .mobile-nav__list').on('click touch', '.site-nav__link, .mobile-nav__link', function (event) {
    event.preventDefault();
    var isMobileNav = $(window).width() < 1024;

    if (isMobileNav) {
        $('.mobile-nav').removeClass('mobile-nav--showed');
        toggleModalWindowVisibility(this);
    }
    var scrollTo = $(this).data('block');
    var offset = $('[data-scroll-block="' + scrollTo + '"]').offset().top;
    
    if (isMobileNav) {
        $('body').scrollTop(scrollPosition ? scrollPosition : 0);
    }
    
    $('body').animate({scrollTop: isMobileNav ? offset - 75 : offset}, function () {
        window.location.hash = scrollTo;
    });
});
