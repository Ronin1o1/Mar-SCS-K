package com.marriott.marrfp.batch.core;

import java.io.Serializable;

public class Contact implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String contactareacitycode;
	private String contactcountrycode;
	private String contactemail;
	private String contactname;
	private String contactphonenumber;
	private Long contactid;

	public String getContactareacitycode() {
		return contactareacitycode;
	}

	public void setContactareacitycode(String contactareacitycode) {
		this.contactareacitycode = contactareacitycode;
	}

	public String getContactcountrycode() {
		return contactcountrycode;
	}

	public void setContactcountrycode(String contactcountrycode) {
		this.contactcountrycode = contactcountrycode;
	}

	public String getContactemail() {
		return contactemail;
	}

	public void setContactemail(String contactemail) {
		this.contactemail = contactemail;
	}

	public String getContactname() {
		return contactname;
	}

	public void setContactname(String contactname) {
		this.contactname = contactname;
	}

	public String getContactphonenumber() {
		return contactphonenumber;
	}

	public void setContactphonenumber(String contactphonenumber) {
		this.contactphonenumber = contactphonenumber;
	}

	public void setContactid(Long contactid) {
		this.contactid = contactid;
	}

	public Long getContactid() {
		return contactid;
	}

}
