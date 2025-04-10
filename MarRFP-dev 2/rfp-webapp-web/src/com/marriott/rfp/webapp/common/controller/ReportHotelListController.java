package com.marriott.rfp.webapp.common.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.report.ReportModel;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ReportHotelListController extends BaseReportBatchController {

    private static final Logger log = LoggerFactory.getLogger(ReportHotelListController.class);
    @Autowired
    private ReportService reportService;


    public ReportHotelListController() {
        super();
    }

    @Autowired
    public ReportHotelListController(ReportService reportService, ConstantsService constantsService) {
        super(constantsService);
        setReportService(reportService);
    }

    public String getHotelFilteredList(String strFilterValues) throws Exception {
        try {
            PricingFilterSelections filterValues=null;
            if(StringUtils.isNotEmpty(strFilterValues))
                 filterValues=new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            List<HotelListData>  hotelList = reportService.findHotelFilteredList(filterValues, getUserProperties());
            return objectMapperStream(hotelList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public String update() throws Exception {
        try {
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    public String runReport(String strFilterValues, String strHotelList) throws Exception {
        String reportQueryString = null;
        String reportExecutable = null;
        try {
            PricingFilterSelections filterValues=null;
            Type collectionType = new TypeToken<List<HotelListData>>() {
            }.getType();
            List<HotelListData>  hotelList = (List<HotelListData>) fromJson(strHotelList, collectionType);
            if (StringUtils.isNotEmpty(strFilterValues)) {
                   filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            Long filterId = reportService.updateList(hotelList, filterValues.getHighlightedOnly());
            String reportname = filterValues.getReport();
            ReportModel reportDetail = reportService.findReportDetails(reportname);
	    /*if (reportname.equals("PRReportIntl"))
		reportname = "PRReport";*/
            reportExecutable=reportname;
            reportQueryString=reportService.createBatchQueryString(filterValues, reportDetail, filterId);
            Map<String, Object> info = new HashMap<>();
            info.put("reportQueryString", reportQueryString);
            info.put("reportExecutable", reportExecutable);
            info.put("reportName", reportname);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    public void setReportService(ReportService reportService) {
        this.reportService = reportService;
    }

}
