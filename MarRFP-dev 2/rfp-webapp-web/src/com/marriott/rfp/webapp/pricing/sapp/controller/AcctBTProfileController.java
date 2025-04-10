package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.sapp.Agencies;
import com.marriott.rfp.object.pricing.sapp.BTProfile;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/acctbtprofile")
public class AcctBTProfileController extends BaseSAPPController {

    private static final String CURRENT_SCREEN = "acctbtprofile";
    private static final String  NEXT_SCREEN ="acctbtoverview";
    private static final String  PREVIOUS_SCREEN ="acctlocations";
    private static final Logger log = LoggerFactory.getLogger(AcctBTProfileController.class);

    public AcctBTProfileController() {
        super();

    }

    @Autowired
    public AcctBTProfileController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                                   AccountOverviewLocationsService accountOverviewLocationsService, UserService userService) {
        super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);

    }

    @RequestMapping(value = "/getAcctBTProfile", method = GET)
    public String getAcctBTProfile(Long accountrecid, @RequestParam(required = false, name = "currentScreen", defaultValue = CURRENT_SCREEN)String currentScreen,
                                   @RequestParam(required = false,name="nextScreen",defaultValue = NEXT_SCREEN)String nextScreen,
                                   @RequestParam(required = false, name="previousScreen", defaultValue = PREVIOUS_SCREEN)String previousScreen) throws Exception {
        String lastupdatedate = null;
        boolean checkFields = false;
        BTProfile btProfile = null;
        long revStreamId= 0;
        long maxblackoutperiods_limit= 0;
        List<HotelAffiliation> brandsList = new ArrayList<>();
        List<HotelAffiliation> selbrands = null;
        List<Agencies> agencies=null;
        List<Agencies> agencytypes = null;
        String brandAffiliationstatus="";
        Map<Integer, Agencies> agenciesMap= null;
        try {
            revStreamId = 2;
            maxblackoutperiods_limit=getConstantsService().getMaxBlackouts();
            btProfile = getAccountOverviewService().getAcctOverviewBTYrOverYr(accountrecid, revStreamId);
            brandsList = getPricingCommonService().findAllHotelAffiliations();

            selbrands = getAccountOverviewService().getAcctOverviewBrandSeg(accountrecid);
            for (HotelAffiliation brand : brandsList) {
                brand.setAffiliationstatus(null);
            }
            for (HotelAffiliation brand : brandsList) {
                for (HotelAffiliation localBrand : selbrands) {
                    if (localBrand.getAffiliationid() == brand.getAffiliationid()) {
                        brand.setAffiliationstatus("Y");
                        brandAffiliationstatus = brand.getAffiliationstatus();

                        break;
                    }
                }
            }

            agencies = getAccountOverviewService().getAcctOverviewAgencies(accountrecid);
            agencytypes = getAccountOverviewService().getAcctOverviewAgencyTypes();
            Map<Integer, Agencies> map = new HashMap<Integer, Agencies>();
            for (int i = 0; i < agencytypes.size(); i++) {
                Agencies agencyType = agencytypes.get(i);
                Agencies agency = new Agencies();
                Integer key = i + 1;
                agency.setAgencytypeid(agencyType.getAgencytypeid());
                agency.setAgencytypedesc(agencyType.getAgencytypedesc());
                agency.setSequence(agencyType.getSequence());
                agency.setAccountrecid(accountrecid);
                for (int j = 0; j < agencies.size(); j++) {
                    Agencies c = agencies.get(j);
                    if (c.getAgencytypeid() == agencyType.getAgencytypeid()) {
                        agency.setAgencyname(c.getAgencyname());
                        agency.setAgencybooking(c.getAgencybooking());
                        agency.setAgencygds(c.getAgencygds());
                        agency.setAccountinfo_agencyid(c.getAccountinfo_agencyid());
                        agency.setAccountrecid(c.getAccountrecid());
                        agency.setAgencytypeid(c.getAgencytypeid());
                        break;
                    }
                }

                map.put(key, agency);
            }

            agenciesMap = map;
            if (btProfile.getLastupdate_bt_trans_profile() != null) {
                SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
                lastupdatedate = sdf.format(btProfile.getLastupdate_bt_trans_profile());
            }

            if (getUserProperties().getIsPASAdmin() || getUserProperties().getIsSAPPAdmin()) {
                checkFields = false;
            } else {
                checkFields = true;
            }

            Map<String, Object> info = new HashMap<>();
            info.put("revStreamId", revStreamId);
            info.put("maxblackoutperiods_limit", maxblackoutperiods_limit);
            info.put("btProfile", btProfile);
            info.put("brandsList", brandsList);
            info.put("selbrands", selbrands);
            info.put("brandAffiliationstatus", brandAffiliationstatus);
            info.put("agencies", agencies);
            info.put("agencytypes", agencytypes);
            info.put("agenciesMap", agenciesMap);
            info.put("lastupdatedate", lastupdatedate);
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

    @RequestMapping(value = "/updateAcctBTProfile", method = POST)
    public String updateAcctBTProfile(String strSelectedAffiliationList, String strBtProfile, Long accountrecid, String strAgenciesMap, String formChg) throws Exception {
        BTProfile btProfile =null;
        String[] selectedAffiliationList = null;
        Map<Integer, Agencies> agenciesMap = null;
        try {

            if (formChg.equals("Y")) {
                btProfile = fromJson(strBtProfile, BTProfile.class);
                     selectedAffiliationList = fromJson(strSelectedAffiliationList, String[].class);

                long revStreamId = 2;
                getAccountOverviewService().updateAcctOverviewBTYrOverYr(btProfile, accountrecid, revStreamId);
                getAccountOverviewService().updateAcctOverviewBrandSeg(selectedAffiliationList, accountrecid);

                Type collectionType = new TypeToken<Map<Integer, Agencies>>() {
                }.getType();
                agenciesMap = fromJson(strAgenciesMap, collectionType);

                List<Agencies> agencies = new ArrayList<Agencies>();
                for (Integer key : agenciesMap.keySet()) {
                    Agencies agency = new Agencies();
                    if (agenciesMap.get(key).getAccountinfo_agencyid() != null && agenciesMap.get(key).getAccountinfo_agencyid() > 0) {
                        agency.setAccountinfo_agencyid(agenciesMap.get(key).getAccountinfo_agencyid());
                    } else {
                        agency.setAccountinfo_agencyid(0l);
                    }

                    agency.setAccountrecid(accountrecid);
                    agency.setAgencybooking(agenciesMap.get(key).getAgencybooking());
                    agency.setAgencygds(agenciesMap.get(key).getAgencygds());
                    agency.setAgencyname(agenciesMap.get(key).getAgencyname());
                    agency.setAgencytypedesc(agenciesMap.get(key).getAgencytypedesc());
                    agency.setAgencytypeid(agenciesMap.get(key).getAgencytypeid());
                    agency.setSequence(agenciesMap.get(key).getSequence());
                    agencies.add(agency);
                }
                getAccountOverviewService().updateAcctOverviewAgencies(agencies, accountrecid);
            }
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

}