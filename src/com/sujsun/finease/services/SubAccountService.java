package com.sujsun.finease.services;

import java.util.logging.Logger;

import com.sujsun.finease.factories.SubAccountFactory;
import com.sujsun.finease.jdo.SubAccount;

public class SubAccountService {
	
	private static final Logger log = Logger.getLogger( SubAccountService.class.getName() );
	
	public SubAccount create( SubAccount subAccount ) {
		SubAccount returnSubAccount = null;
		try {
			returnSubAccount = new SubAccountFactory().create( subAccount );
		} catch( Exception exception ) {
			log.severe( "Exception while creating SubAccount. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return returnSubAccount;
	}

}
