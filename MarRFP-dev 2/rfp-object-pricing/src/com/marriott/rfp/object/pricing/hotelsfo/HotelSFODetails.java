package com.marriott.rfp.object.pricing.hotelsfo;

import java.io.Serializable;

public class HotelSFODetails implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private Long hotelid;
    private String sfo_participate;
    private Long salesareaid;
    private Long marketid;
    private String marshacode;
    private String name;
    private String franchflag;
    private String franchby;
    private String salesareaorg;
    private String marketarea;

    public Long getHotelid() {
	return hotelid;
    }

    public void setHotelid(Long hotelid) {
	this.hotelid = hotelid;
    }

    public String getSfo_participate() {
	return sfo_participate;
    }

    public void setSfo_participate(String sfo_participate) {
	this.sfo_participate = sfo_participate;
    }

    public Long getSalesareaid() {
	return salesareaid;
    }

    public void setSalesareaid(Long salesareaid) {
	this.salesareaid = salesareaid;
    }

    public Long getMarketid() {
	return marketid;
    }

    public void setMarketid(Long marketid) {
	if (marketid == null)
	    this.marketid = 0L;
	else
	    this.marketid = marketid;
    }

    public String getMarshacode() {
	return marshacode;
    }

    public void setMarshacode(String marshacode) {
	this.marshacode = marshacode;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getFranchby() {
	return franchby;
    }

    public void setFranchby(String franchby) {
	this.franchby = franchby;
    }

    public String getSalesareaorg() {
	return salesareaorg;
    }

    public void setSalesareaorg(String salesareaorg) {
	this.salesareaorg = salesareaorg;
    }

    public String getMarketarea() {
	return marketarea;
    }

    public void setMarketarea(String marketarea) {
	this.marketarea = marketarea;
    }

    public static long getSerialversionuid() {
	return serialVersionUID;
    }

    public void setFranchflag(String franchflag) {
	this.franchflag = franchflag;
    }

    public String getFranchflag() {
	return franchflag;
    }

}
