package com.marriott.rfp.webapp.common.controller;


import com.marriott.rfp.business.constants.api.ConstantsService;
import org.springframework.beans.factory.annotation.Autowired;


public class BaseReportController extends BaseController {
    @Autowired
    private ConstantsService constantsService = null;

    public BaseReportController() {
        super();
    }


    @Autowired
    public BaseReportController(ConstantsService constantsService) {
        super();
       // this.setConstantsService(constantsService);
        /*reportServer = constantsService.getReportOndemandUrl();
        excelDownloadLocation = constantsService.getExcelDownloadLocation();
        reportDirectory = "SalesReports";*/
    }


    public String getReportUrl(String reportServer,String reportQueryString ) {
        /* Cognos : Run Report (Mostly CPAC->Reports) Url Formation should be like below..given by IBM... starts */
//		reportUrl = reportServer + "__reportName=" + reportExecutable ;
       // reportServer = constantsService.getReportOndemandUrl();
        String reportUrl = null;
        reportUrl = reportServer;
        if (reportQueryString != null)
            reportUrl += "&" + reportQueryString;
        return reportUrl;
    }


}
