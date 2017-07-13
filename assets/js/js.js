// (function () {

//     var globalProp = {
//         windowHeight: $(window).height(),
//         currentSectionId: 1,
//         isAnimation: false,
//         sections: $('.main-section'),
//         siteNav: $('.site-nav'),
//         currentPosition: 0
//     };

//     function toggleModalWindowVisibility(el) {

//         if ( !$(el).hasClass('close-button') ) {
//             globalProp.currentPosition = $(window).scrollTop();
//         }

//         $('.site-nav').toggleClass('hidden')
//         $('body').toggleClass('fixed');
//         $('.main-wrapper').toggleClass('blured');

//         if ( $(el).hasClass('close-button') ) {
//             event.preventDefault();
//             $(window).scrollTop(globalProp.currentPosition);
//         }
//     }


//     $( window ).resize(function() {
//         globalProp.windowHeight = $(window).height();
//         $('.site-nav').removeClass('fixed-nav');

//     //    others
//     });


//     $('.nav-trigger').on('click touch', function(event) {
//         var isVisible = $('.mobile-nav').hasClass('show-flex');
//         $('.mobile-nav').toggleClass('show-flex');
//         toggleModalWindowVisibility(this);

//         if (!isVisible) {
//             $('.mobile-nav').addClass('animated fadeIn');
//         }
//     });


//     $('.career-trigger').on('click touch', careerToggle);

//     function careerToggle(event) {
//         var isVisible = $('.full-screen').hasClass('show-flex');
//         event.preventDefault();
        
//         $('.full-screen').toggleClass('show-flex');
//         toggleModalWindowVisibility(this); 

//         if (!isVisible) {
//             window.removeEventListener("wheel", debouncedWheelHandler);
//             $('.career').addClass('animated slideInRight');
//             setTimeout(function () {
//                 $('body').on('click', closeHandler)
//             }, 100);
//         } else {
//             window.addEventListener("wheel", debouncedWheelHandler);
//             $('body').off('click', closeHandler);
//         }
//     }

//     $('.mobile-nav__list').on('click touch', '.mobile-nav__link', function(event) {
//         event.preventDefault();
//         $('.mobile-nav').toggleClass('show-flex');
//         toggleModalWindowVisibility(this);

//         var blockName = $(this).data('block');
//         var scrollPosition = $('.main-section.' + blockName).offset().top;
//         $(window).scrollTop(scrollPosition - 65);
//     });

//     $('.footer-nav__list').on('click touch', '.footer-nav__link',  function(event) {
//         if ($(window).width() < 1024) {
//             event.preventDefault();

//             var blockName = $(this).data('block');
//             var scrollPosition = $('.main-section.' + blockName).offset().top;
//             $(window).scrollTop(scrollPosition - 65);
//         }

//     });


//     function closeHandler(e) {
//         if ($(e.target).closest('.career').length && !$(e.target).closest('.career-trigger').length) {
//             return;
//         } else {
//             careerToggle(e);
//         }
//     }

//     //add fixed nav

//     $(window).on('scroll', function (event) {
//         if ($(window).width() <= '1024') {
//             if ($(window).scrollTop() <= 0) {
//                 $('.site-nav').removeClass('fixed-nav');
//             } else {
//                 $('.site-nav').addClass('fixed-nav');
//             }
//         }
//     });


//     var selectionResult = $('.selection-result');
//     var selectionItemsValues = selectionResult.find('.selection-result__copy');
//     var filter = {
//         categories: '',
//         location: ''
//     };

//     function closeListHandler(event) {
//         var currentTarge = $(event.target);
//         if (currentTarge.closest('.selection').length) {
//             return;
//         } else {
//             $('.join-team .selection__list').removeClass('show');
//             $('body').off('click touch', closeListHandler)
//         }
//     }


//     $('.selection').on('click touch', function(event) {
    
//         var el = $(event.target);
//         var parentEl = $(this);
//         var selectionList = parentEl.find('.selection__list');

//         $('.selection__list').each(function(i, item) {
//             var $item = $(item);
            
//             if ( !parentEl.find($item).length && $item.hasClass('show')) {
//                 $item.removeClass('show');
//             }
//         });
    
//         if (selectionList.hasClass('show')) {
//             selectionList.removeClass('show');
//             $('body').off('click touch', closeListHandler);
//         } else {
//             selectionList.addClass('show');
//             $('body').on('click touch', closeListHandler);
//         } 

//         var currentEl = parentEl.find('.job-selection__current')[0];
    
//         if ($(event.target).hasClass('selection__item')) {
//             var text = $(event.target).text();
//             $(currentEl).text(text);

//             var isCategories = el.hasClass('job-categories__item');
//             var isSelectAll = el.hasClass('selection__item-all');
//             filter[isCategories ? 'categories' : 'location'] = isSelectAll ? '' : text; 

//             selectionItemsValues
//                 .each(function (i, item) {
//                     var parent = $(item).closest('.selection-result__item');
//                     var isCategoryExist = item.innerHTML.indexOf(filter.categories) > -1;
//                     var isLocationExist = item.innerHTML.indexOf(filter.location) > -1;
//                     isCategoryExist && isLocationExist ? parent.removeClass('hidden') : parent.addClass('hidden');
//                 });
//         }
//     });

//     $(".file-input").on('change', function() {
//         var value = $(this).val();
//         if (value) {
//             $(".input-placeholder").text(value);
//         } else {
//             $(".input-placeholder").text("Choose CV to upload");
//         }
//     });

//     $(".input").on('input', function() {
//         var value = $(this).val();
//         if (value) {
//             $(this).parent().addClass('input-container--filled');
//         } else {
//             $(this).parent().removeClass('input-container--filled');
//         }
//     });


    
//     // SCROLL PAGE 
//     var debouncedWheelHandler = $.debounce(50, true, onWheel);

//     if ('onwheel' in document) {
//         window.addEventListener("wheel", debouncedWheelHandler);
//     }

//     function addHandlerForNavigation() {
//         globalProp.siteNav
//             .find("a[data-scroll-to]")
//             .add('.footer-nav a[data-scroll-to]')
//             .on('click', function (e) {
//                 e.preventDefault();
//                 if ($(window).width() < 1024) return;
//                 globalProp.currentSectionId = $(this).data('scrollTo');
//                 if (+globalProp.siteNav.attr('data-for-id') === globalProp.currentSectionId) {
//                     return false;
//                 }

//                 showNewSection(globalProp.currentSectionId);
//             });
//     }

//     addHandlerForNavigation();

//     function onWheel(e) {
//         if (globalProp.isAnimation) return;
//         if ($(window).width() >= 1024) {
//             e = e || window.event;

//             var delta = e.deltaY;

//             if (delta > 0) {
//                 if (globalProp.currentSectionId  < globalProp.sections.length ) {
//                     showNewSection(  ++globalProp.currentSectionId);
//                 }
//             } else {
//                 if (globalProp.currentSectionId  > 1 ) {
//                     showNewSection( --globalProp.currentSectionId );
//                 }
//             }
//         }

//     }

//     function showNewSection(newSectionId) {
//         globalProp.isAnimation = true;
//         [].map.call(globalProp.sections, function (section) {
//             section.setAttribute('data-scroll', $(section).data('section-id') < newSectionId ?  'top' : 'down');
//         });

//         globalProp.sections[newSectionId-1].setAttribute('data-scroll', 'current');

//         globalProp.siteNav.attr('data-for-id', newSectionId);

//         if (newSectionId === globalProp.sections.length ) {
//             var translateY = globalProp.windowHeight * (newSectionId-2) +  $(globalProp.sections[globalProp.sections.length - 1]).height();
//         } else {
//             var translateY = globalProp.windowHeight * (newSectionId - 1);
//         }

//         $('.main-wrapper').velocity({
//                 translateY: -translateY,
//             }, {
//                 duration: 400,
//                 complete: function() {
//                     globalProp.isAnimation = false;
//                 }
//         });

//     }

//     var prevScrollState = '';
//     var isSmall = window.document.body.offsetWidth < 1024;
//     $(window).resize(function() {
//         if (window.document.body.offsetWidth < 1024 && !isSmall) {
//             prevScrollState = $('.main-wrapper').attr('style');
//             $('.main-wrapper').attr('style', '');
//             isSmall = true;
//         } else if (window.document.body.offsetWidth >= 1024 && isSmall) {
//             if (prevScrollState) {
//                 $('.main-wrapper').attr('style', prevScrollState);
//             }
//             isSmall = false;
//         }
//     });

//     function updateSectionData(newSectionId) {
//         [].map.call(globalProp.sections, function (section) {
//             section.setAttribute('data-scroll', $(section).data('section-id') < newSectionId ?  'top' : 'down');
//         });

//         globalProp.sections[newSectionId-1].setAttribute('data-scroll', 'current');

//         globalProp.siteNav.attr('data-for-id', newSectionId);
//     }

//     // END SCROLL PAGE 


//     // SLIDER SETUP

//     $('.team__member-list ul').slick({
//         dots: false,
//         infinite: true,
//         speed: 300,
//         slidesToShow: 7,
//         focusOnSelect: true,
//         centerMode: true,
//         variableWidth: false,
//         asNavFor: '.member-info__list',
//         responsive: [{
//             breakpoint: 768,
//             settings: {
//                 slidesToShow: 3,
//                 touchMove: true,
//             }
//         },
//         {
//             breakpoint: 1280,
//             settings: {
//                 slidesToShow: 5,
//                 touchMove: true,
//             }
//         }],
//         centerPadding: '0px',
//         prevArrow: '.member-nav__prev',
//         nextArrow: '.member-nav__next',
//     });

//     $('.member-info__list').slick({
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: false,
//         fade: true,
//         asNavFor: '.team__member-list ul'
//     });

//     // END SLIDER SETUP

// })()


$('.clients-carousel').slick({
    prevArrow: '.clients-carousel-prev',
    nextArrow: '.clients-carousel-next'
});