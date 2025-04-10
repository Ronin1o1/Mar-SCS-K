package com.marriott.rfp.webapp.pricing.edie.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.report.ReportModel;
import com.marriott.rfp.webapp.common.controller.BaseReportViewController;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.dto.EdieReportView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security(value = "MFPADMIN")
@RestController
@RequestMapping("/ediereportview")
public class EdieReportViewController extends BaseReportViewController {

    public EdieReportViewController() {
        super();
    }

    private static final Logger log = LoggerFactory.getLogger(EdieReportViewController.class);
    @Autowired
    public EdieReportViewController(ReportService reportService, ConstantsService constantsService) {
        super(reportService, constantsService);
    }

    @RequestMapping(value = "/getEdieReport", method = GET)
    public EdieReportView getEdieReport() throws Exception {
        try {
            EdieReportView edieReportView=new EdieReportView();
            edieReportView.setCurrentReport("NBTA_edie");
            edieReportView.setRptModel(new ReportModel());
            edieReportView.getRptModel().setIs_electronic("Y");
            ReportModel currentReportModel=edieReportView.getRptModel();
            return edieReportView;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }
    }
}
