( function(){

    $( function(){

        $( '.popup' ).each(function(){

            new Popup($(this));

        });

    });

    var Popup = function( obj ){

        //private properties
        var _self = this,
            _popupPadding = 0,
            _btnShow =  $( '.popup__open' ),
            _obj = obj,
            _btnClose = _obj.find( '.popup__close, .popup__cancel' ),
            _wrap = _obj.find( '.popup__wrap' ),
            _contents = _obj.find( '.popup__content' ),
            _scrollConteiner = $( 'body' ),
            _window = $( window ),
            _site = $( '.site' ),
            _topScroll = 0,
            _timer = setTimeout( function(){}, 1 );

        //private methods
        var _centerWrap = function(){
                if ( _window.height() - ( _popupPadding * 2 ) - _wrap.height() > 0 ) {
                    _wrap.css( { top: ( ( _window.height() - ( _popupPadding * 2 ) ) - _wrap.height() ) / 2 } );
                } else {
                    _wrap.css( { top: 0 } );
                }
            },
            _getScrollWidth = function (){
                var scrollDiv = document.createElement( 'div'),
                    scrollBarWidth;

                scrollDiv.className = 'popup__scrollbar-measure';

                document.body.appendChild( scrollDiv );

                scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

                document.body.removeChild(scrollDiv);

                return scrollBarWidth;
            },
            _hide = function(){
                _obj.css( {
                    overflowY: 'hidden'
                } );

                _scrollConteiner.removeAttr( 'style' );
                _site.removeAttr( 'style' );
                _scrollConteiner.scrollTop( _topScroll );


                _obj.removeClass( 'popup_opened' );
                _obj.addClass( 'popup_hide' );

                _timer = setTimeout( function(){

                    _obj.css ({
                        overflowY: 'auto'
                    });

                    _obj.removeClass( 'popup_hide' );
                }, 300 );

            },
            _init = function(){
                _obj[ 0 ].obj = _self;
                _onEvents();
            },
            _onEvents = function(){
                _window.on( {
                    resize: function(){
                        _centerWrap();
                    },
                    'keydown': function ( e ) {
                        switch( e.which ) {

                            case 27:
                                _hide();
                                break;

                            default:
                                return;
                        }
                    }
                } );
                _btnShow.on( {
                    click: function(){
                        _show( $( this ).attr( 'data-popup' ) );
                        return false;
                    }
                } );
                _btnClose.on( {
                    click: function(){
                        _hide();
                        return false;
                    }
                } );
            },
            _show = function( className ){
                _setPopupContent( className );

                _topScroll =  _scrollConteiner.scrollTop();

                _scrollConteiner.css( {
                    overflowY: 'hidden',
                    paddingRight: _getScrollWidth()
                } );

                _site.css( {
                    'position': 'relative',
                    'top': _topScroll * -1
                } );

                _obj.addClass( 'popup_opened' );
                _centerWrap();

            },
            _setPopupContent = function( className ){
                var curContent = _contents.filter( '.popup__' + className );

                _contents.css( { display: 'none' } );
                curContent.css( { display: 'block' } );
            };

        //public properties

        //public methods

        _init();
    };

} )();

