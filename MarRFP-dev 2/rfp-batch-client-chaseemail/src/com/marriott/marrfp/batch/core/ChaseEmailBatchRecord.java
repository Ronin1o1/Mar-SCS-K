package com.marriott.marrfp.batch.core;

public class ChaseEmailBatchRecord {

	private Long stageseq;
	private Long batchId;
	private String eid;
	private Long accountId;
	private Long accountRecId;
	private Long hotelId;
	private Long period;
	
	public Long getBatchId() {
		return batchId;
	}

	public void setBatchId(Long batchId) {
		this.batchId = batchId;
	}

	public String getEid() {
		return eid;
	}

	public void setEid(String eid) {
		this.eid = eid;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public Long getAccountRecId() {
		return accountRecId;
	}

	public void setAccountRecId(Long accountRecId) {
		this.accountRecId = accountRecId;
	}

	public Long getHotelId() {
		return hotelId;
	}

	public void setHotelId(Long hotelId) {
		this.hotelId = hotelId;
	}

	public void setStageseq(Long stageseq) {
		this.stageseq = stageseq;
	}

	public Long getStageseq() {
		return stageseq;
	}

	public void setPeriod(Long period) {
		this.period = period;
	}

	public Long getPeriod() {
		return period;
	}

}
