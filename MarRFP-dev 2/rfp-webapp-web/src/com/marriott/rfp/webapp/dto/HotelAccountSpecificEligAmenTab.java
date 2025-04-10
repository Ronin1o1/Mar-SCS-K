package com.marriott.rfp.webapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificAmenityData;

public class HotelAccountSpecificEligAmenTab {
    HotelAccountSpecificAmenityData hotelAccountSpecificamenity;
    String isTopAccount;
    String isHotelExempted;

    public HotelAccountSpecificAmenityData getHotelAccountSpecificamenity() {
        return hotelAccountSpecificamenity;
    }

    @JsonProperty("AccountSpecificamenity")
    public void setHotelAccountSpecificamenity(HotelAccountSpecificAmenityData hotelAccountSpecificamenity) {
        this.hotelAccountSpecificamenity = hotelAccountSpecificamenity;
    }

    public String getIsTopAccount() {
        return isTopAccount;
    }

    @JsonProperty("isTopAcc")
    public void setIsTopAccount(String isTopAccount) {
        this.isTopAccount = isTopAccount;
    }

    public String getIsHotelExempted() {
        return isHotelExempted;
    }

    @JsonProperty("isHotelExempted")
    public void setIsHotelExempted(String isHotelExempted) {
        this.isHotelExempted = isHotelExempted;
    }
}
