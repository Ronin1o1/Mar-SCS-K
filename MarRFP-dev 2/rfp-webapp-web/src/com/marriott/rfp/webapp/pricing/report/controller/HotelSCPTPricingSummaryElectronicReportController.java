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

@Security({"MFPADMIN", "MFPUSER"})
@RestController
@RequestMapping(value = "/hotelscptpsumelectronic")
public class HotelSCPTPricingSummaryElectronicReportController extends BaseHotelElectronicReportController {

    private static final Logger log = LoggerFactory.getLogger(HotelSCPTPricingSummaryElectronicReportController.class);
    @Autowired
    private ConstantsService constantsService;
    private static final String REPORT_TITLE = "SCPT Summary Extract";
    private static final String REPORT_EXECUTABLE = "eSCPTPricingSummary";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = true;
    private static final String PARAM_SCREEN_TITLE = "SCPT Pricing Summary";

    public HotelSCPTPricingSummaryElectronicReportController() {
        super();
    }

    @Autowired
    public HotelSCPTPricingSummaryElectronicReportController(ConstantsService constantsService, HotelService hotelService, ReportService reportService) {
        super(constantsService, hotelService, reportService);

    }

    @RequestMapping(value = "/getHotelSCPTPricingSummaryElectronicReport", method = RequestMethod.GET)
    public String getHotelSCPTPricingSummaryElectronicReport() throws Exception {
        String paramAction=null;
        String reportSubmitAction=null;
        Long numHotelsAllowed = 20L;
        try {

            Map<String, Object> info = new HashMap<>();
            info.put("reportTitle", REPORT_TITLE);
            info.put("reportExecutable", REPORT_EXECUTABLE);
            info.put("paramAction", paramAction);
            info.put("reportSubmitAction", reportSubmitAction);
            info.put("paramScreenTitle", PARAM_SCREEN_TITLE);
            info.put("numHotelsAllowed", numHotelsAllowed);
            info.put("bIncludeExcelDownload", BINCLUDE_EXCEL_DOWNLOAD);
            info.put("reportServer", constantsService.getReportOndemandUrl());
            info.put("excelDownloadLocation",constantsService.getExcelDownloadLocation());
            info.put("reportDirectory", RFPConstants.REPORT_DIRECTORY);

            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/scptPricingSummaryParams", method = RequestMethod.GET)
    public String getParameters(Integer orderBy) throws Exception {
        return super.getParameters(orderBy);
    }

    @RequestMapping(value = "/getHotelElectronicReport", method = RequestMethod.POST)
    public String getHotelElectronicReport(String strHotelids,Long period) throws Exception {
        return super.getHotelElectronicReport(strHotelids,period,REPORT_EXECUTABLE);
    }
}
