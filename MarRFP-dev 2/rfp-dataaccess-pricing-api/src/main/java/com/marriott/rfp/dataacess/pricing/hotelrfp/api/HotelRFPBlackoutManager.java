package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfp.HotelBlackoutDate;
import com.marriott.rfp.object.user.User;


public interface HotelRFPBlackoutManager {
	public List<HotelBlackoutDate> getGeneralBlackouts(long hotelrfpid);

	public void updateBlackoutDates(long hotelrfpid, List<HotelBlackoutDate> hotelBlackoutDate, User user);
}
