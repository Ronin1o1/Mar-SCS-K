package com.marriott.rfp.webapp.dto;

import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.period.Period;

import java.util.List;

public class HotelSelect {
    String contactEmail;
    List<HotelListData> hotelList;
    List<Period> periodList;

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public List<HotelListData> getHotelList() {
        return hotelList;
    }

    public void setHotelList(List<HotelListData> hotelList) {
        this.hotelList = hotelList;
    }

    public List<Period> getPeriodList() {
        return periodList;
    }

    public void setPeriodList(List<Period> periodList) {
        this.periodList = periodList;
    }
}
