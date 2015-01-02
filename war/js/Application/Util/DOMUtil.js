( function( root ) {

	var DOMUtil 							= 	function() {};

	DOMUtil.prototype.attr 					= 	function( element, attribute, value ) {
													var returnVariable = undefined;
													if( element ) {
														if( value ) {
															element[ attribute ] = value;
														}
														returnVariable = element[ attribute ];
													}
													return returnVariable;
												};

	DOMUtil.prototype.event 				= 	function( element, event, handler ) {
													if( element && handler ) {
														element.addEventListener( event, handler );
													}
													return element;
												};

	DOMUtil.prototype.addClass 				= 	function( element, className ) {
													var returnVariable = '';
													if( element ) {
														if( className ) {
															if( element.classList ) {
																element.classList.add( className );
															} else if( element.className ) {
																if( element.className.indexOf( className ) === -1 ) {
																	element.className += ' ' + className;
																}
															}
														}
														returnVariable = element.className;
													}
													return returnVariable;
												};

	DOMUtil.prototype.removeClass			= 	function( element, className ) {
													var returnVariable = '';
													if( element ) {
														if( className ) {
															if( element.classList ) {
																element.classList.remove( className );
															} else if( element.className ) {
																element.className = element.className.replace( className, '' );
															}
														}
														returnVariable = element.className;
													}
													return returnVariable;
												};

	DOMUtil.prototype.show 					= 	function( element, show ) {
													if( element ) {
														if( typeof( show ) === 'boolean' ) {
															if( show ) {
																element.style.display = 'block';
															} else {
																element.style.display = 'none';
															}
														}
													}
													return element.style.display != 'none';
												};

	root[ 'DOMUtil' ] 						= 	new DOMUtil();

} )( window );