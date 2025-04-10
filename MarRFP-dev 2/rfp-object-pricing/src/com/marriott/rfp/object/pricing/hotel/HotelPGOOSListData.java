package com.marriott.rfp.object.pricing.hotel;

import java.io.Serializable;

public class HotelPGOOSListData implements Serializable {

    private String marshaCode;
    private String hotelName;
    private Long hotelid;
    private String country;
    private String city;
    private String state;
    private String pgoos = "N";
    private String aerpgoos = "N";
    private String excludeaer;
    private String willnotprice;
    private Long removalreasonid;
    private String removalreason;
    private Long aerremovalreasonid;
    private String aerremovalreason;
    private String changed;

    private static final long serialVersionUID = 1L;

    public HotelPGOOSListData() {
	super();
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

    public String getAerpgoos() {
	return aerpgoos;
    }

    public void setAerpgoos(String aerpgoos) {
	if (aerpgoos == null || aerpgoos.equals(""))
	    this.aerpgoos = "N";
	else
	    this.aerpgoos = aerpgoos;
    }

    public String getExcludeaer() {
	return excludeaer;
    }

    public void setExcludeaer(String excludeaer) {
	this.excludeaer = excludeaer;
    }

    public String getWillnotprice() {
	return willnotprice;
    }

    public void setWillnotprice(String willnotprice) {
	this.willnotprice = willnotprice;
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

    public Long getAerremovalreasonid() {
	return aerremovalreasonid;
    }

    public void setAerremovalreasonid(Long aerremovalreasonid) {
	this.aerremovalreasonid = aerremovalreasonid;
    }

    public String getAerremovalreason() {
	return aerremovalreason;
    }

    public void setAerremovalreason(String aerremovalreason) {
	this.aerremovalreason = aerremovalreason;
    }

    public void setChanged(String changed) {
	this.changed = changed;
    }

    public String getChanged() {
	return changed;
    }

}
