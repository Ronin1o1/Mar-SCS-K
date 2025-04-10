package com.marriott.rfp.business.pricing.common.api;

import java.util.List;



import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.location.SalesLocation;
import com.marriott.rfp.object.marketsalesregion.MarketSalesRegion;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.object.user.User;


public interface PricingCommonService {
	public List<Period> findAllPeriodsForRole(String role);

	public List<HotelAffiliation> findAllHotelAffiliations();

	public List<SalesLocation> getLocations();

	public List<MarketSalesRegion> getMarketSalesRegion();

	public String getUserNotLinkedMsg(User user);

	public String getUserNotLinkedAccountMsg(User user);

	public String getParticipate(User user);
}
