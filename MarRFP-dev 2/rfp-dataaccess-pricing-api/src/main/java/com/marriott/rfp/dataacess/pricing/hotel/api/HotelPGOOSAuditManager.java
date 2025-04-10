package com.marriott.rfp.dataacess.pricing.hotel.api;

import java.util.List;



import com.marriott.rfp.object.pricing.hotel.HotelPGOOSAuditListData;


public interface HotelPGOOSAuditManager {

    public List<HotelPGOOSAuditListData> findPGOOSAuditTrailDetail(String marshaCode, Long period);

}
