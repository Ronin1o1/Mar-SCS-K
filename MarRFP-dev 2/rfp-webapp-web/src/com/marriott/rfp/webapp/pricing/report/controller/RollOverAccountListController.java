package com.marriott.rfp.webapp.pricing.report.controller;

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

@Security({"MFPADMIN", "MFPUSER", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("/rolloveraccountlist")
public class RollOverAccountListController extends BaseReportController {

    private static final Logger log = LoggerFactory.getLogger(RollOverAccountListController.class);
    @Autowired
    private ConstantsService constService;
    private static final String REPORT_TITLE = "Roll Over Account List";
    private static final String REPORT_EXECUTABLE = "Roll_Over_Account_List";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = false;

    public RollOverAccountListController() {
        super();
    }

    @Autowired
    public RollOverAccountListController(ConstantsService constantsService) {
        super(constantsService);

    }

    @RequestMapping(value = "/getRollOverAccountList", method = GET)
    public String getRollOverAccountList() throws Exception {
        try {
            //setQueryString(getReportExecutable());
            Map<String, Object> info = new HashMap<>();
            info.put("queryString", getQueryString(REPORT_EXECUTABLE));
            info.put("reportTitle", REPORT_TITLE);
            info.put("reportExecutable", REPORT_EXECUTABLE);
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

    private String getQueryString(String reportExecutable) {
        String queryString = "ui.action=run&ui.object=/content/folder[@name='MARRFP']/report[@name='" + reportExecutable + "']&ui.name=" + reportExecutable + "&run.prompt=false&cv.toolbar=false&cv.header=false&run.outputFormat=spreadsheetML";
        return queryString;
    }

}