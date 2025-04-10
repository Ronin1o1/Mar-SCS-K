package com.marriott.rfp.object.franchise;

import java.io.Serializable;

public class Franchise implements Serializable {

	/**
     * 
     */
    private static final long serialVersionUID = 1L;
	private String franchName;
	private String franchCode;
	private Long epicId;
	private String address;
	private String city;
	private String country;
	private String zip;
	private String phone;
	private String franchisestatus;
	
	public String getFranchName() {
		return franchName;
	}
	public void setFranchName(String franchName) {
		this.franchName = franchName;
	}
	public String getFranchCode() {
		return franchCode;
	}
	public void setFranchCode(String franchCode) {
		this.franchCode = franchCode;
	}
	public Long getEpicId() {
		return epicId;
	}
	public void setEpicId(Long epicId) {
		this.epicId = epicId;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getZip() {
		return zip;
	}
	public void setZip(String zip) {
		this.zip = zip;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getFranchisestatus() {
		return franchisestatus;
	}
	public void setFranchisestatus(String franchisestatus) {
		this.franchisestatus = franchisestatus;
	}
}