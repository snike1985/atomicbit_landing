( function(){

    "use strict";

    $( function(){

        if ( $( '.contact-us__form' ).length ){
            new FormValidator( $( this ) );
        }

    } );

    var FormValidator = function (obj) {

        //private properties
        var _obj = obj,
            _note = _obj.find( '.contacts__message_error' ),
            _noteSuccess = _obj.find( '.contacts__message_success' ),
            _noteWrap = _obj.find( '.contacts__message-wrap' ),
            _inputs = _obj.find( 'input, textarea' ),
            _fields = _obj.find( '[data-required]' ),
            _select = _obj.find( 'select' ),
            _request = new XMLHttpRequest();

        //private methods
        var _constructor = function () {
                _onEvents();
            },
            _addNotTouchedClass = function () {

                _fields.each( function() {

                    var curItem = $(this);

                    if( curItem.val() === '' || curItem.val() === '0' ){

                        curItem.addClass( 'not-touched' );
                        curItem.parents( '.websters-select' ).addClass( 'not-touched' );

                        _validateField( curItem );

                    }

                    if ( curItem.hasClass( 'valid' ) ){
                        curItem.removeClass( 'not-touched' );
                    }

                } );

                if ( $( '#comments__rate-input' ).hasClass( 'not-touched' ) ) {
                    $( '#comments__rate' ).addClass( 'not-valid' );
                }

            },
            _onEvents = function () {
                _fields.on( {
                    focus: function() {

                        $( this ).removeClass( 'not-touched' );

                    },
                    focusout: function() {

                        var curItem = $(this);

                        _validateField( curItem );

                    },
                    keyup: function () {

                        var curItem = $(this);

                        if ( curItem.hasClass( 'not-valid' ) ){
                            _validateField( curItem );
                        }

                    }
                } );
                _inputs.on( {
                    focusout: function() {

                        var letterCounter = 0;

                        _inputs.each( function () {

                            var curItem = $(this);

                            if ( curItem.val().length > 0 ){
                                letterCounter = letterCounter + 1
                            }

                        } );

                        if ( letterCounter === 0 ) {
                            _inputs.removeClass( 'not-valid' );
                            _note.removeClass('visible');
                        }

                    }
                } );
                _obj.on( {
                    submit: function() {

                        _addNotTouchedClass();

                        if( !(_fields.filter( '.not-valid' ).length === 0) ) {

                            _note.addClass('visible');
                            _noteWrap.css( 'height', _note.outerHeight() )
                        }

                        if( _fields.hasClass('not-touched') || _fields.hasClass('not-valid') || _select.hasClass('not-valid') ) {

                            _obj.find('.not-touched:first').focus();
                            _obj.find('.not-valid:first').focus();
                            return false;

                        } else {

                            _ajaxRequest();
                            return false;

                        }

                    }
                } );
                _select.on( 'change', function () {

                    var curSelect = $( this ),
                        curParent = curSelect.parents( '.websters-select' );

                    curSelect.removeClass( 'not-valid not-touched' );
                    curParent.removeClass( 'not-valid not-touched' );

                } );
            },
            _ajaxRequest = function(){

                _request = $.ajax( {
                    url: 'php/form.php',
                    data: {
                        name: $( 'input[name=name]' ).val(),
                        surname: $( 'input[name=surname]' ).val(),
                        email: $( 'input[name=email]' ).val(),
                        phone: $( 'input[name=phone]' ).val(),
                        company: $( 'input[name=company]' ).val(),
                        website: $( 'input[name=website]' ).val(),
                        service: $( 'select[name=service]' ).val(),
                        scope: $( 'textarea[name=scope]' ).val()
                    },
                    dataType: 'json',
                    type: 'GET',
                    success: function ( data ) {

                        if ( data == 1 ){
                            _noteSuccess.addClass('visible');
                            _noteWrap.css( 'height', _noteSuccess.outerHeight() );
                        };

                    },
                    error: function ( XMLHttpRequest ) {
                        if ( XMLHttpRequest.statusText != "abort" ) {
                            console.log( 'err' );
                        }
                    }
                } );

            },
            _makeNotValid = function ( field ) {
                field.addClass( 'not-valid' );
                field.parents( '.websters-select' ).addClass( 'not-valid' );
                field.removeClass( 'valid' );

                if ( $( '#comments__rate-input' ).hasClass( 'not-valid' ) ) {

                    $( '#comments__rate' ).addClass( 'not-valid' );

                }

            },
            _makeValid = function ( field ) {
                field.removeClass( 'not-valid' );
                field.parents( '.websters-select' ).removeClass( 'not-valid' );
                field.addClass( 'valid' );
            },
            _validateEmail = function ( email ) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            _validateField = function ( field ) {
                var type = field.attr( 'type'),
                    tagName = field[0].tagName;

                if( type === 'email' || type === 'text'  || type === 'tel' ){

                    if( field.val() === '' ){
                        _makeNotValid( field );
                        return false;
                    }

                }

                if( type === 'email' ){
                    if( !_validateEmail( field.val() ) ){
                        _makeNotValid( field );
                        return false;
                    }
                }

                if( tagName.toLocaleLowerCase() == 'textarea' ){

                    if( field.val() === '' ){
                        _makeNotValid( field );
                        return false;
                    }

                }

                if( tagName.toLocaleLowerCase() == 'select' ){

                    if( field.val() === 0 ){
                        _makeNotValid( field );
                        return false;
                    }

                }

                _makeValid( field );

                if( _fields.filter( '.not-valid' ).length === 0 ) {

                    _note.removeClass('visible');
                    _noteWrap.css( 'height', 0 )

                }

            };

        //public properties

        _constructor();
    };

} )();