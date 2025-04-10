package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class AccountFacility implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String businessname;

	private String address;
	private String cityname;
	private String stateabbrev;
	private String zipcode;
	private String phonenumber;

	private Double distance;
	private String direction;
	private Long siteemployeenumber;
	private String siccode1desc;


	public String getBusinessname() {
		return businessname;
	}

	public void setBusinessname(String businessname) {
		this.businessname = businessname;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCityname() {
		return cityname;
	}

	public void setCityname(String cityname) {
		this.cityname = cityname;
	}

	public String getStateabbrev() {
		return stateabbrev;
	}

	public void setStateabbrev(String stateabbrev) {
		this.stateabbrev = stateabbrev;
	}

	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public String getPhonenumber() {
		return phonenumber;
	}

	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}

	public Double getDistance() {
		return distance;
	}

	public void setDistance(Double distance) {
		this.distance = distance;
	}

	public String getDirection() {
		return direction;
	}

	public void setDirection(String direction) {
		this.direction = direction;
	}

	public Long getSiteemployeenumber() {
		return siteemployeenumber;
	}

	public void setSiteemployeenumber(Long siteemployeenumber) {
		this.siteemployeenumber = siteemployeenumber;
	}

	public String getSiccode1desc() {
		return siccode1desc;
	}

	public void setSiccode1desc(String siccode1desc) {
		this.siccode1desc = siccode1desc;
	}

}
