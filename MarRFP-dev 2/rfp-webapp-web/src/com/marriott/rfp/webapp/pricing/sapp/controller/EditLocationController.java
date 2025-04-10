package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.lists.api.ListsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.object.country.Country;
import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.sapp.*;
import com.marriott.rfp.object.state.State;
import com.marriott.rfp.object.user.DSUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/editLocation")
public class EditLocationController extends BaseSAPPController {

	private static final Logger log = LoggerFactory.getLogger(EditLocationController.class);
	@Autowired
	private ListsService listsService = null;

	public EditLocationController() {
		super();
	}


	@Autowired
	public EditLocationController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
								  AccountOverviewLocationsService accountOverviewLocationsService, UserService userService, ListsService listsService) {
		super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);
		this.listsService = listsService;
	}

	@RequestMapping(value = "/getEditLocation", method = GET)
	public String getEditLocation(String us_location, Long buyinglocid, String bl_name, Double bl_potentialrn, long seqid, Long revStreamId, Long accountrecid) throws Exception {
		try {
			String country = "";
			if (us_location.equals("Y"))
				country = "US";
			long maxInitiatives = getConstantsService().getMaxInitiatives();
			if (buyinglocid == null)
				buyinglocid = new Long(0);
			if (buyinglocid.longValue() == 0) {
				buyinglocid = updateBuyingLocation(bl_name, bl_potentialrn, seqid, us_location, accountrecid);
			}
			AcctLocations locationinfo = getAccountOverviewLocationsService().getAcctOverviewLocationInfo(buyinglocid);
			if (locationinfo == null) {
				locationinfo = new AcctLocations();
				locationinfo.setBuyinglocid(buyinglocid);
				locationinfo.setBl_name(bl_name);
				if (bl_potentialrn != null)
					locationinfo.setBl_potentialrn(bl_potentialrn.longValue());
				else
					locationinfo.setBl_potentialrn(Long.parseLong("0"));
				locationinfo.setUsLocation(us_location);
			} else {
				locationinfo.setBuyinglocid(buyinglocid);
				locationinfo.setBl_name(bl_name);
				if (bl_potentialrn != null)
					locationinfo.setBl_potentialrn(bl_potentialrn.longValue());
				else
					locationinfo.setBl_potentialrn(Long.parseLong("0"));
				locationinfo.setUsLocation(us_location);
			}
//Upgrade-revisit check issue in AccountOverviewLocationsManagerImpl line 78 as there is a call to DB then make change to Long in revStreamId and added 0 for null to resolve it
			if (revStreamId == null) {
				revStreamId = 0L;
			}

			List<AcctInitiatives> initiatives = getAccountOverviewLocationsService().getAcctOverviewLocInitList(accountrecid, revStreamId, buyinglocid);
			List<LocationSalesArea> locSalesAreas = getAccountOverviewLocationsService().getAcctLocSalesAreaInfo(us_location);
			List<LocationMarkets> locMarkets = getAccountOverviewLocationsService().getAcctLocMarkets();
			List<DSUser> t1_contact = getAccountOverviewLocationsService().getAcctOverviewLocPlanUserList(accountrecid);
			List<HotelAffiliation> brandSegList = getPricingCommonService().findAllHotelAffiliations();
			List<HotelAffiliation> locBrandSegments = getAccountOverviewLocationsService().getAcctOverviewLocBrandSeg(buyinglocid);
			for (HotelAffiliation brand : brandSegList) {
				for (HotelAffiliation localBrand : locBrandSegments) {
					if (localBrand.getAffiliationid() == brand.getAffiliationid()) {
						brand.setAffiliationstatus("Y");
						break;
					}
				}
			}
			List<State> locStates = listsService.getStates("US");
			List<Country> locCountries = listsService.getCountries();
			List<LocationOffice> locationContacts = getAccountOverviewLocationsService().findAcctOverviewLocationContacts(buyinglocid, 24);
			List<LocationOffice> locationTitles = getAccountOverviewLocationsService().getAcctOverviewLocationContactTypes();
			Map<Long, LocationOffice> map = new HashMap<Long, LocationOffice>();
			for (int i = 0; i < locationTitles.size(); i++) {
				LocationOffice title = locationTitles.get(i);
				Long contacttypeid = title.getContacttypeid();
				Long key = contacttypeid;
				Long contactid = new Long(i + 1);
				LocationOffice contact = new LocationOffice();
				contact.setContacttypeid(contacttypeid);
				contact.setContactid(contactid);
				contact.setContactName("");
				contact.setContactTitle("");
				contact.setContactPhone("");
				contact.setContactFax("");
				contact.setContactEmail("");
				for (int j = 0; j < locationContacts.size(); j++) {
					LocationOffice c = locationContacts.get(j);
					if (c.getContacttypeid() == contacttypeid) {
						contact.setEid(c.getEid());
						contact.setContacttypeid(contacttypeid);
						contact.setContactid(c.getContactid());
						contact.setContactName(c.getContactName());
						contact.setContactTitle(c.getContactTitle());
						contact.setContactPhone(c.getContactPhone());
						contact.setContactFax(c.getContactFax());
						contact.setContactEmail(c.getContactEmail());
						break;
					}
				}

				map.put(key, contact);
			}

			Map<Long, LocationOffice> contact = map;

			Map<Integer, AcctInitiatives> initMap = new HashMap<Integer, AcctInitiatives>();
			for (int i = 0; i < initiatives.size(); i++) {
				AcctInitiatives init = initiatives.get(i);
				Integer key = i + 1;
				initMap.put(key, init);
			}
			Map<Integer, AcctInitiatives> initiativesMap = initMap;
			long maxOffices = getConstantsService().getMaxMarketOffices();
			Map<String, Object> info = new HashMap<>();
			info.put("us_location", us_location);
			info.put("country", country);
			info.put("maxInitiatives", maxInitiatives);
			info.put("buyinglocid", buyinglocid);
			info.put("bl_name", bl_name);
			info.put("bl_potentialrn", bl_potentialrn);
			info.put("revStreamId", revStreamId);
			info.put("seqid", seqid);
			info.put("locationinfo", locationinfo);
			info.put("initiatives", initiatives);
			info.put("locSalesAreas", locSalesAreas);
			info.put("locMarkets", locMarkets);
			info.put("t1_contact", t1_contact);
			info.put("brandSegList", brandSegList);
			info.put("locBrandSegments", locBrandSegments);
			info.put("locStates", locStates);
			info.put("locCountries", locCountries);
			info.put("locationContacts", locationContacts);
			info.put("locationTitles", locationTitles);
			info.put("contactMap", contact);
			info.put("initiativesMap", initiativesMap);
			info.put("maxOffices", maxOffices);
			return objectMapperStream(info);

		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}

	@RequestMapping(value = "updateLocation", method = POST)
	public String updateLocation(String strLocationinfo, String strSelectedAffiliationList, String strContact, String strInitiativesMap, String us_location, long seqid, Long accountrecid, Long buyinglocid) throws Exception {
		try {
			AcctLocations locationinfo = fromJson(strLocationinfo, AcctLocations.class);
			String[] selectedAffiliationList = fromJson(strSelectedAffiliationList, String[].class);
			Type collectionType = new TypeToken<Map<Long, LocationOffice>>() {
			}.getType();
			Map<Long, LocationOffice> contact = fromJson(strContact, collectionType);
			Type collectionType1 = new TypeToken<Map<Integer, AcctInitiatives>>() {
			}.getType();
			Map<Integer, AcctInitiatives> initiativesMap = fromJson(strInitiativesMap, collectionType1);

			if (us_location.equals("Y"))
				locationinfo.setUsLocation("US");
			locationinfo.setSeqid(seqid);
			getAccountOverviewLocationsService().updateAcctOverviewLocationLevel(locationinfo, contact, selectedAffiliationList, accountrecid, "update", buyinglocid);
			List<AcctInitiatives> inits = new ArrayList<AcctInitiatives>();
			if (initiativesMap != null) {
				for (Integer key : initiativesMap.keySet()) {
					if (initiativesMap.get(key).getInitiative_name() != null && !initiativesMap.get(key).getInitiative_name().equals("")) {
						AcctInitiatives init = new AcctInitiatives();
						init.setAccountinfoid(initiativesMap.get(key).getAccountinfoid());
						init.setAcctinitiativeid(initiativesMap.get(key).getAcctinitiativeid());
						init.setInitiative_name(initiativesMap.get(key).getInitiative_name());
						init.setSeqid(initiativesMap.get(key).getSeqid());
						init.setRevstreamid(initiativesMap.get(key).getRevstreamid());
						init.setBuyinglocid(buyinglocid);
						inits.add(init);
					}
				}
			}

			getAccountOverviewService().updateAcctOverviewLocInitList(inits, accountrecid, getUserProperties().getEid());
			return SUCCESS;
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}

	@RequestMapping(value = "deleteLocation", method = POST)
	public String deleteLocation(String strLocationinfo, String us_location, long seqid, Long accountrecid, Long buyinglocid) throws Exception {
		try {
			AcctLocations locationinfo = fromJson(strLocationinfo, AcctLocations.class);
			if (us_location.equals("Y"))
				locationinfo.setUsLocation("US");
			locationinfo.setSeqid(seqid);
			getAccountOverviewLocationsService().updateAcctOverviewLocationLevel(locationinfo, null, null, accountrecid, "delete", buyinglocid);
			return SUCCESS;
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}


	private long updateBuyingLocation(String locationName, Double roomNights, long seqid, String usLocation, long accountRecId) {
		AcctLocations location = new AcctLocations();
		location.setBl_name(locationName);
		location.setBuyinglocid(new Long(seqid));
		location.setBl_potentialrn(roomNights != null ? roomNights.longValue() : null);
		location.setUsLocation(usLocation);
		location.setSeqid(seqid);
		return getAccountOverviewLocationsService().createAcctOverviewBuyingLocation(location, accountRecId);
	}

	public void setListsService(ListsService listsService) {
		this.listsService = listsService;
	}

	public ListsService getListsService() {
		return listsService;
	}
}