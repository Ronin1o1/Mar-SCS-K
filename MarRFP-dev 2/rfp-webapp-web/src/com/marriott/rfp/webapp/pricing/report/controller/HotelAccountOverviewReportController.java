package com.marriott.rfp.webapp.pricing.report.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.webapp.common.controller.BaseReportController;
import org.apache.commons.lang.StringUtils;
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
@RequestMapping("hotelaccountoverview")
public class HotelAccountOverviewReportController extends BaseReportController {

    private static final Logger log= LoggerFactory.getLogger(HotelAccountOverviewReportController.class);
    /* Cognos : on-demand report ends */
    @Autowired
    private ConstantsService constantsService;
    private static final String REPORT_TITLE = "Account Overview Report";
    private static final String REPORT_EXECUTABLE = "AccountOverviewHotel";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = false;

    public HotelAccountOverviewReportController() {
        super();
    }

    @Autowired
    public HotelAccountOverviewReportController(ConstantsService constantsService) {
        super(constantsService);
    }

    @RequestMapping(value = "/getHotelAccountOverviewReport", method = RequestMethod.GET)
    public String getHotelAccountOverviewReport(String paccount, String pmarketinfo,@RequestParam(required = false,name="reportTitle",defaultValue = REPORT_TITLE)String  reportTitle ,
                                                @RequestParam(required = false,name="reportExecutable",defaultValue =REPORT_EXECUTABLE)String reportExecutable) throws Exception {
        try {
            if(StringUtils.isEmpty(pmarketinfo)){
                pmarketinfo = "Y";
            }
            Map<String, Object> info = new HashMap<>();
            info.put("reportQueryString", getQueryString(paccount, pmarketinfo));
            info.put("reportTitle", reportTitle);
            info.put("reportExecutable", reportExecutable);
            info.put("bIncludeExcelDownload", BINCLUDE_EXCEL_DOWNLOAD);
            info.put("reportServer",constantsService.getReportOndemandUrl());
            info.put("excelDownloadLocation",constantsService.getExcelDownloadLocation());
            info.put("reportDirectory", RFPConstants.REPORT_DIRECTORY);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    private String getQueryString(String paccount, String pmarketinfo) {
        String reportExecutable="AccountOverviewHotel";
        String queryString = "ui.action=run&ui.object=/content/folder[@name='MARRFP']/report[@name='" + reportExecutable + "']&ui.name=" + reportExecutable + "&run.prompt=false&cv.toolbar=false&cv.header=false&run.outputFormat=PDF";
        queryString += "&p_paccount=" + paccount;
        queryString += "&p_pmarketinfo=" + pmarketinfo;
        return queryString;
    }

}
