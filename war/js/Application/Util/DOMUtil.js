( function( root ) {

	var DOMUtil 							= 	function() {};

	DOMUtil.prototype.attr 					= 	function( element, attribute, value ) {
													var returnVariable = undefined;
													if( element ) {
														if( attribute ) {
															if( value || value == '' ) {
																element[ attribute ] = value;
															}
															returnVariable = element[ attribute ];
														}
													}
													return returnVariable;
												};

	DOMUtil.prototype.style					= 	function( element, styleKey, value ) {
													var returnVariable = undefined;
													if( element && element.style ) {
														if( styleKey ) {
															if( value || value == '' ) {
																element.style[ styleKey ] = value;
															}
															returnVariable = element.style[ styleKey ];
														}
													}
													return returnVariable;
												};

	DOMUtil.prototype.event 				= 	function( element, event, handler ) {
													if( element && event ) {
														if( handler ) {
															element.addEventListener( event, handler );
														}
													}
													return element;
												};

	DOMUtil.prototype.removeEvent 			= 	function( element, event, handler ) {
													if( element && event ) {
														element.removeEventListener( event, handler );
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

	DOMUtil.prototype.hasClass				= 	function( element, className ) {
													var returnVariable = false;
													if( element ) {
														if( className ) {
															if( element.classList ) {
																returnVariable = element.classList.contains( className );
															} else if( element.className ) {
																returnVariable = ( element.className.indexOf( className ) != -1 );
															}
														}
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
													return element && element.style.display != 'none';
												};

	DOMUtil.prototype.createDiv 			= 	function( htmlString ) {
													var div = document.createElement( 'div' );
													try {
														if( htmlString && htmlString != '' ) {
															div.innerHTML = htmlString
														}
													} catch( exception ) {
														console.error( 'Exception while constructing DIV with given HTML String. Exception Message : ', exception.message );
													};
													return div;
												};

	DOMUtil.prototype.remove 				= 	function( element ) {
													if( element ) {
														element.parentNode.removeChild( element );
													}
													return element;
												};

	DOMUtil.prototype.runMustache			= 	function( templateDOMElement, params ) {													
													var generateHTMLString = ''
													try {
														if( templateDOMElement ) {
															var templateString = templateDOMElement.innerHTML;
															generateHTMLString = root.Mustache.render( templateString, params );
														}
													} catch( exception ) {
														console.error( 'Exception while generating template using Mustache template engine. Exception message : ', exception.message );
													}
													return generateHTMLString;
												};

	root[ 'DOMUtil' ] 						= 	new DOMUtil();

} )( window );