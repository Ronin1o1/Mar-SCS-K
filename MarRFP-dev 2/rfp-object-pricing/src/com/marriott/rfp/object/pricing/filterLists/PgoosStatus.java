package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;

public class PgoosStatus implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String statusError;
	private String statusInProgress;
	private String statusPublished;

	public String getStatusError() {
		return statusError;
	}

	public void setStatusError(String statusError) {
		this.statusError = statusError;
	}

	public String getStatusInProgress() {
		return statusInProgress;
	}

	public void setStatusInProgress(String statusInProgress) {
		this.statusInProgress = statusInProgress;
	}

	public String getStatusPublished() {
		return statusPublished;
	}

	public void setStatusPublished(String statusPublished) {
		this.statusPublished = statusPublished;
	}

}
