( function( root ) {

	var ObjectUtilClass 							= 	function() {};

	ObjectUtilClass.prototype.deleteUndefinedParams = 	function( object ) {
															for( var key in object ) {
																if( !object[ key ] ) {
																	delete object[ key ];
																}
															}
															return object;
														};

	ObjectUtilClass.prototype.construct 	 		= 	function( constructor, args ) {
														    var Class = function() { return constructor.apply(this, args); };
														    Class.prototype = constructor.prototype;
														    return new Class();
														};

	root[ 'ObjectUtil' ] 							= 	new ObjectUtilClass();

} )( window );