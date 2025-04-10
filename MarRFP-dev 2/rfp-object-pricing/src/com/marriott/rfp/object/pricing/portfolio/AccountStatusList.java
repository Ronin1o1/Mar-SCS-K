package com.marriott.rfp.object.pricing.portfolio;

import java.io.Serializable;

public class AccountStatusList implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String accountname = "";
	private Long accountrecid;
	private String aer_account;
	private String aer_ready;
	private String locked;
	private String maxAer;
	private String process_aer;
	private String status_text;
	private Long acctStatusID;
	private String acctStatusName;
	private String changed;
	private String lockDate;
	private String portfolio;
	private String internalpasnotes;
	 
	public String getAccountname() {
		return accountname;
	}
	
	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}
	
	public Long getAccountrecid() {
		return accountrecid;
	}
	
	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}
	
	public String getStatus_text() {
		return status_text;
	}
	
	public void setStatus_text(String status_text) {
		this.status_text = status_text;
	}
	
	public Long getAcctStatusID() {
		return acctStatusID;
	}
	
	public void setAcctStatusID(Long acctStatusID) {
		this.acctStatusID = acctStatusID;
	}

	public String getAer_account() {
		return aer_account;
	}

	public void setAer_account(String aer_account) {
		this.aer_account = aer_account;
	}

	public String getAer_ready() {
		return aer_ready;
	}

	public void setAer_ready(String aer_ready) {
		this.aer_ready = aer_ready;
	}

	public String getMaxAer() {
		return maxAer;
	}

	public void setMaxAer(String maxAer) {
		this.maxAer = maxAer;
	}

	public String getProcess_aer() {
		return process_aer;
	}

	public void setProcess_aer(String process_aer) {
		this.process_aer = process_aer;
	}

	public String getLocked() {
		return locked;
	}

	public void setLocked(String locked) {
		this.locked = locked;
	}

	public String getChanged() {
		return changed;
	}

	public void setChanged(String changed) {
		this.changed = changed;
	}

	public String getAcctStatusName() {
		return acctStatusName;
	}

	public void setAcctStatusName(String acctStatusName) {
		this.acctStatusName = acctStatusName;
	}

	public String getLockDate() {
		return lockDate;
	}

	public void setLockDate(String lockDate) {
		this.lockDate = lockDate;
	}


	public void setInternalpasnotes(String internalpasnotes) {
		this.internalpasnotes = internalpasnotes;
	}

	public String getInternalpasnotes() {
		return internalpasnotes;
	}

	public String getPortfolio() {
		return portfolio;
	}

	public void setPortfolio(String portfolio) {
		this.portfolio = portfolio;
	}

	

}
