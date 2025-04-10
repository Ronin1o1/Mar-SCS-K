package com.marriott.rfp.webapp.dto;

import com.marriott.rfp.object.report.ReportModel;

public class EdieReportView {
    String currentReport;
    ReportModel rptModel;

    public String getCurrentReport() {
        return currentReport;
    }

    public void setCurrentReport(String currentReport) {
        this.currentReport = currentReport;
    }

    public ReportModel getRptModel() {
        return rptModel;
    }

    public void setRptModel(ReportModel rptModel) {
        this.rptModel = rptModel;
    }
}
