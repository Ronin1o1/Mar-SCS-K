package com.marriott.rfp.webapp.pricing.report.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.webapp.common.controller.ReportHotelListController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = { "MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER", "MFPAPADM" })
@RestController
@RequestMapping(value = "/pricingreportfilterlist")
public class PricingReportFilterListController extends ReportHotelListController {

    public PricingReportFilterListController() {
        super();
    }

    @Autowired
    public PricingReportFilterListController(ReportService reportService, ConstantsService constantsService) {
        super(reportService, constantsService);
        String reportnamespace="pricingreportfilterlist";
    }

    @RequestMapping(value = "/getHotelFilteredList",method ={GET,POST})
    public String getHotelFilteredList(String strFilterValues) throws Exception {
        return super.getHotelFilteredList(strFilterValues);
    }

    @RequestMapping(value = "/update",method = POST)
    public String update() throws Exception {
        return super.update();
    }

    @RequestMapping(value = "/runReport", method = POST)
    public String runReport(String strFilterValues, String strHotelList) throws Exception {
        return super.runReport(strFilterValues,strHotelList);
    }
}
