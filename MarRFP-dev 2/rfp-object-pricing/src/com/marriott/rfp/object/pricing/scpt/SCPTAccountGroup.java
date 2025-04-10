package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;

public class SCPTAccountGroup implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String groupid;
	private String group_desc;
	
	public String getGroupid() {
		return groupid;
	}
	public void setGroupid(String groupid) {
		this.groupid = groupid;
	}
	public String getGroup_desc() {
		return group_desc;
	}
	public void setGroup_desc(String group_desc) {
		this.group_desc = group_desc;
	}
	
	
}
