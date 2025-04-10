package com.marriott.rfp.object.pricing.accountpricingtype;

import java.io.Serializable;

public class AccountPricingType implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long accountpricingid;
	private String accountpricing;
	private String accountpricingtype;
	private String pricingtype_display;

	public Long getAccountpricingid() {
		return accountpricingid;
	}

	public void setAccountpricingid(Long accountpricingid) {
		this.accountpricingid = accountpricingid;
	}

	public String getAccountpricing() {
		return accountpricing;
	}

	public void setAccountpricing(String accountpricing) {
		this.accountpricing = accountpricing;
	}

	public String getAccountpricingtype() {
		return accountpricingtype;
	}

	public void setAccountpricingtype(String accountpricingtype) {
		this.accountpricingtype = accountpricingtype;
	}

	public String getPricingtype_display() {
		return pricingtype_display;
	}

	public void setPricingtype_display(String pricingtype_display) {
		this.pricingtype_display = pricingtype_display;
	}

}
