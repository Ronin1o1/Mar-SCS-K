package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.lists.api.ListsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.object.country.Country;
import com.marriott.rfp.object.pricing.sapp.Contacts;
import com.marriott.rfp.object.pricing.sapp.DetailList;
import com.marriott.rfp.object.region.RegionRef;
import com.marriott.rfp.object.state.State;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({ "MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE" })
@RestController
@RequestMapping("/editKeyContact")
public class EditKeyContactController extends BaseSAPPController {
	private static final Logger log = LoggerFactory.getLogger(EditKeyContactController.class);

	@Autowired
	private ListsService listsService = null;

	public EditKeyContactController() {
		super();
	}

	@Autowired
	public EditKeyContactController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                                    AccountOverviewLocationsService accountOverviewLocationsService, UserService userService, ListsService listsService) {
		super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);
		this.setListsService(listsService);
	}

	@RequestMapping(value = "/getEditKeyContact" , method = GET)
	public String getEditKeyContact(String accountId,Long accountrecid,String contact_name,String revstream_id) throws Exception {
		try {
			if (accountId == null)
				accountId = "0";
			List<Contacts> tm_contact = getAccountOverviewService().getAcctOverviewKeyContacts(accountrecid, accountId, 9);
			Contacts travelManager = new Contacts();
			travelManager.setName(contact_name);
			travelManager.setRevStreamType(new Long(revstream_id));
			if (tm_contact != null && tm_contact.size() > 0) {
				travelManager = tm_contact.get(0);
			}
			List<DetailList> listRevStream = getDetailListService().getDetailListRevStream();
			List<State> stateRef = listsService.getStates("US");
			List<Country> countryRef = listsService.getCountries();
			List<RegionRef> regionRef = listsService.getOperatingRegions();
			List<DetailList> infRef = getDetailListService().getDetailListBuyerTypes();
			Map<String, Object> info = new HashMap<>();
			info.put("accountId", accountId);
			info.put("tm_contact", tm_contact);
			info.put("travelManager", travelManager);
			info.put("contact_name", contact_name);
			info.put("revstream_id", revstream_id);
			info.put("listRevStream", listRevStream);
			info.put("stateRef", stateRef);
			info.put("countryRef", countryRef);
			info.put("regionRef", regionRef);
			info.put("infRef", infRef);
			return objectMapperStream(info);

		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}


	@RequestMapping(value = "/updateKeyContact" , method = POST)
	public String updateKeyContact(String accountId,Long accountrecid,String strTravelManager) throws Exception {
		try {
			Contacts travelManager = fromJson(strTravelManager, Contacts.class);
			if (accountId == null)
				accountId = "0";
			travelManager.setContactTypeID(new Long(9));
			travelManager.setAccountinfoContactId(new Long(accountId));
			getAccountOverviewService().updateAcctOverviewKeyContacts(travelManager, accountrecid);
			return SUCCESS;
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}



	@RequestMapping(value = "/deleteKeyContact" , method = POST)
     public String deleteKeyContact(String accountId,String strTravelManager) throws Exception {
		try {
			Contacts travelManager = fromJson(strTravelManager, Contacts.class);
			if (accountId != null && !accountId.equals("0")) {
				getAccountOverviewService().deleteAcctOverviewKeyContacts(accountId);
			}

			return SUCCESS;
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return FATAL_ERROR;
		}
	}
	public void setListsService(ListsService listsService) {
		this.listsService = listsService;
	}

	public ListsService getListsService() {
		return listsService;
	}
}