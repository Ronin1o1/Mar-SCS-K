package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class Allowable_aer_percents implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long allowable_percents;

	public void setAllowable_percents(Long allowable_percents) {
		this.allowable_percents = allowable_percents;
	}

	public Long getAllowable_percents() {
		return allowable_percents;
	}
}
