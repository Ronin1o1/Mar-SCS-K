package com.marriott.rfp.object.pricing.portfolio;

import java.io.Serializable;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class HotelSolicitationAddEmailInfo implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private Date duedate_foremail;
    private String additional_text = "";
    private Long sendfromtype=1L;
    private String sendfromemail;
    private String addemailtext_screentype = "";
    
    public String getAddemailtext_screentype() {
		return addemailtext_screentype;
	}

	public void setAddemailtext_screentype(String addemailtext_screentype) {
		this.addemailtext_screentype = addemailtext_screentype;
	}

    public void setDuedate_foremail(Date duedate_foremail) {
	this.duedate_foremail = duedate_foremail;
    }

    public Date getDuedate_foremail() {
	return duedate_foremail;
    }

    public String getShortDuedate_foremail() {
	return DateUtility.formatShortDate(duedate_foremail);
    }

    public void setAdditional_text(String additional_text) {
	if (additional_text == null)
	    additional_text = "";
	else
	    this.additional_text = additional_text;
    }

    public String getAdditional_text() {
	return additional_text;
    }

	public void setSendfromtype(Long sendfromtype) {
		this.sendfromtype = sendfromtype;
	}

	public Long getSendfromtype() {
		return sendfromtype;
	}

	public void setSendfromemail(String sendfromemail) {
		this.sendfromemail = sendfromemail;
	}

	public String getSendfromemail() {
		return sendfromemail;
	}
}
