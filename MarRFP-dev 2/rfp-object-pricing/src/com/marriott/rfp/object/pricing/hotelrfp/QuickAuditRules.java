package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class QuickAuditRules implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String rulename;
	private String rulevalue;
	private String valuediff;
	private Long roompool;




	public String getValuediff() {
		return valuediff;
	}

	public void setValuediff(String valuediff) {
		this.valuediff = valuediff;
	}

	public void setRulename(String rulename) {
		this.rulename = rulename;
	}

	public String getRulename() {
		return rulename;
	}

	public void setRulevalue(String rulevalue) {
		this.rulevalue = rulevalue;
	}

	public String getRulevalue() {
		return rulevalue;
	}


	public void setRoompool(Long roompool) {
		if(roompool == null)
			roompool=(long) 0;
		this.roompool = roompool;
	}

	public Long getRoompool() {
		return roompool;
	}

	

	
}
