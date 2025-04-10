package com.marriott.rfp.object.pricing.salesregion;

import java.io.Serializable;

public class SalesRegion implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int salesregionid;
	private String salesregion;
	
	public int getSalesregionid() {
		return salesregionid;
	}
	
	public void setSalesregionid(int salesregionid) {
		this.salesregionid = salesregionid;
	}
	
	public String getSalesregion() {
		return salesregion;
	}
	
	public void setSalesregion(String salesregion) {
		this.salesregion = salesregion;
	}

}
