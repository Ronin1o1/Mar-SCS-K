package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelAccountSpecific implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private HotelAccountSpecificData hotelAccountSpecificData;
	private HotelAccountSpecificViewInfo hotelAccountSpecificViewInfo;

	public void setHotelAccountSpecificData(HotelAccountSpecificData hotelAccountSpecificData) {
		this.hotelAccountSpecificData = hotelAccountSpecificData;
	}

	public HotelAccountSpecificData getHotelAccountSpecificData() {
		return hotelAccountSpecificData;
	}

	public void setHotelAccountSpecificViewInfo(HotelAccountSpecificViewInfo hotelAccountSpecificViewInfo) {
		this.hotelAccountSpecificViewInfo = hotelAccountSpecificViewInfo;
	}

	public HotelAccountSpecificViewInfo getHotelAccountSpecificViewInfo() {
		return hotelAccountSpecificViewInfo;
	}

}
