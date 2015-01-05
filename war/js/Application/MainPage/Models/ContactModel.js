( function( root ) {

	var ContactModel  		= 	function(  ) {

									var ContactModel 							= 	function() {};

									ContactModel.prototype						= 	ObjectUtil.construct( root.Model, arguments );
									
									ContactModel.prototype.getFullName			= 	function() {
																						var self = this;
																						var fullName = ( self.attr( 'firstName' ) ? self.attr( 'firstName' ) : '' );
																						fullName += ( self.attr( 'middleName' ) ? ( fullName ? ( ' ' + self.attr( 'middleName' ) ) : self.attr( 'middleName' ) ) : '' );
																						fullName += ( self.attr( 'lastName' ) ? ( fullName ? ( ' ' + self.attr( 'lastName' ) ) : self.attr( 'lastName' ) ) : '' );
																						return fullName;
																					};

									ContactModel.prototype.getNameWithInitials = 	function() {
																						var self = this;
																						var nameWithInitials = ( self.attr( 'firstName' ) ? self.attr( 'firstName' ) : '' );
																						nameWithInitials += ( self.attr( 'middleName' ) ? ( nameWithInitials ? ( ' ' + ( self.attr( 'middleName' )[0] || '' ) ) : ( self.attr( 'middleName' )[0] || '' ) ) : '' );
																						nameWithInitials += ( self.attr( 'lastName' ) ? ( nameWithInitials ? ( ' ' + ( self.attr( 'lastName' )[0] || '' ) ) : ( self.attr( 'lastName' ) || '' ) ) : '' );
																						return nameWithInitials;
																					};

									return ObjectUtil.construct( ContactModel, arguments );
								};

	root[ 'ContactModel' ]	= 	ContactModel;

} )( window );