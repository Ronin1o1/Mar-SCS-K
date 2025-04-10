package com.marriott.rfp.object.pricing.pgoos;

import java.io.Serializable;

public class PgoosSelect implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private long hotelid;
	private long accountdirid;
	public long getHotelid() {
		return hotelid;
	}
	public void setHotelid(long hotelid) {
		this.hotelid = hotelid;
	}
	public long getAccountdirid() {
		return accountdirid;
	}
	public void setAccountdirid(long accountdirid) {
		this.accountdirid = accountdirid;
	}
	
	
	

}
