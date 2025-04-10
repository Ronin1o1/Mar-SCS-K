package com.marriott.rfp.webapp.pricing.common.controller;

import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.object.pricing.accountpricingtype.AccountPricingType;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/accountpricingtypelist")
public class AccountPricingTypeController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(AccountPricingTypeController.class);
    @Autowired
    private PricingFilterListsService pricingFilterListsService = null;

    public AccountPricingTypeController() {
        super();
    }

    @Autowired
    public AccountPricingTypeController(PricingFilterListsService pricingFilterListsService) {
        super();
        this.pricingFilterListsService = pricingFilterListsService;
    }

    //renamed execute to getAccountPricingType
    @RequestMapping(value = "/getAccountPricingType", method = GET)
    public String getAccountPricingType() throws Exception {
        try {
            List<AccountPricingType> accountpricingtypelist = pricingFilterListsService.getDisplayAccountPricingTypes();
            return gsonStream(accountpricingtypelist);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public PricingFilterListsService getPricingFilterListsService() {
        return pricingFilterListsService;
    }

    public void setPricingFilterListsService(PricingFilterListsService pricingFilterListsService) {
        this.pricingFilterListsService = pricingFilterListsService;
    }
}
