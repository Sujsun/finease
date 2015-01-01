( function( root ) {

	var MainPageEngine 	= 	function() {

								var mvc 				= 	{ router: {}, collection: {}, model: {}, views: {}, };

								var init 				= 	function() {
															};

								var start 				= 	function() {
																igniteControllers();
															};

								var igniteControllers 	= 	function() {
																new root.RootController( mvc );
																new root.ContactPageController( mvc );
															};

								init.apply( self, arguments );

								return 	{
											start 	: 	start,
										};
							};

	var mainPageEngine = new MainPageEngine();
	root.DOMUtil.event( window, 'load', function( event ) { mainPageEngine.start(); } );

} )( window );