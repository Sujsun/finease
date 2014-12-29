/*
	JQuery Long Press Plugin
	Author	: 	Sundarasan Natarajan
	Email 	: 	S.N.Sundarasan@Gmail.com
*/

jQuery.fn.extend( {
	onLongPress 				: 		function( callBack, longPressTimeout ) {
											longPressTimeout = longPressTimeout || 1 * 1000;
											this.mouseup(function( event ) {
												// Clear timeout
											  	clearTimeout( pressTimer );
											  	return false;
											}).mousedown(function( event ){
												// Set timeout
												pressTimer = window.setTimeout( function() { if( callBack ) { event.type = 'longpress'; callBack( event ); } }, longPressTimeout )
												return false; 
											});
										},
} );