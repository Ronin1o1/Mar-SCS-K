package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class Account implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private Long accountid;
    private String accountname;
    private String accountpricingtype;
    private Long accountrecid;
    private String accounttypedescription;
    private String duedate;
    private String groupmeetings = "N";
    private String hotel_display = "N";
    private Long period;
    private String top_account = "N";

    public Long getAccountrecid() {
	return accountrecid;
    }

    public void setAccountrecid(Long accountrecid) {
	this.accountrecid = accountrecid;
    }

    public String getStrAccountrecid() {
	if (accountrecid != null)
	    return accountrecid.toString();
	else
	    return null;
    }

    public String getAccountname() {
	return accountname;
    }

    public void setAccountname(String accountname) {
	this.accountname = accountname;
    }

    public void setHotel_display(String hotel_display) {
	if (hotel_display != null)
	    this.hotel_display = hotel_display;
    }

    public String getHotel_display() {
	return hotel_display;
    }

    public void setDuedate(String duedate) {
	this.duedate = duedate;
    }

    public String getDuedate() {
	return duedate;
    }

    public void setAccounttypedescription(String accounttypedescription) {
	this.accounttypedescription = accounttypedescription;
    }

    public String getAccounttypedescription() {
	return accounttypedescription;
    }

    public void setGroupmeetings(String groupmeetings) {
	this.groupmeetings = groupmeetings;
    }

    public String getGroupmeetings() {
	return groupmeetings;
    }

    public void setAccountid(Long accountid) {
	this.accountid = accountid;
    }

    public Long getAccountid() {
	return accountid;
    }

    public void setAccountpricingtype(String accountpricingtype) {
	this.accountpricingtype = accountpricingtype;
    }

    public String getAccountpricingtype() {
	return accountpricingtype;
    }

	public void setPeriod(Long period) {
		this.period = period;
	}

	public Long getPeriod() {
		return period;
	}

	public String getTop_account() {
		return top_account;
	}

	public void setTop_account(String top_account) {
		if (top_account == null || top_account.trim().length() == 0) {
			this.top_account = "N";
		} else {
			this.top_account = top_account;
		}
	}
}
