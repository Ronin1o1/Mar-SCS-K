package com.marriott.rfp.object.hotel;

import java.io.Serializable;

public class HotelListData implements Serializable {

	private String marshaCode;
	private String hotelName;
	private Long hotelid;
	private String country;
	private Long affiliationid;
	private String acct_tracking="N";
//	private String rm_pool_exempt;
	private String changed;
	private String futureopening;
	private String city;
	private String state;
	private String ignore_2ndrmpl_notes;
	private String description;

	private static final long serialVersionUID = 1L;

	public HotelListData() {
		super();
	}

	public Long getAffiliationid() {
		return affiliationid;
	}

	public String getCountry() {
		return country;
	}

	public Long getHotelid() {
		return hotelid;
	}

	public String getHotelName() {
		return hotelName;
	}

	public String getMarshaCode() {
		return marshaCode;
	}

	public void setAffiliationid(Long affiliationid) {
		this.affiliationid = affiliationid;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}

	public void setMarshaCode(String marshaCode) {
		this.marshaCode = marshaCode;
	}

	public String getMarshaCodeAndName() {
		return marshaCode + " - " + hotelName;
	}

	public void setAcct_tracking(String acct_tracking) {
		if (acct_tracking == null || acct_tracking.equals(""))
			this.acct_tracking = "N";
		else
			this.acct_tracking = acct_tracking;
	}

	public String getAcct_tracking() {
		return acct_tracking;
	}

//	public void setRm_pool_exempt(String rm_pool_exempt) {
//		if (rm_pool_exempt == null || rm_pool_exempt.equals(""))
//			this.rm_pool_exempt = "N";
//		else
//			this.rm_pool_exempt = rm_pool_exempt;
//	}
//
//	public String getRm_pool_exempt() {
//		return rm_pool_exempt;
//	}

	public void setChanged(String changed) {
		this.changed = changed;
	}

	public String getChanged() {
		return changed;
	}

	public void setFutureopening(String futureopening) {
	    this.futureopening = futureopening;
	}

	public String getFutureopening() {
	    return futureopening;
	}

	public void setCity(String city) {
	    this.city = city;
	}

	public String getCity() {
	    return city;
	}

	public void setState(String state) {
	    this.state = state;
	}

	public String getState() {
	    return state;
	}

	public void setIgnore_2ndrmpl_notes(String ignore_2ndrmpl_notes) {
		this.ignore_2ndrmpl_notes = ignore_2ndrmpl_notes;
	}

	public String getIgnore_2ndrmpl_notes() {
		return ignore_2ndrmpl_notes;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
