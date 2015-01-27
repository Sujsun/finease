package com.sujsun.finease.jdo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable
public class LocalContact implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@PrimaryKey
    @Persistent//( valueStrategy = IdGeneratorStrategy.IDENTITY )
//	@Extension(vendorName="datanucleus", key="gae.encoded-pk", value="true")
    private String id;
	
	@Persistent
	private Date createdDate;
	@Persistent
	private Date lastUpdateDate;
	
	@Persistent
	private String primaryEmail;
	@Persistent
	private List<String> secondaryEmailList;
	@Persistent
	private String firstName;
	@Persistent
	private String middleName;
	@Persistent
	private String lastName;
	@Persistent
    private String pictureUrl;
	@Persistent
	private boolean hasCMSContact;
	@Persistent
	private String cmsContactId;
	@Persistent
	private String subAccountId;
	
	@Persistent
	private List<String> phoneNumberList;
	
	@Persistent( defaultFetchGroup = "true" )
	private List<Address> addressList;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public boolean isHasCMSContact() {
		return hasCMSContact;
	}
	public void setHasCMSContact(boolean hasCMSContact) {
		this.hasCMSContact = hasCMSContact;
	}
	public String getCmsContactId() {
		return cmsContactId;
	}
	public void setCmsContactId(String cmsContactId) {
		this.cmsContactId = cmsContactId;
	}
	public String getSubAccountId() {
		return subAccountId;
	}
	public void setSubAccountId(String subAccountId) {
		this.subAccountId = subAccountId;
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
	public String getPrimaryEmail() {
		return primaryEmail;
	}
	public void setPrimaryEmail(String primaryEmail) {
		this.primaryEmail = primaryEmail;
	}
	public List<String> getSecondaryEmailList() {
		return secondaryEmailList;
	}
	public void setSecondaryEmailList(List<String> secondaryEmailList) {
		this.secondaryEmailList = secondaryEmailList;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getMiddleName() {
		return middleName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getPictureUrl() {
		return pictureUrl;
	}
	public void setPictureUrl(String pictureUrl) {
		this.pictureUrl = pictureUrl;
	}
	public List<String> getPhoneNumberList() {
		return phoneNumberList;
	}
	public void setPhoneNumberList(List<String> phoneNumberList) {
		this.phoneNumberList = phoneNumberList;
	}
	public List<Address> getAddressList() {
		return addressList;
	}
	public void setAddressList(List<Address> addressList) {
		this.addressList = addressList;
	}
	
}
