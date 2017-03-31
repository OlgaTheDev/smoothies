(function () {

    'use strict';


    ////////////// FUNCTIONS ///////////////
    
    function showSvgAnimation(el){
        var svg = el.find('svg');
        console.log(svg);

            setTimeout(function(){
                if (svg.length) {
                    svg.addClass('to-show');
                }
            }, 300)
    }

    function showPanel(cond) {
        var block = $('.panel-item');
        block.each(function () {
            if ( $(this).data('panel') == cond ){
                $(this).addClass('show');
                
                showSvgAnimation($(this));
            }
        });
    }


    ////////////// DOCUMENT READY EVENT ///////////////

    $( document ).ready(function(){
        
        
        var mainSection = $('#smoothies-list'),
            closeBtn = $('.close-btn'),
            links = mainSection.find('a'),
            svgs = $('svg');
        
        
        // Color background
        
//        links.mouseenter(function () {
//            var color = $(this).data(color);
//            
//            $('#smoothies-list, #smoothies-list a').animate({
//                backgroundColor: color.color
//            }, 300)
//        })
        

        // Open panel

        links.on('click', function (e) {
            e.preventDefault();

            var linkToPanel = $(this).attr('href'),
                color = $(this).data('color');

            mainSection.addClass('scale-down');

            showPanel(linkToPanel);

        });


        // Close panel

        closeBtn.on('click', function () {
            mainSection.removeClass('scale-down');
            $(this).parent().removeClass('show');
            svgs.removeClass('to-show');
        });


        // Next panel link
        
        var nextLinks = $('.next-block');

        nextLinks.on('click', function (e) {
            e.preventDefault();

            var self = $(this),
                linkToPanel = self.attr('href');

            self.parent().addClass('scale-down');
            showPanel(linkToPanel);
            svgs.removeClass('to-show');

            setTimeout(function () {
                self.parent().removeClass('scale-down show')
            }, 600)
        })


    });
    
    
    ////////////// WINDOW LOAD EVENT ///////////////

    $(window).on('load', function(){
        
    })
    

})();