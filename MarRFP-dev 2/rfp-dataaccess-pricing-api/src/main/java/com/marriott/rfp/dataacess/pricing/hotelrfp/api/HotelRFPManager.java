package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPFinish;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPGroupsAndMeetings;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPRmPools;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPStandardRmPools;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPStandardRmPoolsDO;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPStandards;
import com.marriott.rfp.object.user.User;


public interface HotelRFPManager {
	public Long getHotelidFromHotelrfpid(Long hotelrfpid);

	public Long getHotelRFPID(String marshacode, long period, String loginName);

	public HotelRFPStandards getHotelRFPStandards(long hotelrfpid, String loginName);

	public List<HotelRFPStandardRmPoolsDO> getHotelRFPStandardsRmPools(long hotelrfpid);

	public void updateHotelRFPStandards(long hotelrfpid, HotelRFPStandards hotelRFPStandards, User user);

	public void updateRFPStandardRmPools(long hotelrfpid, List<HotelRFPStandardRmPools> hotelRFPStandardRmPools, User user);

	public List<HotelRFPFinish> getFinishStatus(long hotelrfpid, long pricingperiodid, User user);

	public HotelRFPGroupsAndMeetings getHotelRFPGroupMeeting(long hotelrfpid);

	public void updateGroupMeeting(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user);
	public HotelRFPGroupsAndMeetings getHotelRFPGroupPricing(long hotelrfpid);
	
	public void updateHotelRFPGroupPricing(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user);
	
	public HotelRFPGroupsAndMeetings getHotelRFPSIHMtgPricing(long hotelrfpid);
	
	public HotelRFPGroupsAndMeetings getHotelRFPMtgPricing(long hotelrfpid); 
	
	public void updateHotelRFPMtgPricing(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user);

	public HotelRFPGroupsAndMeetings getHotelRFPGMRespond(long hotelrfpid);
	
	public void updateHotelRFPGMRespond(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user);
	
	public HotelRFPGroupsAndMeetings getHotelRFPPayPricing(long hotelrfpid);
	
	public void updateHotelRFPPayPricing(long hotelrfpid, HotelRFPGroupsAndMeetings rfpHotel, User user);

	public String getCurrencyUsedInQuote(long hotelrfpid);

	public List<HotelRFPRmPools> getHotelRFPRmPools(long hotelrfpid);

}
