package com.marriott.rfp.object.pricing.portfolio;

import java.io.Serializable;

public class CBCSelect implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private Long hotelid;
    private String move;

    public void setHotelid(Long hotelid) {
	this.hotelid = hotelid;
    }

    public Long getHotelid() {
	return hotelid;
    }

    public void setMove(String move) {
	this.move = move;
    }

    public String getMove() {
	return move;
    }


}
