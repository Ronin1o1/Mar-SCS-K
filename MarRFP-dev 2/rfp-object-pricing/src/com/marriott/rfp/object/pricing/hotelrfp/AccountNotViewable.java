package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class AccountNotViewable implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long accountrecid;
	private String accountname;
	private String accounttypedescription;
	private String globalSalesLeader;
	private String contactemail;
	private Date contractenddate;
	private String aer_account; 
	private Number default_percent;
	
	public String getAccountname() {
		return accountname;
	}

	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public String getAccounttypedescription() {
		return accounttypedescription;
	}

	public void setAccounttypedescription(String accounttypedescription) {
		this.accounttypedescription = accounttypedescription;
	}

	public String getGlobalSalesLeader() {
		return globalSalesLeader;
	}

	public void setGlobalSalesLeader(String globalSalesLeader) {
		this.globalSalesLeader = globalSalesLeader;
	}

	public String getContactemail() {
		return contactemail;
	}

	public void setContactemail(String contactemail) {
		this.contactemail = contactemail;
	}

	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}

	public Long getAccountrecid() {
		return accountrecid;
	}

	public void setContractenddate(Date contractenddate) {
		this.contractenddate = contractenddate;
	}

	public Date getContractenddate() {
		return contractenddate;
	}

	public String getShortContractenddate() {
		String strDate = "";
		if (contractenddate != null)
			strDate = DateUtility.formatShortDate(contractenddate);
		return strDate;
	}

	public String getAer_account() {
		return aer_account;
	}

	public void setAer_account(String aer_account) {
		this.aer_account = aer_account;
	}

	public Number getDefault_percent() {
		return default_percent;
	}

	public void setDefault_percent(Number default_percent) {
		this.default_percent = default_percent;
	}
	

	public String getGppHeader() {
		String header = "";
		if (this.aer_account == null ) { 
			header = "";
		} else if (this.aer_account != null  && this.aer_account.equals("N")) {
			header = this.aer_account;
		} else if (this.aer_account != null  && this.aer_account.equals("Y")) {
			header = this.aer_account;
			if (this.default_percent != null) {
				header = header + "-" + this.default_percent + "%";
			}
		}
		return header;
	}
	
}
