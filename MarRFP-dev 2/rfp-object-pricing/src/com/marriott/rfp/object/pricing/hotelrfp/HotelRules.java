package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;

public class HotelRules implements Serializable {
	private static final long serialVersionUID = 1L;
	private String rulename;
	private String rulevalue;
	private String hardcoded;
	private String ruleid;

	public String getRulename() {
		return rulename;
	}

	public void setRulename(String rulename) {
		this.rulename = rulename;
	}

	public String getRulevalue() {
		return rulevalue;
	}

	public void setRulevalue(String rulevalue) {
		this.rulevalue = rulevalue;
	}

	public String getHardcoded() {
		return hardcoded;
	}

	public void setHardcoded(String hardcoded) {
		this.hardcoded = hardcoded;
	}

	public String getRuleid() {
		return ruleid;
	}

	public void setRuleid(String ruleid) {
		this.ruleid = ruleid;
	}

	public String getLongrulevalue() {
		if (rulevalue ==null || rulevalue.equals(""))
			return "";
		else if (rulevalue.equals("Y"))
			return "Yes";
		else if (rulevalue.equals("N"))
			return "No";
		else
			return rulevalue;
	}
}
