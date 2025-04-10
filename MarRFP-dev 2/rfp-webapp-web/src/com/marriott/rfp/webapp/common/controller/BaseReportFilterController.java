package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.object.pricing.filterLists.*;
import com.marriott.rfp.object.report.ReportModel;
import com.marriott.rfp.webapp.common.misc.JsonResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Vector;

public class BaseReportFilterController extends BaseSingleFilterController {

    private static final Logger log = LoggerFactory.getLogger(BaseReportFilterController.class);
    @Autowired
    private ReportService reportService;

    @Autowired
    public BaseReportFilterController(PricingFilterListsService pricingFilterListsService, ReportService reportService) {
        super(pricingFilterListsService);
        this.setReportService(reportService);
        PricingFilterOptions pfo = new PricingFilterOptions();
        PricingFilterShow pfs = pfo.getShowOptions();
        pfs.setShowBrandFilter(true);
        pfs.setShowAreaFilter(true);
        pfs.setShowReportList(true);

        PricingFilterRequired pfr = pfo.getRequiredOptions();
        pfr.setYearRequired(true);
    }

    public BaseReportFilterController() {
        super();
    }

    public String getFilterViewLists(String reportType) throws Exception {
        try {
            PricingFilterSelections filterValues=new PricingFilterSelections();
            FilterLists filterLists=(getPricingFilterListsService().getReportFilterViewLists(filterValues.getYear(), reportType, getUserProperties()));
            return objectMapperStream(filterLists);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public String findReportDetail(String reportName) throws Exception {
        ReportModel reportDetail=null;
        JsonResponse jsonResponse = new JsonResponse();
        try {
            reportDetail = reportService.findReportDetails(reportName);
            List<ReportModel> reportDetailList = new Vector<ReportModel>();
            reportDetailList.add(reportDetail);
            jsonResponse.setItems(reportDetailList);
            jsonResponse.setIdentifier("reportDetail");
            jsonResponse.setLabel("reportDetail");
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


    public void setReportService(ReportService reportService) {
        this.reportService = reportService;
    }

    public ReportService getReportService() {
        return reportService;
    }


}
