// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


jQuery(document).ready(function($) {

    $( "main" ).delay( 2000 ).css({
        opacity: '1',
        visibility: 'visible'
    });

    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.menu-button'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });
      

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.menu-button').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('header').toggleClass('active');
        if ($('header').hasClass('active')) {
                $('body, html').css('overflow', 'hidden');
            } else {
                $('body, html').css('overflow', 'visible');
            }
    });



    /*---------------------------
                                  Magnific popup
    ---------------------------*/
    $('.magnific').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',
        modal: false,

        closeBtnInside: true,
        preloader: false,
        
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });



    /*---------------------------
                                  MAIN PAGE SLIDER
    ---------------------------*/
    $('.main-page-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        arrows: false,
        cssEase: 'linear',
        adaptiveHeight: false
    })


    /*---------------------------
                                  SCROLL-CONTENT
    ---------------------------*/
    $(window).on('load resize', function(event) {
        $('.content-scroll').height( $(this).height()-300 )
    });

    if ( $('.scroll-area').length > 0 ) {
        $('.scroll-area').slimScroll({
            height: 'calc(100% - 55px)',
            railVisible: true,
            alwaysVisible: false,
            size: '1px',
            wheelStep: 150
        });    
    }


    /*---------------------------
                                  ABOUT PAGE SLIDER
    ---------------------------*/
    $('.about-page-slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        arrows: false,
        cssEase: 'linear',
        adaptiveHeight: false
    });
    $('.about-page-slider').slick('setPosition');

    $(window).on('load resize', function(event) {
        $('.about-page-slider').slick('setPosition');
    });

   



    /*----------------------------
                              SEND FORM
    -------------------------*/
    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.magnificPopup.open({
            items: {
              src: popup
            },
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            modal: false,
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        }, 0);
    }

    $('form').on('submit', function(event) {
        event.preventDefault();
        /* Act on the event */
        var data = $(this).serialize();
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            success: function(result){
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        })
        .always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
            });
        });
        
    });



    /*---------------------------
                                GOOGLE MAP
    ---------------------------*/
    var map;
    function googleMap_initialize() {
        var lat = 40.34503137704171;
        var long = 49.838739931583405;

        var mapCenterCoord = new google.maps.LatLng(lat, long);
        var mapMarkerCoord = new google.maps.LatLng(lat, long);


        var mapOptions = {
            center: mapCenterCoord,
            zoom: 17,
            //draggable: false,
            disableDefaultUI: true,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var markerImage = new google.maps.MarkerImage('images/location.png');
        var marker = new google.maps.Marker({
            icon: markerImage,
            position: mapMarkerCoord, 
            map: map,
            title:"Park Bayil"
        });

        map.addListener('click', function(e) {
            console.log('{lat: '+e.latLng.lat()+', lng: '+e.latLng.lng()+'},');
        });

        var polygon = [
            {lat: 40.345348238420115, lng: 49.83832150697708},
            {lat: 40.34544431867299, lng: 49.83879894018173},
            {lat: 40.34502319995417, lng: 49.83902156352997},
            {lat: 40.34487805648554, lng: 49.83853340148926},
            {lat: 40.345348238420115, lng: 49.83832150697708}
        ];

        // Construct the polygon.
        var bayil_polygon = new google.maps.Polygon({
            paths: polygon,
            strokeColor: '#95C83D',
            strokeWeight: 3,
            fillOpacity: 0
        });
        bayil_polygon.setMap(map);

        $('.gm-plus').on('click', function(event) {
            event.preventDefault();
            map.setZoom( map.getZoom() + 1 )
        });

        $('.gm-minus').on('click', function(event) {
            event.preventDefault();
            map.setZoom( map.getZoom() - 1 )
        });
        
        $(window).resize(function (){
            map.setCenter(mapCenterCoord);
        });
    }

    if ( $('#map_canvas').length > 0) {
        googleMap_initialize();   
    }

}); // end file