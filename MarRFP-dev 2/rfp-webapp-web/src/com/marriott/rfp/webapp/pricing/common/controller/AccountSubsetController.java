package com.marriott.rfp.webapp.pricing.common.controller;

import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.account.AccountSubset;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping(value = "/accountsubsetlist")
public class AccountSubsetController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(AccountSubsetController.class);

    @Autowired
    private PricingFilterListsService pricingFilterListsService = null;

    public AccountSubsetController() {
        super();
    }

    @Autowired
    public AccountSubsetController(PricingFilterListsService pricingFilterListsService) {
        super();
        this.pricingFilterListsService = pricingFilterListsService;
    }

    @RequestMapping(value = "/getAccountSubsets", method = GET)
    public String getAccountSubsets() throws Exception {
        try {
            List<AccountSubset> accountsubsetlist = pricingFilterListsService.getAccountSubsets();
            return objectMapperStream(accountsubsetlist);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

}
