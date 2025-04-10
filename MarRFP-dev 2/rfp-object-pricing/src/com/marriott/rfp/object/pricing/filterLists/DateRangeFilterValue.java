package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;
import java.text.ParseException;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class DateRangeFilterValue implements Serializable {

    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private Date fromDate;
    private Date toDate;


    public DateRangeFilterValue(Date fromDate, Date toDate) {
		super();
		this.fromDate = fromDate;
		this.toDate = toDate;
	}

	public DateRangeFilterValue() {
		super();
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

    public String getStringFromDate() {
	return DateUtility.formatShortDate(fromDate);
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

    public String getStringToDate() {
	return DateUtility.formatShortDate(toDate);
    }

    public void setStrToDate(String strtodate) {
	try {
	    toDate = DateUtility.parseDate(strtodate);
	} catch (ParseException e) {
	}
    }

}
