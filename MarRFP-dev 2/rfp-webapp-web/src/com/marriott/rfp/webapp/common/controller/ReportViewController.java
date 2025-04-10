package com.marriott.rfp.webapp.common.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;


@RestController
@RequestMapping("/reports")
public class ReportViewController extends BaseReportViewController {

    @RequestMapping(value = "/getAppEnvDetails", method = GET)
    public String getAppEnvDetails() {
        return super.getAppEnvDetails();
    }

    @RequestMapping(value = "/reportdetail", method = GET)
    public String getReport(String reportName) throws Exception {
        return super.findReportDetail(reportName);
    }
}
