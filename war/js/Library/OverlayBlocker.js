
( function( root ) {

	var OverlayBlocker 			= 		function( element ) {

		var isOverlayBlockerDivInserted 	=	 	false;
		var isOverlayBlockerDivShowing		= 		false; 
		var overlayBlockerDiv 				= 		undefined;

		element 							= 		element || window.document.body;
		
		this.insert 						= 		function() {
														insert();
													};

		this.remove 						= 		function() {
														remove();
													};

		this.show 							= 		function() {
														show();
													};

		this.hide 							= 		function() {
														hide();
													};

		var init 							= 		function( elementArg ) {
														element = elementArg;
														insert();
														setSize();
														attachEvent();
													};

		var insert 							= 		function() {
														if( !isOverlayBlockerDivInserted ) {
															overlayBlockerDiv = window.document.createElement( 'div' );
															overlayBlockerDiv.setAttribute( 'class', 'overlay-blocker fade' );

															element.appendChild( overlayBlockerDiv );
															isOverlayBlockerDivInserted = true;
														}
													};

		var remove 							= 		function() {
														if( isOverlayBlockerDivInserted ) {
															overlayBlockerDiv.parentElement.removeChild( overlayBlockerDiv );
															overlayBlockerDiv = undefined;
															isOverlayBlockerDivInserted = false;
														}
													};

		var show 							= 		function() {
														if( isOverlayBlockerDivInserted && !isOverlayBlockerDivShowing ) {
															overlayBlockerDiv.className = overlayBlockerDiv.className + ' in';
															isOverlayBlockerDivShowing = true;
														}
													};

		var hide 							= 		function() {
														if( isOverlayBlockerDivInserted && isOverlayBlockerDivShowing ) {
															overlayBlockerDiv.className = overlayBlockerDiv.className.replace( ' in', '' );
															isOverlayBlockerDivShowing = false;
														}
													};

		var setSize 						= 		function() {
														if( isOverlayBlockerDivInserted ) {
															overlayBlockerDiv.style.height = element.clientHeight + 'px';
															overlayBlockerDiv.style.width = element.clientWidth + 'px';
														}
													};

		var onElementResize 				= 		function( event ) {
														setSize();
													};

		var attachEvent 					= 		function() {
														window.addEventListener( 'resize', onElementResize );
													};

		init.apply( this, arguments );
	};

	root[ 'OverlayBlocker' ] 				= 		OverlayBlocker;

} )( window );