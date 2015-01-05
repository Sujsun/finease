( function( root ) {
	
	var ContactDetailsView =function( options ) {
 
								var self 		= 	this;

								options 		= 	options || {};

								var dom 		= 	{};

								dom.container 	= 	options.container || window.document.body;

								var views 		= 	{};

								var contactModel= 	undefined;

								var isValueChangedInViewBoolean = false;

								var events 		= 	new root.Events();

								var init 								= 	function() {
																				findElements();
																				attachEvents();
																				createViews();
																			};

								var findElements 						= 	function() {
																				if( dom.container ) {
																					dom.contactDetailsHeader = dom.container.querySelector( '#contact-details-header-name-col' );
																					dom.saveContactButton = dom.container.querySelector( '#save-contact-button' );
																					dom.firstName = dom.container.querySelector( '#first-name' );
																					dom.middleName = dom.container.querySelector( '#middle-name' );
																					dom.lastName = dom.container.querySelector( '#last-name' );
																					dom.phoneNumberList = dom.container.querySelector( '#phone-number-list' );
																					dom.addressList = dom.container.querySelector( '#address-list-list' );
																					dom.saveContactButton = dom.container.querySelector( '#save-contact-button' );
																					dom.contactFieldInputs = dom.container.querySelectorAll( 'input.contact-field-input' );
																				}
																			};

								var createViews 						= 	function() {
																				addPhoneNumberView();
																				addAddressView();
																			};

								var setContact 							= 	function( contactModelArg ) {
																				contactModel = contactModelArg || new root.ContactModel();
																				setContactInView();
																			};

								var getContact 							= 	function() {
																				var contact = {};
																				contact.firstName = root.ValidatorUtil.string( root.DOMUtil.attr( dom.firstName, 'value' ) );
																				contact.middleName = root.ValidatorUtil.string( root.DOMUtil.attr( dom.middleName, 'value' ) );
																				contact.lastName = root.ValidatorUtil.string( root.DOMUtil.attr( dom.lastName, 'value' ) );
																				var phoneNumberArray = getPhoneNumbers();
																				contact.phoneNumberList = ( phoneNumberArray && phoneNumberArray.length > 0 ) ? phoneNumberArray : undefined;
																				var addressArray = getAddresses();
																				contact.addressList = ( addressArray && addressArray.length > 0 ) ? addressArray : undefined;
																				contact = root.ObjectUtil.deleteUndefinedParams( contact );
																				return new root.Model( contact );
																			};

								var reset 								= 	function() {
																				setContact( null );
																			};

								var setContactInView 					= 	function() {
																				if( contactModel ) {
																					var contactNameWithInitials = contactModel.getNameWithInitials();
																					root.DOMUtil.attr( dom.contactDetailsHeader, 'innerHTML', ( contactNameWithInitials != '' ? contactNameWithInitials : 'No Name' ) );
																					root.DOMUtil.attr( dom.firstName, 'value', contactModel.attr( 'firstName' ) || '' );
																					root.DOMUtil.attr( dom.middleName, 'value', contactModel.attr( 'middleName' ) || '' );
																					root.DOMUtil.attr( dom.lastName, 'value', contactModel.attr( 'lastName' ) || '' );
																					removeAllPhoneNumberViews();
																					removeAllAddressViews();
																					addPhoneNumberViews( contactModel.attr( 'phoneNumberList' ) );
																					addAddressViews( contactModel.attr( 'addressList' ) );
																				}
																			};

								var getPhoneNumbers 					= 	function() {
																				var returnPhoneNumberArray = [];
																				if( views.phoneNumberViews ) {
																					for( var key in views.phoneNumberViews ) {
																						var phoneNumberView = views.phoneNumberViews[ key ];
																						var phoneNumber = phoneNumberView.getPhoneNumber();
																						if( phoneNumber ) {
																							returnPhoneNumberArray.push( phoneNumber );
																						}
																					}
																				}
																				return returnPhoneNumberArray;
																			};

								var getAddresses	 					= 	function() {
																				var returnAddressArray = [];
																				if( views.addressViews ) {
																					for( var key in views.addressViews ) {
																						var addressView = views.addressViews[ key ];
																						var address = addressView.getAddress();
																						if( address ) {
																							returnAddressArray.push( address );
																						}
																					}
																				}
																				return returnAddressArray;
																			};

								var addPhoneNumberView 					= 	function( phoneNumber ) {
																				views.phoneNumberViews || ( views.phoneNumberViews = {} );
																				if( views.previousPhoneNumberView ) {
																					views.previousPhoneNumberView.setButtonClickMode( 'remove' );
																				}
																				var phoneNumberView = new root.PhoneNumberView( { listContainer: dom.phoneNumberList, buttonClickMode: 'add', } );
																				phoneNumberView.render();
																				if( phoneNumber ) {
																					phoneNumberView.setPhoneNumber( phoneNumber );
																				}
																				phoneNumberView.events.on( 'click:addPhoneNumber', function( phoneNumberView ) { addPhoneNumberView(); } );
																				phoneNumberView.events.on( 'click:removePhoneNumber', function( phoneNumberView ) { removePhoneNumberView( phoneNumberView ); } );
																				views.phoneNumberViews[ phoneNumberView.getDOMId() ] = phoneNumberView;
																				views.previousPhoneNumberView = phoneNumberView;
																			};

								var removePhoneNumberView 				= 	function( phoneNumberView ) {
																				phoneNumberView.destroy();
																				var phoneNumberViewDOMId = phoneNumberView.getDOMId();
																				if( views.phoneNumberViews[ phoneNumberViewDOMId ] ) {
																					delete views.phoneNumberViews[ phoneNumberViewDOMId ];
																				}
																			};

								var addPhoneNumberViews					= 	function( phoneNumberArray ) {
																				if( phoneNumberArray && phoneNumberArray.length > 0 ) {
																					for( var index in phoneNumberArray ) {
																						var phoneNumber = phoneNumberArray[ index ];
																						addPhoneNumberView( phoneNumber );
																					}
																				} else {
																					addPhoneNumberView();
																				}
																			};

								var removeAllPhoneNumberViews 			= 	function() {
																				if( views.phoneNumberViews ) {
																					for( var key in views.phoneNumberViews ) {
																						removePhoneNumberView( views.phoneNumberViews[ key ] );
																					}
																					views.previousPhoneNumberView = undefined;
																				}
																			};

								var addAddressView 						= 	function( address ) {
																				views.addressViews || ( views.addressViews = {} );
																				if( views.previousAddressView ) {
																					views.previousAddressView.setButtonClickMode( 'remove' );
																				}
																				var addressView = new root.AddressView( { listContainer: dom.addressList, buttonClickMode: 'add', } );
																				addressView.render();
																				if( address ) {
																					addressView.setAddress( address );
																				}
																				addressView.events.on( 'click:addAddress', function( addressView ) { addAddressView(); } );
																				addressView.events.on( 'click:removeAddress', function( addressView ) { removeAddressView( addressView ); } );
																				views.addressViews[ addressView.getDOMId() ] = addressView;
																				window.previousAddressView = addressView;
																				views.previousAddressView = addressView;
																			};

								var removeAddressView 					= 	function( addressView ) {
																				addressView.destroy();
																				var addressViewDOMId = addressView.getDOMId();
																				if( views.addressViews[ addressViewDOMId ] ) {
																					delete views.addressViews[ addressViewDOMId ];
																				}
																			};

								var addAddressViews						= 	function( addressArray ) {
																				if( addressArray && addressArray.length > 0 ) {
																					for( var index in addressArray ) {
																						var address = addressArray[ index ];
																						addAddressView( address );
																					}
																				} else {
																					addAddressView();
																				}
																			};

								var removeAllAddressViews	 			= 	function() {
																				if( views.addressViews ) {
																					for( var key in views.addressViews ) {
																						removeAddressView( views.addressViews[ key ] );
																					}
																					views.previousAddressView = undefined;
																				}
																			};

								var showSaveButton 						= 	function( show ) {
																				root.DOMUtil.show( dom.saveContactButton, show );
																			};

								var isValueChangedInView				= 	function( isValueChangedInViewBooleanArg ) {
																				if( typeof( isValueChangedInViewBooleanArg ) == 'boolean' ) {
																					if( isValueChangedInViewBooleanArg != isValueChangedInViewBoolean ) {
																						isValueChangedInViewBoolean = isValueChangedInViewBooleanArg;
																						showSaveButton( isValueChangedInViewBoolean );
																					}
																				}
																				return isValueChangedInViewBoolean;
																			};

								var onSaveButtonClick 					= 	function() {
																				isValueChangedInView( false );
																			};

								var onValueChangedInView 				= 	function() {
																				isValueChangedInView( true );
																			};

								var attachEventsToFindChangeInView		= 	function() {
																				for( var index = 0; index < dom.contactFieldInputs.length; index++ ) {
																					root.DOMUtil.event( dom.contactFieldInputs[ index ], 'input', onValueChangedInView );
																				}
																			};

								var attachEvents 						= 	function() {
																				root.DOMUtil.event( dom.saveContactButton, 'click', onSaveButtonClick );
																				attachEventsToFindChangeInView();
																			};

								init.apply( self, arguments );

								window.setContact 						= 	setContact;
								window.getContact 						= 	getContact;
								window.reset 							= 	reset;

								return 	{
											events 				: 	events,
											setContact 			: 	setContact,
											getContact 			: 	getContact,
											reset 				: 	reset,
										};

							};

	root[ 'ContactDetailsView' ]= 	ContactDetailsView;

} )( window );