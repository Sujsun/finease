var Application = {};
( function() {
	var currentUrl 								= 		window.location.href;
	var getAppMode 								= 		function() {

															if( currentUrl.indexOf( 'live' ) != -1 ) {
																return 'live';
															} else if( currentUrl.indexOf( 'staging' ) != -1 ) {
																return 'staging';
															} else if( currentUrl.indexOf( 'localhost' ) != -1 ) {
																return 'dev';
															} else {
																return 'live';
															}

														};

	Application.name 							= 		'Finease';
	Application.appMode 						= 		getAppMode();

	Application.properties 						= 		{};
	Application.properties.landingRoute 		= 		'contact';
} )();