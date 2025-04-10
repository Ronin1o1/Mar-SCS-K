package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.sapp.Leisure;
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
@RequestMapping("/leisure")
public class LeisureController extends BaseSAPPController {

    private static final String CURRENT_SCREEN = "leisure";
    private static final String  NEXT_SCREEN ="keycontacts";
    private static final String  PREVIOUS_SCREEN ="extendedstay";
    private static final Logger log = LoggerFactory.getLogger(LeisureController.class);

    public LeisureController() {
        super();

    }

    @Autowired
    public LeisureController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                             AccountOverviewLocationsService accountOverviewLocationsService, UserService userService) {
        super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);

    }

    @RequestMapping(value = "/getOverviewLeisure", method = GET)
    public String getOverviewLeisure(Long accountrecid,@RequestParam(required = false, name="currentScreen",defaultValue = CURRENT_SCREEN)String currentScreen,
                                     @RequestParam(required = false, name="nextScreen",defaultValue = NEXT_SCREEN)String nextScreen,
                                     @RequestParam(required = false,name="previousScreen",defaultValue = PREVIOUS_SCREEN)String previousScreen) throws Exception {
        boolean checkFields = false;
        String lastupdatedate = null;
        try {
            Leisure leisure = getAccountOverviewService().getAcctOverviewLeisure(accountrecid);
            String lastUpdate = getAccountOverviewService().getLastUpdate(accountrecid, "OverviewLeisure");
            if (lastUpdate != null && lastUpdate.length() > 0)
                lastupdatedate = lastUpdate;
            if (getUserProperties().getIsPASAdmin() || getUserProperties().getIsSAPPAdmin()) {
                checkFields = false;
            } else {
                checkFields = true;
            }
            Map<String, Object> info = new HashMap<>();
            info.put("leisure", leisure);
            info.put("lastUpdate", lastUpdate);
            info.put("lastupdatedate", lastupdatedate);
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

    @RequestMapping(value = "/updateLeisure", method = POST)
    public String updateLeisure(String strLeisure, Long accountrecid, String formChg) throws Exception {
        try {
            Leisure leisure = fromJson(strLeisure, Leisure.class);
            if (formChg.equals("Y")) {
                getAccountOverviewService().updateAcctOverviewLeisure(leisure, accountrecid);
            }
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

}