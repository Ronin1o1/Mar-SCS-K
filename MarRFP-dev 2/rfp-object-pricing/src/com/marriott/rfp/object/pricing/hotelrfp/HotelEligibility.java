package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelEligibility implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long rfpeligibilityid;
	private Long hotelrfpid;
	private String eligibilityid;
	private String eligibilitydescription;

	private String value="N";

	public Long getRfpeligibilityid() {
		return rfpeligibilityid;
	}

	public void setRfpeligibilityid(Long rfpeligibilityid) {
		this.rfpeligibilityid = rfpeligibilityid;
	}

	public Long getHotelrfpid() {
		return hotelrfpid;
	}

	public void setHotelrfpid(Long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}

	public String getEligibilityid() {
		return eligibilityid;
	}

	public void setEligibilityid(String eligibilityid) {
		this.eligibilityid = eligibilityid;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		if (value.equals("on"))
			value="Y";
		this.value = value;
	}

	public void setEligibilitydescription(String eligibilitydescription) {
		this.eligibilitydescription = eligibilitydescription;
	}

	public String getEligibilitydescription() {
		return eligibilitydescription;
	}

}
