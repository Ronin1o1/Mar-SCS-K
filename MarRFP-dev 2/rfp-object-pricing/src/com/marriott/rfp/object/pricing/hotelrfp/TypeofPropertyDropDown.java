package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class TypeofPropertyDropDown implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String pid;
	private String typeOfProperty;
	


	public String getTypeOfProperty() {
		return typeOfProperty;
	}
	public void setTypeOfProperty(String typeOfProperty) {
		this.typeOfProperty = typeOfProperty;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public String getPid() {
		return pid;
	}
}


