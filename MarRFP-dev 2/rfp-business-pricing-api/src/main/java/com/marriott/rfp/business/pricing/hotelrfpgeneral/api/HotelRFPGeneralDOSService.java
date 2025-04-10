package com.marriott.rfp.business.pricing.hotelrfpgeneral.api;



import com.marriott.rfp.object.pricing.hotelrfpdos.SalesDepth;
import com.marriott.rfp.object.user.User;


public interface HotelRFPGeneralDOSService {
	public SalesDepth getHotelRFPDOS(long hotelrfpid, long seasonid);

	public void updateSalesDepth(SalesDepth salesDepth, String switched, User user);
	public boolean getHotelRFPEnhancedDOSCompletionStatus(SalesDepth salesDepth, long seasonid);
}
