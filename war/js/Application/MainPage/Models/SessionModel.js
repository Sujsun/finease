( function( root ) {


	var SessionModel 		= 	function() {

									this.prototype 				= 	new Model();
									
									return SessionModel;
								};

	root[ 'SessionModel' ]	= 	SessionModel;

} )( window );