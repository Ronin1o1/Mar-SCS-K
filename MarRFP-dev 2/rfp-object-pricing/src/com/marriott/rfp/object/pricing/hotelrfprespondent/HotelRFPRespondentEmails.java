package com.marriott.rfp.object.pricing.hotelrfprespondent;

import java.io.Serializable;

public class HotelRFPRespondentEmails implements Serializable {
	private static final long serialVersionUID = 1L;

	private long rfprespondentid;
	private long emailtypeid;
	private String email;
	private String personname;
	private String persontitle;
	private String phonenumber;

	public long getRfprespondentid() {
		return rfprespondentid;
	}

	public void setRfprespondentid(long rfprespondentid) {
		this.rfprespondentid = rfprespondentid;
	}

	public long getEmailtypeid() {
		return emailtypeid;
	}

	public void setEmailtypeid(long emailtypeid) {
		this.emailtypeid = emailtypeid;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPersonname() {
		return personname;
	}

	public void setPersonname(String personname) {
		this.personname = personname;
	}

	public String getPersontitle() {
		return persontitle;
	}

	public void setPersontitle(String persontitle) {
		this.persontitle = persontitle;
	}
	
	public String getPhonenumber() {
		return phonenumber;
	}

	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}
}
