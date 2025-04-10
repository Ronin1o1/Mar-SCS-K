package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelAmenities implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long rfpamenityid;
	private Long hotelrfpid;
	private String amenityid;
	private String amenitydescription;
	private String value="N";
	private String locked="N";
	private String disabled="N";

	public Long getRfpamenityid() {
		return rfpamenityid;
	}

	public void setRfpamenityid(Long rfpamenityid) {
		this.rfpamenityid = rfpamenityid;
	}

	public Long getHotelrfpid() {
		return hotelrfpid;
	}

	public void setHotelrfpid(Long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}

	public String getAmenityid() {
		return amenityid;
	}

	public void setAmenityid(String amenityid) {
		this.amenityid = amenityid;
	}

	public String getAmenitydescription() {
		return amenitydescription;
	}

	public void setAmenitydescription(String amenitydescription) {
		this.amenitydescription = amenitydescription;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		if (value.equals("on"))
			value="Y";
		this.value = value;
	}

	public void setLocked(String locked) {
		this.locked = locked;
	}

	public String getLocked() {
		return locked;
	}

	public void setDisabled(String disabled) {
		this.disabled = disabled;
	}

	public String getDisabled() {
		return disabled;
	}

}
