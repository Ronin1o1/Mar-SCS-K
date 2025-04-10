package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class AccountEmailInfo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long accountrecid;
	private String returnMessage;

	public long getAccountrecid() {
		return accountrecid;
	}

	public void setAccountrecid(long accountrecid) {
		this.accountrecid = accountrecid;
	}

	public String getReturnMessage() {
		return returnMessage;
	}

	public void setReturnMessage(String returnMessage) {
		this.returnMessage = returnMessage;
	}

}

