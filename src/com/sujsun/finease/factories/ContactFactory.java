package com.sujsun.finease.factories;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.web.client.RestTemplate;

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
	
}
