package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;

public class MCADSearch implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String searchtype="search_for_name";
	private String countrycode="US";
	private String businessname;
	private String businesslevel;
	private Long businessid;

	
	public MCADSearch() {
		super();
		
	}

	public String getSearchtype() {
		return searchtype;
	}

	public void setSearchtype(String searchtype) {
		this.searchtype = searchtype;
	}

	public String getCountrycode() {
		return countrycode;
	}

	public void setCountrycode(String countrycode) {
		this.countrycode = countrycode;
	}

	public String getBusinessname() {
		return businessname;
	}

	public void setBusinessname(String businessname) {
		this.businessname = businessname;
	}

	public String getBusinesslevel() {
		return businesslevel;
	}

	public void setBusinesslevel(String businesslevel) {
		this.businesslevel = businesslevel;
	}

	public Long getBusinessid() {
		return businessid;
	}

	public void setBusinessid(Long businessid) {
		this.businessid = businessid;
	}

}
