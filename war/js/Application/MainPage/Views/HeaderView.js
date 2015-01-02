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
																					dom.allNavTabAnchors = dom.container.querySelectorAll( '#finease-nav-tabs .finease-nav-tab-a' );
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

								var active 								= 	function( element ) {
																				for( var index = 0; index < dom.allNavTabAnchors.length; index++ ) {
																					var elem = dom.allNavTabAnchors[ index ];
																					if( elem === element  ) {
																						root.DOMUtil.addClass( elem, 'active' );
																					} else {
																						root.DOMUtil.removeClass( elem, 'active' );
																					}
																				}
																			};

								var highlightTab						= 	function( tab ) {
																				if( tab ) {
																					tab = tab.toLowerCase();
																					switch( tab ) {
																						case 'contact':
																						case 'contacts':
																							active( dom.contactTabAnchor );
																							break;
																						case 'loan':
																						case 'loans':
																							active( dom.loanTabAnchor );
																							break;
																						default:
																							console.log( 'HeaderView :: Given unknown tab to highlight. Tab name: ', tab );
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

	root[ 'HeaderView' ] = 	HeaderView;

} )( window );