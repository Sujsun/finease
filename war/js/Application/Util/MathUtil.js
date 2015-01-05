( function( root ) {

	var MathUtilClass 						= 	function() {};

	var alphabets							= 	'abcdefghijklmnopqrstuvwxyz';

	var numbers 							= 	'0123456789';

	MathUtilClass.prototype.randomText 		= 	function( length ) {
													var randomText = '';
													for( var index = 0; index < length; index++ ) {
														randomText += alphabets.charAt( Math.floor( Math.random() * alphabets.length ) );
													}
													return randomText;
												};

	var random4 							= 	function() {
                                                    return window.Math.floor((1 + window.Math.random()) * 0x10000)
                                                           .toString(16)
                                                           .substring(1);
												};

	MathUtilClass.prototype.randomId		=  	( 	function() {
	                                                    return function() {
	                                                                return this.randomText( 1 ) + random4() + random4() + '-' + random4() + '-' + random4() + '-' + random4() + '-' + random4() + random4() + random4();
	                                                            };
			                                  		} )();

	root[ 'MathUtil' ]						= 	new MathUtilClass();

} )( window );