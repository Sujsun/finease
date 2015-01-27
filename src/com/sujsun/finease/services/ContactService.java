package com.sujsun.finease.services;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sujsun.cms.jdo.Account;
import com.sujsun.cms.jdo.Contact;
import com.sujsun.finease.factories.ContactFactory;
import com.sujsun.finease.factories.SubAccountFactory;
import com.sujsun.finease.finalObjects.SessionKeys;
import com.sujsun.finease.jdo.SubAccount;
import com.sujsun.finease.mode.ApplicationMode;
import com.sujsun.finease.models.SessionModel;

public class ContactService {

	private static final Logger log = Logger.getLogger( ContactService.class.getName() );
	
	// Methods for creating contact - Starts
	public Contact create( HttpServletRequest request, HttpServletResponse response, Contact contact ) {
		boolean isSuccess = false;
		Contact returnContact = null;
		try {
			// Creating a new SubAccount
			SubAccount subAccount = new SubAccountFactory().create( new SubAccount() );
			// Map the created SubAccout to the contact's linkedAccounts
			Account account = new Account();
			account.setApplicationId( ApplicationMode.getApplicationId() );
			account.setApplicationTitle( ApplicationMode.getApplicatioTitle() );
			account.setSubAccountId( subAccount.getId() );
			List<Account> accountList = contact.getAccountList();
			if( accountList == null ) {
				accountList = new ArrayList<Account>();
			}
			accountList.add( account );
			contact.setAccountList( accountList );
			returnContact = create( contact );
			
			if( subAccount != null && returnContact != null ) {
				SessionModel sessionModel = new SessionModel( returnContact, subAccount );
				HttpSession session = request.getSession();
				session.setAttribute( SessionKeys.SESSIONMODELKEY, sessionModel );
				isSuccess = true;
			}
		} catch( Exception exception ) {
			log.severe( "Exception while creating Account. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return returnContact;
	}
	
	public Contact create( Contact contact ) {
		Contact returnContact = null;
		try {
			returnContact = new ContactFactory().create( contact );
		} catch( Exception exception ) {
			log.severe( "Exception while creating Account. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return returnContact;
	}
	// Methods for creating contact - Ends
	
	public String autheticate( String authenticationBy, String login, String password, HttpServletRequest request, HttpServletResponse resposne ) {
		boolean isSuccess = false;
		String returnViewString = "redirect:login";
		try {
			Contact contact = authenticate( authenticationBy, login, password );
			if( contact != null ) {
				List<Account> fineaseAccountList = new AccountService().getFineaseAccounts( contact.getAccountList() );
				if( contact != null && ( fineaseAccountList != null && fineaseAccountList.size() > 0 ) ) {
					Account fineaseAccount = fineaseAccountList.get( 0 );
					if( fineaseAccount != null ) {
						String subAccountId = fineaseAccount.getSubAccountId();
						SubAccount subAccount = new SubAccountFactory().get( subAccountId );
						if( subAccount != null ) {
							SessionModel sessionModel = new SessionModel( contact, subAccount );
							HttpSession session = request.getSession();
							session.setAttribute( SessionKeys.SESSIONMODELKEY, sessionModel );
							returnViewString = "redirect:home";
							isSuccess = true;
						}
					}
				}
			}
			log.log( Level.INFO, "Authentication Report :: Login : " + login + "  Password : " + password + "  Result : " + isSuccess );
		} catch( Exception exception ) {
			log.severe( "Exception while authenticating. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return returnViewString;
	}
	
	public Contact authenticate( String authenticationBy, String login, String password ) {
		Contact returnContact = null;
		boolean skipPassword = false;
		try {
			if( authenticationBy.equalsIgnoreCase( ApplicationMode.getApplicatioTitle() ) ) {
				skipPassword = false;
			} else {
				log.severe( "Unknown authenticationBy value. Give authenticationBy value : " + authenticationBy );
			}
			returnContact = new ContactFactory().authenticate( login, password, skipPassword );
		} catch( Exception exception ) {
			log.severe( "Exception while authenticating. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return returnContact;
	}
	
}
