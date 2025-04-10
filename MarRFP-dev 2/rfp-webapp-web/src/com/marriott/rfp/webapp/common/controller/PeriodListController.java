package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.object.pricing.period.Period;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class PeriodListController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(PeriodListController.class);
    @Autowired
    private PricingCommonService pricingCommonService = null;

    public PeriodListController() {
        super();
    }

    public PeriodListController(PricingCommonService pricingCommonService) {
        super();
        this.pricingCommonService = pricingCommonService;
    }

    public String getAllPeriodsForRole() throws Exception {
        try {
            List<Period> periodList = pricingCommonService.findAllPeriodsForRole(getUserProperties().getRole());
            return objectMapperStream(periodList);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }
}
