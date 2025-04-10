package com.marriott.rfp.object.pricing.sapp;

public class Competitor {

	private Long accountinfoid;
	private String suppliername;
	private Long seqid;
	private Long share_percent;

	public Long getAccountinfoid() {
		return accountinfoid;
	}
	public void setAccountinfoid(Long accountinfoid) {
		this.accountinfoid = accountinfoid;
	}
	public String getSuppliername() {
		return suppliername;
	}
	public void setSuppliername(String suppliername) {
		this.suppliername = suppliername;
	}
	public Long getSeqid() {
		return seqid;
	}
	public void setSeqid(Long seqid) {
		this.seqid = seqid;
	}
	public Long getShare_percent() {
		return share_percent;
	}
	public void setShare_percent(Long share_percent) {
		this.share_percent = share_percent;
	}
	
}