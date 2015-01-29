( function( root ) {

	var ContactTabController 	= 	function( mvc ) {

										var self 				= 	this;

										var views 				= 	{};

										var init 				= 	function() {
																		createViews();
																		attachEvents();
																		mvc.s
																	};

										var createViews 		= 	function() {
																		views.contactDetailsView = new root.ContactDetailsView( mvc );
																		views.contactListView = new root.ContactListView( mvc );
																		getContacts();
																	};

										var attachEvents 		= 	function() {
																		attachViewEvents();
																		attachRouteEvents();
																	};

										var attachRouteEvents 	= 	function() {
																		// var routePathMap		= 	{
																		// 								'' 										: 	onRootRoute,
																		// 								'contact'	 	 						: 	onContactRoute,
																		// 								'contact/:contactId' 	 				: 	onContactIdRoute,
																		// 							};
																		// root.routie( routePathMap );
																	};

										var attachViewEvents 	= 	function() {
																		views.contactListView.events.on( 'click:addContactButton', onAddContactButtonClick );
																		views.contactListView.events.on( 'click:removeContactButton', onRemoveContactButtonClick );
																		views.contactListView.events.on( 'click:contactCard', onContactCardClick );
																		
																		views.contactDetailsView.events.on( 'click:saveButton', onContactDetailsViewSaveButtonClick );
																	};

										function onContactCardClick( element, event, contactModel ) {
											views.contactListView.select( contactModel );
											views.contactDetailsView.setContact( contactModel );
										}

										function onAddContactButtonClick() {
											var emptyContactModel = new root.ContactModel( { id: String( new Date().getTime() ), } );
											views.contactDetailsView.setContact( emptyContactModel );
											views.contactListView.add( emptyContactModel );
											views.contactListView.select( emptyContactModel );
										}

										function onRemoveContactButtonClick() {
											console.error( 'Remove contact button has been clicked.' );
										}

										function onContactDetailsViewSaveButtonClick( contactModel ) {
											contactModel.attr( 'subAccountId', mvc.models.sessionModel.attr( 'subAccount' ).id );
											return 	mvc.services.contactService.put( contactModel )
														.done( function( contactModel ) { console.error( 'Created Contact Successfully! --> ', contactModel.toJSON() ); alert( 'Created Contact Successfully!' ); } )
														.fail( function() { console.error( 'Failed to create contact.' ); } );
										}

										// Get all contacts under the subAccount and show in the view
										function getContacts() {
											mvc.services.sessionService.get( 'sessionModel' )
												.done( function( sessionModel ) {
													var subAccount = sessionModel.attr( 'subAccount' );
													mvc.services.contactService.getBySubAccountId( subAccount.id )
														.done( 	function( contactModels ) {
																	for( var index in contactModels ) {
																		views.contactListView.add( contactModels[ index ] );
																	}
																} )
														.fail( 	function( status, statusText, xmlHttp ) {
																	mvc.views.notify.error( [ '<div style="font-size: 13px; font-weight: bold;">' + statusText + '</div>', /*'<div style="font-size: 11px;">' + statusText + '</div>', */ '<div style="font-size: 11px;">Click to reload</div>' ], { click: function() { window.location.reload(); }, overlayBlock: true, } );
																} );
												} )
												.fail( function() {
													mvc.views.notify.error( [ '<div style="font-size: 13px; font-weight: bold;">' + statusText + '</div>', /*'<div style="font-size: 11px;">' + statusText + '</div>', */ '<div style="font-size: 11px;">Click to reload</div>' ], { click: function() { window.location.reload(); }, overlayBlock: true, } );
												} );
										}

										init.apply( self, arguments );

									};

	root[ 'ContactTabController' ] = ContactTabController;
} )( window );