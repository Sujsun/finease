( function( root ) {
	
	var TabView 		= 	function() {

								var self 		= 	this;

								var dom 		= 	{};

								var events 		= 	new root.Events();

								var init 								= 	function() {
																				findElements();
																				attachEvents();
																			};

								var findElements 						= 	function() {
																				dom.container = window.document.querySelector( '#tab-container-wrapper' );
																				if( dom.container ) {
																					dom.allTabContent = dom.container.querySelectorAll( '.tab-content' );
																					dom.contactTabContent = dom.container.querySelector( '#contact-tab-content' );
																					dom.loanTabContent = dom.container.querySelector( '#loan-tab-content' );
																				}
																			};

								var showTab								= 	function( element ) {
																				for( var index = 0; index < dom.allTabContent.length; index++ ) {
																					var elem = dom.allTabContent[ index ];
																					if( elem === element  ) {
																						root.DOMUtil.show( elem, true );
																					} else {
																						root.DOMUtil.show( elem, false );
																					}
																				}
																			};

								var show							= 	function( tab ) {
																				if( tab ) {
																					tab = tab.toLowerCase();
																					switch( tab ) {
																						case 'contact':
																						case 'contacts':
																							showTab( dom.contactTabContent );
																							break;
																						case 'loan':
																						case 'loans':
																							showTab( dom.loanTabContent );
																							break;
																						default:
																							console.log( 'Tab :: Given unknown tab to highlight. Tab name: ', tab );
																					}
																				}
																			};

								var attachEvents 						= 	function() {
																			};

								init.apply( self, arguments );

								return 	{
											events 			: 	events,
											show 			: 	show,
										};

							};

	root[ 'TabView' ]	= 	TabView;

} )( window );