package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class RemovalReason implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long removalreasonid;
	private String removalreason;

	public void setRemovalreasonid(Long removalreasonid) {
		this.removalreasonid = removalreasonid;
	}

	public Long getRemovalreasonid() {
		return removalreasonid;
	}

	public void setRemovalreason(String removalreason) {
		this.removalreason = removalreason;
	}

	public String getRemovalreason() {
		return removalreason;
	}

}
