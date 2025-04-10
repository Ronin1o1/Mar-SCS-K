package com.marriott.rfp.object.user;

public class InternalNotes {
	private String user_internalnotes;

	private String group;
	private long cn_userid;
	private String eid;
	private String chg;
	

	
	
	public String getUser_internalnotes() {
		return user_internalnotes;
	}
	public void setUser_internalnotes(String user_internalnotes) {
		this.user_internalnotes = user_internalnotes;
	}
	public long getCn_userid() {
		return cn_userid;
	}
	public void setCn_userid(long cn_userid) {
		this.cn_userid = cn_userid;
	}
	public String getEid() {
		return eid;
	}
	public void setEid(String eid) {
		this.eid = eid;
	}
	public String getChg() {
		return chg;
	}
	public void setChg(String chg) {
		this.chg = chg;
	}
	public String getGroup() {
		return group;
	}
	public void setGroup(String group) {
		this.group = group;
	}
	
}
