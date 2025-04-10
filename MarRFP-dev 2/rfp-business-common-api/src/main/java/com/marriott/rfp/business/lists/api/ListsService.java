package com.marriott.rfp.business.lists.api;

import java.util.List;

import com.marriott.rfp.object.country.Country;
import com.marriott.rfp.object.region.RegionRef;
import com.marriott.rfp.object.region.ReportingRegion;
import com.marriott.rfp.object.state.State;


public interface ListsService {

	List<Country> getCountries();

	List<State> getStates(String country);

	List<String> getCities(String country, String state);

	List<ReportingRegion> getReportingRegions();

	public List<ReportingRegion> getAllReportingRegions();

	public List<RegionRef> getOperatingRegions();
}
