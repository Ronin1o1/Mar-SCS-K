package com.marriott.rfp.object.pricing.accountsegment;

import java.io.Serializable;

public class AccountSegment implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String accounttype;
	private String accounttypedescription;
	private String defaultcom;


	public void setAccounttype(String accounttype) {
		this.accounttype = accounttype;
	}

	public String getAccounttype() {
		return accounttype;
	}

	public void setAccounttypedescription(String accounttypedescription) {
		this.accounttypedescription = accounttypedescription;
	}

	public String getAccounttypedescription() {
		return accounttypedescription;
	}

	public void setDefaultcom(String defaultcom) {
		this.defaultcom = defaultcom;
	}

	public String getDefaultcom() {
		return defaultcom;
	}

}
