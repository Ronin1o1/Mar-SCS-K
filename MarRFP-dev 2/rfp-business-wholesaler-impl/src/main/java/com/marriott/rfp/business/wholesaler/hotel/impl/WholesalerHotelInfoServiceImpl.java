package com.marriott.rfp.business.wholesaler.hotel.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.wholesaler.hotel.api.WholesalerHotelInfoService;
import com.marriott.rfp.dataaccess.wholesaler.hotel.api.HotelInfoManager;
import com.marriott.rfp.object.wholesaler.hotel.HotelInfo;


/**
 * Session Bean implementation class WholesalerHotelInfoServiceImpl
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class WholesalerHotelInfoServiceImpl implements WholesalerHotelInfoService {

   
    public WholesalerHotelInfoServiceImpl() { }
    @Autowired
	private HotelInfoManager hotelInfoMgr = null;
    
    public HotelInfo findHotelInfo(String marshacode,long period){
    	HotelInfo hotelInfoList = hotelInfoMgr.findHotelInfo(marshacode,period);
		return hotelInfoList;
    }
    
}