package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;
import java.util.Map;



import com.marriott.rfp.object.pricing.hotelrfp.Season;
import com.marriott.rfp.object.user.User;


public interface HotelAccountSeasonManager {
	public List<Season> getOffCycleFloatSeason(long hotel_accountinfoid);
	public List<Season> getSeason(long hotel_accountinfoid);
	public void updateSeasons(long haccid, Map<String, Season> accountSeason, User user);
}
