package com.marriott.rfp.business.pricing.hotelrfpgeneral.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;



import com.marriott.rfp.object.pricing.hotelrfp.HotelLRA_NLRA;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPRmPools;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRates;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRules;
import com.marriott.rfp.object.pricing.hotelrfp.LengthOfStay;
import com.marriott.rfp.object.pricing.hotelrfp.RateTypeRef;
import com.marriott.rfp.object.pricing.hotelrfp.RoomTypeRef;
import com.marriott.rfp.object.pricing.hotelrfp.Season;
import com.marriott.rfp.object.user.User;


public interface HotelRFPGeneralRatesService {
	public List<LengthOfStay> getHotelLOS(long hotelrfpid);

	public List<LengthOfStay> getHotelLOSWithDefault(long hotelrfpid);

	public void updateHotelLOS(String formChg, long hotelrfpid, List<LengthOfStay> lengthOfStayList, User user);

	public void updateHotelLOS(String formChg, long hotelrfpid, Map<String, LengthOfStay> hotelLOS, User user);

	public List<LengthOfStay> getHotelGovLOS(long hotelrfpid);

	public void updateHotelGovLOS(String formChg, long hotelrfpid, List<LengthOfStay> lengthOfStayList, User user);

	public void updateHotelGovLOS(String formChg, long hotelrfpid, Map<String, LengthOfStay> hotelLOS, User user);

	public String isDOSEnhanced(long hotelrfpid);

	public List<Season> getHotelSeason(long hotelrfpid);

	public List<Season> getHotelSeasonWithDefault(long hotelrfpid, long period);

	public void updateHotelSeason(String formChg, long hotelrfpid, List<Season> seasonList, User user);

	public void updateHotelSeason(String formChg, long hotelrfpid, Map<String, Season> hotelSeason, User user, String num_seasoninitial);

	public List<Season> getHotelGovSeason(long hotelrfpid, long period);

	public void updateHotelGovSeason(String formChg, long hotelrfpid, List<Season> seasonList, User user);

	public void updateHotelGovSeason(String formChg, long hotelrfpid, Map<String, Season> hotelSeason, User user);

	public RateTypeRef findRateDefDetail(long ratetypeid);

	public List<HotelLRA_NLRA> findLRAProductsDetail(long ratetypeid);

	public List<RoomTypeRef> findRoomTypesDetail(long affiliationid);

	public List<HotelRFPRmPools> getHotelRFPRmPools(long hotelrfp);

	public List<HotelRules> findGenRulesDetail(long hotelrfpid, long ratetypeid, boolean isInternational, User user);

	public void updateGeneralRules(String formChg, long hotelrfpid, long ratetypeid, List<HotelRules> ruleslist, User user);

	public List<HotelRules> findGovGenRulesDetail(long hotelrfpid, long ratetypeid, boolean isInternational, User user);

	public void updateGovGeneralRules(String formChg, long hotelrfpid, long ratetypeid, List<HotelRules> ruleslist, User user);

	public HashMap<String, HotelRates> findGenRatesDetail(long hotelrfpid, long ratetypeid);

	public void updateGeneralRates(String formChg, long hotelrfpid, long ratetypeid, HashMap<String, HotelRates> rateslist, User user);

	public void updateGeneralRates(String formChg, long hotelrfpid, long ratetypeid, HashMap<String, HotelRates> rateslist, Map<String, Season> seasons, Map<String, LengthOfStay> los, User user);

	public HashMap<String, HotelRates> findGovGenRatesDetail(long hotelrfpid, long ratetypeid);

	public void updateGovGeneralRates(String formChg, long hotelrfpid, long ratetypeid, HashMap<String, HotelRates> rateslist, User user);

	public void updateGovGeneralRates(String formChg, long hotelrfpid, long ratetypeid, HashMap<String, HotelRates> rateslist, Map<String, Season> seasons, Map<String, LengthOfStay> los, User user);

}
