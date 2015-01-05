//  Dependency : Deferred.js

( function( root ) {

	var AJAXUtilClass 						= 	function() {

													var OnReadyStateChangeClass 	= 		function( xmlHttp, deferred ) {
																								var onReadyStateChangeFunction 	= 	function() {
																																		if ( xmlHttp.readyState == 4 ) {
																																			if( xmlHttp.status >= 200 && xmlHttp.status < 400 ) {
																																				var contentType = xmlHttp.getResponseHeader( 'Content-Type' );
																																				var resolveWith = undefined;
																																				if( contentType && contentType.indexOf( 'application/json' ) != -1 ) {
																																					resolveWith = ConverterUtil.toJSON( xmlHttp.responseText );
																																				} else {
																																					resolveWith = xmlHttp.responseText;
																																				}
																																		    	deferred.resolve( resolveWith, xmlHttp );
																																		    } else {
																																		    	deferred.reject( xmlHttp.status, xmlHttp.statusText, xmlHttp );	
																																		    }
																																    	}
																															    	};
																								return onReadyStateChangeFunction;
																							};

													var call 						= 		function( url, type, requestData ) {
																								var self = this;
																								var deferred = new dfrd.Deferred();
																								if( typeof( url ) === 'string' && url != '' ) {
																									type = ( type && type.toUpperCase ) ? type.toUpperCase() : 'GET';
																									var xmlHttp = window.XMLHttpRequest ? new window.XMLHttpRequest() : window.ActiveXObject ? new window.ActiveXObject("Microsoft.XMLHTTP") : false;
																									if( xmlHttp ) {
																										requestData = ( typeof( requestData ) === 'object' ) ? JSON.stringify( requestData ) : requestData;
																										xmlHttp.onreadystatechange = new OnReadyStateChangeClass( xmlHttp, deferred );
																										xmlHttp.open( type, url, true /* async */ );
																										xmlHttp.send( requestData );
																									} else {
																										deferred.reject( XMLHTTP );
																									}
																								} else {
																									deferred.reject();
																								}
																								return deferred.promise();
																							};

													this.call 						= 		function() {
																								return call.apply( this, arguments );
																							};

												};

	root[ 'AJAXUtil' ]						= 	new AJAXUtilClass();

} )( window );