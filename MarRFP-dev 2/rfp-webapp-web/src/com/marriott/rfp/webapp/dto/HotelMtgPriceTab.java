package com.marriott.rfp.webapp.dto;

import com.marriott.rfp.object.pricing.hotelrfp.HotelRFPGroupsAndMeetings;

public class HotelMtgPriceTab {
    HotelRFPGroupsAndMeetings hotelRFPSIHMtgPricing;
    HotelRFPGroupsAndMeetings hotelRFPMtgPricing;

    public HotelRFPGroupsAndMeetings getHotelRFPSIHMtgPricing() {
        return hotelRFPSIHMtgPricing;
    }

    public void setHotelRFPSIHMtgPricing(HotelRFPGroupsAndMeetings hotelRFPSIHMtgPricing) {
        this.hotelRFPSIHMtgPricing = hotelRFPSIHMtgPricing;
    }

    public HotelRFPGroupsAndMeetings getHotelRFPMtgPricing() {
        return hotelRFPMtgPricing;
    }

    public void setHotelRFPMtgPricing(HotelRFPGroupsAndMeetings hotelRFPMtgPricing) {
        this.hotelRFPMtgPricing = hotelRFPMtgPricing;
    }
}
