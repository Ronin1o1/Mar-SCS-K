package com.marriott.rfp.webapp.pricing.report.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.utility.DateUtility;
import com.marriott.rfp.utility.StringUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("hotelselfauditelectronic")
public class HoteSelfAuditElectronicReportController extends BaseHotelElectronicReportController {

    private static final Logger log = LoggerFactory.getLogger(HoteSelfAuditElectronicReportController.class);
    @Autowired
    private ConstantsService constService;
    @Autowired
    private ReportService reportService;
    private static final String REPORT_TITLE = "Hotel Self Audit - Amenities, Safety & Security";
    private static final String REPORT_EXECUTABLE = "NBTA_edie.rox";
    private static final boolean BINCLUDE_EXCEL_DOWNLOAD = true;
    private static final String  PARAM_SCREEN_TITLE = "Hotel Self Audit - Amenities, Safety & Security";

    public HoteSelfAuditElectronicReportController() {
        super();
    }

    @Autowired
    public HoteSelfAuditElectronicReportController(ConstantsService constantsService, HotelService hotelService, ReportService reportService) {
        super(constantsService, hotelService, reportService);
       // setReportTitle("Hotel Self Audit - Amenities, Safety & Security");
        //setReportExecutable("NBTA_edie.rox");
//		setParamAction("/hotelselfauditelectronic/hotelSelfAuditParams.action");
//		setReportSubmitAction("/hotelselfauditelectronic/hotelSelfAuditReport.action");
 //       setParamScreenTitle("Hotel Self Audit - Amenities, Safety & Security");
 //       setNumHotelsAllowed(999999L);
        setConstService(constantsService);
    }

    @RequestMapping(value = "/getHotelSelfAuditElectronicReport", method = RequestMethod.GET)
    public String getHotelSelfAuditElectronicReport(@RequestParam(required = false,name="paramScreenTitle",defaultValue = PARAM_SCREEN_TITLE)String paramScreenTitle,
             @RequestParam(required = false,name="reportTitle",defaultValue =REPORT_TITLE )String reportTitle,
             @RequestParam(required = false,name="reportExecutable",defaultValue = REPORT_EXECUTABLE)String reportExecutable) throws Exception {
        String paramAction=null;
        String reportSubmitAction=null;
        Long numHotelsAllowed = 999999L;
        try {

            Map<String, Object> info = new HashMap<>();
            info.put("reportTitle", reportTitle);
            info.put("reportExecutable", reportExecutable);
            info.put("paramAction", paramAction);
            info.put("reportSubmitAction", reportSubmitAction);
            info.put("paramScreenTitle", paramScreenTitle);
            info.put("numHotelsAllowed", numHotelsAllowed);
           info.put("bIncludeExcelDownload", BINCLUDE_EXCEL_DOWNLOAD);
            info.put("reportServer", constService.getReportOndemandUrl());
            info.put("excelDownloadLocation", constService.getExcelDownloadLocation());
            info.put("reportDirectory", RFPConstants.REPORT_DIRECTORY);

            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/hotelSelfAuditParams", method = RequestMethod.GET)
    public String getParameters(Integer orderBy) throws Exception {
        return super.getParameters(orderBy);
    }

    @RequestMapping(value = "/getHotelElectronicReport", method = RequestMethod.POST)
    public String getHotelElectronicReport(String strHotelids, Integer orderBy, Long period,
              @RequestParam(required = false,name="reportExecutable",defaultValue = REPORT_EXECUTABLE)String reportExecutable) throws Exception {
        //return super.getHotelElectronicReport(strHotelids,period,REPORT_EXECUTABLE);
        Type collectionType = new TypeToken<List<Long>>() {
        }.getType();
        List<Long> hotelids = fromJson(strHotelids, collectionType);
        Long hotelfilterid = reportService.updateList(hotelids);
        //setQueryString(hotelfilterid,period);
        Map<String, Object> info = new HashMap<>();
        info.put("hotelfiterid", hotelfilterid);
        info.put("reportQueryString", super.getQueryString(hotelfilterid,period,REPORT_EXECUTABLE));
        info.put("reportQueryString2",getQueryString2(hotelfilterid,period));
        return objectMapperStream(info);
    }

    public String getQueryString2(Long hotelfilterid, long period) {

        /*long period = 0;
        Long hotelfilterid=null;*/
//		String profileid=getConstantsService().getHotelEdieAuditProfile();
//		String queryString = "pHotelFilterID=" + getHotelfilterid();
//		queryString += "&period=" + getPeriod();
//		queryString += "&pProfileID=" + profileid;
//		queryString +="&pShowDef=Y";
//		setReportQueryString(queryString);
//		String repServer = constService.getServerUrl() + "/executereport.do?jobType=sync&invokesubmit=true&__wait=true&__executableName=" + "/" + "SalesReports" + "/";
//		repServer += "NBTA_edie.rox";
//		repServer += "&server=" + constService.getExcelLocation();
//		setReportServer(repServer);
        String profileid = constService.getHotelEdieAuditProfile();
        String profileName = StringUtility.replace(constService.findProfileName(Long.parseLong(profileid)), "&", "%26");
        Date today = new Date();
        String strDateTime = DateUtility.formatCognosDateTime(today);
        String url = constService.getReportEdieUrl() + "&pReportouptname=" + profileName + "_" + period + "_" + strDateTime;
        url += "&period=" + period;
        url += "&pAccountStatus=ALL";
        url += "&pProfileID=" + profileid;
        url += "&pHotelFilterID=" + hotelfilterid;
        url += "&pDateFormat=YYYY-MM-DD&p_prmEmail=No";
        return url;
       // setEdieViewUrl(constService.getEdieViewUrl());
    }

    public ConstantsService getConstService() {
        return constService;
    }

    public void setConstService(ConstantsService constService) {
        this.constService = constService;
    }

}