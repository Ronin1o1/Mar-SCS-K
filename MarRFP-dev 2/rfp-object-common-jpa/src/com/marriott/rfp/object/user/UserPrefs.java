package com.marriott.rfp.object.user;

import java.io.Serializable;

public class UserPrefs implements Serializable {

	private String eid;
	private String marshaCode;

	private static final long serialVersionUID = 1L;

	public UserPrefs() {
		super();
	}

	public void copy(UserPrefs user) {
		this.eid = user.getEid();
		this.marshaCode = user.marshaCode;
	}

	public void setEid(String eid) {
		this.eid = eid;
	}

	public String getEid() {
		return this.eid;
	}

	public String getMarshaCode() {
		return marshaCode;
	}

	public void setMarshaCode(String marshaCode) {
		this.marshaCode = marshaCode;
	}

}
