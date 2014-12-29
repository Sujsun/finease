package com.sujsun.finease.services;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.codehaus.jackson.type.TypeReference;

import com.sujsun.cms.jdo.Account;
import com.sujsun.cms.jdo.Contact;
import com.sujsun.finease.factories.AccountFactory;
import com.sujsun.finease.factories.ContactFactory;
import com.sujsun.finease.finalObjects.ObjectMapper;
import com.sujsun.finease.mode.ApplicationMode;

public class ContactService {

	private static final Logger log = Logger.getLogger( ContactService.class.getName() );
	
	public Contact create( String contactString ) {
		Contact returnContact = null;
		try {
			Contact contact = ObjectMapper.get().readValue( contactString, new TypeReference<Contact>() {} );
			returnContact = create( contact );
		} catch( Exception exception ) {
			log.severe( "Exception while creating Account. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return returnContact;
	}
	
	public Contact create( Contact contact ) {
		Contact returnContact = null;
		try {
			com.sujsun.finease.jdo.Account fineaseAccount = new com.sujsun.finease.jdo.Account();
			fineaseAccount = new AccountFactory().create( fineaseAccount );
			Account account = new Account();
			account.setApplicationId( ApplicationMode.getApplicationId() );
			account.setApplicationTitle( ApplicationMode.getApplicatioTitle() );
			account.setAccountId( fineaseAccount.getId() );
			List<Account> accountList = new ArrayList<Account>();
			accountList.add( account );
			contact.setAccountList( accountList );
			returnContact = new ContactFactory().create( contact );
		} catch( Exception exception ) {
			log.severe( "Exception while creating Account. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return returnContact;
	}
	
}
