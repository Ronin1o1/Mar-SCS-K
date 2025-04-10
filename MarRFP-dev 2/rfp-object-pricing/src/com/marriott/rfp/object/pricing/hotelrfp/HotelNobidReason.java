package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelNobidReason implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long nobidreasonid;
	private String nobidreason;

	public Long getNobidreasonid() {
		return nobidreasonid;
	}

	public void setNobidreasonid(Long nobidreasonid) {
		this.nobidreasonid = nobidreasonid;
	}

	public String getNobidreason() {
		return nobidreason;
	}

	public void setNobidreason(String nobidreason) {
		this.nobidreason = nobidreason;
	}

}
