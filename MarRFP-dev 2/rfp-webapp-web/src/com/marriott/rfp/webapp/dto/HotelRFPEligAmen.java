package com.marriott.rfp.webapp.dto;

import com.marriott.rfp.object.pricing.hotelrfp.EarlyDepartureCharge;
import com.marriott.rfp.object.pricing.hotelrfp.EarlyDepartureChargeOptions;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAmenities;
import com.marriott.rfp.object.pricing.hotelrfp.HotelEligibility;
import com.marriott.rfp.object.pricing.menu.PricingMenuData;

import java.util.List;

public class HotelRFPEligAmen {
    List<HotelEligibility> hotelEligibilityList;
    List<HotelAmenities> hotelAmenitiesList;
    String htlstdcxlpolicy;
    String earlycharge;
    List<EarlyDepartureChargeOptions> chargeOptions;
    EarlyDepartureCharge earlyDepartureCharge;
    PricingMenuData menu;

    public List<HotelEligibility> getHotelEligibilityList() {
        return hotelEligibilityList;
    }

    public void setHotelEligibilityList(List<HotelEligibility> hotelEligibilityList) {
        this.hotelEligibilityList = hotelEligibilityList;
    }

    public List<HotelAmenities> getHotelAmenitiesList() {
        return hotelAmenitiesList;
    }

    public void setHotelAmenitiesList(List<HotelAmenities> hotelAmenitiesList) {
        this.hotelAmenitiesList = hotelAmenitiesList;
    }

    public String getHtlstdcxlpolicy() {
        return htlstdcxlpolicy;
    }

    public void setHtlstdcxlpolicy(String htlstdcxlpolicy) {
        this.htlstdcxlpolicy = htlstdcxlpolicy;
    }

    public String getEarlycharge() {
        return earlycharge;
    }

    public void setEarlycharge(String earlycharge) {
        this.earlycharge = earlycharge;
    }

    public List<EarlyDepartureChargeOptions> getChargeOptions() {
        return chargeOptions;
    }

    public void setChargeOptions(List<EarlyDepartureChargeOptions> chargeOptions) {
        this.chargeOptions = chargeOptions;
    }

    public EarlyDepartureCharge getEarlyDepartureCharge() {
        return earlyDepartureCharge;
    }

    public void setEarlyDepartureCharge(EarlyDepartureCharge earlyDepartureCharge) {
        this.earlyDepartureCharge = earlyDepartureCharge;
    }

    public PricingMenuData getMenu() {
        return menu;
    }

    public void setMenu(PricingMenuData menu) {
        this.menu = menu;
    }
}
