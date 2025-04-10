package com.marriott.rfp.webapp.rd.roomdef.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.rd.api.RoomDefService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.webapp.common.controller.BaseReportController;
import com.marriott.rfp.webapp.pricing.hotel.controller.HotelRFPFixedRatesController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD", "MFPKORAD"})
@RestController
@RequestMapping("/roomdefdefinitionreport")
public class HotelRoomDefDefinitionReportController extends BaseReportController {

    private static final Logger log = LoggerFactory.getLogger(HotelRoomDefDefinitionReportController.class);
    //Inputs to Cognos Reports (KOR_RateProgram & KOR_RoomPool)
    @Autowired
    private RoomDefService roomDefService;
    @Autowired
    private ConstantsService constService;
    private static final String REPORT_TITLE = "Room Description";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = false;


    public HotelRoomDefDefinitionReportController() {
        super();
    }
    @Autowired
    public HotelRoomDefDefinitionReportController(ConstantsService constantsService, RoomDefService roomDefService) {
        super(constantsService);
       // setReportTitle("Room Description");
        this.roomDefService = roomDefService;
    }
//Didn't find any method for definitionReport as present in struts file
//Execute method to call KOR webservice and insert data to the oracle tables.

    @RequestMapping(value = "/getReport", method = GET)
    public String getReport(String marshaCode, String roomPool, String roomPoolOnly, String hotelName, @RequestParam(required = false,name="reportTitle",defaultValue = REPORT_TITLE )String reportTitle) throws Exception {
        Long reportId=null;
        String reportExecutable = null;
        try {
            reportId = roomDefService.getHotelDataForDefinitionReport(marshaCode, roomPool, roomPoolOnly);
            if (roomPoolOnly.equals("Y")) {
                reportExecutable = "KOR_RoomPool";
            } else {
                reportExecutable = "KOR_RateProgram";
            }
            Map<String, Object> info = new HashMap<>();
            if (reportId != null) {
                //setQueryString(marshaCode, roomPool, roomPoolOnly,hotelName,reportId);
                info.put("QueryString", getQueryString(marshaCode, roomPool, roomPoolOnly,hotelName,reportId));
                info.put("reportId", reportId);
                info.put("reportTitle", reportTitle);
                info.put("reportExecutable", reportExecutable);
                info.put("bIncludeExcelDownload", BINCLUDE_EXCEL_DOWNLOAD);
                info.put("reportServer", constService.getReportOndemandUrl());
                info.put("excelDownloadLocation",constService.getExcelDownloadLocation());
                info.put("reportDirectory", RFPConstants.REPORT_DIRECTORY);
                return objectMapperStream(info);
            } else {
                return RFPConstants.FATAL_ERROR;
            }
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    //method to set input parameters for the cognos report.
    private String getQueryString(String marshaCode, String roomPool, String roomPoolOnly,String hotelName,Long reportId) {

        String reportExecutable = null;
        if (roomPoolOnly.equals("Y")) {
             reportExecutable = "KOR_RoomPool";
        } else {
            reportExecutable = "KOR_RateProgram";
        }

        String queryString = "ui.action=run&ui.object=/content/folder[@name='MARRFP']/report[@name='" + reportExecutable + "']&ui.name=" + reportExecutable + "&run.prompt=false&cv.toolbar=false&cv.header=false&run.outputFormat=PDF";

        if (marshaCode != null && !marshaCode.equals("")) {
            queryString += "&p_marshacode=" + marshaCode + "&p_hotelname=" + hotelName;
        }
        if (roomPool != null && !roomPool.equals("")) {
            queryString += "&p_roompool=" + roomPool;
        }
        queryString += "&p_seqid=" + reportId;
        return queryString;
    }

}
