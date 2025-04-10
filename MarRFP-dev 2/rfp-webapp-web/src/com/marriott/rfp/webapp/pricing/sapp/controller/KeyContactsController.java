package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.lists.api.ListsService;
import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewLocationsService;
import com.marriott.rfp.business.pricing.sapp.api.AccountOverviewService;
import com.marriott.rfp.business.pricing.sapp.api.DetailListService;
import com.marriott.rfp.business.user.api.UserService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.country.Country;
import com.marriott.rfp.object.pricing.sapp.Contacts;
import com.marriott.rfp.object.pricing.sapp.DetailList;
import com.marriott.rfp.object.state.State;
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
@RequestMapping("/keycontacts")
public class KeyContactsController extends BaseSAPPController {
    @Autowired
    private ListsService listsService = null;

    private static final String CURRENT_SCREEN = "keycontacts";
    private static final String  NEXT_SCREEN = "acctinitiatives";
    private static final String  PREVIOUS_SCREEN = "leisure";
    private static final Logger log = LoggerFactory.getLogger(KeyContactsController.class);

    public KeyContactsController() {
        super();
    }

    @Autowired
    public KeyContactsController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                                 AccountOverviewLocationsService accountOverviewLocationsService, UserService userService, ListsService listsService) {
        super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);
        this.listsService = listsService;

    }

    @RequestMapping(value = "/getKeyContacts", method = GET)
    public String getKeyContacts(Long accountrecid,Long revStreamId,@RequestParam(required = false, name="currentScreen",defaultValue = CURRENT_SCREEN)String currentScreen,
                                 @RequestParam(required = false, name="nextScreen",defaultValue = NEXT_SCREEN)String nextScreen,
                                 @RequestParam(required = false,name="previousScreen",defaultValue = PREVIOUS_SCREEN)String previousScreen) throws Exception {
        String lastupdatedate = null;
        boolean checkFields = false;
        revStreamId = (revStreamId==null)?1L:revStreamId;
        try {
            String lastUpdate = getAccountOverviewService().getLastUpdate(accountrecid, "KeyContacts");
            if (lastUpdate != null && lastUpdate.length() > 0)
                lastupdatedate = lastUpdate;
            if (revStreamId == 0)
                revStreamId = 1L;
            List<Contacts> contacts = getAccountOverviewService().getAcctOverviewContacts(accountrecid, 9, revStreamId);
            Map<Integer, Contacts> map = new HashMap<Integer, Contacts>();

            for (int j = 0; j < contacts.size(); j++) {
                int i=0;
                Contacts c = contacts.get(j);
                List<Contacts> keyContact = getAccountOverviewService().getAcctOverviewKeyContacts(accountrecid,c.getAccountinfoContactId().toString(),9);
                while(i<keyContact.size()) {
                    c.setAccountRelationship(keyContact.get(i).getAccountRelationship());
                    c.setCompanyName(keyContact.get(i).getCompanyName());
                    i++;
                }
                Integer key = j + 1;
                map.put(key, c);
            }

            Map<Integer, Contacts> contactsMap=map;
            List<State> stateRef = listsService.getStates("US");
            List<Country> countryRef = listsService.getCountries();
            List<DetailList> listRevStream = getDetailListService().getDetailListRevStream();
            long maxAcctKeyBuyer = getConstantsService().getMaxAcctKeyBuyer();
            if (getUserProperties().getIsPASAdmin() || getUserProperties().getIsSAPPAdmin()) {
                checkFields = false;
            } else {
                checkFields = true;
            }
            Map<String, Object> info = new HashMap<>();
            info.put("lastUpdate", lastUpdate);
            info.put("lastupdatedate", lastupdatedate);
            info.put("revStreamId", revStreamId);
            info.put("contacts", contacts);
            info.put("contactsMap", contactsMap);
            info.put("stateRef", stateRef);
            info.put("countryRef", countryRef);
            info.put("listRevStream", listRevStream);
            info.put("maxAcctKeyBuyer", maxAcctKeyBuyer);
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

    @RequestMapping(value = "/updateKeyContacts", method = POST)
    public String updateKeyContacts(String strContactsMap, Long accountrecid, String formChg,long revStreamId) throws Exception {
        try {

            Type collectionType = new TypeToken<Map<Integer, Contacts>>() {
            }.getType();
            Map<Integer, Contacts> contactsMap = fromJson(strContactsMap, collectionType);

            if (formChg.equals("Y")) {
                List<Contacts> acctKeyContacts = new ArrayList<Contacts>();
                for (Integer key : contactsMap.keySet()) {
                    if (contactsMap.get(key).getName() != null && contactsMap.get(key).getName().length() > 0) {
                        Contacts acctKeyContact = new Contacts();
                        acctKeyContact.setAccountinfoContactId(contactsMap.get(key).getAccountinfoContactId() == null ? new Long(0) : contactsMap.get(key).getAccountinfoContactId());
                        acctKeyContact.setName(contactsMap.get(key).getName());
                        acctKeyContact.setTitle(contactsMap.get(key).getTitle());
                        acctKeyContact.setCity(contactsMap.get(key).getCity());
                        acctKeyContact.setState(contactsMap.get(key).getState());
                        acctKeyContact.setCountry(contactsMap.get(key).getCountry());
                        acctKeyContact.setContactTypeID(new Long(9));
                        acctKeyContact.setRevStreamType(revStreamId);
                        acctKeyContacts.add(acctKeyContact);
                    }
                }

                getAccountOverviewService().updateAcctOverviewContactsBuyer(acctKeyContacts, accountrecid, getUserProperties().getEid());
            }
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public void setListsService(ListsService listsService) {
        this.listsService = listsService;
    }

    public ListsService getListsService() {
        return listsService;
    }

}