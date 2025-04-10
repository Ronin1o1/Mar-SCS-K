package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.sapp.CateringExtendedStay;
import com.marriott.rfp.object.pricing.sapp.RevStreamsDescription;
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
@RequestMapping("/extendedstay")
public class ExtendedStayController extends BaseSAPPController {

    private static final String CURRENT_SCREEN = "extendedstay";
    private static final String  NEXT_SCREEN = "leisure";
    private static final String  PREVIOUS_SCREEN = "catering";
    private static final Logger log = LoggerFactory.getLogger(ExtendedStayController.class);
    public ExtendedStayController() {
        super();

    }

    @Autowired
    public ExtendedStayController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                                  AccountOverviewLocationsService accountOverviewLocationsService, UserService userService) {
        super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);

    }

    @RequestMapping(value = "/getExtendedStay", method = GET)
    public String getExtendedStay(Long accountrecid,@RequestParam(required = false,name = "currentScreen", defaultValue = CURRENT_SCREEN)String currentScreen,
                                  @RequestParam(required = false, name = "nextScreen", defaultValue = NEXT_SCREEN)String nextScreen,
                                  @RequestParam(required = false,name="previousScreen",defaultValue = PREVIOUS_SCREEN)String previousScreen) throws Exception {
        String lastupdatedate="";
        boolean checkFields=false;
        try {
            long revStreamId = 5;
            CateringExtendedStay extendedstay = getAccountOverviewService().getAcctOverviewExtStay(accountrecid, revStreamId);
            RevStreamsDescription revStreamDescription = getAccountOverviewService().getAcctOverviewRevStream(accountrecid, revStreamId);
            String lastUpdate = getAccountOverviewService().getLastUpdate(accountrecid, "ExtendedStay");
            if (lastUpdate != null && lastUpdate.length() > 0)
                 lastupdatedate=lastUpdate;
            if (getUserProperties().getIsPASAdmin() || getUserProperties().getIsSAPPAdmin()) {
                 checkFields=false;
            } else {
                 checkFields=true;
            }
            Map<String, Object> info = new HashMap<>();
            info.put("revStreamId", revStreamId);
            info.put("extendedstay", extendedstay);
            info.put("revStreamDescription", revStreamDescription);
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

    @RequestMapping(value = "/updateExtendedStay", method = POST)
    public String updateExtendedStay(String strExtendedstay, String strRevStreamDescription, Long accountrecid, String formChg) throws Exception {
        try {
            CateringExtendedStay extendedstay = fromJson(strExtendedstay, CateringExtendedStay.class);
            RevStreamsDescription revStreamDescription = fromJson(strRevStreamDescription, RevStreamsDescription.class);

            if (formChg.equals("Y")) {
                long revStreamId = 5;
                getAccountOverviewService().updateAcctOverviewExtStay(extendedstay, accountrecid, revStreamId);
                getAccountOverviewService().updateAcctOverviewRevStream(revStreamDescription, accountrecid, revStreamId);
            }
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

}