( function( $ ) {
    
    var pxl_swiper_handler = function( $scope, $ ) {
 
        var breakpoints = elementorFrontend.config.breakpoints,
            carousel = $scope.find(".pxl-swiper-container");
       
        if(carousel.length == 0){
            return false;
        }

        var data = carousel.data(), 
            settings = data.settings,
            carousel_settings = {
                direction: settings['slide_direction'],
                effect: settings['slide_mode'],
                wrapperClass : 'pxl-swiper-wrapper',
                slideClass: 'pxl-swiper-slide',
                slidesPerView: settings['slides_to_show'],
                slidesPerGroup: settings['slides_to_scroll'],
                slidesPerColumn: settings['slide_percolumn'],
                spaceBetween: settings['slides_gutter'],
                navigation: {
                    nextEl: $scope.find(".pxl-swiper-arrow-next"),
                    prevEl: $scope.find(".pxl-swiper-arrow-prev"),
                },
                pagination : {
                    type: settings['dots_style'],
                    el: $scope.find('.pxl-swiper-dots'),
                    clickable : true,
                    modifierClass: 'pxl-swiper-pagination-',
                    bulletClass : 'pxl-swiper-pagination-bullet',
                    renderCustom: function (swiper, element, current, total) {
                        return current + ' of ' + total;
                    }
                },
                speed: settings['speed'],
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                breakpoints: {
                    0 : {
                        slidesPerView: settings['slides_to_show_xs'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    },
                    576 : {
                        slidesPerView: settings['slides_to_show_sm'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    },
                    768 : {
                        slidesPerView: settings['slides_to_show_md'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    },
                    992 : {
                        slidesPerView: settings['slides_to_show_lg'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    },
                    1200 : {
                        slidesPerView: settings['slides_to_show'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: settings['slides_gutter'],
                    },
                    1400 : {
                        slidesPerView: settings['slides_to_show_xxl'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: settings['slides_gutter'],
                    }
                },
                on: {
                    init : function (swiper){
                        $scope.find('.swiper-slide .pxl-animate').each(function(){
                            var data = $(this).data('settings');
                            $(this).removeClass('animated '+data['animation']).addClass('pxl-invisible');
                        });
                        $scope.find('.pxl-swiper-slide .pxl-animate').each(function(){
                            var data = $(this).data('settings');
                            var cur_anm = $(this);
                            setTimeout(function () {  
                                $(cur_anm).removeClass('pxl-invisible').addClass('animated ' + data['animation']);
                            }, data['animation_delay']);

                        });
                        $scope.find('.pxl-bd-anm').each(function(){
                            $(this).addClass('pxl-animated');
                        });
                    },
                    slideChange: function (swiper) {
                        $scope.find('.swiper-slide .pxl-animate').each(function(){
                            var data = $(this).data('settings');
                            $(this).removeClass('animated '+data['animation']).addClass('pxl-invisible');
                        });
                        $scope.find('.pxl-swiper-slide .pxl-animate').each(function(){
                            var data = $(this).data('settings');
                            var cur_anm = $(this);
                            setTimeout(function () {  
                                $(cur_anm).removeClass('pxl-invisible').addClass('animated ' + data['animation']);
                            }, data['animation_delay']);

                        }); 
                        $scope.find('.pxl-bd-anm').each(function(){
                            $(this).addClass('pxl-animated');
                        });
                    }
                },
            }; 
            if(settings['center_slide'] == 'true')
                carousel_settings['centeredSlides'] = true;
            // loop
            if(settings['loop'] === 'true'){
                carousel_settings['loop'] = true;
            }
            // auto play
            if(settings['autoplay'] === 'true'){
                carousel_settings['autoplay'] = {
                    delay : settings['delay'],
                    disableOnInteraction : settings['pause_on_interaction']
                };
            } else {
                carousel_settings['autoplay'] = false;
            }

            
            if(settings['slides_gutter_md']){
                carousel_settings['breakpoints'][0]['spaceBetween'] = settings['slides_gutter_md'];
                carousel_settings['breakpoints'][576]['spaceBetween'] = settings['slides_gutter_md'];
                carousel_settings['breakpoints'][768]['spaceBetween'] = settings['slides_gutter_md'];
            }
            if(settings['slides_gutter_lg']){
                carousel_settings['breakpoints'][0]['spaceBetween'] = settings['slides_gutter_lg'];
                carousel_settings['breakpoints'][576]['spaceBetween'] = settings['slides_gutter_lg'];
                carousel_settings['breakpoints'][768]['spaceBetween'] = settings['slides_gutter_lg'];
                carousel_settings['breakpoints'][992]['spaceBetween'] = settings['slides_gutter_lg'];
            }
            
        carousel.each(function(index, element) {
            if($(this).closest('.pxl-swiper-slider').find('.pxl-swiper-thumbs').length > 0){  
                var slide_thumbs = new Swiper($(this).closest('.pxl-swiper-slider').find('.pxl-swiper-thumbs'), {
                    spaceBetween: 30,
                    slidesPerView: 3,
                    centeredSlides: true,
                    loop: true,  
                    watchSlidesProgress: true,
                    slideToClickedSlide: true,
                });
                
                carousel_settings['loopedSlides'] = 3;
            }

            var swiper = new Swiper(carousel, carousel_settings);
            if($(this).closest('.pxl-swiper-slider').find('.pxl-swiper-thumbs').length > 0){  
                swiper.controller.control = slide_thumbs;
                slide_thumbs.controller.control = swiper;
            }
             
            if(settings['autoplay'] === 'true' && settings['pause_on_hover'] === 'true'){
                $(this).on({
                    mouseenter: function mouseenter() {
                        this.swiper.autoplay.stop();
                    },
                    mouseleave: function mouseleave() {
                        this.swiper.autoplay.start();
                    }
                });
            }

            $scope.find(".swiper-filter-wrap .filter-item").on("click", function(){
                var target = $(this).attr('data-filter-target');
                var parent = $(this).closest('.pxl-swiper-slider');
                $(this).siblings().removeClass("active");
                $(this).addClass("active");

                if(target == "all"){
                    parent.find("[data-filter]").removeClass("non-swiper-slide").addClass("swiper-slide");
                    swiper.destroy();
                    swiper = new Swiper(carousel, carousel_settings);

                }else {
                     
                    parent.find(".swiper-slide").not("[data-filter^='"+target+"'], [data-filter*=' "+target+"']").addClass("non-swiper-slide").removeClass("swiper-slide");
                    parent.find("[data-filter^='"+target+"'], [data-filter*=' "+target+"']").removeClass("non-swiper-slide").addClass("swiper-slide");
                    
                    swiper.destroy();
                    swiper = new Swiper(carousel, carousel_settings);
                }
            });
           
        });  
    };
 
    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        // Swipers
        
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_post_carousel.default', pxl_swiper_handler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_history.default', pxl_swiper_handler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_testimonial_carousel.default', pxl_swiper_handler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_clients.default', pxl_swiper_handler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_service_carousel.default', pxl_swiper_handler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_team_carousel.default', pxl_swiper_handler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_gallery_carousel.default', pxl_swiper_handler );
          
    } );
} )( jQuery );