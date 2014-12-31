( function( root ) {

	var Registration 			= 	function() {

										var self = this;

										var registrationUrl = 		'/register';

										var dom 			= 		{};

										var findElements 	= 		function() {
																		dom.loginInput = window.document.querySelector( '#login' );
																		dom.passwordInput = window.document.querySelector( '#password' );
																		dom.firstNameInput = window.document.querySelector( '#first-name' );
																		dom.middleNameInput = window.document.querySelector( '#middle-name' );
																		dom.lastNameInput = window.document.querySelector( '#last-name' );
																		dom.landlineInput = window.document.querySelector( '#landline' );
																		dom.mobileInput = window.document.querySelector( '#mobile' );
																		dom.houseNumberInput = window.document.querySelector( '#house-number' );
																		dom.addressLine1Input = window.document.querySelector( '#address-line-1' );
																		dom.addressLine2Input = window.document.querySelector( '#address-line-2' );
																		dom.landmarkInput = window.document.querySelector( '#landmark' );
																		dom.districtInput = window.document.querySelector( '#district' );
																		dom.stateInput = window.document.querySelector( '#state' );
																		dom.countryInput = window.document.querySelector( '#country' );
																		dom.pincodeInput = window.document.querySelector( '#pincode' );
																		dom.registerAnchor = window.document.querySelector( '#register-submit' );
																	};

										var register 		= 		function() {

																		var login = dom.loginInput.value;
																		var password = dom.passwordInput.value;
																		var firstName = dom.firstNameInput.value;
																		var middleName = dom.middleNameInput.value;
																		var lastName = dom.lastNameInput.value;
																		var landline = dom.landlineInput.value;
																		var mobile = dom.mobileInput.value;
																		var houseNumber = dom.houseNumberInput.value;
																		var addressLine1 = dom.addressLine1Input.value;
																		var addressLine2 = dom.addressLine2Input.value;
																		var landmark = dom.landmarkInput.value;
																		var district = dom.districtInput.value;
																		var state = dom.stateInput.value;
																		var country = dom.countryInput.value;
																		var pincode = dom.pincodeInput.value;

																		var contact = {};
																		contact.login = ValidatorUtil.string( login );
																		contact.password = ValidatorUtil.string( password );
																		contact.firstName = ValidatorUtil.string( firstName );
																		contact.middleName = ValidatorUtil.string( middleName );
																		contact.lastName = ValidatorUtil.string( lastName );

																		contact.phoneNumberList = [];
																		contact.phoneNumberList.push( ValidatorUtil.string( landline ) );
																		contact.phoneNumberList.push( ValidatorUtil.string( mobile ) );

																		contact.addressList = [];
																		var address = {};
																		address.houseNumber = ValidatorUtil.string( houseNumber );
																		address.addressLine1 = ValidatorUtil.string( addressLine1 );
																		address.addressLine2 = ValidatorUtil.string( addressLine1 );
																		address.landmark = ValidatorUtil.string( landmark );
																		address.district = ValidatorUtil.string( district );
																		address.state = ValidatorUtil.string( state );
																		address.country = ValidatorUtil.string( country );
																		address.pincode = ValidatorUtil.string( pincode );
																		contact.addressList.push( address );

																		console.error( contact );

																		AJAXUtil.call( registrationUrl, 'post', contact )
																			.done( 	function( data ) {
																						if( data ) {
																							alert( 'Successfully Created Account' );
																							document.location.href = '/home';
																						} else {
																							alert( 'Failed' );
																						}
																					} );

																	};

										var onRegisterClick = 		function( event ) {
																		register();
																	};

										var attachEvents 	= 		function() {
																		var self = this;
																		dom.registerAnchor.onclick = onRegisterClick;
																	};

										findElements();
										attachEvents();

										window.register 	= 		register;

									};

	new Registration();

} )( window );