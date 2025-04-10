package com.marriott.rfp.object.location;

import java.io.Serializable;

public class SalesLocation implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long locationid;
	private String location;

	/**
	 * @return the locationid
	 */
	public long getLocationid() {
	    return locationid;
	}
	/**
	 * @param locationid the locationid to set
	 */
	public void setLocationid(long locationid) {
	    this.locationid = locationid;
	}
	/**
	 * @return the location
	 */
	public String getLocation() {
	    return location;
	}
	/**
	 * @param location the location to set
	 */
	public void setLocation(String location) {
	    this.location = location;
	}

}
