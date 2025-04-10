package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseSingleFilterController extends BaseFilterController {

    public BaseSingleFilterController() {
        super();
    }


    @Autowired
    public BaseSingleFilterController(PricingFilterListsService pricingFilterListsService) {
        super(pricingFilterListsService);
    }

}
