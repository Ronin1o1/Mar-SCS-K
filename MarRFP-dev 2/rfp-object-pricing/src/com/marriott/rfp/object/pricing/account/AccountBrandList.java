package com.marriott.rfp.object.pricing.account;

/**
 * Created by mbala185 on 5/15/2017.
 */
public class AccountBrandList {
	private Long accountrecid;
	private Long affiliationid;
    private String value;
	
    public Long getAccountrecid() {
		return accountrecid;
	}
	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}
	public Long getAffiliationid() {
		return affiliationid;
	}
	public void setAffiliationid(Long affiliationid) {
		this.affiliationid = affiliationid;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
    
}
