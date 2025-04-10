package com.marriott.rfp.webapp.common.controller;

import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.filters.api.PricingFilterListsService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.object.pricing.filterLists.DateRangeFilterValue;
import com.marriott.rfp.object.pricing.filterLists.NoFilterOptions;
import com.marriott.rfp.object.pricing.filterLists.PricingNoFilterSelections;
import com.marriott.rfp.object.report.ReportModel;
import com.marriott.rfp.utility.DateUtility;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

public class BaseReportNoFilterListController extends BaseReportBatchController {

    private static final Logger log = LoggerFactory.getLogger(BaseReportNoFilterListController.class);
    @Autowired
    private PricingFilterListsService pricingFilterListsService;
    @Autowired
    private ReportService reportService;


    public BaseReportNoFilterListController() {
        super();
    }

    public BaseReportNoFilterListController(ConstantsService constantsService, PricingFilterListsService pricingFilterListsService, ReportService reportService) {
        super(constantsService);
        //setPricingFilterListsService(pricingFilterListsService);
        // setReportService(reportService);
    }

    public String getReportNoFilterViewLists(String strFilterValues, String reportType) throws Exception {
        try {
            PricingNoFilterSelections filterValues = new PricingNoFilterSelections();
            NoFilterOptions noFilterOptions = null;
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = fromJson(strFilterValues, PricingNoFilterSelections.class);
            }
            noFilterOptions = pricingFilterListsService.getReportNoFilterViewLists(reportType, getUserProperties(), filterValues);
            if ((filterValues != null && filterValues.getReport() != null) || (filterValues != null && filterValues.getReport() != null && filterValues.getReport().equals("eEdieProfileUsage")) || (filterValues != null && filterValues.getReport() != null && filterValues.getReport().equals("ePgoosErrorException"))) {
                if (filterValues.getDateRangeFilter() == null) {
                    filterValues.setDateRangeFilter(new DateRangeFilterValue(DateUtility.getYesterday(1), DateUtility.getToday()));
                }
            }
            Map<String, Object> reportNoFilterViewLists = new HashMap<>();
            reportNoFilterViewLists.put("noFilterOptions", noFilterOptions);
            reportNoFilterViewLists.put("filterValues", filterValues);

            return gsonStream(reportNoFilterViewLists);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return FATAL_ERROR;
        }
    }

    public String runReport(String strFilterValues) throws Exception {
        String reportQueryString = null;
        String reportExecutable = null;
        try {
            PricingNoFilterSelections filterValues = new PricingNoFilterSelections();
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = fromJson(strFilterValues, PricingNoFilterSelections.class);
            }
            String reportname = filterValues.getReport();
            ReportModel reportDetail = reportService.findReportDetails(reportname);
            if (reportname.equals("eRMPricingAudit"))
                reportname = "eRMWeeklyPull";
            if (reportname.equalsIgnoreCase("eAmenitiesAnalysisBatch"))
                reportService.insertAmenityBatchRecord(reportDetail, getUserProperties());
            reportExecutable = reportname;
            reportQueryString = reportService.createBatchQueryString(filterValues, reportDetail);
            Map<String, Object> info = new HashMap<>();
            info.put("reportQueryString", reportQueryString);
            info.put("reportExecutable", reportExecutable);
            info.put("reportName", reportname);
            info.put("reportUrl", getReportUrl(reportQueryString, reportExecutable));
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return FATAL_ERROR;
        }
    }


    public void setPricingFilterListsService(PricingFilterListsService pricingFilterListsService) {
        this.pricingFilterListsService = pricingFilterListsService;
    }

    public PricingFilterListsService getPricingFilterListsService() {
        return pricingFilterListsService;
    }

    public void setReportService(ReportService reportService) {
        this.reportService = reportService;
    }

    public ReportService getReportService() {
        return reportService;
    }


}
