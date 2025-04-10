package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class MCADData implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long accountrecid;
	private Long businessid;
	private String businessname;
	private Long parentbusinessid;
	private Long ultimatebusinessid;
	private Long globalbusinessid;
	private String cityname;
	private String stateabbrev;
	private String state;
	private String countrycode;
	private String siccode1desc;
	private Long account_nat_key;
	private Long child_count;
	private String businesslevelcode;

	public Long getAccountrecid() {
		return accountrecid;
	}

	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}

	public Long getBusinessid() {
		return businessid;
	}

	public void setBusinessid(Long businessid) {
		this.businessid = businessid;
	}

	public String getBusinessname() {
		return businessname;
	}

	public void setBusinessname(String businessname) {
		this.businessname = businessname;
	}

	public Long getParentbusinessid() {
		return parentbusinessid;
	}

	public void setParentbusinessid(Long parentbusinessid) {
		this.parentbusinessid = parentbusinessid;
	}

	public Long getUltimatebusinessid() {
		return ultimatebusinessid;
	}

	public void setUltimatebusinessid(Long ultimatebusinessid) {
		this.ultimatebusinessid = ultimatebusinessid;
	}

	public Long getGlobalbusinessid() {
		return globalbusinessid;
	}

	public void setGlobalbusinessid(Long globalbusinessid) {
		this.globalbusinessid = globalbusinessid;
	}

	public String getCityname() {
		return cityname;
	}

	public void setCityname(String cityname) {
		this.cityname = cityname;
	}

	public String getCountrycode() {
		return countrycode;
	}

	public void setCountrycode(String countrycode) {
		this.countrycode = countrycode;
	}

	public String getSiccode1desc() {
		return siccode1desc;
	}

	public void setSiccode1desc(String siccode1desc) {
		this.siccode1desc = siccode1desc;
	}

	public void setAccount_nat_key(Long account_nat_key) {
		this.account_nat_key = account_nat_key;
	}

	public Long getAccount_nat_key() {
		return account_nat_key;
	}

	public void setChild_count(Long child_count) {
		this.child_count = child_count;
	}

	public Long getChild_count() {
		return child_count;
	}

	public void setBusinesslevelcode(String businesslevelcode) {
		this.businesslevelcode = businesslevelcode;
	}

	public String getBusinesslevelcode() {
		return businesslevelcode;
	}

	public String getBusinessleveldesc() {
		String level = "";
		if (businesslevelcode != null) {
			if (businesslevelcode.equals("G"))
				level = "Global";
			else if (businesslevelcode.equals("U"))
				level = "Ultimate";
			else if (businesslevelcode.equals("P"))
				level = "Parent";
		}
		return level;
	}

	public String getChildbusinessleveldesc() {
		String level = "Parent";
		if (businesslevelcode.equals("G"))
			level = "Ultimate";
		else if (businesslevelcode.equals("U"))
			level = "Parent";
		else if (businesslevelcode.equals("P"))
			level = "Site";
		return level;
	}

	public String getChildbusinesslevelcode() {
		String level = "P";
		if (businesslevelcode.equals("G"))
			level = "U";
		else if (businesslevelcode.equals("U"))
			level = "P";
		else if (businesslevelcode.equals("P"))
			level = "S";

		return level;
	}

	public String getLocation() {
		String location = "";
		if (cityname != null && !cityname.equals(""))
			location = cityname;
		if (stateabbrev != null && !stateabbrev.equals(""))
			location += " " + stateabbrev;
		if (countrycode != null && !countrycode.equals("")) {
			if (location.length() > 0)
				location += ",";
			location += " " + countrycode;
		}
		return location;
	}

	public void setStateabbrev(String stateabbrev) {
		this.stateabbrev = stateabbrev;
	}

	public String getStateabbrev() {
		return stateabbrev;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getState() {
		return state;
	}

}
