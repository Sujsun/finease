( function( root ) {


	var SessionContactModel			= 	function() {

											this.prototype 				= 	new SessionModel();
											
											return SessionModel;
										};

	root[ 'SessionContactModel' ]	= 	SessionContactModel;

} )( window );