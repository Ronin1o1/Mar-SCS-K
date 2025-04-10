package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;

public class SCPTAddAccount implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String accountname;
	private Long hotelid;
	private Long period;
	private Long accountid;
	private Double prevfcrn;
	private Double fcrn;
	private Double prevfcadr;
	private Double fcadr;
	private String accountsegment;
	

	public String getAccountname() {
		return accountname;
	}

	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public void setAccountid(Long accountid) {
		this.accountid = accountid;
	}

	public Long getAccountid() {
		return accountid;
	}

	public void setPeriod(Long period) {
		this.period = period;
	}

	public Long getPeriod() {
		return period;
	}
	

	public Long getHotelid() {
		return hotelid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}


	public Double getPrevfcrn() {
		return prevfcrn;
	}

	public void setPrevfcrn(Double prevfcrn) {
		this.prevfcrn = prevfcrn;
	}

	public Double getFcrn() {
		return fcrn;
	}

	public void setFcrn(Double fcrn) {
		this.fcrn = fcrn;
	}

	public Double getPrevfcadr() {
		return prevfcadr;
	}

	public void setPrevfcadr(Double prevfcadr) {
		this.prevfcadr = prevfcadr;
	}

	public Double getFcadr() {
		return fcadr;
	}

	public void setFcadr(Double fcadr) {
		this.fcadr = fcadr;
	}

	public String getAccountsegment() {
		return accountsegment;
	}

	public void setAccountsegment(String accountsegment) {
		this.accountsegment = accountsegment;
	}


}
