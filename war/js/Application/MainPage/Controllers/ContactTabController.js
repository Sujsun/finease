( function( root ) {

	var ContactTabController 	= 	function( mvc ) {

										var self 				= 	this;

										var views 				= 	{};

										var init 				= 	function() {
																		createViews();
																	};

										var createViews 		= 	function() {
																		views.contactDetailsView = new root.ContactDetailsView();
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

	root[ 'ContactTabController' ] = ContactTabController;
} )( window );