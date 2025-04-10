package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class AccountSpecQuestionTypes implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long typeid;
	private String typedescription;

	public Long getTypeid() {
		return typeid;
	}

	public void setTypeid(Long typeid) {
		this.typeid = typeid;
	}

	public String getTypedescription() {
		return typedescription;
	}

	public void setTypedescription(String typedescription) {
		this.typedescription = typedescription;
	}

}
