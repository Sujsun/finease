( function( root ) {
	
	function ContactCardView( mvc, options ) {
 
		var self = this;

		options || ( options = {} );

		var isRendered = false;

		var dom	= {};

		dom.listContainer =	options.listContainer;

		var contactModel = options.contactModel;

		var events = new root.Events();

		function init() {
			return 	{
						events 			: 	events,
						render 			: 	render,
						destroy 		: 	destroy,
					};
		}


		function render() {
			var params = { id: 'A' + contactModel.attr( 'id' ), fullName: contactModel.getFullName(), };
			if( params ) {
				params.phoneNumber = contactModel.attr( 'phoneNumberList' ) ? ( contactModel.attr( 'phoneNumberList' ).length > 0 ? contactModel.attr( 'phoneNumberList' )[contactModel.attr( 'phoneNumberList' ).length-1] : 'Nil' ) : 'Nil';
			}
			dom.contactCardTemplate || ( dom.contactCardTemplate = window.document.querySelector( '#contact-card-template' ) );
			var templateGeneratedString = root.DOMUtil.runMustache( dom.contactCardTemplate, params );
			if( dom.listContainer ) {
				dom.listContainer.insertAdjacentHTML( 'beforeend', templateGeneratedString );
				findElements();
				attachEvents();
				isRendered = true;
			}
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
			dom.container = dom.listContainer.querySelector( '#A' + contactModel.attr( 'id' ) + '.contact-card' );
			if( dom.container ) {
				
			}
		}

		function attachEvents() {

		}

		return init.apply( this, arguments );

	}

	root[ 'ContactCardView' ]= 	ContactCardView;

} )( window );