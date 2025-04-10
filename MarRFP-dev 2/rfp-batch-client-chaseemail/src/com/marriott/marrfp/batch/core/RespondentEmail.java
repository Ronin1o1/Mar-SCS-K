package com.marriott.marrfp.batch.core;

import java.io.Serializable;

public class RespondentEmail implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String email;
	private String emailtypeid;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getEmailtypeid() {
		return emailtypeid;
	}
	public void setEmailtypeid(String emailtypeid) {
		this.emailtypeid = emailtypeid;
	}
	
}
