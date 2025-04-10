package com.marriott.rfp.business.pricing.hotelrfpaccounts.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfp.AccountFacility;


public interface HotelRFPAccountFacilityService {
	public List<AccountFacility> findFacilityDetails(long hotelid, long accountrecid);

	}
