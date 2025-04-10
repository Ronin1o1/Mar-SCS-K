package com.marriott.rfp.business.wholesaler.rates.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.wholesaler.rates.api.WholesalerRatesService;
import com.marriott.rfp.dataaccess.wholesaler.rates.api.RatesManager;
import com.marriott.rfp.object.wholesaler.hotel.HotelRates;
import com.marriott.rfp.object.wholesaler.rates.Rates;
import com.marriott.rfp.object.wholesaler.roompools.RoomPools;

/**
 * Session Bean implementation class WholesalerRatesServiceImpl
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class WholesalerRatesServiceImpl implements WholesalerRatesService {

	@Autowired
	RatesManager rtmgr=null;	
	
	public WholesalerRatesServiceImpl() { }

	public List<RoomPools>	findRoomPoolsByParticipationId(long wsid){
		List<RoomPools> roompoolsList =rtmgr.findRoomPoolsByParticipationId(wsid);
		return  roompoolsList;
	}
	
	public List<Rates> findRatesByRoomPool(long roompoolid){
		List<Rates> ratesList =rtmgr.findRatesByRoomPool(roompoolid);
		return ratesList;
	}
	
	public void updateWSRates(Map<String, HotelRates> hotelRateMap, long roompoolid, long wsid,String formChanged, long period, String role, boolean isPeriodExpired, String loginName) {
		rtmgr.updateWSRates(hotelRateMap, roompoolid, wsid, formChanged, period, role, isPeriodExpired, loginName);
	}

}