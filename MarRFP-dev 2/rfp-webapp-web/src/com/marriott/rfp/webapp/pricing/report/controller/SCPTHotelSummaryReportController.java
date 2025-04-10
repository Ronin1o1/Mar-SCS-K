package com.marriott.rfp.webapp.pricing.report.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.webapp.common.controller.BaseReportController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Security({"MFPADMIN", "MFPUSER"})
@RestController
@RequestMapping(value = "/scptsummaryreport")
public class SCPTHotelSummaryReportController extends BaseReportController {

    private static final Logger log = LoggerFactory.getLogger(SCPTHotelSummaryReportController.class);
    /* Cognos : on-demand report ends */
    @Autowired
    private ConstantsService constService;
    private static final String REPORT_TITLE = "Special Corporate Pricing Tool Summary";
    private static final String REPORT_EXECUTABLE = "SCPTSummary";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = false;
    public SCPTHotelSummaryReportController() {
        super();
    }

    @Autowired
    public SCPTHotelSummaryReportController(ConstantsService constantsService) {
        super(constantsService);
        /*setReportTitle("Special Corporate Pricing Tool Summary");
        setReportExecutable("SCPTSummary");
        setBIncludeExcelDownload(false);*/
    }

    @RequestMapping(value = "/getSCPTHSummaryReport", method = RequestMethod.GET)
    public String getSCPTHSummaryReport( @RequestParam(required = false,name="reportTitle",defaultValue =REPORT_TITLE )String reportTitle,
                                         @RequestParam(required = false,name="reportExecutable",defaultValue = REPORT_EXECUTABLE)String reportExecutable) throws Exception {
        try {
            Map<String, Object> info = new HashMap<>();
            info.put("reportTitle", reportTitle);
            info.put("reportExecutable", reportExecutable);
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

    @RequestMapping(value = "/getSCPTHotelSummaryReport", method = {RequestMethod.GET,RequestMethod.POST})
    public String getSCPTHotelSummaryReport(Long hotelid, Long period,@RequestParam(required = false,name="reportTitle",defaultValue =REPORT_TITLE )String reportTitle,
                                            @RequestParam(required = false,name="reportExecutable",defaultValue = REPORT_EXECUTABLE)String reportExecutable) throws Exception {
        try {
            //setQueryString(hotelid, period);
            Map<String, Object> info = new HashMap<>();
            info.put("reportTitle", reportTitle);
            info.put("reportExecutable", reportExecutable);
            info.put("bIncludeExcelDownload", BINCLUDE_EXCEL_DOWNLOAD);
            info.put("reportServer",constService.getReportOndemandUrl());
            info.put("excelDownloadLocation", constService.getExcelDownloadLocation());
            info.put("reportDirectory", RFPConstants.REPORT_DIRECTORY);
            info.put("reportQueryString",getQueryString(hotelid, period));
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    private String getQueryString(Long hotelid, Long period) {
        /* Cognos : on-demand report parameters change starts */
        String reportExecutable="SCPTSummary";
        String queryString = "ui.action=run&ui.object=/content/folder[@name='MARRFP']/report[@name='" + reportExecutable + "']&ui.name=" + reportExecutable + "&run.prompt=false&cv.toolbar=false&cv.header=false&run.outputFormat=PDF";
        queryString += "&p_pHotelid=" + hotelid + "&p_period=" + period;
        return queryString;
        /* Cognos : on-demand report parameters change ends */
    }



}
