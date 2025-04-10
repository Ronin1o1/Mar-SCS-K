package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class AccountNew implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long accountrecid;
	private String accountname;
	private String accounttypedescription;
	private Date duedate;
	private Long period;
	private String dueDateShortDesc;
	
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



	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}

	public Long getAccountrecid() {
		return accountrecid;
	}



	public String getShortDuedate() {
		String strduedate = "";
		if (duedate != null) {
			strduedate = DateUtility.formatShortStringDate(duedate);
			if (strduedate.equals("Dec 31, 9999"))
				strduedate = "TBD";
			if (strduedate.equals("Jan 01, 9999"))
				strduedate = "CBC Collection";
		}
		return strduedate;
	}

	public Date getDuedate() {
		return duedate;
	}

	public void setDuedate(Date duedate) {
		this.duedate = duedate;
		
		String strduedate = "";
		if (duedate != null) {
			strduedate = DateUtility.formatShortStringDate(duedate);
			if (strduedate.equals("Dec 31, 9999")) {
				this.dueDateShortDesc = "TBD";
				
			} else if (strduedate.equals("Jan 01, 9999")) {
				this.dueDateShortDesc = "CBC Collection";
			} else {
				this.dueDateShortDesc = DateUtility.formatShortStringDate(duedate);
			}
		}
	}

	public Long getPeriod() {
		return period;
	}

	public void setPeriod(Long period) {
		this.period = period;
	}

	public String getDueDateShortDesc() {
		return dueDateShortDesc;
	}

	public void setDueDateShortDesc(String dueDateShortDesc) {
		this.dueDateShortDesc = dueDateShortDesc;
	}

}
