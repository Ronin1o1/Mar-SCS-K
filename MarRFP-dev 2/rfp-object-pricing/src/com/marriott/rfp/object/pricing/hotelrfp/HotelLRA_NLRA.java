package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelLRA_NLRA implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String productdescription;
	private String required;
	private String productid;

	public String getProductdescription() {
		return productdescription;
	}

	public void setProductdescription(String productdescription) {
		this.productdescription = productdescription;
	}

	public String getRequired() {
		return required;
	}

	public void setRequired(String required) {
		this.required = required;
	}

	public String getProductid() {
		return productid;
	}

	public void setProductid(String productid) {
		this.productid = productid;
	}

}
