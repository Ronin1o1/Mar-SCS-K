package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelRFPFinish implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String screenname;
	private String statusid;

	public String getScreenname() {
		return screenname;
	}

	public void setScreenname(String screenname) {
		this.screenname = screenname;
	}

	public String getStatusid() {
		return statusid;
	}

	public void setStatusid(String statusid) {
		this.statusid = statusid;
	}

}
