package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;
import java.text.ParseException;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class FutureOpeningFilterValue implements Serializable {

    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private String allFutureOpenings = "N";
    private Date fromDate;
    private Date toDate;

    public String getAllFutureOpenings() {
	return allFutureOpenings;
    }

    public void setAllFutureOpenings(String allFutureOpenings) {
	if (allFutureOpenings.equals("N"))
	    this.allFutureOpenings = "N";
	else
	    this.allFutureOpenings = allFutureOpenings;
    }

    public Date getFromDate() {
	return fromDate;
    }

    public void setFromDate(Date fromDate) {
	this.fromDate = fromDate;
    }

    public String getStrFromDate() {
	return DateUtility.formatShortStringDate(fromDate);
    }

    public void setStrFromDate(String strfromdate) {
	try {
	    fromDate = DateUtility.parseDate(strfromdate);
	} catch (ParseException e) {
	}
    }

    public Date getToDate() {
	return toDate;
    }

    public void setToDate(Date toDate) {
	this.toDate = toDate;
    }

    public String getStrToDate() {
	return DateUtility.formatShortStringDate(toDate);
    }

    public void setStrToDate(String strtodate) {
	try {
	    toDate = DateUtility.parseDate(strtodate);
	} catch (ParseException e) {
	}
    }

}
