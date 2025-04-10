package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;

public class SCPTHotel implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long hotelid;
	private String showrmnights;

	public Long getHotelid() {
		return hotelid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public String getShowrmnights() {
		return showrmnights;
	}

	public void setShowrmnights(String showrmnights) {
		this.showrmnights = showrmnights;
	}

}
