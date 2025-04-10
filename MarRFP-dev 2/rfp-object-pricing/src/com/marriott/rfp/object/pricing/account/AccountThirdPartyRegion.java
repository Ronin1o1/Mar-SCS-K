package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class AccountThirdPartyRegion implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String account_thirdpartyregion;
	private Long account_thirdparty_ref_id;
	private Long account_thirdpartyregionid;

	public String getAccount_thirdpartyregion() {
		return account_thirdpartyregion;
	}

	public void setAccount_thirdpartyregion(String account_thirdpartyregion) {
		this.account_thirdpartyregion = account_thirdpartyregion;
	}

	public Long getAccount_thirdparty_ref_id() {
		return account_thirdparty_ref_id;
	}

	public void setAccount_thirdparty_ref_id(Long account_thirdparty_ref_id) {
		this.account_thirdparty_ref_id = account_thirdparty_ref_id;
	}

	public Long getAccount_thirdpartyregionid() {
		return account_thirdpartyregionid;
	}

	public void setAccount_thirdpartyregionid(Long account_thirdpartyregionid) {
		this.account_thirdpartyregionid = account_thirdpartyregionid;
	}

}
