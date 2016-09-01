jQuery(document).ready(function($) {
    $('#floors').slick();

    var 
        container   = $('.popupContainer'),
        floorSlider = $('#floors');

    $('.floorPointer').click(function(){
        container.addClass('active');
        var floorTarget   = $(this).attr('data-floor'),
            floor         = $('#' + floorTarget + ''),
            currentSlider = floor.attr('data-slick-index');
            
        $('#floors').slick('slickGoTo', currentSlider)
    });

    $('.closePopup').click(function(){
        container.removeClass('active');
    });

}); // end file