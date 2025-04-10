package com.marriott.rfp.object.pricing.pgoos;

import java.io.Serializable;

public class PgoosMaintSelected implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private long hotelid;
	private String marshacode;
	private String name;
	private String accountname;
	private long accountdirid;
	private String rpgms;
	private long arownum;
	
	public long getHotelid() {
		return hotelid;
	}
	public void setHotelid(long hotelid) {
		this.hotelid = hotelid;
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
	public String getAccountname() {
		return accountname;
	}
	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}
	public long getAccountdirid() {
		return accountdirid;
	}
	public void setAccountdirid(long accountdirid) {
		this.accountdirid = accountdirid;
	}
	public long getArownum() {
		return arownum;
	}
	public void setArownum(long arownum) {
		this.arownum = arownum;
	}
	public void setRpgms(String rpgms) {
		this.rpgms = rpgms;
	}
	public String getRpgms() {
		return rpgms;
	}
	
	
	
}
