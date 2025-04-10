package com.marriott.rfp.business.pricing.hotelrfpaccounts.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountFacilityService;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountFacilityManager;
import com.marriott.rfp.object.pricing.hotelrfp.AccountFacility;

/**
 * Session Bean implementation class
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class HotelRFPAccountFacilityServiceImpl implements HotelRFPAccountFacilityService {


	@Autowired
	HotelAccountFacilityManager facilityMgr = null;

	
	public List<AccountFacility> findFacilityDetails(long hotelid, long accountrecid) {
		
		return facilityMgr.findFacilityDetails(hotelid, accountrecid);
	}

	
}
