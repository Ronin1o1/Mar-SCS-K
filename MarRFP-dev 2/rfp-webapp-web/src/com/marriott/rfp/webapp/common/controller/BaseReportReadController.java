package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.constants.api.ConstantsService;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseReportReadController extends BaseController {
    @Autowired
    private ConstantsService constantsService = null;

    public BaseReportReadController() {
        super();
    }

    public BaseReportReadController(ConstantsService constantsService) {
        super();
        this.setConstantsService(constantsService);
        String reportServer = constantsService.getReportServerUrl();
        String  reportDirectory = "SalesReports";
    }


    /*public String getReportUrl() {
	reportUrl = reportServer ; 
//			"/viewer/viewframeset.jsp";
//	reportUrl += "?name=" + "/" + reportDirectory + "/" + reportROI;
	reportUrl += reportQueryString;
//	reportUrl += "&volume=ODP_Volume";
    	
	return reportUrl;
    }*/

    public void setConstantsService(ConstantsService constantsService) {
        this.constantsService = constantsService;
    }

    public ConstantsService getConstantsService() {
        return constantsService;
    }



}
