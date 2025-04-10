package com.marriott.rfp.dataacess.pricing.mudroom.api;



import com.marriott.rfp.object.pricing.mudroom.HotelMudroom;
import com.marriott.rfp.object.user.User;


public interface HotelMudroomManager {
	public HotelMudroom findHotelRespondent(User user);
	public void updateHotelRespondent(HotelMudroom hotelRespondent);
}
