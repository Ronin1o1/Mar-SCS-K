package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.sapp.GroupDetail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({ "MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE" })
@RestController
@RequestMapping("/groupsintermediaries")
public class GroupsIntermediariesController extends BaseSAPPController {

	private static final Logger log = LoggerFactory.getLogger(GroupsIntermediariesController.class);
	private static final String CURRENT_SCREEN = "groupsintermediaries";
	private static final String  NEXT_SCREEN ="catering";
	private static final String  PREVIOUS_SCREEN ="groupsoverview";

	public GroupsIntermediariesController() {
		super();

	}

	@Autowired
	public GroupsIntermediariesController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                                          AccountOverviewLocationsService accountOverviewLocationsService, UserService userService) {
		super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);

	}

	@RequestMapping(value = "/getGroupsIntermediaries",method = GET)
	public String getGroupsIntermediaries(Long accountrecid) throws Exception {
		String lastupdatedate = null;
		try {
			String lastUpdate = getAccountOverviewService().getLastUpdate(accountrecid, "OverviewGroupIntermed");
			if (lastUpdate != null && lastUpdate.length() > 0)
				lastupdatedate = lastUpdate;
			GroupDetail grpDetail = getAccountOverviewService().getAcctOverviewGroupDetail(accountrecid);
			Map<String, Object> info = new HashMap<>();
			info.put("lastUpdate", lastUpdate);
			info.put("lastupdatedate", lastupdatedate);
			info.put("grpDetail", grpDetail);
			info.put("currentScreen", CURRENT_SCREEN);
			info.put("nextScreen", NEXT_SCREEN);
			info.put("previousScreen", PREVIOUS_SCREEN);
			return objectMapperStream(info);

		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return RFPConstants.FATAL_ERROR;
		}
	}


	@RequestMapping(value = "/updateGroupsIntermediaries",method = POST)
	public String updateGroupsIntermediaries(String strGrpDetail,String formChg,Long accountrecid) throws Exception {
		try {
			GroupDetail grpDetail = fromJson(strGrpDetail, GroupDetail.class);

			if (formChg.equals("Y")) {
				grpDetail.setPageType(new Long(2));
				getAccountOverviewService().updateAcctOverviewGroupDetail(grpDetail, accountrecid);
			}
			return SUCCESS;
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return RFPConstants.FATAL_ERROR;
		}
	}

}