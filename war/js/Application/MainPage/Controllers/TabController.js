( function( root ) {

	var TabController 				= 	function( mvc ) {

										var self 				= 	this;

										var views 				= 	{};

										var init 				= 	function() {
																		createViews();
																		updateContactInView();
																		attachEvents();
																	};

										var createNotifViews	= 	function() {
																		mvc.views.notify = mvc.views.notify || {};
																		mvc.views.notify.error = root.humane.spawn( { baseCls: 'humane-libnotify', addnCls: 'humane-libnotify-error', timeout: 'none', clickToClose: true, } );
																		mvc.views.notify.info = root.humane.spawn( { baseCls: 'humane-libnotify', addnCls: 'humane-libnotify-warn', timeout: 'none', clickToClose: true, } );
																		mvc.views.notify.success = root.humane.spawn( { baseCls: 'humane-libnotify', addnCls: 'humane-libnotify-success', timeout: 2 * 1000, clickToClose: true, } );
																	};

										var createViews 		= 	function() {
																		views.titleView = new root.TitleView( mvc );
																		views.headerView = new root.HeaderView( mvc );
																		views.tabView = new root.TabView( mvc );
																		views.overlayBlocker = new root.OverlayBlocker( window.document.body );
																		createNotifViews();
																	};

										var updateContactInView = 	function() {
																		mvc.services.sessionService.get( 'sessionModel' )
																			.done( function( sessionModel ) { mvc.models.sessionModel = sessionModel; var sessionContactModel = new Model( sessionModel.attr( 'contact' ) ); views.headerView.setSessionContactModel( sessionContactModel ); } )
																			.fail( function( status, statusText, xmlHttp ) { mvc.views.notify.error( [ '<div style="font-size: 13px; font-weight: bold;">' + statusText + '</div>', /*'<div style="font-size: 11px;">' + statusText + '</div>', */ '<div style="font-size: 11px;">Click to reload</div>' ], { click: function() { window.location.reload(); }, overlayBlock: true, } ); } );
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