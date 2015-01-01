( function( root ) {
	
	var TitleView 		= 	function() {

								var self 		= 	this;

								var dom 		= 	{};

								var pageString 	= 	'';

								var init 								= 	function() {
																				findElements();
																				attachEvents();
																			};

								var findElements 						= 	function() {
																				dom.title = window.document.head.querySelector( 'title' );
																			};

								title 									= 	function( titleArg ) {
																				return root.DOMUtil.attr( dom.title, 'innerHTML', titleArg );
																			};

								page 									= 	function( pageArg ) {
																				if( pageArg && pageArg != pageString && dom.title ) {
																					var titleText = '';
																					titleText += pageArg;
																					titleText += ( root.Application.name ? (  ' - ' + root.Application.name ) : '' );
																					pageString = root.DOMUtil.attr( dom.title, 'innerHTML', titleText );;
																				}
																				return pageString;
																			};

								var attachEvents 						= 	function() {};

								init.apply( self, arguments );

								return 	{
											title 			: 	title,
											page 			: 	page,
										};

							};

	root.TitleView 		= 	TitleView;

} )( window );