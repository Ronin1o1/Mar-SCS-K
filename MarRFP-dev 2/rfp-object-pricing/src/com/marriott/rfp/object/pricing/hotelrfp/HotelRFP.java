package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelRFP implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long hotelrfpid;
	public void setHotelrfpid(long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}
	public long getHotelrfpid() {
		return hotelrfpid;
	}

}
