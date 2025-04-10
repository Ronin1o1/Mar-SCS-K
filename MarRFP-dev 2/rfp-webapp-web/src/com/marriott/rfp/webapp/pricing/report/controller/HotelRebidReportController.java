package com.marriott.rfp.webapp.pricing.report.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.common.util.RFPConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Security({"MFPADMIN", "MFPUSER", "MFPFSALE"})
@RestController
@RequestMapping(value = "/hotelrebidreport")
public class HotelRebidReportController extends BaseHotelElectronicReportController {
    private static final Logger log = LoggerFactory.getLogger(HotelRebidReportController.class);
    private static final String  PARAM_SCREEN_TITLE = "Rebid Report";

    @Autowired
    private ConstantsService constService;
    private static final String REPORT_TITLE = "Rebid Report";
    private static final String REPORT_EXECUTABLE = "eRebidReport";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = true;

    public HotelRebidReportController() {
        super();
    }

    @Autowired
    public HotelRebidReportController(ConstantsService constantsService, HotelService hotelService, ReportService reportService) {
        super(constantsService, hotelService, reportService);

    }

    @RequestMapping(value = "/getHotelRebidReport", method = RequestMethod.GET)
    public String getHotelRebidReport() throws Exception {
         String paramAction=null;
        String reportSubmitAction=null;
        Long numHotelsAllowed = 20L;
        try {

            Map<String, Object> info = new HashMap<>();
            info.put("reportTitle", REPORT_TITLE);
           info.put("reportExecutable",REPORT_EXECUTABLE);
            info.put("paramAction", paramAction);
            info.put("reportSubmitAction", reportSubmitAction);
            info.put("paramScreenTitle", PARAM_SCREEN_TITLE);
            info.put("numHotelsAllowed", numHotelsAllowed);
            info.put("bIncludeExcelDownload", BINCLUDE_EXCEL_DOWNLOAD);
            info.put("reportServer", constService.getReportOndemandUrl());
            info.put("excelDownloadLocation", constService.getExcelDownloadLocation());
            info.put("reportDirectory", RFPConstants.REPORT_DIRECTORY);

            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/rebidReportParams", method = RequestMethod.GET)
    public String getParameters(Integer orderBy) throws Exception {
        return super.getParameters(orderBy);
    }

    @RequestMapping(value = "/rebidReportParams", method = RequestMethod.POST)
    public String getHotelElectronicReport(String strHotelids,Long period) throws Exception {
        return super.getHotelElectronicReport(strHotelids,period,REPORT_EXECUTABLE);
    }
}
