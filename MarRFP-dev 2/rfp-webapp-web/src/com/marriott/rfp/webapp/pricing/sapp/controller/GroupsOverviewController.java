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

@Security({"MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/groupsoverview")
public class GroupsOverviewController extends BaseSAPPController {

    private static final Logger log = LoggerFactory.getLogger(GroupsOverviewController.class);
    private static final String CURRENT_SCREEN = "groupsoverview";
    private static final String  NEXT_SCREEN ="groupsintermediaries";
    private static final String  PREVIOUS_SCREEN ="groupsprofile";

    public GroupsOverviewController() {
        super();

    }


    @Autowired
    public GroupsOverviewController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                                    AccountOverviewLocationsService accountOverviewLocationsService, UserService userService) {
        super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);

    }


    @RequestMapping(value = "/getGroupsOverview", method = GET)
    public String getGroupsOverview(Long accountrecid) throws Exception {
        String lastupdatedate = null;
        try {
            String lastUpdate = getAccountOverviewService().getLastUpdate(accountrecid, "OverviewGroupDetail");
            if (lastUpdate != null && lastUpdate.length() > 0)
                lastupdatedate = lastUpdate;
            GroupDetail grpDetailProfile = getAccountOverviewService().getAcctOverviewGroupDetail(accountrecid);
            Map<String, Object> info = new HashMap<>();
            info.put("lastUpdate", lastUpdate);
            info.put("lastupdatedate", lastupdatedate);
            info.put("grpDetailProfile", grpDetailProfile);
            info.put("currentScreen", CURRENT_SCREEN);
            info.put("nextScreen", NEXT_SCREEN);
            info.put("previousScreen", PREVIOUS_SCREEN);
            return objectMapperStream(info);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateGroupsOverview", method = POST)
    public String updateGroupsOverview(Long accountrecid, String formChg, String strGrpDetailProfile) throws Exception {
        try {
            GroupDetail grpDetailProfile = fromJson(strGrpDetailProfile, GroupDetail.class);
            if (formChg.equals("Y")) {
                grpDetailProfile.setPageType(new Long(1));
                getAccountOverviewService().updateAcctOverviewGroupDetail(grpDetailProfile, accountrecid);
            }
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

   }