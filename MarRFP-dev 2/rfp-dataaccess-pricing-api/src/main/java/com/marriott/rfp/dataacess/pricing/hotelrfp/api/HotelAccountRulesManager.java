package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRoomPoolData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelRules;
import com.marriott.rfp.object.user.User;


public interface HotelAccountRulesManager {
	public List<HotelRules> findAccountRulesDetail(long hotel_accountinfoid, long hotelrfpid, long ratetypeid, boolean isInternational, User user);

	public void updateRules(long hotel_accountinfoid, Long ratetypeid, List<HotelRules> ruleslist, User user);

	public void updateRule(long hotel_accountinfoid, Long ratetypeid, String ruleid, String rulevalue, User user,boolean updated);

	public void updateRuleDiff(long hotel_accountinfoid, User user);

	public void updateAccountRoomPoolRules(long hotel_accountinfoid, List<HotelAccountSpecificRoomPoolData> roompoolflaglist, User user);	
}
