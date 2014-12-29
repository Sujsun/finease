package com.sujsun.cms.jdo;

import java.io.Serializable;

public class ContactResponse implements Serializable {
	
	private boolean success;
	private Contact contact;
	
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public Contact getContact() {
		return contact;
	}
	public void setContact(Contact contact) {
		this.contact = contact;
	}
	
}
