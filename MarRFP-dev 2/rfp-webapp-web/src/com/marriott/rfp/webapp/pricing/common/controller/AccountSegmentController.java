package com.marriott.rfp.webapp.pricing.common.controller;

import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("accountsegmentlist")
public class AccountSegmentController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(AccountSegmentController.class);
    @Autowired
    private PricingFilterListsService pricingFilterListsService = null;


    public AccountSegmentController() {
        super();
    }

    @Autowired
    public AccountSegmentController(PricingFilterListsService pricingFilterListsService) {
        super();
        this.pricingFilterListsService = pricingFilterListsService;
    }


    @RequestMapping(value = "/getAccountSegment", method = GET)
    public String getAccountSegment() throws Exception {
        try {
            List<AccountSegment> accountsegmentlist = pricingFilterListsService.getPricingAccountSegments();
            return objectMapperStream(accountsegmentlist);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


}
