package com.marriott.rfp.object.pricing.edie;

import java.io.Serializable;

public class EdieProfileColumn implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long profile_id;
	private long column_id;
	private long column_order;
	
	public long getColumn_id() {
		return column_id;
	}
	public void setColumn_id(long column_id) {
		this.column_id = column_id;
	}
	public void setProfile_id(long profile_id) {
		this.profile_id = profile_id;
	}
	public long getProfile_id() {
		return profile_id;
	}
	public void setColumn_order(long column_order) {
		this.column_order = column_order;
	}
	public long getColumn_order() {
		return column_order;
	}

}
