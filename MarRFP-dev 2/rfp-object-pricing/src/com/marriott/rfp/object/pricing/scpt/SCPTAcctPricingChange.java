package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;

public class SCPTAcctPricingChange implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long hotelid;
	private Long scpt_accountid;
	private String donotprice="N";
	private String status;
	private String movetoprimary;
	private String moveoutofprimary="N";
	private String alt_segment;
	
	
	public Long getHotelid() {
		return hotelid;
	}
	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}
	public Long getScpt_accountid() {
		return scpt_accountid;
	}
	public void setScpt_accountid(Long scpt_accountid) {
		this.scpt_accountid = scpt_accountid;
	}
	public String getDonotprice() {
		return donotprice;
	}
	public void setDonotprice(String donotprice) {
		this.donotprice = donotprice;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAlt_segment() {
		return alt_segment;
	}
	public void setAlt_segment(String alt_segment) {
		this.alt_segment = alt_segment;
	}
	public String getMovetoprimary() {
		return movetoprimary;
	}
	public void setMovetoprimary(String movetoprimary) {
		this.movetoprimary = movetoprimary;
	}
	public String getMoveoutofprimary() {
		return moveoutofprimary;
	}
	public void setMoveoutofprimary(String moveoutofprimary) {
		this.moveoutofprimary = moveoutofprimary;
	}
		
	

}
