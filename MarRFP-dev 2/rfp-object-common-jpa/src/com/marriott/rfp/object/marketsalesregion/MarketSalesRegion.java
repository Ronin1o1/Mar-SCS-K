package com.marriott.rfp.object.marketsalesregion;

import java.io.Serializable;

public class MarketSalesRegion implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long regionid;
	private String region;
	/**
	 * @return the regionid
	 */
	public long getRegionid() {
		return regionid;
	}
	/**
	 * @param regionid the regionid to set
	 */
	public void setRegionid(long regionid) {
		this.regionid = regionid;
	}
	/**
	 * @return the region
	 */
	public String getRegion() {
		return region;
	}
	/**
	 * @param region the region to set
	 */
	public void setRegion(String region) {
		this.region = region;
	}

}
