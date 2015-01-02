( function( root ) {
	
	var SessionFactory	= 	function() {

								var self 				= 	this;

								var sessionPath 		= 	'session'
								var contactSessionPath 	= 	sessionPath + '?' + 'attribute=' + 'contact';

								var init 		= 	function() {
													};

								var get 		= 	function() {
														return root.AJAXUtil.call( contactSessionPath, 'get' );
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

	root[ 'SessionFactory' ]= 	SessionFactory;

} )( window );