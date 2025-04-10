package com.marriott.rfp.webapp.genadmin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.webapp.common.controller.BaseReportNoFilterListController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({ "MFPADMIN",  "MFPAPADM", "MFPPPADM", "MFPRDADM" })
@RestController
@RequestMapping("/generalreportnofilterlist")
public class GeneralReportNoFilterListController extends BaseReportNoFilterListController {

    public GeneralReportNoFilterListController() {
	super();

    }

    @Autowired
    public GeneralReportNoFilterListController(ConstantsService constantsService, PricingFilterListsService pricingFilterListsService,
                                               ReportService reportService) {
	super(constantsService, pricingFilterListsService, reportService);
    }

    @RequestMapping(value ="/getReportNoFilterViewLists" ,method = {GET,POST})
    public String getReportNoFilterViewLists(String strFilterValues,String reportType) throws Exception{
        reportType=(reportType==null)?"G":reportType;
        return super.getReportNoFilterViewLists(strFilterValues,reportType);
    }
    @RequestMapping(value ="/runReport",method = {GET,POST})
    public String runReport(String strFilterValues) throws Exception{
        return super.runReport(strFilterValues);
    }

}
