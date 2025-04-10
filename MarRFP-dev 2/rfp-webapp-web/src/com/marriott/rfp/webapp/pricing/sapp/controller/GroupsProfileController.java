package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.sapp.AcctOverviewGroup;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/groupsprofile")
public class GroupsProfileController extends BaseSAPPController {

    private static final String CURRENT_SCREEN = "groupsprofile";
    private static final String  NEXT_SCREEN ="groupsoverview";
    private static final String  PREVIOUS_SCREEN ="acctmarkets";
    private static final Logger log = LoggerFactory.getLogger(GroupsProfileController.class);
    public GroupsProfileController() {
        super();

    }

    @Autowired
    public GroupsProfileController(ConstantsService constantsService,
                                   PricingCommonService pricingCommonService,
                                   DetailListService detailListService,
                                   AccountOverviewService accountOverviewService,
                                   AccountOverviewLocationsService accountOverviewLocationsService,
                                   UserService userService) {
        super(constantsService, pricingCommonService, detailListService,
                accountOverviewService, accountOverviewLocationsService,
                userService);

    }

    @RequestMapping(value = "/getGroupsProfile", method = GET)
    public String getGroupsProfile(Long accountrecid,@RequestParam(required = false,name = "currentScreen", defaultValue = CURRENT_SCREEN)String currentScreen,
                                   @RequestParam(required = false, name = "nextScreen", defaultValue = NEXT_SCREEN)String nextScreen,
                                   @RequestParam(required = false,name="previousScreen",defaultValue = PREVIOUS_SCREEN)String previousScreen) throws Exception {
        String lastupdatedate = null;

        try {
            String lastUpdate = getAccountOverviewService().getLastUpdate(
                    accountrecid, "OverviewGroup");
            if (!lastUpdate.equals("Empty"))
                lastupdatedate = lastUpdate;
            AcctOverviewGroup acctOverviewGrp = getAccountOverviewService()
                    .getAcctOverviewGroup(accountrecid);

            Map<String, Object> info = new HashMap<>();
            info.put("lastUpdate", lastUpdate);
            info.put("acctOverviewGrp", acctOverviewGrp);
            info.put("currentScreen", currentScreen);
            info.put("nextScreen", nextScreen);
            info.put("previousScreen", previousScreen);
            return objectMapperStream(info);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateGroupsProfile", method = POST)
    public String updateGroupsProfile(Long accountrecid, String strAcctOverviewGrp, String formChg) throws Exception {
        try {
            AcctOverviewGroup acctOverviewGrp = fromJson(strAcctOverviewGrp, AcctOverviewGroup.class);
            if (formChg.equals("Y")) {
                getAccountOverviewService().updateAcctOverviewGroup(acctOverviewGrp,
                        accountrecid);
            }
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }


}