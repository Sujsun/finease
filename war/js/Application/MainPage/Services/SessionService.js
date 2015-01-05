( function( root ) {
	
	var SessionService	= 	function() {

								var self 				= 	this;

								var sessionFactory 		= 	new SessionFactory();

								var sessionAttributes 	= 	{};

								var init 				= 	function() {
															};

								var get					= 	function( sessionAttributeKey ) {
																var deferred = undefined;
																var sessionAttribute = sessionAttributes[ sessionAttributeKey ];
																if( sessionAttribute ) {
																	deferred = new root.Deferred().resolve( sessionAttribute );
																} else {
																	deferred = sessionFactory.get( sessionAttributeKey );
																}
																return deferred.promise();
															};

								init.apply( self, arguments );

								return 	{
											get 		: 	get,
										};

							};

	root[ 'SessionService' ]= 	SessionService;

} )( window );