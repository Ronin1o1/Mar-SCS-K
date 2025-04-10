package com.marriott.rfp.object.pricing.hotelsfo;

import java.io.Serializable;

public class SalesMarket implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long salesareaid;
	private String salesareaname;

	public void setSalesareaid(Long salesareaid) {
		this.salesareaid = salesareaid;
	}

	public Long getSalesareaid() {
		return salesareaid;
	}

	public void setSalesareaname(String salesareaname) {
		this.salesareaname = salesareaname;
	}

	public String getSalesareaname() {
		return salesareaname;
	}
}
