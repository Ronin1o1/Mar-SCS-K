package com.marriott.rfp.object.hotelaffiliation;

import java.io.Serializable;

public class HotelAffiliation implements Serializable {

	private long affiliationid;
	private String affiliationname;
	private String affiliationstatus;

	private static final long serialVersionUID = 1L;

	public HotelAffiliation() {
		super();
	}

	public long getAffiliationid() {
		return affiliationid;
	}

	public void setAffiliationid(long affiliationid) {
		this.affiliationid = affiliationid;
	}

	public void setAffiliationname(String affiliationname) {
		this.affiliationname = affiliationname;
	}

	public String getAffiliationname() {
		return affiliationname;
	}

	public String getAffiliationstatus() {
		return affiliationstatus;
	}

	public void setAffiliationstatus(String affiliationstatus) {
		this.affiliationstatus = affiliationstatus;
}
}
