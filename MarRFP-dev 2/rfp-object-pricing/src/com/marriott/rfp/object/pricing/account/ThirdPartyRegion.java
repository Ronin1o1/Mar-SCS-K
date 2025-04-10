package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class ThirdPartyRegion implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String account_thirdparty;
	private Long account_thirdparty_refid;

	public void setAccount_thirdparty(String account_thirdparty) {
		this.account_thirdparty = account_thirdparty;
	}

	public String getAccount_thirdparty() {
		return account_thirdparty;
	}

	public void setAccount_thirdparty_refid(Long account_thirdparty_refid) {
		this.account_thirdparty_refid = account_thirdparty_refid;
	}

	public Long getAccount_thirdparty_refid() {
		return account_thirdparty_refid;
	}

}
