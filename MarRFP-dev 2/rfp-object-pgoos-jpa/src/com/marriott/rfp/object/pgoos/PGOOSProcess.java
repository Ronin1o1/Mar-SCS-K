package com.marriott.rfp.object.pgoos;

import java.io.Serializable;

public class PGOOSProcess implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long processid;
	private String marshaCode;
	private String eid;

	public void setProcessid(Long processid) {
		this.processid = processid;
	}

	public Long getProcessid() {
		return processid;
	}

	public void setMarshaCode(String marshaCode) {
		this.marshaCode = marshaCode;
	}

	public String getMarshaCode() {
		return marshaCode;
	}

	public void setEid(String eid) {
		this.eid = eid;
	}

	public String getEid() {
		return eid;
	}
}
