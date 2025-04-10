package com.marriott.rfp.object.pricing.accounttracking;

import java.util.List;

import com.marriott.rfp.object.pricing.account.Account;

public class Account_tracking_account extends Account {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<Account_Tracking> account_trackingDetails;
	private String changed;

	public void setAccount_trackingDetails(List<Account_Tracking> account_trackingDetails) {
		this.account_trackingDetails = account_trackingDetails;
	}

	public List<Account_Tracking> getAccount_trackingDetails() {
		return account_trackingDetails;
	}


	public void setChanged(String changed) {
		this.changed = changed;
	}

	public String getChanged() {
		return changed;
	}

}
