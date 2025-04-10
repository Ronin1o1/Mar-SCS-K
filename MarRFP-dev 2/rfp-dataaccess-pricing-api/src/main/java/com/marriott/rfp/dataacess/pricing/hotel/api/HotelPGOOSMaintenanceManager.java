package com.marriott.rfp.dataacess.pricing.hotel.api;

import java.util.List;



import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.hotel.HotelPGOOSListData;
import com.marriott.rfp.object.user.User;


public interface HotelPGOOSMaintenanceManager {

    public List<HotelPGOOSListData> findHotelPgoosMaintList(PricingFilterSelections filterValues, User user);


    public void updateHotelPgoosMaintanence(long period, List<HotelPGOOSListData> hotelpgoosmaint, User user);

}
