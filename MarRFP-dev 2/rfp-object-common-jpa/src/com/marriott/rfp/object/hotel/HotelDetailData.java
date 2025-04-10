package com.marriott.rfp.object.hotel;

import java.io.Serializable;

public class HotelDetailData implements Serializable {

	private String marshaCode;
	private String hotelName;
	private long hotelid;
	private String country;
	private long affiliationid;
	private String franch_flag;
	private String isbrandextendedstay;
	/*
	 * Changes for Ticket number:RMSDB00011509 starts here
	 * Added a new variable isbrandritzcarlton and getters and setters for that variable
	 */
	private String isbrandritzcarlton;
	private String isbrandedition;
	private String address1;
	private String address2;
	private String citycountryzip;
	private String main_phone_incl;
	private String exclude_aer;
	private String breakinrates;
	private String servicetype;
	//	private String rm_pool_exempt;
	private String isbrandluxury;
	private boolean IsInternational;

	private static final long serialVersionUID = 1L;

	public HotelDetailData() {
		super();
	}

	public long getAffiliationid() {
		return affiliationid;
	}

	public String getCountry() {
		return country;
	}

	public long getHotelid() {
		return hotelid;
	}

	public String getHotelName() {
		return hotelName;
	}

	public String getMarshaCode() {
		return marshaCode;
	}

	public void setAffiliationid(long affiliationid) {
		this.affiliationid = affiliationid;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public void setHotelid(long hotelid) {
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

	public String getFranch_flag() {
		return franch_flag;
	}

	public void setFranch_flag(String franch_flag) {
		this.franch_flag = franch_flag;
	}

	public String getIsbrandextendedstay() {
		return isbrandextendedstay;
	}

	public boolean getIsLOSBrand() {
		return isbrandextendedstay!=null && isbrandextendedstay.equals("Y");
	}

	public void setIsbrandextendedstay(String isbrandextendedstay) {
		this.isbrandextendedstay = isbrandextendedstay;
	}

	public void setIsbrandritzcarlton(String isbrandritzcarlton) {
		this.isbrandritzcarlton = isbrandritzcarlton;
	}

	public String getIsbrandritzcarlton() {
		return isbrandritzcarlton;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getCitycountryzip() {
		return citycountryzip;
	}

	public void setCitycountryzip(String citycountryzip) {
		this.citycountryzip = citycountryzip;
	}

	public String getMain_phone_incl() {
		return main_phone_incl;
	}

	public void setMain_phone_incl(String main_phone_incl) {
		this.main_phone_incl = main_phone_incl;
	}

	public boolean getIsInternational() {
		if (country.compareTo("US") == 0)
			return false;
		else
			return true;
	}

	public void setInternational(boolean international) {
		IsInternational = international;
	}


	public void setExclude_aer(String exclude_aer) {
		this.exclude_aer = exclude_aer;
	}

	public String getExclude_aer() {
		return exclude_aer;
	}

	public void setBreakinrates(String breakinrates) {
		this.breakinrates = breakinrates;
	}

	public String getBreakinrates() {
		return breakinrates;
	}

	public String getServicetype() {
		return servicetype;
	}

	public void setServiceType(String servicetype) {
		this.servicetype = servicetype;
    }

//	public String getRm_pool_exempt() {
//		return rm_pool_exempt;
//	}
//
//	public void setRm_pool_exempt(String rm_pool_exempt) {
//		this.rm_pool_exempt = rm_pool_exempt;
//	}


	public String getIsbrandedition() {
		return isbrandedition;
	}

	public void setIsbrandedition(String isbrandedition) {
		this.isbrandedition = isbrandedition;
	}
	public String getIsbrandluxury() {
		return isbrandluxury;
	}
	public void setIsbrandluxury(String isbrandluxury) {
		this.isbrandluxury = isbrandluxury;
	}
}
