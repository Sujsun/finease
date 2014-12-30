package com.sujsun.finease.factories;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.web.client.RestTemplate;

import com.google.appengine.labs.repackaged.org.json.JSONObject;
import com.sujsun.cms.jdo.Contact;
import com.sujsun.cms.jdo.ContactResponse;
import com.sujsun.finease.mode.UrlMode;

public class ContactFactory {
	
	private static final Logger log = Logger.getLogger( ContactFactory.class.getName() );
	
	public Contact create( Contact contactToCreate ) {
		boolean isSuccess = false;
		Contact returnContact = null;
		try {
			ContactResponse contactResponse = new RestTemplate().postForObject( UrlMode.getCMSContactUrl(), contactToCreate, ContactResponse.class );
			if( contactResponse.isSuccess() ) {
				returnContact = contactResponse.getContact();
				isSuccess = true;
			}
		} catch( Exception exception ) {
			log.log( Level.SEVERE, "Error while creating contact in CMS. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		} finally {
		}
		return returnContact;
	}
	
	public Contact authenticate( String login, String password, boolean skipPassword ) {
		boolean isSuccess = false;
		Contact returnContact = null;
		try {
			Map<String, Object> requestHashMap = new HashMap<String, Object>(); 
			requestHashMap.put( "login", login );
			requestHashMap.put( "password", password );
			requestHashMap.put( "skipPassword", skipPassword );
			returnContact = new RestTemplate().postForObject( UrlMode.getCMSAuthenticateUrl(), requestHashMap, Contact.class );
			if( returnContact != null && returnContact.getId() != null ) {
				isSuccess = true;
			}
			log.log( Level.INFO, "Authentication: Login: " + login + "  Password : " + password + "  Result : " + isSuccess );
		} catch( Exception exception ) {
			log.log( Level.SEVERE, "Error while creating contact in CMS. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		} finally {
		}
		return returnContact;
	}
	
}
