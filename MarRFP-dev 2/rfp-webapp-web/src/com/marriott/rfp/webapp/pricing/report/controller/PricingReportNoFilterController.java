package com.marriott.rfp.webapp.pricing.report.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.webapp.common.controller.BaseReportNoFilterController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER", "MFPAPADM"})
@RestController
@RequestMapping("pricingreportnofilter")
public class PricingReportNoFilterController extends BaseReportNoFilterController {

    public PricingReportNoFilterController() {
        super();
    }

    @RequestMapping(value = "/getPricingReportNoFilter ", method = RequestMethod.GET)
    public String getPricingReportNoFilter() throws Exception{
        return super.getReportNoFilter();
    }
}
