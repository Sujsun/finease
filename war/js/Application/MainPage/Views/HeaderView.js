( function( root ) {
	
	var HeaderView 		= 	function() {

								var self 		= 	this;

								var dom 		= 	{};

								var pageString 	= 	'';

								var events 		= 	new root.Events();

								var init 								= 	function() {
																				findElements();
																				attachEvents();
																			};

								var findElements 						= 	function() {
																				dom.container = window.document.querySelector( '#header' );
																				if( dom.container ) {
																					dom.userPicAbbr = dom.container.querySelector( '#username-abbr' );
																					dom.contactTabAnchor = dom.container.querySelector( '#contact-tab' );
																					dom.loanTabAnchor = dom.container.querySelector( '#loan-tab' );
																				}
																			};

								var userPicAbbr 						= 	function( userPicAbbrArg ) {
																				return root.DOMUtil.attr( dom.userPicAbbr, 'title', userPicAbbrArg );
																			};

								var contactHref 						= 	function( hrefArg ) {
																				return root.DOMUtil.attr( dom.contactTabAnchor, 'href', hrefArg );
																			};

								var loanHref 							= 	function( hrefArg ) {
																				return root.DOMUtil.attr( dom.loanTabAnchor, 'href', hrefArg );
																			};

								var highlightTab						= 	function( tab ) {
																				if( tab ) {
																					tab = tab.toLowerCase();
																					switch( tab ) {
																						case 'contact':
																						case 'contacts':
																							root.DOMUtil.addClass( dom.contactTabAnchor, 'active' );
																							root.DOMUtil.removeClass( dom.loanTabAnchor, 'active' );
																							break;
																						case 'loan':
																						case 'loans':
																							root.DOMUtil.addClass( dom.loanTabAnchor, 'active' );
																							root.DOMUtil.removeClass( dom.contactTabAnchor, 'active' );
																							break;
																						default:
																							console.log( 'HeaderView :: Trying to select unknown tab. Tab name: ', tab );
																					}
																				}
																			};

								var attachEvents 						= 	function() {
																			};

								init.apply( self, arguments );

								return 	{
											events 			: 	events,
											userPicAbbr 	: 	userPicAbbr,
											contactHref 	: 	contactHref,
											loanHref 		: 	loanHref,
											highlightTab 	: 	highlightTab,
										};

							};

	root.HeaderView 	= 	HeaderView;

} )( window );