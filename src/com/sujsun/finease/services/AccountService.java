package com.sujsun.finease.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.codehaus.jackson.type.TypeReference;

import com.sujsun.finease.factories.SubAccountFactory;
import com.sujsun.finease.factories.ContactFactory;
import com.sujsun.finease.finalObjects.ObjectMapper;
import com.sujsun.finease.mode.ApplicationMode;
import com.sujsun.cms.jdo.Account;
import com.sujsun.cms.jdo.Contact;

public class AccountService {
	
	private static final Logger log = Logger.getLogger( AccountService.class.getName() );
	
	public List<Account> getFineaseAccounts( List<Account> accountList ) {
		List<Account> returnAccountList = new ArrayList<Account>();
		for( Account account : accountList ) {
			if( ApplicationMode.getApplicationId().equals( account.getApplicationId() ) ) {
				returnAccountList.add( account );
			}
		}
		return returnAccountList;
	}

}
