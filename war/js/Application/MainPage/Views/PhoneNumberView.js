( function( root ) {
	
	var PhoneNumberView =	function( options ) {
 
								var self 				= 	this;

								options || ( options = {} );

								var isRendered			= 	false;

								var phoneNumberDOMId 	= 	root.MathUtil.randomId();

								var buttonClickMode		= 	options.buttonClickMode || 'add';

								var dom 				= 	{};

								var isErrorHighlighted 	= 	false;

								dom.listContainer		=	options.listContainer;

								var events 				= 	new root.Events();

								var init 								= 	function() {
																			};

								var render 								= 	function() {
																				var params = { id: phoneNumberDOMId, };
																				dom.phoneNumberTemplate || ( dom.phoneNumberTemplate = window.document.querySelector( '#contact-details-phone-number-template' ) );
																				var templateGeneratedString = root.DOMUtil.runMustache( dom.phoneNumberTemplate, params );
																				if( dom.listContainer ) {
																					dom.listContainer.insertAdjacentHTML( 'beforeend', templateGeneratedString );
																					findElements();
																					attachEvents();
																					setButtonClickMode( buttonClickMode );
																					isRendered = true;
																				}
																			};

								var destroy 							= 	function() {
																				if( isRendered ) {
																					root.DOMUtil.remove( dom.container );
																					isRendered = false;
																				}
																				self = undefined;
																				return isRendered;
																			};

								var setPhoneNumber 						= 	function( phoneNumber ) {
																				if( dom.phoneNumberInput ) {
																					return root.DOMUtil.attr( dom.phoneNumberInput, 'value', phoneNumber );
																				}
																			};

								var getPhoneNumber 						= 	function() {
																				if( dom.phoneNumberInput ) {
																					return root.ValidatorUtil.string( root.DOMUtil.attr( dom.phoneNumberInput, 'value' ) );
																				}
																			};

								var setButtonClickMode					= 	function( buttonClickModeArg ) {
																				switch( buttonClickModeArg ) {
																					case 'add' :
																						buttonClickMode = buttonClickModeArg;
																						root.DOMUtil.attr( dom.addRemovePhoneNumberButton, 'id', buttonClickMode + '-phone-number-button' );
																						root.DOMUtil.addClass( dom.addRemovePhoneNumberIcon, 'fa-plus' );
																						root.DOMUtil.removeClass( dom.addRemovePhoneNumberIcon, 'fa-minus' );
																						break;
																					case 'remove' :
																						buttonClickMode = buttonClickModeArg;
																						root.DOMUtil.attr( dom.addRemovePhoneNumberButton, 'id', buttonClickMode + '-phone-number-button' );
																						root.DOMUtil.addClass( dom.addRemovePhoneNumberIcon, 'fa-minus' );
																						root.DOMUtil.removeClass( dom.addRemovePhoneNumberIcon, 'fa-plus' );
																						break;
																					default :
																						console.error( 'PhoneNumberView :: Given unknown buttonClickMode. buttonClickMode : ', buttonClickMode );
																				}
																			};

								var findElements 						= 	function() {
																				if( dom.listContainer ) {
																					dom.container = dom.listContainer.querySelector( '#' + phoneNumberDOMId );
																					if( dom.container ) {
																						dom.phoneNumberInput = dom.container.querySelector( '#phone-number-input' );
																						dom.addRemovePhoneNumberDiv = dom.container.querySelector( '#add-remove-phone-number-div' );
																						dom.addRemovePhoneNumberButton = dom.addRemovePhoneNumberDiv.querySelector( 'button' );
																						dom.addRemovePhoneNumberIcon = dom.addRemovePhoneNumberDiv.querySelector( 'i' );
																					}
																				}
																			};

								var getDOMId 							= 	function() {
																				return phoneNumberDOMId;
																			};

								var highlightError 						= 	function( highlight ) {
																				if( typeof( highlight ) == 'boolean' ) {
																					if( highlight ) {
																						if( !isErrorHighlighted ) {
																							root.DOMUtil.addClass( dom.phoneNumberInput, 'highlight-red' );
																							isErrorHighlighted = true;
																						}
																					} else {
																						if( isErrorHighlighted ) {
																							root.DOMUtil.removeClass( dom.phoneNumberInput, 'highlight-red' );
																							isErrorHighlighted = false;
																						}
																					}
																				}
																				return isErrorHighlighted;
																			};

								var onAddRemoveButtonClick 				= 	function( event ) {
																				if( getPhoneNumber() ) {
																					events.emit( 'click:' + buttonClickMode + 'PhoneNumber', self );
																					highlightError( false );
																				} else {
																					highlightError( true );
																				}
																			};

								var attachEvents 						= 	function() {
																				root.DOMUtil.event( dom.addRemovePhoneNumberButton, 'click', onAddRemoveButtonClick );
																			};

								init.apply( self, arguments );

								this.events 					= 	events;
								this.render 					= 	render;
								this.destroy 					= 	destroy;
								this.isRendered 				= 	isRendered;
								this.setButtonClickMode			= 	setButtonClickMode;
								this.getDOMId 					= 	getDOMId;
								this.setPhoneNumber 			= 	setPhoneNumber;
								this.getPhoneNumber 			= 	getPhoneNumber;

							};

	root[ 'PhoneNumberView' ]= 	PhoneNumberView;

} )( window );