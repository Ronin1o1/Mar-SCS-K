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
@RequestMapping("hotelnearestfacilityreport")
public class HotelNearestFacilityReportController extends BaseReportController {

    private static final Logger log = LoggerFactory.getLogger(HotelNearestFacilityReportController.class);
    @Autowired
    private ConstantsService constantsService;
    private static final String REPORT_TITLE = "Nearest Facility Report";
    private static final String REPORT_EXECUTABLE = "NearestFacility";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = false;
    /* Cognos : on-demand report ends */
    public HotelNearestFacilityReportController() {
        super();
    }

    @Autowired
    public HotelNearestFacilityReportController(ConstantsService constantsService) {
        super(constantsService);

    }

    @RequestMapping(value = "/getHotelNearestFacilityReport", method = RequestMethod.GET)
    public String getHotelNearestFacilityReport(Long hotelid, Long period) throws Exception {

        try {
           // setQueryString(hotelid, period,reportExecutable);
            Map<String, Object> info = new HashMap<>();
            info.put("reportQueryString", getQueryString(hotelid, period,REPORT_EXECUTABLE));
            info.put("reportTitle", REPORT_TITLE);
            info.put("reportExecutable", REPORT_EXECUTABLE);
            info.put("bIncludeExcelDownload", BINCLUDE_EXCEL_DOWNLOAD);
            info.put("excelDownloadLocation", constantsService.getExcelDownloadLocation());
            info.put("reportDirectory", RFPConstants.REPORT_DIRECTORY);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    private String getQueryString(Long hotelid, Long period, String reportExecutable) {
        /* Cognos : on-demand report removed ".rox"  starts*/
        String queryString = "ui.action=run&ui.object=/content/folder[@name='MARRFP']/report[@name='" + reportExecutable + "']&ui.name=" + reportExecutable + "&run.prompt=false&cv.toolbar=false&cv.header=false&run.outputFormat=PDF";
        queryString += "&p_pHotelid=" + hotelid;
        queryString += "&p_period=" + period;
//		queryString = "NearestFacility&format=PDF&Download=true&prompt=false&p_pHotelid="+ hotelid +"&p_period="+ period;
        /* Cognos : on-demand report removed ".rox"  ends*/
        return queryString;
    }



}
