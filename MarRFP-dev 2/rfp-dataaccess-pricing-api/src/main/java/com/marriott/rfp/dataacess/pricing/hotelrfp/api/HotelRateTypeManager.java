package com.marriott.rfp.dataacess.pricing.hotelrfp.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotelrfp.HotelLRA_NLRA;
import com.marriott.rfp.object.pricing.hotelrfp.RateTypeRef;
import com.marriott.rfp.object.pricing.hotelrfp.RoomTypeRef;


public interface HotelRateTypeManager {
	public List<HotelLRA_NLRA> findLRAProductsDetail(long ratetypeid);

	public List<HotelLRA_NLRA> findAllLRAProductsDetail();

	public RateTypeRef findRateDefDetail(long ratetypeid);

	public RateTypeRef findRateDefDetail(String accounttype, long accountrecid, long affiliationid);

	public List<RoomTypeRef> findRoomTypesDetail(long affiliationid);

	public List<RoomTypeRef> findAllRoomTypesDetail();
}
