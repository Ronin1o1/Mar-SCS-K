package com.marriott.rfp.object.region;

import java.io.Serializable;

public class ReportingRegion implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long areaid;
	private String areaname;

	public void setAreaid(Long areaid) {
		this.areaid = areaid;
	}

	public Long getAreaid() {
		return areaid;
	}

	public void setAreaname(String areaname) {
		this.areaname = areaname;
	}

	public String getAreaname() {
		return areaname;
	}

}
