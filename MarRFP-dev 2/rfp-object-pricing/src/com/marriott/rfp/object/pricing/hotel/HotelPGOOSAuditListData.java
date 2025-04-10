package com.marriott.rfp.object.pricing.hotel;

import java.io.Serializable;

public class HotelPGOOSAuditListData implements Serializable {

    private String marshaCode;
    private String eid;
    private String changeDate;;
    private String cn_firstname;
    private String cn_lastname;
    private String pgoos_new;
    private String pgoos_old;
    private String aerpgoos_new;
    private String aerpgoos_old;
    private static final long serialVersionUID = 1L;
    private String exempt_gpp_new;
    private String exempt_gpp_old;

    public HotelPGOOSAuditListData() {
	super();
    }

    public String getMarshaCode() {
	return marshaCode;
    }

    public void setMarshaCode(String marshaCode) {
	this.marshaCode = marshaCode;
    }

    public String getEid() {
	return eid;
    }

    public void setEid(String eid) {
	this.eid = eid;
    }

    public String getChangeDate() {
	return changeDate;
    }

    public void setChangeDate(String changeDate) {
	this.changeDate = changeDate;
    }

    public String getCn_firstname() {
	return cn_firstname;
    }

    public void setCn_firstname(String cn_firstname) {
	this.cn_firstname = cn_firstname;
    }

    public String getCn_lastname() {
	return cn_lastname;
    }

    public void setCn_lastname(String cn_lastname) {
	this.cn_lastname = cn_lastname;
    }

    public String getPgoos_new() {
	return pgoos_new;
    }

    public void setPgoos_new(String pgoos_new) {
	this.pgoos_new = pgoos_new;
    }

    public String getPgoos_old() {
	return pgoos_old;
    }

    public void setPgoos_old(String pgoos_old) {
	this.pgoos_old = pgoos_old;
    }

    public String getAerpgoos_new() {
	return aerpgoos_new;
    }

    public void setAerpgoos_new(String aerpgoos_new) {
	this.aerpgoos_new = aerpgoos_new;
    }

    public String getAerpgoos_old() {
	return aerpgoos_old;
    }

    public void setAerpgoos_old(String aerpgoos_old) {
	this.aerpgoos_old = aerpgoos_old;
    }
    
    /**
	 * @return the exempt_gpp_new
	 */
	public String getExempt_gpp_new() {
		return exempt_gpp_new;
	}

	/**
	 * @param exempt_gpp_new the exempt_gpp_new to set
	 */
	public void setExempt_gpp_new(String exemptgpp_new) {
		this.exempt_gpp_new = exemptgpp_new;
	}

	/**
	 * @return the exempt_gpp_old
	 */
	public String getExempt_gpp_old() {
		return exempt_gpp_old;
	}

	/**
	 * @param exempt_gpp_old the exempt_gpp_old to set
	 */
	public void setExempt_gpp_old(String exemptgpp_old) {
		this.exempt_gpp_old = exemptgpp_old;
	}

}
