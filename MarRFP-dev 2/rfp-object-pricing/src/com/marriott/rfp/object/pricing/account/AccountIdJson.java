package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class AccountIdJson implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long accountid;
	private String name;
	private String segment;

	public Long getAccountid() {
		return accountid;
	}

	public void setAccountid(Long accountid) {
		this.accountid = accountid;
	}

	public String getStrAccountid() {
		if (accountid != null)
			return accountid.toString();
		else
			return null;
	}

	public String getName() {
		return name;
	}

	public void setName(String accountname) {
		this.name = accountname;
	}

	public String getSegment() {
		return segment;
	}

	public void setSegment(String segment) {
		this.segment = segment;
	}

}
