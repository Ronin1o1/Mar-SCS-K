package com.marriott.rfp.dataacess.pricing.hotelrfpdos.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfpdos.SalesDepth;
import com.marriott.rfp.object.pricing.hotelrfpdos.SalesDepth_En_LOS;
import com.marriott.rfp.object.pricing.hotelrfpdos.SalesDepth_En_Ranges;
import com.marriott.rfp.object.pricing.hotelrfpdos.SalesDepth_En_Rates;
import com.marriott.rfp.object.pricing.hotelrfpdos.SalesDepth_En_Season;
import com.marriott.rfp.object.pricing.hotelrfpdos.SalesDepth_Ranges;
import com.marriott.rfp.object.user.User;


public interface HotelRFPDOSManager {
	public SalesDepth getSalesDepth(long hotelrfpid);

	public List<SalesDepth_Ranges> getSalesDepthRanges(long salesdepthid);

	public SalesDepth_En_Season getSalesDepthEnhancedSeason(long salesdepthid, long seasonid);

	public List<SalesDepth_En_LOS> getSalesDepthEnhancedLOS(long salesdepthid);

	public List<SalesDepth_En_Ranges> getSalesDepthEnhancedRanges(long salesdepthid, long seasonid);

	public List<SalesDepth_En_Rates> getSalesDepthEnhancedRates(long salesdepth_en_ranges_id);

	public void updateSalesDepth(SalesDepth salesDepth, String switched, User user);

	public void updateSalesRanges(long hotelrfpid, List<SalesDepth_Ranges> salesdepth_ranges, User user);

	public void updateEnSalesRanges(long hotelrfpid, List<SalesDepth_En_Ranges> salesdepth_en_ranges, User user);

	public String isDOSEnhanced(long hotelrfpid);
	public String getEnhancedSalesDepthCompletionStatus(Long salesdepthid, long seasonid);
}
