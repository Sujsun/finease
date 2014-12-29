( function( root ) {

	var ConverterUtilClass					= 	function() {};

	ConverterUtilClass.prototype.toJSON 	=  	function( jsonString ) {
													var json = {};
													if( typeof( jsonString ) === 'object' ) {
														json = jsonString;
													} else if( typeof( jsonString ) === 'string' ) {
														try {
															json = JSON.parse( jsonString );
															if( typeof( json ) === 'string' ) {
																json = JSON.parse( json );
															}
														} catch( exception ) {
															console.error( 'ConverterUtil :: Exception while converting JSONString to JSON. Exception message : ', exception.message, '\n', 'Given JSON String : ', jsonString );
														}
													}
													return json;
												};

	root[ 'ConverterUtil' ]					= 	new ConverterUtilClass();

} )( window );