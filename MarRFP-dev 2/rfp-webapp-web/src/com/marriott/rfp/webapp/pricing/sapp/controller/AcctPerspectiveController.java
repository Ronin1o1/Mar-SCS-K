package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.sapp.BusinessGen;
import com.marriott.rfp.object.pricing.sapp.Subsidiary;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({ "MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE" })
@RestController
@RequestMapping("/acctperspective")
public class AcctPerspectiveController extends BaseSAPPController {

	private static final Logger log = LoggerFactory.getLogger(AcctPerspectiveController.class);
	private static final String CURRENT_SCREEN = "acctperspective";
	private static final String  NEXT_SCREEN ="acctlocations";
	private static final String  PREVIOUS_SCREEN ="acctcontacts";

	public AcctPerspectiveController() {
		super();

	}

	@Autowired
	public AcctPerspectiveController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                                     AccountOverviewLocationsService accountOverviewLocationsService, UserService userService) {
		super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);

	}

	@RequestMapping(value = "/getAllAcctPerspective", method = GET)
	public String getAllAcctPerspective(Long accountrecid,@RequestParam(required = false, name="currentScreen",defaultValue = CURRENT_SCREEN)String currentScreen,
										@RequestParam(required = false, name="nextScreen",defaultValue = NEXT_SCREEN)String nextScreen,
										@RequestParam(required = false,name="previousScreen",defaultValue = PREVIOUS_SCREEN)String previousScreen) throws Exception {
		String lastupdatedate = null;
		boolean checkFields = false;
		try {
			String lastUpdate = getAccountOverviewService().getLastUpdate(accountrecid, "AcctPerspective");
			if (lastUpdate != null && lastUpdate.length() > 0)
				lastupdatedate = lastUpdate;
			List<Subsidiary> subsidiaries = getAccountOverviewService().findAcctOverviewSubsidiaries(accountrecid);
			long maxSubsidiaries = getConstantsService().getMaxSubsidiaries();
			BusinessGen acctPerspective = getAccountOverviewService().findAcctOverviewBusinessGen(accountrecid);
			Map<Integer, Subsidiary> subsidiariesMap = new HashMap<Integer, Subsidiary>();
			for (int i = 0; i < subsidiaries.size(); i++) {
				Subsidiary sub = subsidiaries.get(i);
				Integer key = i + 1;
				subsidiariesMap.put(key, sub);
			}
			if (getUserProperties().getIsPASAdmin() || getUserProperties().getIsSAPPAdmin()) {
				checkFields = false;
			} else {
				checkFields = true;
			}

			Map<String, Object> info = new HashMap<>();
			info.put("lastUpdate", lastUpdate);
			info.put("lastupdatedate", lastupdatedate);
			info.put("subsidiaries", subsidiaries);
			info.put("maxSubsidiaries", maxSubsidiaries);
			info.put("acctPerspective", acctPerspective);
			info.put("subsidiariesMap", subsidiariesMap);
			info.put("checkFields", checkFields);
			info.put("currentScreen", currentScreen);
			info.put("nextScreen", nextScreen);
			info.put("previousScreen", previousScreen);
			return objectMapperStream(info);

		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return RFPConstants.FATAL_ERROR;
		}
	}

	@RequestMapping(value = "/updateAcctPerspective", method = POST)
	public String updateAcctPerspective(Long accountrecid, String strAcctPerspective,String strSubsidiariesMap,String formChg) throws Exception {

		try {
			BusinessGen acctPerspective = fromJson(strAcctPerspective, BusinessGen.class);
			if (formChg.equals("Y")) {
				getAccountOverviewService().updateAcctOverviewBusinessGen(acctPerspective, accountrecid);

				// Subsidiaries
				Type collectionType = new TypeToken<Map<Integer, Subsidiary>>(){}.getType();
				Map<Integer, Subsidiary>subsidiariesMap = fromJson(strSubsidiariesMap, collectionType);

				List<Subsidiary> subs = new ArrayList<Subsidiary>();
				if (subsidiariesMap != null) {
					for (Integer key : subsidiariesMap.keySet()) {
						Subsidiary sub = new Subsidiary();
						sub.setAccountinfoid(subsidiariesMap.get(key).getAccountinfoid());
						sub.setDivname(subsidiariesMap.get(key).getDivname());
						sub.setRecid(subsidiariesMap.get(key).getRecid());
						if (sub.getDivname() != null && sub.getDivname().trim().length() > 0) {
							if (sub.getRecid() == null)
								sub.setRecid(new Long(0));
							subs.add(sub);
						}

						if (sub.getDivname() == null || sub.getDivname().equals("")) {
							if (sub.getRecid() != null) {
								subs.add(sub);
							}
						}
					}
				}

				getAccountOverviewService().updateAcctOverviewSubsidiaries(subs,accountrecid);
			}
			return RFPConstants.SUCCESS;
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return RFPConstants.FATAL_ERROR;
		}
	}
}