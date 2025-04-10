package com.marriott.rfp.object.pgoos;

public class TransactionCriteria {

	private Long batchId;

	private TransactionType type;

	private String urlForBTService;

	private MarshaCommandType marshaCmd;
	private String byPeriod = "Y";

	public Long getBatchId() {
		return batchId;
	}

	public void setBatchId(Long batchId) {
		this.batchId = batchId;
	}

	public TransactionType getType() {
		return type;
	}

	public void setType(TransactionType type) {
		this.type = type;
	}

	public String getUrlForBTService() {
		return urlForBTService;
	}

	public void setUrlForBTService(String urlStr) {
		this.urlForBTService = urlStr;
	}

	public MarshaCommandType getMarshaCmd() {
		return marshaCmd;
	}

	public void setMarshaCmd(MarshaCommandType marshaCmd) {
		this.marshaCmd = marshaCmd;
	}

	public String getByPeriod() {
		return byPeriod;
	}

	public void setByPeriod(String byPeriod) {
		this.byPeriod = byPeriod;
	}

}
