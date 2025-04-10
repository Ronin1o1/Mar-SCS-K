package com.marriott.rfp.object.pricing.portfolio;

import java.io.Serializable;

public class HotelSolicitationAvail implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private String marshacode;
    private String hotelname;
    private String city;
    private String state;
    private String country;
    private Long hotelid;
    private Long ratetype_selected;
    private String nopricing;
    private String volunteered;
    private String hasgenpricing;
    private String willnotprice;
    private String status_CBC;
   
	public String getStatus_CBC() {
		return status_CBC;
	}

	public void setStatus_CBC(String status_CBC) {
		this.status_CBC = status_CBC;
	}
    public String getMarshacode() {
	return marshacode;
    }

    public void setMarshacode(String marshacode) {
	this.marshacode = marshacode;
    }

    public String getHotelname() {
	return hotelname;
    }

    public void setHotelname(String hotelname) {
	this.hotelname = hotelname;
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

    public String getCountry() {
	return country;
    }

    public void setCountry(String country) {
	this.country = country;
    }

    public Long getHotelid() {
	return hotelid;
    }

    public void setHotelid(Long hotelid) {
	this.hotelid = hotelid;
    }

    public Long getRatetype_selected() {
	return ratetype_selected;
    }

    public void setRatetype_selected(Long ratetype_selected) {
	this.ratetype_selected = ratetype_selected;
    }

    public String getNopricing() {
	return nopricing;
    }

    public void setNopricing(String nopricing) {
	this.nopricing = nopricing;
    }

    public String getVolunteered() {
	return volunteered;
    }

    public void setVolunteered(String volunteered) {
	this.volunteered = volunteered;
    }

    public void setHasgenpricing(String hasgenpricing) {
	this.hasgenpricing = hasgenpricing;
    }

    public String getHasgenpricing() {
	return hasgenpricing;
    }

    public void setWillnotprice(String willnotprice) {
	this.willnotprice = willnotprice;
    }

    public String getWillnotprice() {
	return willnotprice;
    }


}
