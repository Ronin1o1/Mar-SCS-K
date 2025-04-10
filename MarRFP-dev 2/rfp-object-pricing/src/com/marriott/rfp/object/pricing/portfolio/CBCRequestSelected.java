package com.marriott.rfp.object.pricing.portfolio;

import java.io.Serializable;

public class CBCRequestSelected implements Serializable {
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
	private String status;
	private String statusdescription;

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

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

	public void setStatusdescription(String statusdescription) {
		this.statusdescription = statusdescription;
	}

	public String getStatusdescription() {
		return statusdescription;
	}


}
