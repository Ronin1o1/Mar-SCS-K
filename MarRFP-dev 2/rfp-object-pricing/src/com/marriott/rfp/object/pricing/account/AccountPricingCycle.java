package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class AccountPricingCycle implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long accountpricingcycleid;
	private String accountpricingcycle;
	public Long getAccountpricingcycleid() {
		return accountpricingcycleid;
	}
	public void setAccountpricingcycleid(Long accountpricingcycleid) {
		this.accountpricingcycleid = accountpricingcycleid;
	}
	public String getAccountpricingcycle() {
		return accountpricingcycle;
	}
	public void setAccountpricingcycle(String accountpricingcycle) {
		this.accountpricingcycle = accountpricingcycle;
	}
	
}
