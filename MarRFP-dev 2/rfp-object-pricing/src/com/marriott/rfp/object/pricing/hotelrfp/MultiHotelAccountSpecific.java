package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class MultiHotelAccountSpecific implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private Long hotel_accountinfoid;
    private HotelAccountSpecific hotelAccountSpecific;

    public void setHotel_accountinfoid(Long hotel_accountinfoid) {
	this.hotel_accountinfoid = hotel_accountinfoid;
    }

    public Long getHotel_accountinfoid() {
	return hotel_accountinfoid;
    }

    public void setHotelAccountSpecific(HotelAccountSpecific hotelAccountSpecific) {
	this.hotelAccountSpecific = hotelAccountSpecific;
    }

    public HotelAccountSpecific getHotelAccountSpecific() {
	return hotelAccountSpecific;
    }

}
