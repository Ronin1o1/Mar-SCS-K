package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class AccountUpdateInfo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long accountrecid;
	private boolean brateprogsok;
	private boolean baccountnameexists;

	public long getAccountrecid() {
		return accountrecid;
	}

	public void setAccountrecid(long accountrecid) {
		this.accountrecid = accountrecid;
	}

	public boolean getBrateprogsok() {
		return brateprogsok;
	}

	public void setBrateprogsok(boolean brateprogsok) {
		this.brateprogsok = brateprogsok;
	}

	public boolean getBaccountnameexists() {
		return baccountnameexists;
	}

	public void setBaccountnameexists(boolean baccountnameexists) {
		this.baccountnameexists = baccountnameexists;
	}

}
