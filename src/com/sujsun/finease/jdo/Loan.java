package com.sujsun.finease.jdo;

import java.io.Serializable;
import java.util.Date;
import java.util.ArrayList;

import javax.jdo.annotations.Extension;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable
public class Loan implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@PrimaryKey
    @Persistent//( valueStrategy = IdGeneratorStrategy.IDENTITY )
//	@Extension(vendorName="datanucleus", key="gae.encoded-pk", value="true")
    private String id;
	
	@Persistent
	private String label;
	@Persistent
	private int amount = -1;
	@Persistent
	private Date createdDate;
	@Persistent
	private Date lastUpdateDate;
	@Persistent
	private int interest = -1;
	@Persistent
	private int period = -1;
	@Persistent
	private String interval;
	@Persistent
	private ArrayList<String> linkedContacts;
	@Persistent
	private String subAccountId;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getLastUpdateDate() {
		return lastUpdateDate;
	}
	public void setLastUpdateDate(Date lastUpdateDate) {
		this.lastUpdateDate = lastUpdateDate;
	}
	public int getInterest() {
		return interest;
	}
	public void setInterest(int interest) {
		this.interest = interest;
	}
	public int getPeriod() {
		return period;
	}
	public void setPeriod(int period) {
		this.period = period;
	}
	public String getInterval() {
		return interval;
	}
	public void setInterval(String interval) {
		this.interval = interval;
	}
	public ArrayList<String> getLinkedContacts() {
		return linkedContacts;
	}
	public void setLinkedContacts(ArrayList<String> linkedContacts) {
		this.linkedContacts = linkedContacts;
	}
	public String getSubAccountId() {
		return subAccountId;
	}
	public void setSubAccountId(String subAccountId) {
		this.subAccountId = subAccountId;
	}
	
}
