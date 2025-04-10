package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class AccountDefaultPercents implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long affiliationid;
	private Long default_percent;
	private String affiliationname;
	private Long account_percentid;

	public void setAffiliationid(Long affiliationid) {
		this.affiliationid = affiliationid;
	}

	public Long getAffiliationid() {
		return affiliationid;
	}

	public void setDefault_percent(Long default_percent) {
		this.default_percent = default_percent;
	}

	public Long getDefault_percent() {
		return default_percent;
	}

	public void setAccount_percentid(Long account_percentid) {
		this.account_percentid = account_percentid;
	}

	public Long getAccount_percentid() {
		return account_percentid;
	}

	public void setAffiliationname(String affiliationname) {
		this.affiliationname = affiliationname;
	}

	public String getAffiliationname() {
		return affiliationname;
	}

}
