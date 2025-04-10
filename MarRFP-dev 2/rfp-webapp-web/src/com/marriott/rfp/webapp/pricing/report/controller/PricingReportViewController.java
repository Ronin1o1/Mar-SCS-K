package com.marriott.rfp.webapp.pricing.report.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.webapp.common.controller.BaseAccountReportViewController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = {"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER", "MFPAPADM"})
@RestController
@RequestMapping("/pricingreportview")
public class PricingReportViewController extends BaseAccountReportViewController {

    public PricingReportViewController() {
        super();
    }

    @Autowired
    public PricingReportViewController(ReportService reportService, ConstantsService constantsService, PricingFilterListsService pricingFilterListsService) {
        super(reportService, constantsService, pricingFilterListsService);
        //setReportType("B");
    }

    @RequestMapping(value = "/getPricingReportViewFilterLists", method = {GET,POST})
    public String getPricingReportViewFilterLists(Long accountrecid,Long period,String currentReport,String reportType) {
        reportType=(reportType==null)?"B":reportType;
        return super.getPricingReportViewFilterLists( accountrecid, period, currentReport,reportType);
    }


}
