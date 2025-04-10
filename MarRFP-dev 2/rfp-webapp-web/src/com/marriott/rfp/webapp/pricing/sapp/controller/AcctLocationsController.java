package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.object.pricing.sapp.AcctLocations;
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

@Security({"MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/acctlocations")
public class AcctLocationsController extends BaseSAPPController {

    private static final String CURRENT_SCREEN = "acctlocations";
    private static final String  NEXT_SCREEN = "acctbtprofile";
    private static final String  PREVIOUS_SCREEN = "acctperspective";
    private static final Logger log = LoggerFactory.getLogger(AcctLocationsController.class);
    public AcctLocationsController() {
        super();

    }

    @Autowired
    public AcctLocationsController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                                   AccountOverviewLocationsService accountOverviewLocationsService, UserService userService) {
        super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);

    }

    @RequestMapping(value = "/getAcctLocations", method = GET)
    public String getAcctLocations(Long accountrecid, @RequestParam(required = false,name = "currentScreen", defaultValue = CURRENT_SCREEN)String currentScreen,
                                   @RequestParam(required = false, name = "nextScreen", defaultValue = NEXT_SCREEN)String nextScreen,
                                   @RequestParam(required = false,name="previousScreen",defaultValue = PREVIOUS_SCREEN)String previousScreen) throws Exception {
        String lastupdatedate="";
        boolean checkFields=false;
        try {
            String lastUpdate = getAccountOverviewService().getLastUpdate(accountrecid, "BuyingLoc");
            if (lastUpdate != null && lastUpdate.length() > 0)
                lastupdatedate = lastUpdate;
            long maxTravelLocations = getConstantsService().getMaxTravelLocations();
            List<AcctLocations> usLocations = getAccountOverviewLocationsService().findAcctOverviewLocations(accountrecid, "Y");
            List<AcctLocations> intlLocations = getAccountOverviewLocationsService().findAcctOverviewLocations(accountrecid, "N");
            Map<Integer, AcctLocations> map1 = new HashMap<Integer, AcctLocations>();
            for (int i = 0; i < usLocations.size(); i++) {
                AcctLocations init1 = usLocations.get(i);
                init1.setUsLocation("Y");
                Integer key = i + 1;
                map1.put(key, init1);
            }
            Map<Integer, AcctLocations> usLocationsMap = map1;

            Map<Integer, AcctLocations> map2 = new HashMap<Integer, AcctLocations>();
            for (int i = 0; i < intlLocations.size(); i++) {
                AcctLocations init2 = intlLocations.get(i);
                init2.setUsLocation("N");
                Integer key = i + 1;
                map2.put(key, init2);
            }
            Map<Integer, AcctLocations> intlLocationsMap = map2;
            if (getUserProperties().getIsPASAdmin() || getUserProperties().getIsSAPPAdmin()) {
                checkFields=false;
            } else {
                checkFields=true;
            }
            Map<String, Object> info = new HashMap<>();
            info.put("lastUpdate", lastUpdate);
            info.put("lastupdatedate", lastupdatedate);
            info.put("maxTravelLocations", maxTravelLocations);
            info.put("usLocations", usLocations);
            info.put("intlLocations", intlLocations);
            info.put("usLocationsMap", usLocationsMap);
            info.put("intlLocationsMap", intlLocationsMap);
            info.put("checkFields", checkFields);
            info.put("currentScreen", currentScreen);
            info.put("nextScreen", nextScreen);
            info.put("previousScreen", previousScreen);
            return objectMapperStream(info);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateAcctLocations", method = POST)
    public String updateAcctLocations(String formChg, String strUsLocationsMap, String strIntlLocationsMap, Long accountrecid) throws Exception {
        try {

            if (formChg.equals("Y")) {
                Type collectionType = new TypeToken<Map<Integer, AcctLocations>>() {
                }.getType();
                Map<Integer, AcctLocations> usLocationsMap = fromJson(strUsLocationsMap, collectionType);
                Map<Integer, AcctLocations> intlLocationsMap = fromJson(strIntlLocationsMap, collectionType);
                List<AcctLocations> locations = new ArrayList<AcctLocations>();
                if (usLocationsMap != null) {
                    for (Integer key : usLocationsMap.keySet()) {
                        if ((usLocationsMap.get(key).getBl_name() != null && !usLocationsMap.get(key).getBl_name().equals(""))
                                || (usLocationsMap.get(key).getBl_potentialrn() != null && usLocationsMap.get(key).getBl_potentialrn() != 0)) {
                            AcctLocations location = new AcctLocations();
                            location.setBuyinglocid(usLocationsMap.get(key).getBuyinglocid() != null ? usLocationsMap.get(key).getBuyinglocid() : 0);
                            location.setSeqid(usLocationsMap.get(key).getSeqid());
                            location.setBl_name(usLocationsMap.get(key).getBl_name());
                            location.setBl_potentialrn(usLocationsMap.get(key).getBl_potentialrn());
                            location.setUsLocation("Y");
                            locations.add(location);
                        }
                    }
                }

                if (intlLocationsMap != null) {
                    for (Integer key : intlLocationsMap.keySet()) {
                        if ((intlLocationsMap.get(key).getBl_name() != null && !intlLocationsMap.get(key).getBl_name().equals(""))
                                || (intlLocationsMap.get(key).getBl_potentialrn() != null && intlLocationsMap.get(key).getBl_potentialrn() != 0)) {
                            AcctLocations location = new AcctLocations();
                            location.setBuyinglocid(intlLocationsMap.get(key).getBuyinglocid() != null ? intlLocationsMap.get(key).getBuyinglocid() : 0);
                            location.setSeqid(intlLocationsMap.get(key).getSeqid());
                            location.setBl_name(intlLocationsMap.get(key).getBl_name());
                            location.setBl_potentialrn(intlLocationsMap.get(key).getBl_potentialrn());
                            location.setUsLocation("N");
                            locations.add(location);
                        }
                    }
                }

                getAccountOverviewLocationsService().updateAcctOverviewLocations(locations, accountrecid);

            }
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }
}