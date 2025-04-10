package com.marriott.rfp.dataaccess.wholesaler.rates.api;

import java.util.List;
import java.util.Map;



import com.marriott.rfp.object.wholesaler.hotel.HotelRates;
import com.marriott.rfp.object.wholesaler.rates.Rates;
import com.marriott.rfp.object.wholesaler.roompools.RoomPools;


public interface RatesManager {
	
	public List<RoomPools>	findRoomPoolsByParticipationId(long wsid);
	
	public List<Rates> findRatesByRoomPool(long roompoolid);
	
	public void updateWSRates(Map<String, HotelRates> hotelRateMap, long roompoolid, long wsid,String formChanged, long period, String role, boolean isPeriodExpired, String loginName);
	
}