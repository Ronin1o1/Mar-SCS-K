package com.marriott.rfp.object.hotel;

import java.io.Serializable;

public class HotelPeriodData implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long hotelrfpid;
	private Long period;
	private String nopricing;

	public void setHotelrfpid(Long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}

	public Long getHotelrfpid() {
		return hotelrfpid;
	}

	public void setPeriod(Long period) {
		this.period = period;
	}

	public Long getPeriod() {
		return period;
	}

	public void setNopricing(String nopricing) {
		this.nopricing = nopricing;
	}

	public String getNopricing() {
		return nopricing;
	}

}
