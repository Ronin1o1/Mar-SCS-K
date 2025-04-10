package com.marriott.rfp.object.pricing.account;

import java.io.Serializable;
import java.util.List;

import com.marriott.rfp.object.country.Country;

public class MCADDropDownLists implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<Country> countries;

	public void setCountries(List<Country> countries) {
		this.countries = countries;
	}

	public List<Country> getCountries() {
		return countries;
	}

}
