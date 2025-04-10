package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;

public class SCPTInternet implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long scpt_internettypeid;
	private String internetname;

	public String getInternetname() {
		return internetname;
	}

	public void setInternetname(String internetname) {
		this.internetname = internetname;
	}

	public Long getScpt_internettypeid() {
		return scpt_internettypeid;
	}

	public void setScpt_internettypeid(Long scpt_internettypeid) {
		this.scpt_internettypeid = scpt_internettypeid;
	}

}
