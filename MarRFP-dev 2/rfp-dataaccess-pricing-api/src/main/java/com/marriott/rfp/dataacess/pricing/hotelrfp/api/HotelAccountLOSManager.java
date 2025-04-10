package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;
import java.util.Map;



import com.marriott.rfp.object.pricing.hotelrfp.LengthOfStay;
import com.marriott.rfp.object.user.User;


public interface HotelAccountLOSManager {
	public List<LengthOfStay> getLOS(long hotel_accountinfoid);

	public void updateLOS(long haccid, Map<String, LengthOfStay> accountLOS, User user);
	
}
