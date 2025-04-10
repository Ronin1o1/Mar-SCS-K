package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditAmenInfo;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditAmenities;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditCancelInfo;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditInfo;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditRateIncludes;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditRates;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditRules;
import com.marriott.rfp.object.pricing.hotelrfp.QuickAuditRulesInfo;
import com.marriott.rfp.object.user.User;


public interface HotelAccountQuickAuditManager {
	public List<QuickAuditInfo> getQuickAudit(long hotel_accountinfoid);

	public List<QuickAuditRates> getQuickAuditRates(long hotel_accountinfoid, long quickaudithotelaccountid);

	public List<QuickAuditRates> getQuickAuditRatesWithDiff(long hotel_accountinfoid, long quickaudithotelaccountid, long prevquickaudithotelaccountid);

	public void updateQuickAudit(long haccid, User user);

	public List<QuickAuditAmenInfo> getQuickAuditAmen(long hotel_accountinfoid);
	
	public List<QuickAuditCancelInfo> getQuickAuditCancelInfo(long hotel_accountinfoid);

	public List<QuickAuditAmenities> getQuickAuditAmenities(long hotel_accountinfoid, long quickaudithtlacctamenid);

	public List<QuickAuditAmenities> getQuickAuditAmenitiesWithDiff(long hotel_accountinfoid, long quickaudithtlacctamenid, long prevquickaudithtlacctamenid);

	public List<QuickAuditRateIncludes> getQuickAuditRateIncludes(long hotel_accountinfoid, long quickaudithtlacctamenid);

	public List<QuickAuditRateIncludes> getQuickAuditRateIncludesWithDiff(long hotel_accountinfoid, long quickaudithtlacctamenid, long prevquickaudithtlacctamenid);

	public void updateQuickAuditAmenities(long haccid, User user);

public List<QuickAuditRulesInfo> getQuickAuditRuleInfo(long hotel_accountinfoid);
	
	public List<QuickAuditRules> getQuickAuditRulesWithDiff(long hotel_accountinfoid, long quickaudithtlacctamenid, long prevquickaudithtlacctamenid);
	
	public List<QuickAuditRules> getQuickAuditRules(long hotel_accountinfoid, long quickaudithotelaccountid);
	
	public void updateQuickAuditRules(long haccid, User user);
}
