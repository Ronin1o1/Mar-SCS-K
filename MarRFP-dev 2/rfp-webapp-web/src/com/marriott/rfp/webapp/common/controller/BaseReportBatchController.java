package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.constants.api.ConstantsService;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseReportBatchController extends BaseController {
    @Autowired
    private ConstantsService constantsService = null;

    public BaseReportBatchController() {
        super();
    }

    @Autowired
    public BaseReportBatchController(ConstantsService constantsService) {
        super();
        this.setConstantsService(constantsService);
        String reportServer = constantsService.getReportServerUrl();
        /* Cognos : Edie Report changes starts */
        String reportServeredie = constantsService.getReportEdieUrl();
        /* Cognos : Edie Report changes ends */
//	reportDirectory = "SalesReports";
    }

    public String getReportUrl(String reportQueryString,String reportExecutable) {
        String reportServer = constantsService.getReportServerUrl();
        /* Cognos : Edie Report changes starts */
        String reportServeredie = constantsService.getReportEdieUrl();
        String reportEDIEUrl = null;
        String reportUrl = null;
        /*Cognos : Run Report (Pricing-> Reports) Url Formation should be like... starts */
        reportUrl = reportServer + "__reportName=" + reportExecutable;
        /*Cognos : Run Report (Pricing-> Reports) Url Formation should be like... ends */
        /* Cognos : Edie Report changes starts */
        reportEDIEUrl = reportServeredie;
        /* Cognos : Edie Report changes ends */
        if (reportQueryString != null) {
            reportUrl += reportQueryString;
            reportEDIEUrl += reportQueryString;
        }
        if (!reportExecutable.equals("NBTA_edie"))
            return reportUrl;
        else
            return reportEDIEUrl;
    }

    public void setConstantsService(ConstantsService constantsService) {
        this.constantsService = constantsService;
    }

    public ConstantsService getConstantsService() {
        return constantsService;
    }


}
