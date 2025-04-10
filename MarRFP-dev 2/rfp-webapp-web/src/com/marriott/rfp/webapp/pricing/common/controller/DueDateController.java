package com.marriott.rfp.webapp.pricing.common.controller;

import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.period.PricingPeriod;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/duedatelist")
public class DueDateController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(DueDateController.class);

    @Autowired
    private PricingFilterListsService pricingFilterListsService = null;

    public DueDateController() {
        super();
    }

    @Autowired
    public DueDateController(PricingFilterListsService pricingFilterListsService) {
        super();
        this.pricingFilterListsService = pricingFilterListsService;
    }

    @RequestMapping(value = "/getDueDate", method = GET)
    public String getDueDate(Long searchperiod) throws Exception {
        try {
            List<PricingPeriod> pricingPeriodlist = pricingFilterListsService.getDueDates(searchperiod);
            return gsonStream(pricingPeriodlist);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }


}
