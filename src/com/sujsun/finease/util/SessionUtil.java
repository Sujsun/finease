package com.sujsun.finease.util;

import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sujsun.finease.finalObjects.SessionKeys;

public class SessionUtil {
	
	private static final Logger log = Logger.getLogger( SessionUtil.class.getName() );
	
	public boolean checkSession( HttpServletRequest request, HttpServletResponse response ) {
		boolean hasSession = false;
		try {
			HttpSession session = request.getSession( false ); 		// Gets the session only if already created else will return null
			hasSession = ( session != null && session.getAttribute( SessionKeys.AUTHENTICATIONKEY ) != null );
		} catch( Exception exception ) {
			log.log( Level.SEVERE, "Exception while checking session. Exception message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return hasSession;
	}

}
