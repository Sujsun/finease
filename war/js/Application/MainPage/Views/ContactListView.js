( function( root ) {
	
	function ContactListView( options ) {
 
		var self = this;

		options || ( options = {} );

		var isRendered = false;

		var dom = {};

		dom.listContainer = options.listContainer;

		var events 	= new root.Events();

		var views = {};

		function init() {
			render();
			return 	{
						events 			: 	events,
						add 			: 	addContactCard,
						select 			: 	select,
					};
		}


		function render() {
			findElements();
			attachEvents();
			isRendered = true;
			return isRendered;
		}

		function destroy() {
			if( isRendered ) {
				root.DOMUtil.remove( dom.container );
				isRendered = false;
			}
			self = undefined;
			return isRendered;
		}

		function findElements() {
			dom.wrapper =  window.document.querySelector( '#contact-list-wrapper' );
			dom.container = dom.wrapper.querySelector( '#contact-list' );
			if( dom.container ) {
				dom.contactListUl = dom.container.querySelector( '#list-with-toolbar-list-ul' );
				dom.addContactButton = dom.container.querySelector( '#add-contact-button' );
				dom.removeContactButton = dom.container.querySelector( '#remove-contact-button' );
			}
		}

		function onAddContactButtonClick( event ) {
			events.emit( 'click:' + 'addContactButton', this, event );
		}

		function onRemoveContactButtonClick( event ) {
			events.emit( 'click:' + 'removeContactButton', this, event );
		}

		function attachEvents() {
			if( dom.container ) {
				dom.addContactButton.addEventListener( 'click', onAddContactButtonClick );
				dom.removeContactButton.addEventListener( 'click', onRemoveContactButtonClick );
			}
		}

		function onContactCardClick( element, event, contactModel ) {
			events.emit( 'click:contactCard', element, event, contactModel );
		}

		function addContactCard( contactModels ) {
			if( typeof( contactModels ) === 'object' ) {
				contactModels = [ contactModels ];
			}
			for( var index in contactModels ) {
				var contactModel = contactModels[ index ];
				views.contactCardViews || ( views.contactCardViews = {} );
				var contactCardView = new root.ContactCardView( mvc, { contactModel: contactModel, listContainer: dom.contactListUl, } );
				contactCardView.render();
				contactCardView.events.on( 'click:contactCard', onContactCardClick );
				views.contactCardViews[ contactModel.attr( 'id' ) ] = contactCardView;
			}
		}

		function select( contactModel ) {
			if( contactModel ) {
				var contactModelId = contactModel.attr( 'id' );
				for( var key in views.contactCardViews ) {
					var contactCardView = views.contactCardViews[ key ];
					var selectFlag = false;
					if( key === contactModelId ) {
						selectFlag = true;
					}
					contactCardView.select( selectFlag );
				}
			}
		}

		return init.apply( this, arguments );

	}

	root[ 'ContactListView' ]= 	ContactListView;

} )( window );