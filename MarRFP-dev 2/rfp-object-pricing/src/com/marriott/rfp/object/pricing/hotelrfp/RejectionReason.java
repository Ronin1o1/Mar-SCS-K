package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class RejectionReason implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long rejectreasonid;
	private String rejectionreason;

	public void setRejectreasonid(Long rejectreasonid) {
		this.rejectreasonid = rejectreasonid;
	}

	public Long getRejectreasonid() {
		return rejectreasonid;
	}

	public void setRejectionreason(String rejectionreason) {
		this.rejectionreason = rejectionreason;
	}

	public String getRejectionreason() {
		return rejectionreason;
	}

}
