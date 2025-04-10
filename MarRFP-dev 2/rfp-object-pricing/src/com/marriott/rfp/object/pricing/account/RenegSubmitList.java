package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;
import java.text.ParseException;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class RenegSubmitList implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long accountrecid; 
	private Date dateinfo;
	
	public Long getAccountrecid() {
		return accountrecid;
	}
	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}
	public Date getDateinfo() {
		return dateinfo;
	}
	public String getShortDateinfo() {
		return DateUtility.formatShortDate(dateinfo);
	}
	public void setDateinfo(Date dateinfo) {
		this.dateinfo = dateinfo;
	}
	public void setStrDateinfo(String strdateinfo) {
	    try {
	    	dateinfo=DateUtility.parseDate(strdateinfo);
	    } catch (ParseException e) {
	    }
	}

}
