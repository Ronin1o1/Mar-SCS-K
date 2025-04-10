package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.sapp.BTOverview;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.dto.AcctBTOverview;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/acctbtoverview")
public class AcctBTOverviewController extends BaseSAPPController {


    private static final String CURRENT_SCREEN = "acctbtoverview";
    private static final String  NEXT_SCREEN = "acctmarkets";
    private static final String  PREVIOUS_SCREEN = "acctbtprofile";
    private static final Logger log = LoggerFactory.getLogger(AcctBTOverviewController.class);

    public AcctBTOverviewController() {
        super();

    }


    @Autowired
    public AcctBTOverviewController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                                    AccountOverviewLocationsService accountOverviewLocationsService, UserService userService) {
        super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);

    }

    @RequestMapping(value = "/getAcctBTOverview", method = GET)
    public AcctBTOverview getAcctBTOverview(long period, Long accountrecid,@RequestParam(required = false,name = "currentScreen", defaultValue = CURRENT_SCREEN)String currentScreen,
                                    @RequestParam(required = false, name = "nextScreen", defaultValue = NEXT_SCREEN)String nextScreen,
                                    @RequestParam(required = false,name="previousScreen",defaultValue = PREVIOUS_SCREEN)String previousScreen) throws Exception {


        AcctBTOverview acctBTOverview = new AcctBTOverview();
        try {
            acctBTOverview.setRevStreamId(2);
            acctBTOverview.setPricingPeriodList(getAccountOverviewService().findDueDates(period));
            acctBTOverview.setAcctOverviewBTReqs( getAccountOverviewService().getAcctOverviewBTReqs(accountrecid, acctBTOverview.getRevStreamId()));
            if (acctBTOverview.getAcctOverviewBTReqs().getLastupdate_bt_overview() != null) {
                SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
                acctBTOverview.setlLastupdatedate(sdf.format(acctBTOverview.getAcctOverviewBTReqs().getLastupdate_bt_overview()));
            }
            if (getUserProperties().getIsPASAdmin() || getUserProperties().getIsSAPPAdmin()) {
                acctBTOverview.setCheckFields(false);
            } else {
                acctBTOverview.setCheckFields(true);
            }
            acctBTOverview.setCurrentScreen(currentScreen);
            acctBTOverview.setNextScreen(nextScreen);
            acctBTOverview.setPreviousScreen(previousScreen);
            return acctBTOverview;
        } catch (Exception e) {
           log.error(e.getMessage(),e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }
    }

    @RequestMapping(value = "/updateAcctBTOverview", method = POST)
    public String updateAcctBTOverview(String strAcctOverviewBTReqse, Long accountrecid, String formChg) throws Exception {
        try {
            long revStreamId = 2;
            BTOverview acctOverviewBTReqs = fromJson(strAcctOverviewBTReqse, BTOverview.class);
            if (formChg.equals("Y")) {
                if (acctOverviewBTReqs.getAdopt_rate_bkg_tool() != null && (acctOverviewBTReqs.getAdopt_rate_bkg_tool() > 100 || acctOverviewBTReqs.getAdopt_rate_bkg_tool() < 1)) {
                    acctOverviewBTReqs.setAdopt_rate_bkg_tool(null);
                }
                getAccountOverviewService().updateAcctOverviewBTReqs(acctOverviewBTReqs, accountrecid, revStreamId);
            }

            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }
    }
}