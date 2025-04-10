package com.marriott.rfp.dataacess.pricing.portfolio.api;

import java.util.List;

import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountCenter;
import com.marriott.rfp.object.user.User;


public interface AccountRatesManager {

    public List<HotelAccountCenter> findAccountRates(PricingFilterSelections filterValues, User user);

   
}
