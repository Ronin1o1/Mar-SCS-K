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

@Security(value = {"MFPADMIN", "MFPUSER", "MFPSALES", "MFPFSALE"})
@RestController
@RequestMapping("gppaccountlist")
public class GppAccountListController extends BaseReportController {

    private static final Logger log= LoggerFactory.getLogger(GppAccountListController.class);
    @Autowired
    private ConstantsService constantsService;
    private static final String REPORT_TITLE = "GPP Account List";
    private static final String REPORT_EXECUTABLE = "GPP_Account_List";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = false;


    public GppAccountListController() {
        super();
    }

    @Autowired
    public GppAccountListController(ConstantsService constantsService) {
        super(constantsService);
       /* setReportTitle("GPP Account List");
        setReportExecutable("GPP_Account_List");
        setBIncludeExcelDownload(false);*/
    }

    @RequestMapping(value = "/getGppAccountList", method = RequestMethod.GET)
    public String getGppAccountList(@RequestParam(required = false,name = "reportTitle", defaultValue =REPORT_TITLE)String reportTitle ,
                                    @RequestParam(required = false,name = "reportExecutable",defaultValue = REPORT_EXECUTABLE)String reportExecutable) throws Exception {
        try {
            //setQueryString();
            Map<String, Object> info = new HashMap<>();
            info.put("queryString", getQueryString());
            info.put("reportTitle", reportTitle);
            info.put("reportExecutable", reportExecutable);
            info.put("bIncludeExcelDownload", BINCLUDE_EXCEL_DOWNLOAD);
            info.put("reportServer", constantsService.getReportOndemandUrl());
            info.put("excelDownloadLocation", constantsService.getExcelDownloadLocation());
            info.put("reportDirectory", RFPConstants.REPORT_DIRECTORY);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    private String getQueryString() {
        String reportExecutable="GPP_Account_List";
        String queryString = "ui.action=run&ui.object=/content/folder[@name='MARRFP']/report[@name='" + reportExecutable + "']&ui.name=" + reportExecutable + "&run.prompt=false&cv.toolbar=false&cv.header=false&run.outputFormat=spreadsheetML";
        return queryString;
    }

}