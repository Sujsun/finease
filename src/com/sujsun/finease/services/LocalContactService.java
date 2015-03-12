package com.sujsun.finease.services;

import java.util.List;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sujsun.finease.factories.LocalContactFactory;
import com.sujsun.finease.jdo.LocalContact;

public class LocalContactService {
	
	private static final Logger log = Logger.getLogger( LocalContactService.class.getName() );
	
	public LocalContact get( HttpServletRequest request, HttpServletResponse response, String id ) {
		boolean isSuccess = false;
		LocalContact returnLocalContact = null;
		try {
			returnLocalContact = new LocalContactFactory().get( id );
		} catch( Exception exception ) {
			log.severe( "Exception while logging out. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return returnLocalContact;
	}
	
	public List<LocalContact> getBySubAccountId( HttpServletRequest request, HttpServletResponse response, String subAccountId ) {
		return new LocalContactFactory().getBySubAccountId( subAccountId );
	}
	
	public LocalContact create( HttpServletRequest request, HttpServletResponse response, LocalContact localContact ) {
		boolean isSuccess = false;
		LocalContact returnLocalContact = null;
		try {
			returnLocalContact = new LocalContactFactory().create( localContact );
		} catch( Exception exception ) {
			log.severe( "Exception while logging out. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return returnLocalContact;
	}
	
	public LocalContact delete( HttpServletRequest request, HttpServletResponse response, LocalContact localContact ) {
		boolean isSuccess = false;
		LocalContact returnLocalContact = null;
		try {
			returnLocalContact = new LocalContactFactory().delete( localContact );
			isSuccess = true;
		} catch( Exception exception ) {
			log.severe( "Exception while deleting LocalContact. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return returnLocalContact;
	}

}
