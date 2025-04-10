package com.marriott.rfp.object.pricing.hotel;

import java.io.Serializable;

public class HotelGPPPGOOSListData implements Serializable {

    private String marshaCode;
    private String hotelname;
    private Long hotelid;
    private String country;
    private String city;
    private String state;
    private String pgoos = "N";
    private Long removalreasonid;
    private String removalreason;
    private String changed;

    private static final long serialVersionUID = 1L;

    public HotelGPPPGOOSListData() {
	super();
    }

    public String getCountry() {
	return country;
    }

    public Long getHotelid() {
	return hotelid;
    }

    public String getHotelname() {
	return hotelname;
    }

    public String getMarshaCode() {
	return marshaCode;
    }

    public void setCountry(String country) {
	this.country = country;
    }

    public void setHotelid(Long hotelid) {
	this.hotelid = hotelid;
    }

    public void setHotelname(String hotelname) {
	this.hotelname = hotelname;
    }

    public void setMarshaCode(String marshaCode) {
	this.marshaCode = marshaCode;
    }

    public String getMarshaCodeAndName() {
	return marshaCode + " - " + hotelname;
    }

    public String getCity() {
	return city;
    }

    public void setCity(String city) {
	this.city = city;
    }

    public String getState() {
	return state;
    }

    public void setState(String state) {
	this.state = state;
    }

    public String getPgoos() {
	return pgoos;
    }

    public void setPgoos(String pgoos) {
	if (pgoos == null || pgoos.equals(""))
	    this.pgoos = "N";
	else
	    this.pgoos = pgoos;
    }



    public Long getRemovalreasonid() {
	return removalreasonid;
    }

    public void setRemovalreasonid(Long removalreasonid) {
	this.removalreasonid = removalreasonid;
    }

    public String getRemovalreason() {
	return removalreason;
    }

    public void setRemovalreason(String removalreason) {
	this.removalreason = removalreason;
    }


    public void setChanged(String changed) {
	this.changed = changed;
    }

    public String getChanged() {
	return changed;
    }


}
