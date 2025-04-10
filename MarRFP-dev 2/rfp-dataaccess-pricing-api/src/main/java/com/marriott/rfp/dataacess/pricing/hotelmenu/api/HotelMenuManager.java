package com.marriott.rfp.dataacess.pricing.hotelmenu.api;

import java.util.List;



import com.marriott.rfp.object.pricing.menu.PricingMenu;
import com.marriott.rfp.object.pricing.menu.PricingMenuChecks;
import com.marriott.rfp.object.user.User;


public interface HotelMenuManager {
	public List<PricingMenu> findByHotelRFPId(long hotelrfpid) ;
	
	public PricingMenuChecks getMenuChecks( long hotelrfpid, User userProperties);

	public String getNextScreen(long hotelrfpid, String currentItem, User user);

	public String getPreviousScreen(long hotelrfpid, String currentItem, User user);

	public void update(long hotelrfpid, long screenid, long accountrecid, String accounttype, String status, User user, String changed,
			String markComplete);
	
	public String getScreenStatus(long hotelrfpid, String currentItem, long hotel_accountinfoid);

	void updateRevisitStatus(long accountrecid);

	
}
