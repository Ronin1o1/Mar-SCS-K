package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;
import java.util.List;

import com.marriott.rfp.object.country.Country;
import com.marriott.rfp.object.region.ReportingRegion;
import com.marriott.rfp.object.state.State;

public class RegionFilterList implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<Country> countryList;
	private List<State> stateList;
	private List<String> cityList;
	private List<ReportingRegion> reportingRegionList;

	public List<Country> getCountryList() {
		return countryList;
	}

	public void setCountryList(List<Country> countryList) {
		this.countryList = countryList;
	}

	public List<State> getStateList() {
		return stateList;
	}

	public void setStateList(List<State> stateList) {
		this.stateList = stateList;
	}

	public List<String> getCityList() {
		return cityList;
	}

	public void setCityList(List<String> cityList) {
		this.cityList = cityList;
	}

	public List<ReportingRegion> getReportingRegionList() {
		return reportingRegionList;
	}

	public void setReportingRegionList(List<ReportingRegion> reportingRegionList) {
		this.reportingRegionList = reportingRegionList;
	}

}
