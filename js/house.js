jQuery(document).ready(function($) {

    var $status = $('.info__num--order i');
    var $slickElement = $('.slideshow');

    //----------------- display index of current floor slider 
    $('.floorSlider').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){ 
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.text(i);
    });
    //----------------- init floor slider 
    $('.floorSlider').slick({
        fade: true
    });

    var container   = $('.popupContainer'),
        floorSlider = $('.floorSlider'),
        displayNum  =  $('.displayNum');

    //----------------- click on house 
    $('.floorPointer').click(function(){
        container.addClass('active');
        $('.housePage').addClass('overlay');
        var floorTarget   = $(this).attr('data-floor'),
            floor         = $('#' + floorTarget + ''),
            currentSlider = floor.attr('data-slick-index');

        floorSlider.slick('slickGoTo', currentSlider)
    });


    //----------------- click on floor img 
    $('.flatPointer').click(function(){
        $('#floors').removeClass('shown');
        $('#flats').addClass('shown');
        $('.flats__floor').removeClass('active');
        $('.flats__floor__flat').removeClass('active');

        var oFloor = $(this).parent('').attr('id'),
            flat   = $(this).attr('data-flat');
       
       $('.flats__floor[data-floor="' + oFloor + '"]').addClass('active');
       $('.flats__floor__flat[data-flat="' + flat + '"]').addClass('active');

    });

    //----------------- go back button
    $('.goBack').click(function(){ 
        $('#floors').addClass('shown');
        $('#flats').removeClass('shown');
    });

    //----------------- close popup
    $('.closePopup').click(function(){
        container.removeClass('active');
        $('.housePage').removeClass('overlay');
    });

}); // end file