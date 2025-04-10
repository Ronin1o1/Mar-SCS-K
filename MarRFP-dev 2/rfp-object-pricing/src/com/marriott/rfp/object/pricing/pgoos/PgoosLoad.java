package com.marriott.rfp.object.pricing.pgoos;

import java.io.Serializable;

public class PgoosLoad implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private Long batchid;
	private String status;
	private String eid;
	private String username;
	public Long getBatchid() {
		return batchid;
	}
	public void setBatchid(Long batchid) {
		this.batchid = batchid;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getEid() {
		return eid;
	}
	public void setEid(String eid) {
		this.eid = eid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	

}
