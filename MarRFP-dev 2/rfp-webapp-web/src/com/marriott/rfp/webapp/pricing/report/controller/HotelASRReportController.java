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
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("hotelasrreport")
public class HotelASRReportController extends BaseReportController {
    private static final Logger log = LoggerFactory.getLogger(HotelASRReportController.class);
    @Autowired
    private ConstantsService constantsService;
    private static final String REPORT_TITLE = "Acceptance Status Report";
    private static final String REPORT_EXECUTABLE = "AcceptanceStatus.rox";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = false;

    public HotelASRReportController() {
        super();
    }

    @Autowired
    public HotelASRReportController(ConstantsService constantsService) {
        super(constantsService);
    }

    @RequestMapping(value = "/getHotelASRReport", method = RequestMethod.GET)
    public String getHotelASRReport(Long hotelid, Long period) throws Exception {
        try {
            //setQueryString(hotelid, period);
            Map<String, Object> info = new HashMap<>();
            info.put("reportQueryString", getQueryString(hotelid, period));
            info.put("reportTitle", REPORT_TITLE);
            info.put("reportExecutable", REPORT_EXECUTABLE);
            info.put("bIncludeExcelDownload",BINCLUDE_EXCEL_DOWNLOAD);
            info.put("excelDownloadLocation",  constantsService.getExcelDownloadLocation());
            info.put("reportDirectory", RFPConstants.REPORT_DIRECTORY);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    private String getQueryString(Long hotelid, Long period) {
        String queryString = "pHotelid=" + hotelid;
        queryString += "&period=" + period;
        return queryString;
    }

}
