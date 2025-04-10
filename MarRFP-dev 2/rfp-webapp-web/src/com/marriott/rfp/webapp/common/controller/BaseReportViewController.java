package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.object.report.ReportModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

public class BaseReportViewController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(BaseReportViewController.class);
    @Autowired
    private ConstantsService constantsService = null;
    @Autowired
    private ReportService reportService = null;
    /*private String reportServer;
    private String excelDownloadLocation;
    private String reportType;
    private List<ReportModel> reportList;
    private ReportModel currentReportModel;
    private String currentReport;*/


    public BaseReportViewController() {
        super();
    }

    @Autowired
    public BaseReportViewController(ReportService reportService, ConstantsService constantsService) {
        super();
        this.setreportService(reportService);
        this.setConstantsService(constantsService);
        String reportServer = constantsService.getReportServerUrl();
        String  excelDownloadLocation = constantsService.getExcelDownloadLocation();
    }

    public String findReportDetail(String reportName) throws Exception {
        try {
            ReportModel reportDetail = reportService.findReportDetails(reportName);
            List<ReportModel> reportDetailList = new Vector<ReportModel>();
            reportDetailList.add(reportDetail);
            return gsonStream(reportDetailList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }
    public Map<String, Object> getReportDetails(String reportType,String currentReport) throws Exception {
        ReportModel currentReportModel =null;
        List<ReportModel> reportList = reportService.findReportList(reportType, getUserProperties().getRole());
        if ((currentReport == null || currentReport.equals("")) && !reportList.isEmpty())
            currentReport = reportList.get(0).getReport_name();
        if (currentReport != null && !currentReport.equals(""))
            currentReportModel = reportService.findReportAttributes(currentReport);
        Map<String, Object> reportDetails = new HashMap<>();
        reportDetails.put("reportList", reportList);
        reportDetails.put("currentReport", currentReport);
        reportDetails.put("currentReportModel", currentReportModel);
        return reportDetails;
    }

    public String getAppEnvDetails() {
        try {
            //Upgrade: Caching resolved
            Map<String, Object> envDetails = new HashMap<>();
            envDetails.put(
                    "COGNOS_SERVER_URL", constantsService.getReportServerUrl());
            envDetails.put(
                    "COGNOS_LOGIN_URL",
                    constantsService.getCamPassportUrl());
            envDetails.put(
                    "COGNOS_EDIE_URL",
                    constantsService.getReportEdieUrl());
            envDetails.put(
                    "COGNOS_EXCEL_LOC",
                    constantsService.getExcelDownloadLocation());
            envDetails.put("REPORT_ONDEMAND_URL",constantsService.getReportOndemandUrl());
            return objectMapperStream(envDetails);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setreportService(ReportService reportService) {
        this.reportService = reportService;
    }

    public ReportService getreportService() {
        return reportService;
    }

    /*public void setReportServer(String reportServer) {
        this.reportServer = reportServer;
    }

    public String getReportServer() {
        return reportServer;
    }

    public String getExcelDownloadLocation() {
        return excelDownloadLocation;
    }

    public void setExcelDownloadLocation(String excelDownloadLocation) {
        this.excelDownloadLocation = excelDownloadLocation;
    }

    public void setReportList(List<ReportModel> reportList) {
        this.reportList = reportList;
    }

    public List<ReportModel> getReportList() {
        return reportList;
    }
*/
    public void setConstantsService(ConstantsService constantsService) {
        this.constantsService = constantsService;
    }

    public ConstantsService getConstantsService() {
        return constantsService;
    }
/*
    public String getReportType() {
        return reportType;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }

    public String getCurrentReport() {
        return currentReport;
    }


    public void setCurrentReport(String currentReport) {
        this.currentReport = currentReport;
    }
*/
   // public String getReportUrl() {
       // String viewReport = getCurrentReport();---thisline
		/*if (viewReport !=null && viewReport.equals("ePRReport"))
			viewReport="ePRReportBasic";*/
        /* Cognos : View Report(Request Special Reports) Url Formation should be like starts */
        //String thereport = excelDownloadLocation + "__reportName=" + viewReport; ----thisline
        /* Cognos : View Report (Request Special Reports) Url Formation should be like end */
//		if (currentReportModel.getIs_electronic() != null && currentReportModel.getIs_electronic().equals("Y"))
//			thereport += "/XLS";
//		/*thereport += "&showDocuments=true&showExecutables=false&showFolders=false&applyFilter=true";*/
        //return thereport;---thisline
   // }

    /*public void setCurrentReportModel(ReportModel currentReportModel) {
        this.currentReportModel = currentReportModel;
    }

    public ReportModel getCurrentReportModel() {
        return currentReportModel;
    }*/
}
