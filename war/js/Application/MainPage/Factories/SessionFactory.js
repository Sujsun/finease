( function( root ) {
	
	var SessionFactory	= 	function() {

								var self 				= 	this;

								var sessionPath 		= 	'/service/session' + '?' + 'attribute=';

								var init 				= 	function() {
															};

								var get					= 	function( sessionAttributeKey ) {
																var deferred = new dfrd.Deferred();
																getCore( sessionAttributeKey )
																	.done( function( data ) { deferred.resolve( new root.Model( data ) ); } )
																		.fail( function() { deferred.reject.apply( deferred, arguments ); } );
																return deferred;
															};

								var getCore				= 	function( sessionAttributeKey ) {
																return root.AJAXUtil.call( sessionPath + sessionAttributeKey, 'get' );
															};

								init.apply( self, arguments );

								return 	{
											get 		: 	get,
										};

							};

	root[ 'SessionFactory' ]= 	SessionFactory;

} )( window );