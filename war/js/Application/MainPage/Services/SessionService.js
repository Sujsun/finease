( function( root ) {
	
	var SessionService	= 	function() {

								var self 				= 	this;

								var sessionFactory 		= 	new SessionFactory();

								var sessionAttributes 	= 	{};

								var getDeferreds 		= 	{};

								var init 				= 	function() {
															};

								var get					= 	function( sessionAttributeKey ) {
																var deferred = new root.dfrd.Deferred();
																var sessionAttribute = sessionAttributes[ sessionAttributeKey ];
																var getDeferred = getDeferreds[ sessionAttributeKey ];

																if( sessionAttribute ) {
																	// If we have the already fetched, then return the value.
																	deferred.resolve.call( deferred, sessionAttribute );
																} else if( getDeferred ) {
																	// If already made the service call, then just return the deferred,
																	deferred = getDeferred;
																} else {
																	// If we have no data regarding the given id, then make the service call.
																	deferred = 	sessionFactory.get( sessionAttributeKey )
																					.done( function( sessionModel ) { sessionAttributes[ sessionModel.attr( 'sessionAttributeKey' ) ] = sessionModel; } );
																	getDeferreds[ sessionAttributeKey ] = deferred;
																}
																deferred
																	.always( function( sessionModel ) { if( sessionModel ) { delete getDeferreds[ sessionModel.attr( 'sessionAttributeKey' ) ]; } } );
																return deferred.promise();
															};

								init.apply( self, arguments );

								return 	{
											get 		: 	get,
										};

							};

	root[ 'SessionService' ]= 	SessionService;

} )( window );