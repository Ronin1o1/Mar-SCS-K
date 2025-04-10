package com.marriott.rfp.webapp.pricing.report.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.webapp.common.controller.BaseReportController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping(value = "/hotelacceptancestatusreport")
public class HotelAcceptanceStatusReportController extends BaseReportController {

    private static final Logger log= LoggerFactory.getLogger(HotelAcceptanceStatusReportController.class);
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private ReportService reportService;
    @Autowired
    private ConstantsService constService;
    private static final String REPORT_TITLE = "Acceptance Status Report";
    private static final String REPORT_EXECUTABLE = "AcceptanceStatus";
    private static final String PARAM_SCREEN_TITLE = "Acceptance Status";

    public HotelAcceptanceStatusReportController() {
        super();
    }

    @Autowired
    public HotelAcceptanceStatusReportController(ConstantsService constantsService) {
        super(constantsService);
    }


    @RequestMapping(value = "/getHotelAcceptanceReport", method = RequestMethod.GET)
    public String getHotelAcceptanceReport(@RequestParam(required = false,name="paramScreenTitle",defaultValue = PARAM_SCREEN_TITLE)String paramScreenTitle,
                                             @RequestParam(required = false,name="reportTitle",defaultValue = REPORT_TITLE)String  reportTitle ,
                                           @RequestParam(required = false,name="reportExecutable",defaultValue =REPORT_EXECUTABLE)String reportExecutable) throws Exception {

        Long numHotelsAllowed = 40L;
        String reportSubmitAction = null;
        String paramAction=null;
        try {
            Map<String, Object> info = new HashMap<>();
            info.put("reportTitle", reportTitle);
            info.put("reportExecutable", reportExecutable);
            info.put("paramAction", paramAction);
            info.put("reportSubmitAction", reportSubmitAction);
            info.put("paramScreenTitle", paramScreenTitle);
            info.put("numHotelsAllowed", numHotelsAllowed);
            info.put("reportServer", constService.getReportOndemandUrl());
            info.put("excelDownloadLocation", constService.getExcelDownloadLocation());
            info.put("reportDirectory", RFPConstants.REPORT_DIRECTORY);

            return objectMapperStream(info);
        } catch (Exception e) {
           log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }


    @RequestMapping(value = "/getHotelAcceptanceStatusReport", method = RequestMethod.POST)
    public String getHotelAcceptanceStatusReport(String strHotelids, Integer period, Integer orderBy) throws Exception {
        List<Long> hotelids = null;
        Long hotelfilterid = null;
        String reportExecutable = "AcceptanceStatus";
        try {
            Type collectionType = new TypeToken<List<Long>>() {
            }.getType();
            hotelids = fromJson(strHotelids, collectionType);
            hotelfilterid = reportService.updateList(hotelids);
            //setQueryString(reportExecutable,hotelfilterid,period);
            Map<String, Object> info = new HashMap<>();
            info.put("hotelfilterid", hotelfilterid);
            info.put("reportQueryString",  getQueryString(reportExecutable,hotelfilterid,period));
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }


    @RequestMapping(value = "/hotelAcceptanceStatusReportParams", method = RequestMethod.GET)
    public String getParameters(Integer orderBy) throws Exception {
        try {
            List<HotelListData> hotelList =hotelService.findAllPropertiesForPricing(getUserProperties(), orderBy);

            return objectMapperStream(hotelList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }


    public String getQueryString(String reportExecutable,Long hotelfilterid,long period) {
        /*Cognos : Passing parameter name change - appended with prefix "p_"(ex:pAccount->p_pAccount) starts	*/
        String queryString = "ui.action=run&ui.object=/content/folder[@name='MARRFP']/report[@name='" + reportExecutable + "']&ui.name=" + reportExecutable + "&run.prompt=false&cv.toolbar=false&cv.header=false&run.outputFormat=PDF";
        queryString += "&p_pHotelFilterID=" + hotelfilterid;
        queryString += "&p_period=" + period;
//		queryString = "AcceptanceStatus&format=PDF&Download=true&prompt=false&p_pHotelFilterID="+ hotelfilterid +"&p_period="+ period;
        /*Cognos : Passing parameter name change - appended with prefix "p_"(ex:pAccount->p_pAccount) ends	*/
        return queryString;
    }


    public void setHotelService(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    public HotelService getHotelService() {
        return hotelService;
    }


    public void setReportService(ReportService reportService) {
        this.reportService = reportService;
    }

    public ReportService getReportService() {
        return reportService;
    }



}
