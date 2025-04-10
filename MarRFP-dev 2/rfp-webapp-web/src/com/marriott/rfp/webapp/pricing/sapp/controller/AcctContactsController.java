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
import com.marriott.rfp.object.pricing.sapp.Contacts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/acctcontacts")
public class AcctContactsController extends BaseSAPPController {

    private static final Logger log = LoggerFactory.getLogger(AcctContactsController.class);
    private static final String CURRENT_SCREEN = "acctcontacts";
    private static final String  NEXT_SCREEN = "acctperspective";
    private static final String  PREVIOUS_SCREEN = "acctoverview";

    public AcctContactsController() {
        super();

    }

    @Autowired
    public AcctContactsController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                                  AccountOverviewLocationsService accountOverviewLocationsService, UserService userService) {
        super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);

    }

    @RequestMapping(value = "/getAcctContacts", method = GET)
    public String getAcctContacts(Long accountrecid,@RequestParam(required = false,name = "currentScreen", defaultValue = CURRENT_SCREEN)String currentScreen,
                                  @RequestParam(required = false, name = "nextScreen", defaultValue = NEXT_SCREEN)String nextScreen,
                                  @RequestParam(required = false,name="previousScreen",defaultValue = PREVIOUS_SCREEN)String previousScreen) throws Exception {

        try {
            String lastupdatedate=null;
            String lastUpdate = getAccountOverviewService().getLastUpdate(accountrecid, "TeamMbrs");
            if (lastUpdate != null && lastUpdate.length() > 0)
                 lastupdatedate=lastUpdate;
            List<Contacts> contacts = getAccountOverviewService().getAcctOverviewTeamMembers(accountrecid);
            List<Contacts> titles = getAccountOverviewService().getAcctOverviewUnusedContactTypes(accountrecid);


            boolean checkFields=false;
            if (getUserProperties().getIsPASAdmin() || getUserProperties().getIsSAPPAdmin()) {
                checkFields=false;
            } else {
                checkFields=true;
            }

            Map<String, Object> info = new HashMap<>();
            info.put("lastUpdate", lastUpdate);
            info.put("lastupdatedate", lastupdatedate);
            info.put("contacts", contacts);
            info.put("titles", titles);
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

    @RequestMapping(value = "/updateAcctContacts", method = POST)
    public String updateAcctContacts(Long accountrecid, String formChg, String strContacts) throws Exception {
        try {
            Type collectionType = new TypeToken<List<Contacts>>() {
            }.getType();
            List<Contacts> contacts = (List<Contacts>) fromJson(strContacts, collectionType);
            if (formChg.equals("Y")) {
                getAccountOverviewService().updateAcctOverviewContacts(contacts, accountrecid, getUserProperties().getEid());
            }

            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }
}