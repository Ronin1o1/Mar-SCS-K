package com.marriott.rfp.business.lists.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.lists.api.ListsService;
import com.marriott.rfp.dataaccess.country.api.CountryManager;
import com.marriott.rfp.dataaccess.hotel.api.HotelManager;
import com.marriott.rfp.dataaccess.region.api.RegionManager;
import com.marriott.rfp.dataaccess.state.api.StateManager;
import com.marriott.rfp.object.country.Country;
import com.marriott.rfp.object.region.RegionRef;
import com.marriott.rfp.object.region.ReportingRegion;
import com.marriott.rfp.object.state.State;

/**
 * Session Bean implementation class ListsServiceImpl
 */
@Service
@Transactional("transactionManagerRfpCommon")
public class ListsServiceImpl implements ListsService {

    @Autowired
    CountryManager countryMgr = null;
    @Autowired
    StateManager stateMgr = null;
    
    @Autowired
    RegionManager regionMgr = null;

    @Autowired
    HotelManager hotelMgr = null;

    
    /**
     * Default constructor. 
     */
    public ListsServiceImpl() {
     
    }
    
    public  List<Country> getCountries() {
	return countryMgr.getCountries();
    }

    public List<State> getStates(String country) {
	return stateMgr.getStates(country);
    }

    public List<String> getCities(String country, String state) {
	return hotelMgr.getCities(country, state);
    }
    
    public List<ReportingRegion> getReportingRegions() {
	return regionMgr.getReportingRegions();
    }

    public List<ReportingRegion> getAllReportingRegions() {
	return regionMgr.getAllReportingRegions();
    }
    
    public List<RegionRef> getOperatingRegions() {
    	return regionMgr.getOperatingRegions();
    }

}
