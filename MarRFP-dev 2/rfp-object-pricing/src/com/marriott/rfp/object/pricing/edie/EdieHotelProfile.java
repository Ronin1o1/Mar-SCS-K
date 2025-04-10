package com.marriott.rfp.object.pricing.edie;

import java.io.Serializable;

public class EdieHotelProfile implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long profile_id;
	private String profile_name;
	private String changed="N";

	public void setProfile_id(long profile_id) {
		this.profile_id = profile_id;
	}

	public long getProfile_id() {
		return profile_id;
	}

	public void setProfile_name(String profile_name) {
		this.profile_name = profile_name;
	}

	public String getProfile_name() {
		return profile_name;
	}

	public void setChanged(String changed) {
	    this.changed = changed;
	}

	public String getChanged() {
	    return changed;
	}

}
