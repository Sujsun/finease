( function( root ) {

	var ContactsModel = {};
	var ContactsJsonMap = {};
	var ContactsBySubAccountId = {};
	var getDeferreds = {};

	function ContactService() {		

		var contactFactory = new root.ContactFactory();

		function get( id ) {
			var deferred = new root.dfrd.Deferred();
			var contact = _get( id );
			var getDeferred = getDeferreds[ id ];
			if( contact ) {
				// If we have the already fetched, then return the value.
				deferred.resolve.call( deferred, contact );
			} else if( getDeferred ) {
				// If already made the service call, then just return the deferred,
				deferred = getDeferred;
			} else {
				// If we have no data regarding the given id, then make the service call.
				deferred = 	contactFactory.get( id )
								.done( function( contactModel ) { _add( contactModel ); } );
				getDeferreds[ id ] = deferred;
			}
			deferred
				.always( function( contactModel ) { if( contactModel ) { delete getDeferreds[ contactModel.attr( 'id' ) ]; } } );
			return deferred;
		}

		function getBySubAccountId( subAccountId ) {
			return new getBySubAccountIdClass( subAccountId );
		}

		function getBySubAccountIdClass( subAccountId ) {
			var deferred = new root.dfrd.Deferred();
			var contacts = ContactsBySubAccountId[ subAccountId ];
			var getDeferred = getDeferreds[ subAccountId ];
			if( contacts ) {
				// If we have the already fetched, then return the value.
				deferred.resolve.call( deferred, contact );
			} else if( getDeferred ) {
				// If already made the service call, then just return the deferred,
				deferred = getDeferred;
			} else {
				// If we have no data regarding the given id, then make the service call.
				deferred = 	contactFactory.getBySubAccountId( subAccountId )
								.done( function( contactModels ) {
											ContactsBySubAccountId[ subAccountId ] = contactModels;
											for( var index in contactModels ) {
												var contactModel = contactModels[ index ];
												_add( contactModel );
											}
										} );
				getDeferreds[ subAccountId ] = deferred;
			}
			deferred
				.always( function( contactModels ) { delete getDeferreds[ subAccountId ]; } );
			return deferred;
		}

		function put( contactModel ) {
			return ( _get( contactModel.attr( 'id' ) ) ? update( contactModel ) : create( contactModel ) );
		}

		function create( contactModel ) {
			return 	contactFactory.create( contactModel )
						.done( function( contactModel ) { _add( contactModel ); } );
		}

		function update( contactModel ) {
			return 	contactFactory.update( contactModel )
						.done( function( contactModel ) { _add( contactModel ); } );	
		}

		function remove( contactModel ) {
			return 	contactFactory.remove( contactModel )
						.done( function( contactModel ) { _remove( contactModel ); } );
		}

		function _add( contactModel ) {
			ContactsModel[ contactModel.attr( 'id' ) ] = contactModel;
			ContactsJsonMap[ contactModel.attr( 'id' ) ] = contactModel.toJSON();
		}

		function _get( id ) {
			return ContactsModel[ id ];
		}

		function _remove( contactModel ) {
			delete ContactsModel[ contactModel.attr( 'id' ) ];
			delete ContactsJsonMap[ contactModel.attr( 'id' ) ];
		}

		function toJSON() {
			return ContactsJsonMap;
		}

		function toArray() {
			return root.ObjectUtil.toArray( ContactsJsonMap );
		}

		function getAll() {
			return ContactsModel;
		}

		return 	{
					get 				: 	get,
					getBySubAccountId 	: 	getBySubAccountId,
					put 				: 	put,
					remove 				: 	remove,
					toJSON 				: 	toJSON,
					toArray 			: 	toArray,
					getAll 				: 	getAll,
				};

	}

	root[ 'ContactService' ] = ContactService;

} )( window );