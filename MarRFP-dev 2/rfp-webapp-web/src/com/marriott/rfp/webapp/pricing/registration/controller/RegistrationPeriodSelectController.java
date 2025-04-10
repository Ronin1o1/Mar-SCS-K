package com.marriott.rfp.webapp.pricing.registration.controller;

import com.marriott.rfp.business.pricing.common.api.PricingCommonService;
import com.marriott.rfp.webapp.common.controller.PeriodListController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/centralaccountregperiod")
public class RegistrationPeriodSelectController extends PeriodListController {


    public RegistrationPeriodSelectController() {
        super();
    }

    @Autowired
    public RegistrationPeriodSelectController(PricingCommonService pricingCommonService) {
        super(pricingCommonService);
    }

    @RequestMapping(value = "/getAllPeriodsForRole", method = GET)
    public String getAllPeriodsForRole() throws Exception {
        return super.getAllPeriodsForRole();
    }


}
