package com.marriott.rfp.object.region;

import java.io.Serializable;

public class RegionRef implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long regionid;
	private String regionname;
	private String regionstatus;
	
	public Long getRegionid() {
		return regionid;
	}
	public void setRegionid(Long regionid) {
		this.regionid = regionid;
	}
	public String getRegionname() {
		return regionname;
	}
	public void setRegionname(String regionname) {
		this.regionname = regionname;
	}
	public String getRegionstatus() {
		return regionstatus;
	}
	public void setRegionstatus(String regionstatus) {
		this.regionstatus = regionstatus;
	}

}
