package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class AccountJson implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long accountrecid;
	private String name;

	public Long getAccountrecid() {
		return accountrecid;
	}

	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}

	public String getStrAccountrecid() {
		if (accountrecid != null)
			return accountrecid.toString();
		else
			return null;
	}

	public String getName() {
		return name;
	}

	public void setName(String accountname) {
		this.name = accountname;
	}

}
