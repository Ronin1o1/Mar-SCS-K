package com.marriott.rfp.business.pricing.hotelrfp.api;




public interface HotelRFPService {
    public Long getHotelRFPID(String marshacode, long period, String loginName);

    public String getCurrencyUsedInQuote(long hotelrfpid);
}
