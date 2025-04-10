package com.marriott.rfp.object.country;

import java.io.Serializable;

public class Country implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String country;
	private String countryname;

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCountry() {
		return country;
	}

	public void setCountryname(String countryname) {
		this.countryname = countryname;
	}

	public String getCountryname() {
		return countryname;
	}

}
