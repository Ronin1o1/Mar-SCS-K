package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class QuickAuditRateIncludes implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String rateincludesdescription;
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

	public void setRateincludesdescription(String rateincludesdescription) {
		this.rateincludesdescription = rateincludesdescription;
	}

	public String getRateincludesdescription() {
		return rateincludesdescription;
	}

}
