package com.marriott.rfp.object.pricing.edie;

import java.io.Serializable;

public class UpdateColumn implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long value;

	public void setValue(Long value) {
		this.value = value;
	}

	public Long getValue() {
		return value;
	}

}
