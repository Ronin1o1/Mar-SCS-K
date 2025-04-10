package com.marriott.rfp.object.pricing.accountmarketregion;

import java.io.Serializable;

public class AccountMarketRegion implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long regionid;
	private String region;


	public void setRegionid(long regionid) {
		this.regionid = regionid;
	}

	public long getRegionid() {
		return regionid;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getRegion() {
		return region;
	}


}
