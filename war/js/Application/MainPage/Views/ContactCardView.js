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
						select 			: 	select,
						check 			: 	check,
						setContactModel : 	setContactModel,
						getContactModel : 	getContactModel,
					};
		}


		function render() {
			var params = { id: 'A' + contactModel.attr( 'id' ), };
			var previousSiblingNode;
			if(isRendered) {
				previousSiblingNode = dom.container.previousElementSibling;
				root.DOMUtil.remove( dom.container );
				params.isSelected = select();
			}
			if( params ) {
				params.phoneNumber = contactModel.attr( 'phoneNumberList' ) ? ( contactModel.attr( 'phoneNumberList' ).length > 0 ? contactModel.attr( 'phoneNumberList' )[contactModel.attr( 'phoneNumberList' ).length-1] : 'No Phone' ) : 'No Phone';
				var fullName = contactModel.getFullName();
				params.fullName = ( fullName && fullName != '' ) ? fullName : 'No Name';
			}
			dom.contactCardTemplate || ( dom.contactCardTemplate = window.document.querySelector( '#contact-card-template' ) );
			var templateGeneratedString = root.DOMUtil.runMustache( dom.contactCardTemplate, params );
			if( dom.listContainer ) {
				if(previousSiblingNode) {
					previousSiblingNode.insertAdjacentHTML( 'afterend', templateGeneratedString );
				} else {
					dom.listContainer.insertAdjacentHTML( 'afterbegin', templateGeneratedString );
				}
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
				dom.selectCheckBox = dom.container.querySelector( '#contact-card-select input' );
			}
		}

		function onContactCardClick( event ) {
			events.emit( 'click:' + 'contactCard', this, event, contactModel );
		}

		function attachEvents() {
			if( dom.container ) {
				dom.container.addEventListener( 'click', onContactCardClick );
			}
		}

		function select( select ) {
			if( typeof( select ) === 'boolean' ) {
				if( select ) {
					root.DOMUtil.addClass( dom.container, 'active' );
				} else {
					root.DOMUtil.removeClass( dom.container, 'active' );
				}
			}
			return root.DOMUtil.hasClass( dom.container, 'active' );
		}

		function check( checkFlag ) {
			if( typeof( checkFlag ) === 'boolean' ) {
				root.DOMUtil.attr( dom.selectCheckBox, 'checked', checkFlag );
			}
			return root.DOMUtil.attr( dom.selectCheckBox, 'checked' );
		}

		function getContactModel() {
			return contactModel;
		}

		function setContactModel(contactModelArg) {
			contactModel = contactModelArg;
			return contactModel;
		}

		return init.apply( this, arguments );

	}

	root[ 'ContactCardView' ]= 	ContactCardView;

} )( window );