package com.marriott.rfp.webapp.pricing.report.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.pricing.hotelrfp.FinalPrintReportData;
import com.marriott.rfp.webapp.common.controller.BaseReportController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/hotelfinalprintreport")
@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
public class HotelFinalPrintReportController extends BaseReportController {

    private static final Logger log = LoggerFactory.getLogger(HotelFinalPrintReportController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;
    @Autowired
    private ConstantsService constService;
    private static final String REPORT_TITLE = "Final Print";
    private static final String REPORT_EXECUTABLE = "finalprint";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = false;

    public HotelFinalPrintReportController() {
        super();
    }

    @Autowired
    public HotelFinalPrintReportController(ConstantsService constantsService) {
        super(constantsService);
    }


    @RequestMapping(value = "/getFinalPrintReport", method = RequestMethod.GET)
    public String getFinalPrintReport(String hotelrfpid,String accountrecid) throws Exception {
        try {
            Map<String, Object> info = new HashMap<>();
            info.put("title", REPORT_TITLE);
            info.put("executable", REPORT_EXECUTABLE);
            info.put("BIncludeExcel", BINCLUDE_EXCEL_DOWNLOAD);
            info.put("queryString", getQueryString(hotelrfpid,accountrecid));
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getDisplay", method = RequestMethod.GET)
    public String getDisplay(Long hotelid, Long accountid) throws Exception {
        try {
            List<FinalPrintReportData> finalPrintReportData = hotelRFPAccountSpecificService.findFinalPrintReportPeriods(hotelid, accountid, getUserProperties().getRole());
            return objectMapperStream(finalPrintReportData);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    private String getQueryString(String hotelrfpid,String accountrecid) {
        /* Cognos : on-demand report parameters change starts */
        String reportExecutable = "finalprint";
        String queryString = "ui.action=run&ui.object=/content/folder[@name='MARRFP']/report[@name='" + reportExecutable + "']&ui.name=" + reportExecutable + "&run.prompt=false&cv.toolbar=false&cv.header=false&run.outputFormat=PDF";
        queryString += "&p_pRFPID=" + hotelrfpid;
        if (accountrecid != null) {
            queryString += "&p_pAccount=" + accountrecid;
        }
        /* Cognos : on-demand report parameters change ends */
        return queryString;
    }


    public HotelRFPAccountSpecificService getHotelRFPAccountSpecificService() {
        return hotelRFPAccountSpecificService;
    }

    public void setHotelRFPAccountSpecificService(
            HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }


}

