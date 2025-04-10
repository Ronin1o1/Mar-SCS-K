package com.marriott.rfp.dataaccess.wholesaler.hotel.api;


import com.marriott.rfp.object.wholesaler.hotel.HotelInfo;


public interface HotelInfoManager {

	public HotelInfo findHotelInfo(String marshacode,long period);
}