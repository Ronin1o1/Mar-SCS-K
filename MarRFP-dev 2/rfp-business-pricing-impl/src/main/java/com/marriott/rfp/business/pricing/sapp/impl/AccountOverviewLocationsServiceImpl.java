package com.marriott.rfp.business.pricing.sapp.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.dataacess.pricing.sapp.api.AccountOverviewLocationsManager;
import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.sapp.AcctInitiatives;
import com.marriott.rfp.object.pricing.sapp.AcctLocations;
import com.marriott.rfp.object.pricing.sapp.AcctTasks;
import com.marriott.rfp.object.pricing.sapp.LocationMarkets;
import com.marriott.rfp.object.pricing.sapp.LocationOffice;
import com.marriott.rfp.object.pricing.sapp.LocationSalesArea;
import com.marriott.rfp.object.user.DSUser;

/**
 * Session Bean implementation class SAPPCommonServiceImpl
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class AccountOverviewLocationsServiceImpl implements AccountOverviewLocationsService {

	/**
	 * Default constructor.
	 */
	public AccountOverviewLocationsServiceImpl() {
	}

	@Autowired
	private AccountOverviewLocationsManager acctOverviewLocationsMgr = null;
	
	public List<AcctLocations> findAcctOverviewLocations(long accountrecid, String usLocation) {
		return acctOverviewLocationsMgr.findAcctOverviewLocations(accountrecid, usLocation);
	}
	
	public List<AcctInitiatives> getAcctOverviewLocInitList(long accountrecid, long revstreamid, long buyinglocid) {
		return acctOverviewLocationsMgr.getAcctOverviewLocInitList(accountrecid, revstreamid, buyinglocid);
	}
	
	public List<LocationSalesArea> getAcctLocSalesAreaInfo(String usLocation) {
		return acctOverviewLocationsMgr.getAcctLocSalesAreaInfo(usLocation);
	}
	
	public List<LocationMarkets> getAcctLocMarkets() {
		return acctOverviewLocationsMgr.getAcctLocMarkets();
	}
	
	public List<DSUser> getAcctOverviewLocPlanUserList(long accountrecid) {
		return acctOverviewLocationsMgr.getAcctOverviewLocPlanUserList(accountrecid);
	}

	public List<HotelAffiliation> getAcctOverviewLocBrandSeg(long buyinglocid) {
		return acctOverviewLocationsMgr.getAcctOverviewLocBrandSeg(buyinglocid);
	}
	
	public long createAcctOverviewBuyingLocation(AcctLocations location, long accountrecid) {
		return acctOverviewLocationsMgr.createAcctOverviewBuyingLocation(location, accountrecid);
	}
	
	public AcctLocations getAcctOverviewLocationInfo(long buyinglocid) {
		return acctOverviewLocationsMgr.getAcctOverviewLocationInfo(buyinglocid);
	}
	
	public List<LocationOffice> findAcctOverviewLocationContacts(long buyingLocationId, long contacttypeid) {
		return acctOverviewLocationsMgr.findAcctOverviewLocationContacts(buyingLocationId, contacttypeid);
	}
	
	public List<LocationOffice> getAcctOverviewLocationContactTypes() {
		return acctOverviewLocationsMgr.getAcctOverviewLocationContactTypes();
	}
	
	public long updateAcctOverviewLocationLevel(AcctLocations model, Map<Long, LocationOffice> locContacts, String[] selBrandList, long accountrecid, String action, long buyinglocid) {
		return acctOverviewLocationsMgr.updateAcctOverviewLocationLevel(model, locContacts, selBrandList, accountrecid, action, buyinglocid);
	}
	
	public void updateAcctOverviewLocations(List<AcctLocations> locations, long accountrecid) {
		acctOverviewLocationsMgr.updateAcctOverviewLocations(locations, accountrecid);
	}

	public List<AcctTasks> getAcctOverviewLocTasksList(Long initiativeid) {
		return acctOverviewLocationsMgr.getAcctOverviewLocTasksList(initiativeid);
	}
	
	public void updateBLInitiativeTasks(AcctInitiatives initiative, long buyinglocid) {
		
		for (AcctTasks task : initiative.getAcctTasks()) {
			if (task != null )
				acctOverviewLocationsMgr.updateBLInitiativeTasks(task, initiative.getAcctinitiativeid());
		}
	}
}