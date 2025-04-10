package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class RfpSettingsList implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long colvalue;
	private String coldesc;
	private String profile_name;
	private String name;
	private String phone;
	
	public Long getColvalue() {
		return colvalue;
	}
	public void setColvalue(Long colvalue) {
		this.colvalue = colvalue;
	}
	public String getColdesc() {
		return coldesc;
	}
	public void setColdesc(String coldesc) {
		this.coldesc = coldesc;
	}
	public String getProfile_name() {
		return profile_name;
	}
	public void setProfile_name(String profile_name) {
		this.profile_name = profile_name;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
}
