( function( root ) {

	var TabController 				= 	function( mvc ) {

										var self 				= 	this;

										var views 				= 	{};

										var init 				= 	function() {
																		createViews();
																		attachEvents();
																	};

										var createViews 		= 	function() {
																		views.titleView = new root.TitleView();
																		views.headerView = new root.HeaderView();
																		views.tabView = new root.TabView();
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
																		views.tabView.show( 'contacts' );
																	};

										var onRouteLoan 		= 	function() {
																		views.titleView.page( 'Loans' );
																		views.headerView.loanHref( window.location.href );
																		views.headerView.contactHref( window.location.pathname + '#contact' );
																		views.headerView.highlightTab( 'loans' );
																		views.tabView.show( 'loans' );
																	}

										init.apply( self, arguments );

									};

	root[ 'TabController' ] = TabController;
} )( window );