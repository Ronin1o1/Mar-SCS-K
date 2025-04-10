package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfp.HotelRules;
import com.marriott.rfp.object.user.User;


public interface HotelGeneralRulesManager {
	public List<HotelRules> findGenRulesDetail(long hotelrfpid, long ratetypeid, boolean isInternational, User user);

	public void updateGeneralRules(long hotelrfpid, long ratetypeid, List<HotelRules> ruleslist, User user);

	public List<HotelRules> findGovGenRulesDetail(long hotelrfpid, long ratetypeid, boolean isInternational, User user);

	public void updateGovGeneralRules(long hotelrfpid, long ratetypeid, List<HotelRules> ruleslist, User user);
}
