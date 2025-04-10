package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class FinalPrintReportData implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long hotelrfpid;
	private Long accountrecid;
	private Long period;
	private String selected;
	
	public void setPeriod(Long period) {
		this.period = period;
	}
	
	public Long getPeriod() {
		return period;
	}
	
	public void setSelected(String selected) {
		this.selected = selected;
	}
	
	public String getSelected() {
		return selected;
	}

	public void setHotelrfpid(Long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}

	public Long getHotelrfpid() {
		return hotelrfpid;
	}

	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}

	public Long getAccountrecid() {
		return accountrecid;
	}
	
}
