package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;

public class RegionFilterValue implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String country;
	private String state;
	private String city;
	private long regionid;
	private String areaOrRegion="C";

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public long getRegionid() {
		return regionid;
	}

	public void setRegionid(long regionid) {
		this.regionid = regionid;
	}

	public String getAreaOrRegion() {
		return areaOrRegion;
	}

	public void setAreaOrRegion(String areaOrRegion) {
		this.areaOrRegion = areaOrRegion;
	}

}
