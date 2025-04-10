package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.List;

public class HotelBlackoutDates implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private List<HotelBlackoutDate> hotelBlackoutDate;

	public void setHotelBlackoutDate(List<HotelBlackoutDate> hotelBlackoutDate) {
		this.hotelBlackoutDate = hotelBlackoutDate;
	}

	public List<HotelBlackoutDate> getHotelBlackoutDate() {
		return hotelBlackoutDate;
	}
	
	public long getTotalNumBlackoutDays() {
		long totaldays=0;
		if (hotelBlackoutDate !=null) {
			for (int i=0; i<hotelBlackoutDate.size(); i++) 
				totaldays += hotelBlackoutDate.get(i).getTotalDays();
		}
		return totaldays;
	}
}
