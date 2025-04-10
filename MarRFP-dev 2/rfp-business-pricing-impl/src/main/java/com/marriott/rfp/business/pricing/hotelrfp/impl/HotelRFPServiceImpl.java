package com.marriott.rfp.business.pricing.hotelrfp.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.hotelrfp.api.HotelRFPService;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelRFPManager;

/**
 * Session Bean implementation class
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class HotelRFPServiceImpl implements HotelRFPService {

	@Autowired
	private HotelRFPManager rfpMgr = null;

	public Long getHotelRFPID(String marshacode, long period, String loginName) {
		return rfpMgr.getHotelRFPID(marshacode, period, loginName);
	}

	public String getCurrencyUsedInQuote(long hotelrfpid) {
	    return rfpMgr.getCurrencyUsedInQuote(hotelrfpid);
	}
}
