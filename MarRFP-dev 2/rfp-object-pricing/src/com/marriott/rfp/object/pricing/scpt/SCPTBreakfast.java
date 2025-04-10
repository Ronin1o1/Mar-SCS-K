package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;

public class SCPTBreakfast implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long scpt_breaktypeid;
	private String breakfastname;

	public Long getScpt_breaktypeid() {
		return scpt_breaktypeid;
	}

	public void setScpt_breaktypeid(Long scpt_breaktypeid) {
		this.scpt_breaktypeid = scpt_breaktypeid;
	}

	public String getBreakfastname() {
		return breakfastname;
	}

	public void setBreakfastname(String breakfastname) {
		this.breakfastname = breakfastname;
	}

}
