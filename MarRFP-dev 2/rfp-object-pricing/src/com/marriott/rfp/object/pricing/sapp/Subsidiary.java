package com.marriott.rfp.object.pricing.sapp;

public class Subsidiary {

	private Long recid;
	private Long accountinfoid;
	private String divname;

	public Long getRecid() {
		return recid;
	}
	public void setRecid(Long recid) {
		this.recid = recid;
	}
	public String getDivname() {
		return divname;
	}
	public void setDivname(String divname) {
		this.divname = divname;
	}
	public Long getAccountinfoid() {
		return accountinfoid;
	}
	public void setAccountinfoid(Long accountinfoid) {
		this.accountinfoid = accountinfoid;
	}

}