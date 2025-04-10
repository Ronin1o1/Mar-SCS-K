package com.marriott.rfp.business.hotel.api;

import java.util.List;

import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.hotel.HotelJson;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.hotel.HotelPeriodData;
import com.marriott.rfp.object.user.User;


public interface HotelService {
	public List<HotelListData> findAllPropertiesForFmtRateLogin(User user);

	public List<HotelListData> findAllPropertiesForPricing(User user);

	public List<HotelListData> findAllPropertiesForPricing(User user, Integer orderBy);

	public HotelDetailData findPropertyDetail(String marshaCode);

	public List<HotelJson> findAllPropertiesForPricing(User user, long count, long start, String filter);

	public boolean UserHasPropertiesForPricing(User user);
	
	public List<HotelPeriodData> findAllPeriodsforProperty(String marshaCode, String role);
}
