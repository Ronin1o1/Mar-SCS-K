package com.marriott.rfp.webapp.dto;

import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.account.AccountCenterInfo;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecific;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificData;

public class MultiHotelAccountSpecificRatesDto {
    HotelDetailData hotelDetailData;
    String currencyused;
    String  screenStatus;
    HotelAccountSpecificData hotelAccountSpecificData;
    AccountCenterInfo accountCenterInfo;
    HotelAccountSpecific hotelAccountSpecific;

    public HotelDetailData getHotelDetailData() {
        return hotelDetailData;
    }

    public void setHotelDetailData(HotelDetailData hotelDetailData) {
        this.hotelDetailData = hotelDetailData;
    }

    public String getCurrencyused() {
        return currencyused;
    }

    public void setCurrencyused(String currencyused) {
        this.currencyused = currencyused;
    }

    public String getScreenStatus() {
        return screenStatus;
    }

    public void setScreenStatus(String screenStatus) {
        this.screenStatus = screenStatus;
    }

    public HotelAccountSpecificData getHotelAccountSpecificData() {
        return hotelAccountSpecificData;
    }

    public void setHotelAccountSpecificData(HotelAccountSpecificData hotelAccountSpecificData) {
        this.hotelAccountSpecificData = hotelAccountSpecificData;
    }

    public AccountCenterInfo getAccountCenterInfo() {
        return accountCenterInfo;
    }

    public void setAccountCenterInfo(AccountCenterInfo accountCenterInfo) {
        this.accountCenterInfo = accountCenterInfo;
    }

    public HotelAccountSpecific getHotelAccountSpecific() {
        return hotelAccountSpecific;
    }

    public void setHotelAccountSpecific(HotelAccountSpecific hotelAccountSpecific) {
        this.hotelAccountSpecific = hotelAccountSpecific;
    }
}
