package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseDoubleFilterController extends BaseFilterController {

    public BaseDoubleFilterController() {
        super();
    }

    @Autowired
    public BaseDoubleFilterController(PricingFilterListsService pricingFilterListsService) {
        super(pricingFilterListsService);
    }

}
