package com.marriott.rfp.dataacess.pricing.hotelsfo.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelsfo.HotelSFODetails;
import com.marriott.rfp.object.pricing.hotelsfo.HotelSFOSearch;
import com.marriott.rfp.object.pricing.hotelsfo.MarketArea;
import com.marriott.rfp.object.pricing.hotelsfo.SalesMarket;
import com.marriott.rfp.object.user.User;


public interface HotelSFOManager {
	public List<HotelSFODetails> findHotelSFOList(HotelSFOSearch filter);

	public long findHotelSFOListNum(HotelSFOSearch filter);

	public List<SalesMarket> getSalesAreaList();

	public List<String> getFranchByList();

	public void updateHotelSFO(HotelSFODetails model, User user);

	List<MarketArea> findMarketArea(long salesareaid);

	HotelSFODetails getHotelSFODetails(long hotelid);
}
