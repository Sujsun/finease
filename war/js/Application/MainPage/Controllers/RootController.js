( function( root ) {

	var RootController 			= 	function( mvc ) {

										var self 				= 	this;

										var views 				= 	{};

										var init 				= 	function() {
																		createViews();
																		attachEvents();
																	};

										var createViews 		= 	function() {
																		views.titleView = new root.TitleView();
																		views.headerView = new root.HeaderView();
																	};

										var attachEvents 		= 	function() {
																		attachViewEvents();
																		attachRouteEvents();
																	};

										var attachRouteEvents 	= 	function() {
																		var routePathMap		= 	{
																										'' 								: 	onRootRoute,
																										'contact' 						: 	onRouteContact,
																										'contact/:id'					: 	onRouteContact,
																										'contact/:id/transaction/id' 	: 	onRouteContact,
																										'loan' 							: 	onRouteLoan,
																										'loan/:id'						: 	onRouteLoan,
																										'loan/:id/transaction/id' 		: 	onRouteLoan,
																									};
																		root.routie( routePathMap );
																	};

										var attachViewEvents 	= 	function() {
																	};

										var onRootRoute 		= 	function() {
																		routie.navigate( root.Application.properties.landingRoute );
																	};

										var onRouteContact 		= 	function() {
																		views.titleView.page( 'Contacts' );
																		views.headerView.contactHref( window.location.href );
																		views.headerView.loanHref( window.location.pathname + '#loan' );
																		views.headerView.highlightTab( 'contacts' );
																	};

										var onRouteLoan 		= 	function() {
																		views.titleView.page( 'Loans' );
																		views.headerView.loanHref( window.location.href );
																		views.headerView.contactHref( window.location.pathname + '#contact' );
																		views.headerView.highlightTab( 'loans' );
																	}

										init.apply( self, arguments );

									};

	root[ 'RootController' ] = RootController;
} )( window );