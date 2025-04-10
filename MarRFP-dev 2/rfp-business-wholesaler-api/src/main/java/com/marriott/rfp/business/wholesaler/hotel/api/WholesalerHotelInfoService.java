package com.marriott.rfp.business.wholesaler.hotel.api;




import com.marriott.rfp.object.wholesaler.hotel.HotelInfo;


public interface WholesalerHotelInfoService {
	
	public HotelInfo findHotelInfo(String marshacode,long period);
	
}