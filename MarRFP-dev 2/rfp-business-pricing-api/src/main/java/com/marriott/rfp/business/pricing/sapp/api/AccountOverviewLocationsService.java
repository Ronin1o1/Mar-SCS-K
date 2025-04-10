package com.marriott.rfp.business.pricing.sapp.api;

import java.util.List;
import java.util.Map;

import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.sapp.AcctInitiatives;
import com.marriott.rfp.object.pricing.sapp.AcctLocations;
import com.marriott.rfp.object.pricing.sapp.AcctTasks;
import com.marriott.rfp.object.pricing.sapp.LocationMarkets;
import com.marriott.rfp.object.pricing.sapp.LocationOffice;
import com.marriott.rfp.object.pricing.sapp.LocationSalesArea;
import com.marriott.rfp.object.user.DSUser;


public interface AccountOverviewLocationsService {

	public List<AcctLocations> findAcctOverviewLocations(long accountrecid, String usLocation);
	public List<AcctInitiatives> getAcctOverviewLocInitList(long accountrecid, long revstreamid, long buyinglocid);
	public List<LocationSalesArea> getAcctLocSalesAreaInfo(String usLocation);
	public List<LocationMarkets> getAcctLocMarkets();
	public List<DSUser> getAcctOverviewLocPlanUserList(long accountrecid);
	public List<HotelAffiliation> getAcctOverviewLocBrandSeg(long buyinglocid);
	public long createAcctOverviewBuyingLocation(AcctLocations location, long accountrecid);
	public AcctLocations getAcctOverviewLocationInfo(long buyinglocid);
	public List<LocationOffice> findAcctOverviewLocationContacts(long buyingLocationId, long contacttypeid);
	public List<LocationOffice> getAcctOverviewLocationContactTypes();
	public long updateAcctOverviewLocationLevel(AcctLocations model, Map<Long, LocationOffice> locContacts, String[] selBrandList, long accountrecid, String action, long buyinglocid);
	public void updateAcctOverviewLocations(List<AcctLocations> locations, long accountrecid);
	public List<AcctTasks> getAcctOverviewLocTasksList(Long initiativeid);
	public void updateBLInitiativeTasks(AcctInitiatives initiative, long buyinglocid);
}