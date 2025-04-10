package com.marriott.rfp.webapp.pricing.edie.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.edie.api.EdieService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.report.ReportModel;
import com.marriott.rfp.webapp.common.controller.BaseReportBatchController;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = {"MFPADMIN"})
@RestController
@RequestMapping("/ediereportfilterlist")
public class EdieReportFilterListController extends BaseReportBatchController {
    private static final Logger log = LoggerFactory.getLogger(EdieReportFilterListController.class);
    @Autowired
    private ReportService reportService;
    @Autowired
    private EdieService edieService;

    public EdieReportFilterListController() {
        super();
    }

    @Autowired
    public EdieReportFilterListController(ReportService reportService, ConstantsService constantsService, EdieService edieService) {
        super(constantsService);
        setReportService(reportService);
        setEdieService(edieService);

    }

    @RequestMapping(value = "/getFilteredHotelList", method = {GET, POST})
    public String getFilteredHotelList(String strFilterValues) throws Exception {
        PricingFilterSelections filterValues = null;
        try {
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            List<HotelListData> hotelList = reportService.findHotelFilteredList(filterValues, getUserProperties());
            return objectMapperStream(hotelList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/runReport", method = POST)
    public String runReport(String strHotelList, String strFilterValues) throws Exception {
        PricingFilterSelections filterValues = null;
        String reportQueryString = null;
        String reportExecutable = null;
        try {
            Type collectionType = new TypeToken<List<HotelListData>>() {
            }.getType();
            List<HotelListData> hotelList = (List<HotelListData>) fromJson(strHotelList, collectionType);
            if (StringUtils.isNotEmpty(strFilterValues)) {
                filterValues = new ObjectMapper().readValue(strFilterValues, PricingFilterSelections.class);
            }
            Long filterId = reportService.updateList(hotelList, filterValues.getHighlightedOnly());
            edieService.updateProfileUsage(filterValues.getEdieProfile().longValue(), getUserProperties());
            String reportname = "NBTA_edie";
            ReportModel reportDetail = new ReportModel();
            reportDetail.setPriority((long) 400);
            reportDetail.setIs_electronic("Y");
            reportDetail.setAllow_period("Y");
            reportDetail.setAllow_dateformat("Y");
            reportExecutable=reportname;
            reportQueryString=reportService.createBatchQueryStringEDIE(filterValues, reportDetail, filterId);
            Map<String, Object> responseObject = new HashMap<>();
            responseObject.put("reportExecutable", reportExecutable);
            responseObject.put("reportQueryString", reportQueryString);
            return objectMapperStream(responseObject);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    public void setReportService(ReportService reportService) {
        this.reportService = reportService;
    }

    public ReportService getReportService() {
        return reportService;
    }

    public EdieService getEdieService() {
        return edieService;
    }

    public void setEdieService(EdieService edieService) {
        this.edieService = edieService;
    }

}
