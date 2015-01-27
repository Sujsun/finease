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
						add 			: 	addContactCard,
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
			}
		}

		function attachEvents() {

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
				views.contactCardViews[ contactModel.attr( 'id' ) ] = contactCardView;
			}
		}

		return init.apply( this, arguments );

	}

	root[ 'ContactListView' ]= 	ContactListView;

} )( window );