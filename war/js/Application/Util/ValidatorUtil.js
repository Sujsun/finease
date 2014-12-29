( function( root ) {

	var ValidatorUtilClass					= 	function() {};

	ValidatorUtilClass.prototype.string 	=  	function( string ) {
													return ( string && string != '' ) ? string : undefined;
												};

	root[ 'ValidatorUtil' ]					= 	new ValidatorUtilClass();

} )( window );