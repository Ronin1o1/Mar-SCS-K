package com.marriott.rfp.webapp.dto;

import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificBusinessCase;
import com.marriott.rfp.object.pricing.hotelrfp.TypeofPropertyDropDown;

import java.util.List;

public class HotelAccountSpecificCompelTab {
    HotelAccountSpecificBusinessCase hotelAccountSpecificBusinessCase;
    List<TypeofPropertyDropDown> typeofPropertyDropDowns;

    public HotelAccountSpecificBusinessCase getHotelAccountSpecificBusinessCase() {
        return hotelAccountSpecificBusinessCase;
    }

    public void setHotelAccountSpecificBusinessCase(HotelAccountSpecificBusinessCase hotelAccountSpecificBusinessCase) {
        this.hotelAccountSpecificBusinessCase = hotelAccountSpecificBusinessCase;
    }

    public List<TypeofPropertyDropDown> getTypeofPropertyDropDowns() {
        return typeofPropertyDropDowns;
    }

    public void setTypeofPropertyDropDowns(List<TypeofPropertyDropDown> typeofPropertyDropDowns) {
        this.typeofPropertyDropDowns = typeofPropertyDropDowns;
    }
}
