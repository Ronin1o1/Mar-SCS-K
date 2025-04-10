package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelRateIncludes implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long rateincludes_id;
		private String rateincludesdescription;
	private String value="N";
	private String disabled="N";


	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		if (value.equals("on"))
			value="Y";
		this.value = value;
	}


	public void setRateincludes_id(Long rateincludes_id) {
		this.rateincludes_id = rateincludes_id;
	}

	public Long getRateincludes_id() {
		return rateincludes_id;
	}

	public void setRateincludesdescription(String rateincludesdescription) {
		this.rateincludesdescription = rateincludesdescription;
	}

	public String getRateincludesdescription() {
		return rateincludesdescription;
	}

	public void setDisabled(String disabled) {
		this.disabled = disabled;
	}

	public String getDisabled() {
		return disabled;
	}

}
