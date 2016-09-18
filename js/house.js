jQuery(document).ready(function($) {

    var container   = $('.popupContainer'),
        floorSlider = $('.floorSlider'),
        displayNum  =  $('.displayNum');


    var clearInfo = function() { // clear info about flat
        $('.info__num--number i').text('');
        $('.info__num--square i').text('');
        $('.info__num--rooms i').text('');
    }
    var showHidePdf = function(what) {  // hide "download pdf" block
        if (what == 'hide') {
            $('.info__num').removeClass('hide');
            $('.info__num--doc').addClass('hide');
        } else {
            $('.info__num').removeClass('hide');
            $('.info__num--number').addClass('hide');
        }
    }
    //----------------- display index of current floor slider and run other functions on init and change
    floorSlider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){ 
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.info__num--order i').text(i);
        $('.info__num--number span').text('№ квартиры');
        $('#floors').addClass('shown');
        $('#flats').removeClass('shown');// if current popup is Flat hide it and show slider
        clearInfo();
        showHidePdf('hide');
    });
    //----------------- init floor slider 
    floorSlider.slick({
        fade: true,
        speed: 600,
        infinite: false
    });


    //----------------- click on house 
    $('.floorPointer').click(function(){
        container.addClass('active');
        $('#floors').addClass('shown');
        $('.housePage').addClass('overlay');
        var floorTarget   = $(this).attr('data-floor'),
            floor         = $('#' + floorTarget + ''),
            currentSlider = floor.attr('data-slick-index');

        floorSlider.slick('slickGoTo', currentSlider)
    });


    //----------------- click on floor 
    $('.flatPointer g').click(function(){
        $('#floors').removeClass('shown');
        $('#flats').addClass('shown');
        $('.flats__floor').removeClass('active');
        $('.flats__floor__flat').removeClass('active');
        $('.info__num--number span').text('Блок');

        var onFloor = $(this).parent('').parent('').attr('id'),
            flat   = $(this).attr('data-flat');

       
       $('.flats__floor[data-floor="' + onFloor + '"]').addClass('active');
       $('.flats__floor__flat[data-flat="' + flat + '"]').addClass('active');
       showHidePdf();

    });

    //----------------- display floor info on house hover
    var showFloorInfo = function(el) {
        var floor = el.data('floor'),
            availabeFlats   = el.data('avail'),
            floorNum = floor.substring(6);
        
        $('.availabeFlats i').text(availabeFlats);
        $('.currentFloor i').text(floorNum);
    }

    $('#house_map polygon').hover(
        function() {
            showFloorInfo($(this));
        },
        function() {
            $('.availabeFlats i').text('');
        $('.currentFloor i').text('');
        }
    )

    //----------------- display flat info on hover
    var showInfo = function(el) {
        var onFloor = el.parent().parent().attr('id'),
            floorSelector = '.flats__floor[data-floor="' + onFloor + '"]';
            flat   = el.attr('data-flat'),
            square = $(floorSelector + ' .flats__floor__flat[data-flat="' + flat + '"] .flats__floor__flat__info__square').text(),
            number = $(floorSelector + ' .flats__floor__flat[data-flat="' + flat + '"] .flats__floor__flat__info__num').text(),
            rooms = $(floorSelector + ' .flats__floor__flat[data-flat="' + flat + '"] .flats__floor__flat__info__rooms').text();
            block = $(floorSelector + ' .flats__floor__flat[data-flat="' + flat + '"] .flats__floor__flat__info__block').text();
            doc = $(floorSelector + ' .flats__floor__flat[data-flat="' + flat + '"] .flats__floor__flat__info__doc').text();
            
        $('.info__num--number i:not(.block)').text(number);
        $('.info__num--number i.block').text(block);
        $('.info__num--square i').text(square);
        $('.info__num--rooms i').text(rooms);
        $('.info__num--doc').attr('href', doc);
    }
    
    $('.floors__floor g').hover(
        function() {
            showInfo($(this));
        },
        function() {
            showInfo($(this));
        }
    )
    

    //----------------- go back button
    $('.goBack').click(function(){ 
        $('#floors').addClass('shown');
        $('#flats').removeClass('shown');
        $('.info__num--number span').text('№ квартиры');
        showHidePdf('hide');
    });

    //----------------- close popup
    $('.closePopup').click(function(){
        container.removeClass('active');
        $('.info__num--number span').text('№ квартиры');
        $('.housePage').removeClass('overlay');
    });

}); // end file