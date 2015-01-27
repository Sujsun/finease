( function( root ) {
	
	var AddressView 	=	function( options ) {
 
								var self 				= 	this;

								options || ( options = {} );

								var isRendered			= 	false;

								var addressDOMId 		= 	root.MathUtil.randomId();

								var buttonClickMode		= 	options.buttonClickMode || 'add';

								var addressType 		= 	options.addressType || 'office';

								var dom 				= 	{};

								dom.listContainer		=	options.listContainer;

								var events 				= 	new root.Events();

								var init 								= 	function() {
																			};

								var render 								= 	function() {
																				var params = { id: addressDOMId, };
																				dom.addressTemplate || ( dom.addressTemplate = window.document.querySelector( '#contact-details-address-template' ) );
																				var templateGeneratedString = root.DOMUtil.runMustache( dom.addressTemplate, params );
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

								var setAddress 							= 	function( address ) {
																				setAddressType( address.type );
																				root.DOMUtil.attr( dom.addressLine1, 'value', address.addressLine1 );
																				root.DOMUtil.attr( dom.addressLine2, 'value', address.addressLine2 );
																				root.DOMUtil.attr( dom.landmark, 'value', address.landmark );
																				root.DOMUtil.attr( dom.city, 'value', address.city );
																				root.DOMUtil.attr( dom.state, 'value', address.state );
																				root.DOMUtil.attr( dom.country, 'value', address.country );
																				root.DOMUtil.attr( dom.pincode, 'value', address.pincode );
																			};

								var getAddress 							= 	function() {
																				var returnVariable = undefined;
																				var address = {};
																				address.addressLine1 = root.ValidatorUtil.string( root.DOMUtil.attr( dom.addressLine1, 'value' ) );
																				address.addressLine2 = root.ValidatorUtil.string( root.DOMUtil.attr( dom.addressLine2, 'value' ) );
																				address.landmark = root.ValidatorUtil.string( root.DOMUtil.attr( dom.landmark, 'value' ) );
																				address.district = root.ValidatorUtil.string( root.DOMUtil.attr( dom.city, 'value' ) );
																				address.state = root.ValidatorUtil.string( root.DOMUtil.attr( dom.state, 'value' ) );
																				address.country = root.ValidatorUtil.string( root.DOMUtil.attr( dom.country, 'value' ) );
																				address.pincode = root.ValidatorUtil.string( root.DOMUtil.attr( dom.pincode, 'value' ) );
																				address = root.ObjectUtil.deleteUndefinedParams( address );
																				if( Object.keys( address ).length > 0 ) {
																					address.type = addressType;
																					returnVariable = address;
																				}
																				return returnVariable;
																			};

								var setButtonClickMode					= 	function( buttonClickModeArg ) {
																				switch( buttonClickModeArg ) {
																					case 'add' :
																						buttonClickMode = buttonClickModeArg;
																						root.DOMUtil.attr( dom.addRemoveAddressButton, 'id', buttonClickMode + '-address-button' );
																						root.DOMUtil.addClass( dom.addRemoveAddressIcon, 'fa-plus' );
																						root.DOMUtil.removeClass( dom.addRemoveAddressIcon, 'fa-minus' );
																						break;
																					case 'remove' :
																						buttonClickMode = buttonClickModeArg;
																						root.DOMUtil.attr( dom.addRemoveAddressButton, 'id', buttonClickMode + '-address-button' );
																						root.DOMUtil.addClass( dom.addRemoveAddressIcon, 'fa-minus' );
																						root.DOMUtil.removeClass( dom.addRemoveAddressIcon, 'fa-plus' );
																						break;
																					default :
																						console.error( 'AddressView :: Given unknown buttonClickMode. buttonClickMode : ', buttonClickMode );
																				}
																			};

								var findElements 						= 	function() {
																				if( dom.listContainer ) {
																					dom.container = dom.listContainer.querySelector( '#' + addressDOMId );
																					if( dom.container ) {
																						dom.addressLine1 = dom.container.querySelector( '#address-line-1' );
																						dom.addressLine2 = dom.container.querySelector( '#address-line-2' );
																						dom.landmark = dom.container.querySelector( '#landmark' );
																						dom.city = dom.container.querySelector( '#city' );
																						dom.state = dom.container.querySelector( '#state' );
																						dom.country = dom.container.querySelector( '#country' );
																						dom.pincode = dom.container.querySelector( '#pincode' );
																						dom.addressTypeDropdown = dom.container.querySelector( '#address-type-dropdown' );
																						dom.addressTypeDropdownButton = dom.addressTypeDropdown.querySelector( 'button#address-type-list' );
																						dom.addressTypeDropdownButtonIcon = dom.addressTypeDropdownButton.querySelector( 'i' );
																						dom.addressTypeDropdownMenuAnchors = dom.addressTypeDropdown.querySelectorAll( 'ul li a' );
																						dom.addRemoveAddressButton = dom.container.querySelector( 'button.add-remove-address-button' );
																						dom.addRemoveAddressIcon = dom.addRemoveAddressButton.querySelector( 'i' ); 
																					}
																				}
																			};

								var getDOMId 							= 	function() {
																				return addressDOMId;
																			};

								var onAddRemoveButtonClick 				= 	function( event ) {
																				if( getAddress() ) {
																					DOMUtil.removeClass( dom.container, 'highlight-red' );
																					events.emit( 'click:' + buttonClickMode + 'Address', self );
																				} else {
																					DOMUtil.addClass( dom.container, 'highlight-red' );
																				}
																			};

								var setAddressType 						= 	function( addressType ) {
																				switch( addressType ) {
																					case 'office' :
																						addressType = 'office';
																						root.DOMUtil.addClass( dom.addressTypeDropdownButtonIcon, 'fa-building-o' );
																						root.DOMUtil.removeClass( dom.addressTypeDropdownButtonIcon, 'fa-home' );
																						break;
																					case 'home' :
																						addressType = 'home';
																						root.DOMUtil.addClass( dom.addressTypeDropdownButtonIcon, 'fa-home' );
																						root.DOMUtil.removeClass( dom.addressTypeDropdownButtonIcon, 'fa-building-o' );
																						break;
																					default :
																						console.error( 'AddressView :: Unknown address type. addressType : "', addressType, '"\nSo setting it to default address type "office"' );
																						setAddressType( 'office' );
																						break;
																				}
																			};

								var onAddressTypeDropdownClick 			= 	function( event ) {
																				var addressTypeAnchorId = root.DOMUtil.attr( this, 'id' );
																				switch( addressTypeAnchorId ) {
																					case 'address-type-office-a' :
																						setAddressType( 'office' );
																						break;
																					case 'address-type-home-a' :
																						setAddressType( 'home' );
																						break;
																				}
																			};

								var attachEvents 						= 	function() {
																				root.DOMUtil.event( dom.addRemoveAddressButton, 'click', onAddRemoveButtonClick );

																				for( var index = 0; index < dom.addressTypeDropdownMenuAnchors.length; index++ ) {
																					var addressTypeDropdownMenuAnchor = dom.addressTypeDropdownMenuAnchors[ index ];
																					root.DOMUtil.event( addressTypeDropdownMenuAnchor, 'click', onAddressTypeDropdownClick );
																				}
																			};

								init.apply( self, arguments );

								this.events 					= 	events;
								this.render 					= 	render;
								this.destroy 					= 	destroy;
								this.isRendered 				= 	isRendered;
								this.setButtonClickMode			= 	setButtonClickMode;
								this.getDOMId 					= 	getDOMId;
								this.setAddress 				= 	setAddress;
								this.getAddress 	 			= 	getAddress;

							};

	root[ 'AddressView' ]= 	AddressView;

} )( window );