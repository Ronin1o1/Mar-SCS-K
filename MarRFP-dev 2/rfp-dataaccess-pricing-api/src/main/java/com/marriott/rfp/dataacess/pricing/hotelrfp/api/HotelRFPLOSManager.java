package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;
import java.util.Map;



import com.marriott.rfp.object.pricing.hotelrfp.LengthOfStay;
import com.marriott.rfp.object.user.User;


public interface HotelRFPLOSManager {
	public List<LengthOfStay> getHotelLOS(long hotelrfpid);

	public void updateHotelLOS(long hotelrfpid, List<LengthOfStay> lengthOfStayList, User user);

	public void updateHotelLOS(long hotelrfpid, Map<String, LengthOfStay> hotelLOS, User user);
	
	public List<LengthOfStay> getHotelGovLOS(long hotelrfpid);

	public void updateHotelGovLOS(long hotelrfpid, List<LengthOfStay> lengthOfStayList, User user);
	
	public void updateHotelGovLOS(long hotelrfpid, Map<String, LengthOfStay> hotelLOS, User user);

}
