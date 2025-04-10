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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping(value = "/hotelacceptancestatusexcelreport")
public class HotelAcceptanceStatusExcelReportController extends BaseHotelElectronicReportController {

    private static final Logger log= LoggerFactory.getLogger(HotelAcceptanceStatusExcelReportController.class);

    @Autowired
    private ConstantsService constService;
    private static final String PARAM_SCREEN_TITLE = "Acceptance Status Excel";
    private static final String REPORT_TITLE = "Acceptance Status Excel Report";
    private static final String REPORT_EXECUTABLE = "AcceptanceStatus_Excel";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = true;

    public HotelAcceptanceStatusExcelReportController() {
        super();
    }

    @Autowired
    public HotelAcceptanceStatusExcelReportController(ConstantsService constantsService, HotelService hotelService, ReportService reportService) {
        super(constantsService, hotelService, reportService);

    }

    @RequestMapping(value = "/getHotelAcceptanceStatusExcelReport", method = RequestMethod.GET)
    public String getHotelAcceptanceStatusExcelReport( @RequestParam(required = false,name="paramScreenTitle",defaultValue = PARAM_SCREEN_TITLE)String paramScreenTitle,
                @RequestParam(required = false,name="reportTitle",defaultValue =REPORT_TITLE )String reportTitle,
                @RequestParam(required = false,name="reportExecutable",defaultValue = REPORT_EXECUTABLE)String reportExecutable) throws Exception {
        String paramAction=null;
        String reportSubmitAction=null;
        Long numHotelsAllowed = 40L;
        try {

            Map<String, Object> info = new HashMap<>();
            info.put("reportTitle", reportTitle);
            info.put("reportExecutable", reportExecutable);
            info.put("paramAction", paramAction);
            info.put("reportSubmitAction", reportSubmitAction);
            info.put("paramScreenTitle", paramScreenTitle);
            info.put("numHotelsAllowed", numHotelsAllowed);
            info.put("bIncludeExcelDownload", BINCLUDE_EXCEL_DOWNLOAD);
            info.put("reportServer", constService.getReportOndemandUrl());
            info.put("excelDownloadLocation", constService.getExcelDownloadLocation());
            info.put("reportDirectory", RFPConstants.REPORT_DIRECTORY);

            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/hotelAcceptanceStatusExcelReportParams", method = RequestMethod.GET)
    public String getParameters(Integer orderBy) throws Exception {
        return super.getParameters(orderBy);
    }

    @RequestMapping(value = "/getHotelElectronicReport", method = RequestMethod.POST)
    public String getHotelElectronicReport(String strHotelids,Long period,@RequestParam(required = false,name="reportExecutable",defaultValue = REPORT_EXECUTABLE)String reportExecutable) throws Exception {
        return super.getHotelElectronicReport(strHotelids,period,reportExecutable);
    }
}
