package com.marriott.rfp.webapp.pricing.sapp.controller;

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
import com.marriott.rfp.object.pricing.sapp.Markets;
import com.marriott.rfp.object.state.State;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/editMarket")
public class EditMarketController extends BaseSAPPController {
    private static final Logger log = LoggerFactory.getLogger(EditMarketController.class);
    @Autowired
    private ListsService listsService;

    public EditMarketController() {
        super();
    }

    @Autowired
    public EditMarketController(ConstantsService constantsService, PricingCommonService pricingCommonService, DetailListService detailListService, AccountOverviewService accountOverviewService,
                                AccountOverviewLocationsService accountOverviewLocationsService, UserService userService, ListsService listsService) {
        super(constantsService, pricingCommonService, detailListService, accountOverviewService, accountOverviewLocationsService, userService);
        this.listsService = listsService;
    }

    @RequestMapping(value = "/getEditMarket", method = GET)
    public String getEditMarket(long recid, Long seqid, String us_market) throws Exception {
        try {
            List<State> stateRef = listsService.getStates("US");
            List<Country> countryRef = listsService.getCountries();
            Markets acctMarket = getAccountOverviewService().getAcctOverviewMarketInfo(recid);
            if (acctMarket == null) {
                // This means this is a new market that is getting added.
                acctMarket = new Markets();
                acctMarket.setSeqid(seqid);
                acctMarket.setRecid(recid);
                if (us_market.equals("Y")) {
                    acctMarket.setMarket_country("US");
                }
                acctMarket.setUsMarket(us_market);
            } else {
                acctMarket.setSeqid(seqid);
                acctMarket.setRecid(recid);
                if (us_market.equals("Y")) {
                    acctMarket.setMarket_country("US");
                }
                acctMarket.setUsMarket(us_market);
            }

            Map<String, Object> info = new HashMap<>();
            info.put("stateRef", stateRef);
            info.put("countryRef", countryRef);
            info.put("acctMarket", acctMarket);
            info.put("us_market", us_market);

            return objectMapperStream(info);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateMarket", method = POST)
    public String updateMarket(Long accountrecid, String strAccMarket) throws Exception {
        try {
            Markets acctMarket = fromJson(strAccMarket, Markets.class);
            Long recid = getAccountOverviewService().updateAcctOverviewMarketLevel(acctMarket, accountrecid);
            String val = "<Success>" + recid.toString() + "</Success>";
            if (recid == 0) {
                val = "Duplicate";
            }
            return val;
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
