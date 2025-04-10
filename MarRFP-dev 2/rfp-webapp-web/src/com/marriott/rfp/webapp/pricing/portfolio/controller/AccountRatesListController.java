package com.marriott.rfp.webapp.pricing.portfolio.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountCenterService;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.hotelrfp.AccountCenterView;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountCenterUpdate;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPFSALE", "MFPSALES"})
@RestController
@RequestMapping("/portfolioaccountrateslist")
public class AccountRatesListController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(AccountRatesListController.class);
    @Autowired
    private HotelRFPAccountCenterService hotelRFPAccountCenterService;

    public AccountRatesListController() {
        super();

    }

    //upgrade-revisit not tested
    @Autowired
    public AccountRatesListController(HotelRFPAccountCenterService hotelRFPAccountCenterService) {
        super();
        setHotelRFPAccountCenterService(hotelRFPAccountCenterService);
    }

    //execute method renamed
    @RequestMapping(value = "/getPortfolioAccountRateList", method = GET)
    public String getPortfolioAccountRateList(PricingFilterSelections filterValues) throws Exception {
        try {
            AccountCenterView accountCenterView=hotelRFPAccountCenterService.findAccountRatesDetail(filterValues, getUserProperties());
            return gsonStream(accountCenterView);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/update", method = POST)
    public String update(String strHotelAccountCenterUpdate) throws Exception {
        try {
            Type collectionType = new TypeToken<Map<Long, HotelAccountCenterUpdate>>() {
            }.getType();
            Map<Long, HotelAccountCenterUpdate> hotelAccountCenterUpdate = fromJson(strHotelAccountCenterUpdate, collectionType);
            hotelRFPAccountCenterService.updatePortfolioAccountRates(hotelAccountCenterUpdate, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    public void setHotelRFPAccountCenterService(HotelRFPAccountCenterService hotelRFPAccountCenterService) {
        this.hotelRFPAccountCenterService = hotelRFPAccountCenterService;
    }

    public HotelRFPAccountCenterService getHotelRFPAccountCenterService() {
        return hotelRFPAccountCenterService;
    }

}
