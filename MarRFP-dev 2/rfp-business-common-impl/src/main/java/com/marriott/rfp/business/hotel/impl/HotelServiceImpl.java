package com.marriott.rfp.business.hotel.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.dataaccess.hotel.api.HotelManager;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.hotel.HotelJson;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.hotel.HotelPeriodData;
import com.marriott.rfp.object.user.User;

/**
 * Session Bean implementation class HotelServiceImpl
 */
@Service
@Transactional("transactionManagerRfpCommon")
public class HotelServiceImpl implements HotelService {

	@Autowired
	private HotelManager hotelMgr = null;

	/**
	 * Default constructor.
	 */

	public List<HotelListData> findAllPropertiesForFmtRateLogin(User user) {

		return hotelMgr.findAllPropertiesForFmtRateLogin(user);
	}

	public List<HotelListData> findAllPropertiesForPricing(User user) {
		return hotelMgr.findAllPropertiesForPricing(user);
	}

	public List<HotelListData> findAllPropertiesForPricing(User user, Integer orderBy) {
		return hotelMgr.findAllPropertiesForPricing(user, orderBy);
	}

	public List<HotelJson> findAllPropertiesForPricing(User user, long count, long start, String filter) {
		return hotelMgr.findfilteredAllPropertiesForPricing(user, count, start, filter);
	}

	public HotelDetailData findPropertyDetail(String marshaCode) {
		return hotelMgr.findPropertyDetail(marshaCode);
	}

	public boolean UserHasPropertiesForPricing(User user) {
		return hotelMgr.UserHasPropertiesForPricing(user);
	}
	
	public List<HotelPeriodData> findAllPeriodsforProperty(String marshaCode, String role) {
		return hotelMgr.findAllPeriodsforProperty(marshaCode,role);
	}
	
}
