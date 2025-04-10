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

@Security(value = {"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("hotelnearestfacilityelectronic")
public class HotelNearestFacilityElectronicReportController extends BaseReportController {

    private static final Logger log = LoggerFactory.getLogger(HotelNearestFacilityElectronicReportController.class);
    @Autowired
    private ConstantsService constantsService;
    private static final String REPORT_TITLE = "Nearest Facility  Excel Report";
    private static final String REPORT_EXECUTABLE = "eNearestFacility";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = true;
    /* Cognos : on-demand report ends */
    public HotelNearestFacilityElectronicReportController() {
        super();
    }

    @Autowired
    public HotelNearestFacilityElectronicReportController(ConstantsService constantsService) {
        super(constantsService);

    }

    @RequestMapping(value = "/getHotelNearestFacilityElectronicReport", method = RequestMethod.GET)
    public String getHotelNearestFacilityElectronicReport(Long period, Long hotelid) throws Exception {
        try {
            Map<String, Object> info = new HashMap<>();
            info.put("reportQueryString", getQueryString(period, hotelid,REPORT_EXECUTABLE));
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

    private String getQueryString(Long period, Long hotelid,String reportExecutable) {

        /* Cognos : on-demand report parameters change starts */
        String queryString = "ui.action=run&ui.object=/content/folder[@name='MARRFP']/report[@name='" + reportExecutable + "']&ui.name=" + reportExecutable + "&run.prompt=false&cv.toolbar=false&cv.header=false&run.outputFormat=spreadsheetML";
        queryString += "&p_period=" + period;
        queryString += "&p_pHotelid=" + hotelid;
        /* Cognos : on-demand report parameters change ends */
        return queryString;
    }




}
