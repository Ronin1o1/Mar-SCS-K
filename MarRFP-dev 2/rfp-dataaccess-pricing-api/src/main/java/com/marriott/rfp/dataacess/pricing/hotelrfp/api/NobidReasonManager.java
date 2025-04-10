package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfp.HotelNobidReason;


public interface NobidReasonManager {
	public List<HotelNobidReason> findNobidReasons();
}
