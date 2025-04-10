package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.HashMap;
import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfp.HotelRates;
import com.marriott.rfp.object.user.User;


public interface HotelGeneralRatesManager {
	public List<HotelRates> findGenRatesDetail(long hotelrfpid, long ratetypeid);

	public void updateGeneralRates(long hotelrfpid, long ratetypeid, HashMap<String, HotelRates> rateslist, User user);

	public void updateGeneralRates2(long hotelrfpid, long ratetypeid, HashMap<String, HotelRates> rateslist, User user) ;
	
	public void updateGeneralFixedRates(long hotelrfpid, User user);

	public List<HotelRates> findGovGenRatesDetail(long hotelrfpid, long ratetypeid);

	public void updateGovGeneralRates(long hotelrfpid, long ratetypeid, HashMap<String, HotelRates> rateslist, User user);

	public void updateGovGeneralRates2(long hotelrfpid, long ratetypeid, HashMap<String, HotelRates> rateslist, User user);

	public List<HotelRates> findGenFixedRatesForOffcycleFloat(long hotelrfpid);

	public List<HotelRates> findRatesForOffcycleFloat(long hotelrfpid, Double percentdiscount, String discfirsttieronly);

	public List<HotelRates> findRatesForFloat(long hotelrfpid, Double percentdiscount, String discfirsttieronly);
}
