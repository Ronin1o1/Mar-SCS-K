package com.marriott.rfp.webapp.common.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BaseReportNoFilterController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(BaseReportNoFilterController.class);
    public BaseReportNoFilterController() {
        super();
    }

    public String getReportNoFilter() throws Exception {
        try {
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

}
