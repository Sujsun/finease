( function( root ) {

	var Model 				= 	function( attributesArg ) {

									var self 		= 	this;

									var attributes 	= 	attributesArg || {};

									var events 		= 	new Events();

									var constructor	= 	function() {
															return 	{
																		events 			: 	events,
																		attr 			: 	attr,
																		removeAttr 		: 	removeAttr,
																		toJSON 			: 	toJSON,
																	};
														};

									var attr 		= 	function( key, value ) {
															if( key && value && attributes[ key ] != value ) {
																attributes[ key ] = value;
																events.emit( 'change:' + key, self );
															}
															return attributes[ key ];
														};

									var removeAttr 	= 	function( key ) {
															return delete attributes[ key ];
														};

									var toJSON 		= 	function() {
															return attributes;
														};

									return constructor.apply( self, arguments );
								};

	root[ 'Model' ] 		= 	Model;

} )( window );