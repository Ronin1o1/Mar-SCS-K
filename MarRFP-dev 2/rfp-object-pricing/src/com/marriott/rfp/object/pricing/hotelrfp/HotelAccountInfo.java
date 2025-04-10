package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelAccountInfo implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private long hotelid;
    private long accountrecid;
    private Long hotelrfpid;

    public void setHotelid(long hotelid) {
	this.hotelid = hotelid;
    }

    public long getHotelid() {
	return hotelid;
    }

    public void setAccountrecid(long accountrecid) {
	this.accountrecid = accountrecid;
    }

    public long getAccountrecid() {
	return accountrecid;
    }

	public void setHotelrfpid(Long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}

	public Long getHotelrfpid() {
		return hotelrfpid;
	}
}
