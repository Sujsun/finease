package com.sujsun.finease.jdo;

import java.io.Serializable;
import java.util.List;

import javax.jdo.annotations.Extension;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable
public class Account implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@PrimaryKey
    @Persistent( valueStrategy = IdGeneratorStrategy.IDENTITY )
	@Extension(vendorName="datanucleus", key="gae.encoded-pk", value="true")
    private String id;
	
	@Persistent
	private List<LocalContact> linkedLocalContacts;
	@Persistent
	private List<Loan> linkedLoan;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public List<LocalContact> getLinkedLocalContacts() {
		return linkedLocalContacts;
	}
	public void setLinkedLocalContacts(List<LocalContact> linkedLocalContacts) {
		this.linkedLocalContacts = linkedLocalContacts;
	}
	public List<Loan> getLinkedLoan() {
		return linkedLoan;
	}
	public void setLinkedLoan(List<Loan> linkedLoan) {
		this.linkedLoan = linkedLoan;
	}
	
}
