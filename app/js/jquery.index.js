( function(){

    "use strict";

    $( function(){

        $.each( $( '.anchor' ), function () {
            new Anchor( $(this) );
        } );

        $.each( $( '.portfolio_slider' ), function () {
            new PortfolioSlider( $(this) );
        } );

        $.each( $( '.site__header' ), function () {
            new Header( $(this) );
        } );

        $.each( $( '.menu' ), function () {
            new Menu( $( this ) );
        } );

        $.each( $( '.preloader' ), function () {
            new Preloader( $( this ) );
        } );

        $.each( $( '.map' ), function() {
            new Map ( $( this ) );
        } );
    } );

    var Anchor = function ( obj ) {
        var _obj = obj,
            _body = $( 'html, body' ),
            _window = $( window );

        var _onEvents = function() {

                _obj.on( {
                    click: function() {

                        var curBtn = $( this ),
                            curMargin = curBtn.data( 'margin' );

                        if ( curMargin == undefined && _window.outerWidth() < 1200 ) {
                            curMargin = 60
                        } else if ( curMargin == undefined && _window.outerWidth() >= 1200 ) {
                            curMargin = 80
                        }

                        _body.animate( {
                            scrollTop: $( curBtn.attr( 'href' ) ).offset().top - curMargin
                        }, 600);

                        return false;
                    }
                } );

            },
            _construct = function() {
                _onEvents();
            };

        _construct()
    };

    var PortfolioSlider = function ( obj ) {
        var _obj = obj,
            _slider = _obj.find('.swiper-container'),
            _next = _obj.find('.portfolio__next'),
            _prev = _obj.find('.portfolio__prev'),
            _swiper;

        var _onEvents = function() {

                _obj.on( {
                    click: function() {


                    }
                } );

            },
            _initSlider = function() {
                _swiper = new Swiper(_slider, {
                    paginationClickable: true,
                    nextButton: _next,
                    prevButton: _prev,
                    loop: true,
                    spaceBetween: 30
                });
            },
            _construct = function() {
                _onEvents();
                _initSlider();
            };

        _construct()
    };

    var Header = function ( obj ) {
        var _self = this,
            _obj = obj,
            _siteContent = $( '.site__content' ),
            _menuItems = $( '.menu__item' ),
            _window = $( window ),
            _winTop = _window.scrollTop();

        var _onEvents = function() {

                _window.on({
                    'load': function() {
                        _changeHeaderType();
                        // _checkActiveMenu();
                    },
                    'scroll': function() {
                        _changeHeaderType();
                        // _checkActiveMenu();

                        if ( _obj.hasClass( 'fixed' ) ) {
                            var direct = _window.scrollTop() > _winTop ? 'bottom' : 'top',
                                maxScrollTop = $( '.site' ).height() - _window.height();

                            if ( _window.scrollTop() > 0 ) {
                                _winTop = _window.scrollTop();
                            } else if ( _window.scrollTop() >= maxScrollTop ) {
                                _winTop = maxScrollTop;
                            } else {
                                _winTop = 0;
                            }

                            switch ( direct ) {
                                case 'top':
                                    _obj.removeClass( 'hidden' );
                                    break;
                                case 'bottom':
                                    _obj.addClass( 'hidden' );
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                });

            },
            _changeHeaderType = function() {
                var winScroll = $( window ).scrollTop(),
                    winFirstBlock = _siteContent.children().eq(0),
                    objHeight = _obj.outerHeight();

                if ( winScroll >= objHeight ) {
                    _obj.addClass( 'fixed' );
                } else {
                    _obj.removeClass( 'fixed' );
                }
            },
            _checkActiveMenu = function() {
                var winScrollTop = _window.scrollTop() + _window.outerHeight()*0.5,
                    siteBloks = _siteContent.children(),
                    activeID;
                
                siteBloks.each( function () {
                    var curElem = $(this),
                        curElemTop = curElem.offset().top;

                    if ( winScrollTop > curElemTop ) {
                        activeID = '#' + curElem.attr( 'id' );
                    }
                } );

                _menuItems.removeClass( 'active' );

                _menuItems.each( function() {
                    var elem = $(this),
                        elemHref = elem.attr( 'href' );

                    if ( elemHref == activeID ) {
                        elem.addClass( 'active' );
                    }
                } );

            },
            _construct = function() {
                _obj[ 0 ].obj = _self;
                _onEvents();
            };

        //public methods

        _construct()
    };

    var Menu = function( obj ){

        //private properties
        var _obj = obj,
            _self = this,
            _btn = $( '.menu-mobile-btn' ),
            _site = $( '.site' ),
            _items = $( '.menu__item' ),
            _body = $( 'body' ),
            _closeBtn = _obj.find( '.menu__close' );

        //private methods
        var _constructor = function(){
                _onEvents();
                _obj[0].obj = _self;
            },
            _onEvents = function(){

                _btn.on( 'click', function() {
                    _openMenu();
                    return false;
                } );

                _closeBtn.on( 'click', function() {
                    _closeMenu();
                    return false;
                } );

                _items.on( 'click', function() {
                    _closeMenu();
                    var curBtn = $( this ),
                        curMargin = curBtn.data( 'margin' );

                    if ( $(window).outerWidth() < 1200 ) {
                        curMargin = 60;
                    } else {
                        curMargin = 80;
                    }

                    _body.animate( {
                        scrollTop: $( curBtn.attr( 'href' ) ).offset().top - curMargin
                    }, 600);

                    return false;
                } );

            },
            _openMenu = function(){
                _obj.addClass( 'visible' );
                // _body.css( 'overflow-y', 'hidden' );
                _site.css( {
                    'position': 'relative'
                } );
            },
            _closeMenu = function(){
                _obj.removeClass( 'visible' );
                _site.removeAttr( 'style' );
                // _body.removeAttr( 'style' );
            };

        //public properties

        //public methods
        _self.closeMenu = function () {
            _closeMenu();
        };

        _constructor();

    };

    var Preloader = function ( obj ) {

        var _obj = obj,
            _loader = _obj.find( '.preloader__bar' ),
            _flag = false,
            _loadFlag = false,
            _delay = _obj.data( 'delay' ),
            _window = $( window );

        var _onEvents = function () {

                _window.on( {
                    load: function() {

                        _loadFlag = true;

                    }
                } );

            },
            _init = function() {
                _onEvents();
                _loadBar();
            },
            _loadBar = function (){

                var firstLoadVal = Math.floor(Math.random() * 10) + 1,
                    curValue = firstLoadVal;

                _loader.animate({'width':''+firstLoadVal+'%'}, 200);

                setTimeout(function () {

                    setInterval(function () {

                        var loadVal = Math.floor(Math.random() * 90) + 1;

                        if(loadVal<90 && loadVal>curValue){

                            curValue = loadVal;

                            _loader.animate({'width':''+loadVal+'%'}, 200);

                        }

                    }, 500);

                }, 1000);

                setInterval(function (){
                    if(_loadFlag){

                        _loader.animate({'width': 100+'%'}, 200);

                        _obj.css( {
                            'opacity': 0,
                            'visibility': 'hidden'
                        } );

                        setTimeout(function () {
                            _obj.remove();
                        }, 650);

                        _flag = true

                    }
                }, 500);


            };

        _init();
    };

    var Map = function (obj) {

        //private properties
        var _mapData = obj.data( 'map' ),
            _map = null,
            _obj = obj;

        //private methods
        var _addEvents = function () {

            },
            _getMapData = function(){
                _mapData.center = new google.maps.LatLng(_mapData.center[0], _mapData.center[1]);

                $.each(_mapData.points, function (i) {
                    _mapData.points[i] = new google.maps.LatLng(this[0], this[1]);
                });
            },
            _init = function () {
                _getMapData();
                google.maps.event.addDomListener(window, 'load', _initMap);
                _addEvents();
            },
            _initMap= function(){

                var MY_MAPTYPE_ID = 'custom_style',
                    featureOpts = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}],
                    mapOptions = {
                        zoom: _mapData.zoom,
                        center: _mapData.center,
                        mapTypeControlOptions: {
                            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
                        },
                        mapTypeId: MY_MAPTYPE_ID,
                        disableDefaultUI: true,
                        scrollwheel: false,
                        gestureHandling: 'cooperative',
                        zoomControl: true,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        rotateControl: false,
                        fullscreenControl: false
                    },
                    styledMapOptions = {
                        name: 'Custom Style'
                    },
                    customMapType = null,
                    image = 'img/map-pin.svg';

                _map = new google.maps.Map( _obj[0], mapOptions );

                customMapType = new google.maps.StyledMapType( featureOpts, styledMapOptions );

                _map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

                $.each(_mapData.points, function () {
                    new google.maps.Marker({
                        position: this,
                        map: _map,
                        icon: image
                    } );
                } );

            };

        //public properties

        //public methods

        _init();

    };

} )();