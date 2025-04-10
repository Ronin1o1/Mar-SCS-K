package com.marriott.rfp.object.pricing.portfolio;

import java.io.Serializable;

public class AccountStatusRef implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long accountStatusId;
	private String accountStatusName;
	
	public long getAccountStatusId() {
		return accountStatusId;
	}
	public void setAccountStatusId(long accountStatusId) {
		this.accountStatusId = accountStatusId;
	}
	public String getAccountStatusName() {
		return accountStatusName;
	}
	public void setAccountStatusName(String accountStatusName) {
		this.accountStatusName = accountStatusName;
	}
}
