package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

import com.marriott.rfp.utility.NumberUtility;

public class HotelRates implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private Long seasonid;
    private Long lengthofstayid;
    private String productid;
    private Long roomtypeid;
    private Long roompool;
    private Double rate;

    public Long getSeasonid() {
	return seasonid;
    }

    public void setSeasonid(Long seasonid) {
	this.seasonid = seasonid;
    }

    public Long getLengthofstayid() {
	return lengthofstayid;
    }

    public void setLengthofstayid(Long lengthofstayid) {
	this.lengthofstayid = lengthofstayid;
    }

    public String getProductid() {
	return productid;
    }

    public void setProductid(String productid) {
	this.productid = productid;
    }

    public Long getRoomtypeid() {
	return roomtypeid;
    }

    public void setRoomtypeid(Long roomtypeid) {
	this.roomtypeid = roomtypeid;
    }

    public Double getRate() {
	return rate;
    }

    public void setRate(Double rate) {
	this.rate = rate;
    }

    public void setStrRate(String strrate) {
	if (strrate == null  || strrate.equals(""))
	    this.rate = null;
	else
	    this.rate = Double.valueOf(strrate);
    }

    public String getFormattedRate() {
	return NumberUtility.formatRateNumber(rate);
    }

	public void setRoompool(Long roompool) {
		this.roompool = roompool;
	}

	public Long getRoompool() {
		return roompool;
	}

}
