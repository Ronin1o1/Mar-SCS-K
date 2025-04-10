package com.marriott.rfp.webapp.pricing.report.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.webapp.common.controller.BaseReportController;
import org.slf4j.ILoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

@Security({"MFPADMIN", "MFPUSER"})
@RestController
@RequestMapping("scptaccounthistoryreport")
public class SCPTAccountHistoryReportController extends BaseReportController {

    private static final Logger log= LoggerFactory.getLogger(SCPTAccountHistoryReportController.class);
    @Autowired
    private ConstantsService constService;
    private static final String REPORT_TITLE = "SCPT Account History Report";
    private static final String REPORT_EXECUTABLE = "eSCPTAccountHistory";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = true;

    public SCPTAccountHistoryReportController() {
        super();
    }

    @Autowired
    public SCPTAccountHistoryReportController(ConstantsService constantsService) {
        super(constantsService);
    }

    @RequestMapping(value = "/getSCPTAccountHistoryReport", method = RequestMethod.GET)
    public String getSCPTAccountHistoryReport(Long hotelid, Long period,
                   @RequestParam(required = false, name= "reportTitle",defaultValue = REPORT_TITLE)String reportTitle,
                   @RequestParam(required = false,name="reportExecutable",defaultValue = REPORT_EXECUTABLE)String reportExecutable) throws Exception {
        try {
            Map<String, Object> info = new HashMap<>();
            info.put("reportQueryString", getQueryString(hotelid, period,reportExecutable));
            info.put("reportTitle", reportTitle);
            info.put("reportServer", constService.getReportOndemandUrl());
            info.put("reportExecutable", reportExecutable);
            info.put("bIncludeExcelDownload", BINCLUDE_EXCEL_DOWNLOAD);
            info.put("excelDownloadLocation", constService.getExcelDownloadLocation());
            info.put("reportDirectory", RFPConstants.REPORT_DIRECTORY);
            return objectMapperStream(info);
        } catch (Exception e) {
           log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    private String getQueryString(Long hotelid, Long period,String reportExecutable) {
        /* Cognos : on-demand report parameters change starts */
        String queryString = "ui.action=run&ui.object=/content/folder[@name='MARRFP']/report[@name='" + reportExecutable + "']&ui.name=" + reportExecutable + "&run.prompt=false&cv.toolbar=false&cv.header=false&run.outputFormat=spreadsheetML";
        queryString += "&p_pHotel=" + hotelid + "&p_period=" + period;
        return queryString;
        /* Cognos : on-demand report parameters change ends */
    }



}
