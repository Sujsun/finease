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
														    var ClassTemp = function() { return constructor.apply(this, args); };
														    ClassTemp.prototype = constructor.prototype;
														    return new ClassTemp();
														};

	root[ 'ObjectUtil' ] 							= 	new ObjectUtilClass();

} )( window );