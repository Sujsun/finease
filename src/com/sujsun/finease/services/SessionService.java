package com.sujsun.finease.services;

import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sujsun.cms.jdo.Contact;
import com.sujsun.finease.util.SessionUtil;


public class SessionService {
	
	private static final Logger log = Logger.getLogger( SessionService.class.getName() );
	
	public Object get( String attribute, HttpServletRequest request, HttpServletResponse response ) {
		boolean isSuccess = false;
		Object returnObject = null;
		try {
			HttpSession session = request.getSession( false );
			if( session != null ) {
				returnObject = session.getAttribute( attribute );
			}
			isSuccess = true;
		} catch( Exception exception ) {
			log.info( "Exception occured while getting session attribute. Request session attribute : " + attribute + "\nException Message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return returnObject;
	}
	
}
