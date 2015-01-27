package com.sujsun.finease.models;

import java.io.Serializable;

import com.sujsun.cms.jdo.Contact;
import com.sujsun.finease.jdo.SubAccount;

public class SessionModel implements Serializable {
	
	private Contact contact;
	private SubAccount subAccount;
	private String sessionAttributeKey = "sessionModel"; 
	
	public String getSessionAttributeKey() {
		return sessionAttributeKey;
	}
	public void setSessionAttributeKey(String sessionAttributeKey) {
		this.sessionAttributeKey = sessionAttributeKey;
	}
	public SessionModel() {
		super();
	}
	public SessionModel(Contact contact, SubAccount subAccount) {
		super();
		this.contact = contact;
		this.subAccount = subAccount;
	}
	public Contact getContact() {
		return contact;
	}
	public void setContact(Contact contact) {
		this.contact = contact;
	}
	public SubAccount getSubAccount() {
		return subAccount;
	}
	public void setSubAccount(SubAccount subAccount) {
		this.subAccount = subAccount;
	}
	
}
