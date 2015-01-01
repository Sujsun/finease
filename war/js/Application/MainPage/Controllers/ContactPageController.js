( function( root ) {

	var ContactPageController 	= 	function( mvc ) {

										var self 				= 	this;

										var init 				= 	function() {

																	};

										var createViews 		= 	function() {
																	};

										var attachEvents 		= 	function() {
																		attachViewEvents();
																		attachRouteEvents();
																	};

										var attachRouteEvents 	= 	function() {
																		var routePathMap		= 	{
																										'' 										: 	onRootRoute,
																										'contact'	 	 						: 	onContactRoute,
																										'contact/:contactId' 	 				: 	onContactIdRoute,
																									};
																		root.routie( routePathMap );
																	};

										var attachViewEvents 	= 	function() {
																		;
																	};

										init.apply( self, arguments );

									};

	root[ 'ContactPageController' ] = ContactPageController;
} )( window );