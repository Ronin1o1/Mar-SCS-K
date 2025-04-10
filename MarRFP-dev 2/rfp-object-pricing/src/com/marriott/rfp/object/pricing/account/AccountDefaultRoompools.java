package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class AccountDefaultRoompools implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long affiliationid;
	private Long defaultroompools;
	private String affiliationname;
	private Long currentroompool;
	private String servicetype;
	
	public void setAffiliationid(Long affiliationid) {
		this.affiliationid = affiliationid;
	}

	public Long getAffiliationid() {
		return affiliationid;
	}


	public void setAffiliationname(String affiliationname) {
		this.affiliationname = affiliationname;
	}

	public String getAffiliationname() {
		return affiliationname;
	}

	public Long getDefaultroompools() {
		return defaultroompools;
	}

	public void setDefaultroompools(Long defaultroompools) {
		this.defaultroompools = defaultroompools;
	}

	public Long getCurrentroompool() {
		return currentroompool;
	}

	public void setCurrentroompool(Long currentroompool) {
		this.currentroompool = currentroompool;
	}

	public String getServicetype() {
		return servicetype;
	}

	public void setServicetype(String servicetype) {
		this.servicetype = servicetype;
	}

}
