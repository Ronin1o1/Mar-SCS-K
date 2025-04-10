package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelAccountSpecificBlackoutData implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long accountrecid;
	private HotelBlackoutDates blackoutdates;
	private Long hotel_accountinfoid;
	private Long hotelid;
	private Long hotelrfpid;
	private long numblackouts;
	private boolean checkNumBlackouts;
	private String waiveblackouts;

	public long getNumblackouts() {
		return numblackouts;
	}

	public void setNumblackouts(long numblackouts) {
		this.numblackouts = numblackouts;
	}

	public boolean getCheckNumBlackouts() {
		return checkNumBlackouts;
	}

	public void setCheckNumBlackouts(boolean checkNumBlackouts) {
		this.checkNumBlackouts = checkNumBlackouts;
	}


	private Long maxblackouts;

	public Long getAccountrecid() {
		return accountrecid;
	}

	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}

	public HotelBlackoutDates getBlackoutdates() {
		return blackoutdates;
	}

	public void setBlackoutdates(HotelBlackoutDates blackoutdates) {
		this.blackoutdates = blackoutdates;
	}

	public Long getHotel_accountinfoid() {
		return hotel_accountinfoid;
	}

	public void setHotel_accountinfoid(Long hotel_accountinfoid) {
		this.hotel_accountinfoid = hotel_accountinfoid;
	}

	public Long getHotelid() {
		return hotelid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public Long getHotelrfpid() {
		return hotelrfpid;
	}

	public void setHotelrfpid(Long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}

	public Long getMaxblackouts() {
		return maxblackouts;
	}

	public void setMaxblackouts(Long maxblackouts) {
		this.maxblackouts = maxblackouts;
	}

	public void setWaiveblackouts(String waiveblackouts) {
		this.waiveblackouts = waiveblackouts;
	}

	public String getWaiveblackouts() {
		return waiveblackouts;
	}

}
