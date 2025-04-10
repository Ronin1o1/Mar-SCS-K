package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelAccountname implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long hotel_accountinfoid;
	private String accountname;
	private String isLocked;

	public void setHotel_accountinfoid(Long hotel_accountinfoid) {
		this.hotel_accountinfoid = hotel_accountinfoid;
	}

	public Long getHotel_accountinfoid() {
		return hotel_accountinfoid;
	}

	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public String getAccountname() {
		return accountname;
	}

	public void setIsLocked(String isLocked) {
		this.isLocked = isLocked;
	}

	public String getIsLocked() {
		return isLocked;
	}

}
