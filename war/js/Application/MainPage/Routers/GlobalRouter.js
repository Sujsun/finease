/*
Dependency: Routie
*/

( function( root ) {

	var GlobalRouter= 	function() {

							var self 						= 	this;

							var mvc 						= 	{ router: {}, collection: {}, model: {}, views: {}, };

							var events 						= 	new Events();

							var init 						= 	function() {
																	mvc.router.globalRouter = self;
																	mvc.views.titleView = new TitleView();
																};

							var onRoot 						= 	function() {
																	routie.navigate( root.Application.properties.landingRoute );
																};

							// 	Contact Page Route Handlers - Starts
							var onContact	 				= 	function() {
																	console.log( 'Route hitted : ', 'contact' );
																	events.emit( 'route:contact' );
																	mvc.views.titleView.page( 'Contacts' );
																};

							var onContactId					= 	function( contactId ) {
																	console.log( 'Route hitted : ', 'contact/' + contactId );
																	events.emit( 'route:contact/id', contactId );
																	mvc.views.titleView.page( 'Contacts' );
																};

							var onContactIdTransactionId 	= 	function() {

																};
							// 	Contact Page Route Handlers - Ends

							// 	Loan Page Route Handlers - Starts
							var onLoan	 					= 	function() {
																	console.log( 'Route hitted : ', 'loan' );
																	events.emit( 'route:loan' );
																	mvc.views.titleView.page( 'Loans' );
																};

							var onLoanId					= 	function( loanId ) {
																	console.log( 'Route hitted : ', 'loan/' + loanId );
																	events.emit( 'route:loan/id', loanId );
																	mvc.views.titleView.page( 'Loans' );
																};

							var onLoanIdTransactionId 		= 	function( loanId, transactionId ) {
																	events.emit( 'route:loan/id/transaction/id', loanId, transactionId );
																};
							// 	Loan Page Route Handlers - Ends

							init.apply( self, arguments );

							root.routie( 	{
												'' 										: 	onRoot,
												// Contact Page Routes - Starts
												'contact'	 	 						: 	onContact,
												'contact/:contactId' 	 				: 	onContactId,
												// Contact Page Routes - Ends

												// Loan Page Routes - Starts
												'loan'									: 	onLoan,
												'loan/:loanId' 							: 	onLoanId,
												// Loan Page Routes - Ends
											} );

							window.mvc = mvc;

							return events;
						};


	root.routers 				= 	root.routers || {};
	// root.routers.globalRouter 	= 	new GlobalRouter();

} )( window );