package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;
import java.util.Map;



import com.marriott.rfp.object.pricing.hotelrfp.Season;
import com.marriott.rfp.object.user.User;


public interface HotelRFPSeasonManager {
	public List<Season> getHotelSeason(long hotelrfpid);

	public void updateHotelSeasons(long hotelrfpid, List<Season> seasonList, User user);
	
	public void updateHotelSeasons(long hotelrfpid, Map<String, Season> hotelSeason, User user);

	public List<Season> getHotelGovSeason(long hotelrfpid);

	public void updateHotelGovSeasons(long hotelrfpid, List<Season> seasonList, User user);
	
	public void updateHotelGovSeasons(long hotelrfpid, Map<String, Season> hotelSeason, User user);

}
