package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;

public class SCPTStatusReason implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long scpt_accountreasonid;
	private String scpt_accountreason;

	public Long getScpt_accountreasonid() {
		return scpt_accountreasonid;
	}

	public void setScpt_accountreasonid(Long scpt_accountreasonid) {
		this.scpt_accountreasonid = scpt_accountreasonid;
	}

	public String getScpt_accountreason() {
		return scpt_accountreason;
	}

	public void setScpt_accountreason(String scpt_accountreason) {
		this.scpt_accountreason = scpt_accountreason;
	}

}
