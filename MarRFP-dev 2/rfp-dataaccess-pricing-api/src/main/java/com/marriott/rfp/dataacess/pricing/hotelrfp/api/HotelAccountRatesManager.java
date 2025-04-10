package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;
import java.util.Map;



import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPRmPools;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRates;
import com.marriott.rfp.object.user.User;


public interface HotelAccountRatesManager {
	public List<HotelRates> findOffcycleFixedRatesDetail(long hotel_accountinfoid);

	public List<HotelRates> findRatesDetail(long hotel_accountinfoid);

	public void updateRates(long haccid, long rateTypeId, Map<String, HotelRates> rfpRatesDetails, User user);

	public void updateAccountFixedRates(long haccid, Map<String, HotelRates> rfpRatesDetails, User user, boolean notlocked);

	public List<HotelRFPRmPools> getHotelAccountRmPools(long hotel_accountinfoid);
}
