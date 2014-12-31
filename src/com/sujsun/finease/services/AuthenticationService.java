package com.sujsun.finease.services;

import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.type.TypeReference;

import com.sujsun.cms.jdo.Contact;
import com.sujsun.finease.finalObjects.ObjectMapper;

public class AuthenticationService {

	private static final Logger log = Logger.getLogger( AuthenticationService.class.getName() );
	
	public String logout( HttpServletRequest request, HttpServletResponse response ) {
		boolean isSuccess = false;
		String returnViewName = "redirect:login";
		try {
			HttpSession session = request.getSession( false ); 		// Gets the session only if already created else will return null
			if( session != null ) {
				session.invalidate();
			}
		} catch( Exception exception ) {
			log.severe( "Exception while logging out. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return returnViewName;
	}
	
}
