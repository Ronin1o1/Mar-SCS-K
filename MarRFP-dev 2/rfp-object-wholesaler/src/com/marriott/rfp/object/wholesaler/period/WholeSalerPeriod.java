package com.marriott.rfp.object.wholesaler.period;

import java.io.Serializable;
import java.util.Date;

public class WholeSalerPeriod implements Serializable{

	private long wholesalerperiodid;
	private long period;
	private Date duedate;
	private String hasAccounts;
	
	private static final long serialVersionUID = 1L;
	
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
	
	public String getHasAccounts() {
		return hasAccounts;
	}
	
	public void setHasAccounts(String hasAccounts) {
		this.hasAccounts = hasAccounts;
	}
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public long getWholesalerperiodid() {
		return wholesalerperiodid;
	}
	
	public void setWholesalerperiodid(long wholesalerperiodid) {
		this.wholesalerperiodid = wholesalerperiodid;
	}	

}