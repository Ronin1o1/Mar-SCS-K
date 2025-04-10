package com.marriott.rfp.dataacess.pricing.portfolio.api;

import java.util.List;



import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.user.User;


public interface PropertyListManager {
    
    public List<HotelListData> findHotelFilteredList(PricingFilterSelections filterValues, User user);
    
}
