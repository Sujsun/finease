( function( root ) {
	
	var EmailView 		 =	function( options ) {
 
								var self 				= 	this;

								options || ( options = {} );

								var isRendered			= 	false;

								var emailDOMId 			= 	root.MathUtil.randomId();

								var buttonClickMode		= 	options.buttonClickMode || 'add';

								var dom 				= 	{};

								var isErrorHighlighted 	= 	false;

								dom.listContainer		=	options.listContainer;

								var events 				= 	new root.Events();

								var init 								= 	function() {
																			};

								var render 								= 	function() {
																				var params = { id: emailDOMId, };
																				dom.emailTemplate || ( dom.emailTemplate = window.document.querySelector( '#contact-details-email-template' ) );
																				var templateGeneratedString = root.DOMUtil.runMustache( dom.emailTemplate, params );
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

								var setEmail 							= 	function( email ) {
																				if( dom.emailInput ) {
																					return root.DOMUtil.attr( dom.emailInput, 'value', email );
																				}
																			};

								var getEmail 							= 	function() {
																				if( dom.emailInput ) {
																					return root.ValidatorUtil.string( root.DOMUtil.attr( dom.emailInput, 'value' ) );
																				}
																			};

								var setButtonClickMode					= 	function( buttonClickModeArg ) {
																				switch( buttonClickModeArg ) {
																					case 'add' :
																						buttonClickMode = buttonClickModeArg;
																						root.DOMUtil.attr( dom.addRemoveEmailButton, 'id', buttonClickMode + '-email-button' );
																						root.DOMUtil.addClass( dom.addRemoveEmailIcon, 'fa-plus' );
																						root.DOMUtil.removeClass( dom.addRemoveEmailIcon, 'fa-minus' );
																						break;
																					case 'remove' :
																						buttonClickMode = buttonClickModeArg;
																						root.DOMUtil.attr( dom.addRemoveEmailButton, 'id', buttonClickMode + '-email-button' );
																						root.DOMUtil.addClass( dom.addRemoveEmailIcon, 'fa-minus' );
																						root.DOMUtil.removeClass( dom.addRemoveEmailIcon, 'fa-plus' );
																						break;
																					default :
																						console.error( 'EmailView :: Given unknown buttonClickMode. buttonClickMode : ', buttonClickMode );
																				}
																			};

								var findElements 						= 	function() {
																				if( dom.listContainer ) {
																					dom.container = dom.listContainer.querySelector( '#' + emailDOMId );
																					if( dom.container ) {
																						dom.emailInput = dom.container.querySelector( '#email-input' );
																						dom.addRemoveEmailDiv = dom.container.querySelector( '#add-remove-email-div' );
																						dom.addRemoveEmailButton = dom.addRemoveEmailDiv.querySelector( 'button' );
																						dom.addRemoveEmailIcon = dom.addRemoveEmailDiv.querySelector( 'i' );
																					}
																				}
																			};

								var getDOMId 							= 	function() {
																				return emailDOMId;
																			};

								var highlightError 						= 	function( highlight ) {
																				if( typeof( highlight ) == 'boolean' ) {
																					if( highlight ) {
																						if( !isErrorHighlighted ) {
																							root.DOMUtil.addClass( dom.emailInput, 'highlight-red' );
																							isErrorHighlighted = true;
																						}
																					} else {
																						if( isErrorHighlighted ) {
																							root.DOMUtil.removeClass( dom.emailInput, 'highlight-red' );
																							isErrorHighlighted = false;
																						}
																					}
																				}
																				return isErrorHighlighted;
																			};

								var onAddRemoveButtonClick 				= 	function( event ) {
																				if( getEmail() ) {
																					events.emit( 'click:' + buttonClickMode + 'Email', self );
																					highlightError( false );
																				} else {
																					highlightError( true );
																				}
																			};

								var attachEvents 						= 	function() {
																				root.DOMUtil.event( dom.addRemoveEmailButton, 'click', onAddRemoveButtonClick );
																			};

								init.apply( self, arguments );

								this.events 					= 	events;
								this.render 					= 	render;
								this.destroy 					= 	destroy;
								this.isRendered 				= 	isRendered;
								this.setButtonClickMode			= 	setButtonClickMode;
								this.getDOMId 					= 	getDOMId;
								this.setEmail 					= 	setEmail;
								this.getEmail 					= 	getEmail;

							};

	root[ 'EmailView' ]	= 	EmailView;

} )( window );