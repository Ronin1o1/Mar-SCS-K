package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class QuickAuditAmenities implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String amenitydescription;
	private String value;
	private String valuediff;



	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getValuediff() {
		return valuediff;
	}

	public void setValuediff(String valuediff) {
		this.valuediff = valuediff;
	}

	public void setAmenitydescription(String amenitydescription) {
		this.amenitydescription = amenitydescription;
	}

	public String getAmenitydescription() {
		return amenitydescription;
	}

}
