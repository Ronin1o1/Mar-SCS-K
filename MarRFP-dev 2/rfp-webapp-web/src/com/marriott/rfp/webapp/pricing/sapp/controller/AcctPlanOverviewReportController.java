package com.marriott.rfp.webapp.pricing.sapp.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.webapp.common.controller.BaseReportController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPAPADM", "MFPADMIN", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/acctPlanOverviewReport")
public class AcctPlanOverviewReportController extends BaseReportController {

    private static final Logger log = LoggerFactory.getLogger(AcctPlanOverviewReportController.class);
    @Autowired
    private ConstantsService constantsService;
    private static final String REPORT_TITLE = "Account Overview Report";
    private static final String REPORT_EXECUTABLE = "AccountOverview";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = false;

    public AcctPlanOverviewReportController() {
        super();
    }

    @Autowired
    public AcctPlanOverviewReportController(ConstantsService constantsService) {
        super(constantsService);

    }

    @RequestMapping(value = "/getAcctPlanOverviewReport", method = GET)
    public String getAcctPlanOverviewReport(String paccount,String pmarketinfo) throws Exception {
        try {
            Map<String, Object> info = new HashMap<>();
            info.put("reportQueryString", getQueryString(paccount, pmarketinfo));
            info.put("reportTitle", REPORT_TITLE);
            info.put("reportExecutable", REPORT_EXECUTABLE);
            info.put("bIncludeExcelDownload", BINCLUDE_EXCEL_DOWNLOAD);
            info.put("reportServer", constantsService.getReportOndemandUrl());
            info.put("excelDownloadLocation", constantsService.getExcelDownloadLocation());
            info.put("reportDirectory", RFPConstants.REPORT_DIRECTORY);
            return objectMapperStream(info);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    private String getQueryString(String paccount,String pmarketinfo) {
        /* Cognos : on-demand report parameters change starts */
        String reportExecutable = "AccountOverview";
        String queryString = "ui.action=run&ui.object=/content/folder[@name='MARRFP']/report[@name='" + reportExecutable + "']&ui.name=" + reportExecutable + "&run.prompt=false&cv.toolbar=false&cv.header=false&run.outputFormat=PDF";
        queryString += "&p_paccount=" + paccount + "&p_pmarketinfo=" + pmarketinfo;
        return queryString;
        /* Cognos : on-demand report parameters change ends */
    }


}
