package com.marriott.rfp.object.pricing.filterLists;


import java.io.Serializable;


public class PricingAccountFilterValue  implements Serializable {
	/**
     * 
     */
    private static final long serialVersionUID = 1L;
	private Long accountrecid;
	private String accountstatus="ALL";
	private String accountType="";
	private boolean hideNoPricing=false;
	private String subset="";
	private String subset2="";
	private String accountPricing="";
	private String solicitationSelection;
	
	
	public Long getAccountrecid() {
		return accountrecid;
	}


	
	public String getAccountstatus() {
		return accountstatus;
	}


	
	public String getAccountType() {
		return accountType;
	}


	
	public boolean getHideNoPricing() {
		return hideNoPricing;
	}



	public String getSubset() {
		return subset;
	}


	
	public String getSubset2() {
		return subset2;
	}
	
	
	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}
	
	public void setAccountstatus(String accountstatus) {
		this.accountstatus = accountstatus;
	}
	
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
	
	public void setHideNoPricing(boolean hideNoPricing) {
		this.hideNoPricing = hideNoPricing;
	}
	
	public void setSubset(String subset) {
		this.subset = subset;
	}

	
	public void setSubset2(String string) {
		subset2 = string;
	}

	
	public String getAccountPricing() {
		return accountPricing;
	}

	public void setAccountPricing(String accountPricing) {
		this.accountPricing = accountPricing;
	}



	public void setSolicitationSelection(String solicitationSelection) {
	    this.solicitationSelection = solicitationSelection;
	}



	public String getSolicitationSelection() {
	    return solicitationSelection;
	}
	
}


