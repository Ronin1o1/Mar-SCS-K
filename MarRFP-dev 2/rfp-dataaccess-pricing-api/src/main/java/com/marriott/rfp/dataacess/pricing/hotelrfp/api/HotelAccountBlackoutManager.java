package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;



import com.marriott.rfp.object.pricing.hotelrfp.AccountBlackoutGroup;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountname;
import com.marriott.rfp.object.pricing.hotelrfp.HotelBlackoutDate;
import com.marriott.rfp.object.user.User;


public interface HotelAccountBlackoutManager {
	public List<HotelBlackoutDate> getBlackouts(long hotel_accountinfoid);

	public void updateAccountBlackouts(long haccid, String waiveblackouts, Map<Long, HotelBlackoutDate> hotelBlackoutDate, User user);

	public List<AccountBlackoutGroup> getRolledupBlackouts(Long hotelid, Long period, String type, User user);

	public List<HotelAccountname> getBlackoutAccounts(String hotel_accountinfoidlist);

	public void updateRolledupBlackouts(List<HotelBlackoutDate> blackoutdatelist, BigDecimal[] hotel_accountinfoarray, User user);

	public String getWaiveBlackouts(long hotel_accountinfoid);
}
