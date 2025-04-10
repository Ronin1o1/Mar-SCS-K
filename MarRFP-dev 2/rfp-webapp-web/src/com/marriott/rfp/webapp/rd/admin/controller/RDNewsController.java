package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.info.api.InfoService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.info.GeneralInfo;
import com.marriott.rfp.object.info.RFPInfo;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.util.DateValidationUtility;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM"})
@RestController
@RequestMapping("rdnews")
public class RDNewsController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(RDNewsController.class);
    @Autowired
    private InfoService infoService = null;

    public RDNewsController() {
        super();
    }

    @Autowired
    public RDNewsController(InfoService infoService) {
        super();
        this.infoService = infoService;

    }

    @RequestMapping(value = "/getNews", method = RequestMethod.GET)
    public String getNews(String marshaCode, String hotelName, String hotelrfpid, String period, String hotelAccountinfoid) throws Exception {
        try {
            List<RFPInfo> infoList = getInfoService().getInfoList(2L);
            return gsonStream(infoList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getEditNews", method = RequestMethod.GET)
    public String getEditNews(Long infoid) throws Exception {
        try {
            RFPInfo info = getInfoService().getInfo(infoid);
            return gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/deleteNews", method = RequestMethod.POST)
    public String deleteNews(Long infoid) throws Exception {
        try {
            infoService.deleteInfo(infoid);
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateNews", method = RequestMethod.POST)
    public String updateNews(String strInfo) throws Exception {
        Map<String,Object> checkInfoMonth= null;
        Map<String,Object> checkExpiryMonth= null;
        String expiryDate = null;
        String infoDate1 = null;
        RFPInfo info = null;
        try {
            JSONObject json = new JSONObject(strInfo);
            if(json.getString("infodate")!= null)
                infoDate1=json.getString("infodate");
            if(json.getString("infoexpiredate")!= null)
                expiryDate=json.getString("infoexpiredate");


            if(!infoDate1.equals("null")) {
                Map<String,Object> dateInfoMap= DateValidationUtility.getDateValues(infoDate1);
                checkInfoMonth= DateValidationUtility.isValid((int)dateInfoMap.get("year"),(int)dateInfoMap.get("month"),(int)dateInfoMap.get("date"));

            }
            else{
                Map<String, Object> dateMap1 = new HashMap<>();
                dateMap1.put("validDate", null);
                dateMap1.put("valid", true);
                checkInfoMonth=dateMap1;
            }
            if(!expiryDate.equals("null")) {
                Map<String,Object> dateInfoMap= DateValidationUtility.getDateValues(expiryDate);
                checkExpiryMonth= DateValidationUtility.isValid((int)dateInfoMap.get("year"),(int)dateInfoMap.get("month"),(int)dateInfoMap.get("date"));
            }
            else{
                Map<String, Object> dateMap1 = new HashMap<>();
                dateMap1.put("validDate", null);
                dateMap1.put("valid", true);
                checkExpiryMonth=dateMap1;

            }
            if((boolean)checkInfoMonth.get("valid") == true && (boolean)checkExpiryMonth.get("valid")==true)
            {
                info = fromJson(strInfo, RFPInfo.class);
                if (info.getInfodate() != null && checkInfoMonth != null && (boolean) checkInfoMonth.get("valid") == true) {
                    String strInfoDate1 = new SimpleDateFormat("MM/dd/yy").format(info.getInfodate());
                    SimpleDateFormat parser = new SimpleDateFormat("MM/dd/yy");
                    SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
                    String strInfoDate = formatter.format(parser.parse(strInfoDate1));
                    info.setInfodate(new Date(strInfoDate));
                }
                if (info.getInfoexpiredate() != null && checkExpiryMonth != null && (boolean) checkExpiryMonth.get("valid") == true) {
                    String strInfoExpiryDate1 = new SimpleDateFormat("MM/dd/yy").format(info.getInfoexpiredate());
                    SimpleDateFormat parser = new SimpleDateFormat("MM/dd/yy");
                    SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
                    String strInfoExpiryDate = formatter.format(parser.parse(strInfoExpiryDate1));
                    info.setInfoexpiredate(new Date(strInfoExpiryDate));
                }
            }
            else {
                String strUpdatedInfo = DateValidationUtility.updatedJsonString((boolean)checkInfoMonth.get("valid"),(boolean)checkExpiryMonth.get("valid"),strInfo);

                info = fromJson(strUpdatedInfo, RFPInfo.class);


            }
            infoService.updateRDInfo(info);
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }


    public InfoService getInfoService() {
        return infoService;
    }


    public void setInfoService(InfoService infoService) {
        this.infoService = infoService;
    }

}
