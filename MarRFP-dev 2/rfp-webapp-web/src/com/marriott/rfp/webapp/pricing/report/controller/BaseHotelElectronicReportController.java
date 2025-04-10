package com.marriott.rfp.webapp.pricing.report.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.hotel.api.HotelService;
import com.marriott.rfp.business.report.api.ReportService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.utility.DateUtility;
import com.marriott.rfp.utility.StringUtility;
import com.marriott.rfp.webapp.common.controller.BaseReportController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.Type;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Security(value = {"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
public class BaseHotelElectronicReportController extends BaseReportController {
    private static final Logger log = LoggerFactory.getLogger(BaseHotelElectronicReportController.class);
    @Autowired
    private HotelService hotelService = null;
    @Autowired
    private ReportService reportService;
    @Autowired
    private ConstantsService constService;

    public BaseHotelElectronicReportController() {
        super();
    }

    @Autowired
    public BaseHotelElectronicReportController(ConstantsService constantsService, HotelService hotelService, ReportService reportService) {
        super(constantsService);
        this.hotelService = hotelService;
        this.reportService = reportService;
        // setBIncludeExcelDownload(true);
    }

    public String getHotelElectronicReport(String strHotelids,Long period,String reportExecutable) throws Exception {
        try {

            Type collectionType = new TypeToken<List<Long>>() {
            }.getType();
            List<Long> hotelids = fromJson(strHotelids, collectionType);
            Long hotelfilterid = reportService.updateList(hotelids);
            //setQueryString(hotelfilterid,period);
            Map<String, Object> info = new HashMap<>();
            info.put("hotelfiterid", hotelfilterid);
            info.put("reportQueryString", getQueryString(hotelfilterid,period,reportExecutable));
            info.put("reportQueryString2",getQueryString(hotelfilterid,period));

            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public String getParameters(Integer orderBy) throws Exception {
        try {

            List<HotelListData> hotelList=hotelService.findAllPropertiesForPricing(getUserProperties(), orderBy);

            return objectMapperStream(hotelList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public String getQueryString(Long hotelfilterid,Long period,String reportExecutable) {
        /*Cognos : Passing parameter name change - appended with prefix "p_"(ex:pAccount->p_pAccount) starts	*/
        String queryString = "ui.action=run&ui.object=/content/folder[@name='MARRFP']/report[@name='" + reportExecutable + "']&ui.name=" + reportExecutable + "&run.prompt=false&cv.toolbar=false&cv.header=false&run.outputFormat=spreadsheetML";
        queryString += "&p_pHotelFilterID=" + hotelfilterid;
        queryString += "&p_period=" + period;
//		queryString = reportExecutable + "&format=spreadsheetML&Download=true&prompt=false&p_pHotelFilterID="+ hotelfilterid +"&p_period="+ period;
        /*Cognos : Passing parameter name change - appended with prefix "p_"(ex:pAccount->p_pAccount) ends	*/
        return queryString;
    }

    public String  getQueryString(Long hotelfilterid,Long period) {
        String profileid = constService.getHotelEdieCSRAuditProfile();
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
        //setEdieViewUrl(constService.getEdieViewUrl());
    }

    public void setHotelService(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    public HotelService getHotelService() {
        return hotelService;
    }

    public void setReportService(ReportService reportService) {
        this.reportService = reportService;
    }

    public ReportService getReportService() {
        return reportService;
    }

}
