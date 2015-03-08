( function( root ) {

	var MainPageEngine 	= 	function() {

								var mvc 				= 	{ routers: {}, services: {}, views: {}, controllers: {}, models: {}, };

								var init 				= 	function() {
															};

								var start 				= 	function() {
																igniteService();
																igniteControllers();
															};

								var igniteService 		= 	function() {
																mvc.services.sessionService = new root.SessionService();
																mvc.services.contactService = new root.ContactService();
															};

								var igniteControllers 	= 	function() {
																mvc.controllers.tabController = new root.TabController( mvc );
																mvc.controllers.contactTabController = new root.ContactTabController( mvc );
																mvc.controllers.loanTabController = new root.LoanTabController( mvc );
															};

								init.apply( self, arguments );

								root.mvc 				= 	mvc;

								return 	{
											start 	: 	start,
										};
							};

	var mainPageEngine = new MainPageEngine();
	root.DOMUtil.event( window, 'load', function( event ) { mainPageEngine.start(); } );

} )( window );