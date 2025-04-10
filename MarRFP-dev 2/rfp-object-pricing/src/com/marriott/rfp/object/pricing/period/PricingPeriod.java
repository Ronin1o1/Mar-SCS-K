package com.marriott.rfp.object.pricing.period;

import java.io.Serializable;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class PricingPeriod implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long pricingperiodid;
	private long period;
	private Date duedate;
	private String hasAccounts;
	private String longDueDate;

	public long getPricingperiodid() {
		return pricingperiodid;
	}

	public void setPricingperiodid(long pricingperiodid) {
		this.pricingperiodid = pricingperiodid;
	}

	public long getPeriod() {
		return period;
	}

	public void setPeriod(long period) {
		this.period = period;
	}

	public Date getDuedate() {
		return duedate;
	}

	public void setDuedate(Date duedate) {
		this.duedate = duedate;
	}

	public void setHasAccounts(String hasAccounts) {
		this.hasAccounts = hasAccounts;
	}

	public String getHasAccounts() {
		return hasAccounts;
	}

	public String getShortDueDate() {
		return DateUtility.formatShortDate(duedate);
	}

	public String getLongDueDate() {
		String longDate = DateUtility.formatLongDate(duedate);
		if (longDate.equals("December 31, 9999"))
			longDate = "TBD";
		if (longDate.equals("January 01, 9999"))
			longDate = "CBC Collection";
		if (longDate.equals("January 31, 9999"))
			longDate = "No CBC’s Accepted";
		return longDate;
	}

	public void setLongDueDate(String longDueDate) {
		this.longDueDate = longDueDate;
	}

}
