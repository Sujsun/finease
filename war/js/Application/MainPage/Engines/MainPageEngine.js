( function( root ) {

	var MainPageEngine 	= 	function() {

								var mvc 				= 	{ routers: {}, services: {}, views: {}, controllers: {}, models: {}, deferreds: {}, data: {}, };

								var init 				= 	function() {
															};

								var start 				= 	function() {
																initializeDeferreds();
																igniteService();
																igniteControllers();
															};

								var igniteService 		= 	function() {
																mvc.services.sessionService = new root.SessionService();
																mvc.services.contactService = new root.ContactService();
																mvc.services.loanService = new root.LoanService();
															};

								var igniteControllers 	= 	function() {
																mvc.controllers.tabController = new root.TabController( mvc );
																mvc.controllers.contactTabController = new root.ContactTabController( mvc );
																mvc.controllers.loanTabController = new root.LoanTabController( mvc );
															};

								function initializeDeferreds() {
									mvc.deferreds.ContactsDeferred = new root.dfrd.Deferred();
									mvc.deferreds.LoansDeferred = new root.dfrd.Deferred();
								}

								init.apply( self, arguments );

								root.mvc 				= 	mvc;

								return 	{
											start 	: 	start,
										};
							};

	var mainPageEngine = new MainPageEngine();
	root.DOMUtil.event( window, 'load', function( event ) { mainPageEngine.start(); } );

} )( window );