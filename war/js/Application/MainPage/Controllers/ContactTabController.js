( function( root ) {

	var ContactTabController 	= 	function( mvc ) {

										var self 				= 	this;

										var views 				= 	{};

										var contactSearchMap	= 	{};

										var init 				= 	function() {
																		createViews();
																		attachEvents();
																	};

										var createViews 		= 	function() {
																		views.contactDetailsView = new root.ContactDetailsView( mvc );
																		views.contactListView = new root.ContactListView( mvc );
																		mvc.views.contactDetailsView = views.contactDetailsView;
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
																		views.contactListView.events.on( 'select:contactSearchList', onSelectContactSearchList );
																		
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

										function onRemoveContactButtonClick( element, event, contactModels ) {
											views.contactListView.remove( contactModels );
										}

										function onContactDetailsViewSaveButtonClick( contactModel ) {
											contactModel.attr( 'subAccountId', mvc.models.sessionModel.attr( 'subAccount' ).id );
											return 	mvc.services.contactService.put( contactModel )
														.done( function( contactModel ) {
															console.error( 'Created Contact Successfully! --> ', contactModel.toJSON() );
															views.contactListView.update(contactModel);
															views.contactDetailsView.setContact(contactModel);
													 		// alert( 'Created Contact Successfully!' ); 
													 	} )
														.fail( function() { console.error( 'Failed to create contact.' ); } );
										}

										function onSelectContactSearchList(element, event, contactModel) {
											selectContact(contactModel);
										}

										function getSearchSource(contactModels) {
											var contactsArray = [];
											for( var key in contactModels ) {
												var contactModel = contactModels[ key ];
												var contactModelJSON = contactModel.toJSON();
												contactModelJSON[ 'fullName' ] = contactModel.getFullName();
												contactsArray.push(contactModelJSON);
											}
											mvc.data.ContactsSearchSource = contactsArray;
											return contactsArray;
										}

										function selectContact( contactModel ) {
											views.contactListView.select( contactModel );
											views.contactDetailsView.setContact( contactModel );
										}

										// Get all contacts under the subAccount and show in the view
										function getContacts() {
											var deferred = new dfrd.Deferred();
											mvc.services.sessionService.get( 'sessionModel' )
												.done( function( sessionModel ) {
													var subAccount = sessionModel.attr( 'subAccount' );
													mvc.services.contactService.getBySubAccountId( subAccount.id )
														.done( 	function( contactModels ) {
																	getSearchSource(contactModels);
																	mvc.deferreds.ContactsDeferred.resolve(contactModels);
																	// Rendering the contact views
																	for( var index in contactModels ) {
																		var contactModel = contactModels[ index ];
																		views.contactListView.add( contactModel );
																	}
																	// Selecting the first contact
																	if( contactModels && contactModels.length > 0 ) {
																		var contactModelToSelect = contactModels[ contactModels.length - 1 ];
																		selectContact( contactModelToSelect );
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