package com.marriott.rfp.dataacess.pricing.hotel.api;

import java.util.List;



import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.hotel.HotelGPPPGOOSListData;
import com.marriott.rfp.object.user.User;


public interface HotelGPPPGOOSMaintenanceManager {

    public List<HotelGPPPGOOSListData> findHotelPgoosMaintList(PricingFilterSelections filterValues, User user);

    public void updateHotelRFP(Long accountrecid, User user);

    public void updateHotelGPPPgoosMaintanence(long accountrecid, List<HotelGPPPGOOSListData> hotelpgoosmaint, User user);

}
