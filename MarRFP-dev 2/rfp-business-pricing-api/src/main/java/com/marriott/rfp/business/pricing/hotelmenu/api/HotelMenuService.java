package com.marriott.rfp.business.pricing.hotelmenu.api;



import com.marriott.rfp.object.pricing.menu.PricingMenuData;
import com.marriott.rfp.object.user.User;


public interface HotelMenuService {
	public PricingMenuData findByHotelRFPId(long hotelrfpid, String currentItem, User user);
	
	public String getScreenStatus(long hotelrfpid, String currentItem, long hotel_accountinfoid);

	public void update(long hotelrfpid, long screenid, long accountrecid, String accounttype, String status, User user, String changed,
			String markComplete);
}
