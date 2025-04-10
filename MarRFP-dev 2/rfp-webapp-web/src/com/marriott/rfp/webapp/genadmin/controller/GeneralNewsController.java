package com.marriott.rfp.webapp.genadmin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.info.api.InfoService;
import com.marriott.rfp.object.info.GeneralInfo;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.util.DateValidationUtility;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN"})
@RestController
@RequestMapping("/generalnews")
public class GeneralNewsController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(GeneralNewsController.class);
    @Autowired
    private InfoService infoService = null;

    public GeneralNewsController() {
        super();
    }

    @Autowired
    public GeneralNewsController(InfoService infoService) {
        super();
        this.infoService = infoService;
    }

    @RequestMapping(value = "/getGeneralNews", method = GET)
    public String getGeneralNews() throws Exception {
        try {
            List<GeneralInfo> infoList = getInfoService().getAllGeneralInfoList();
            return objectMapperStream(infoList);

        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


    @RequestMapping(value = "/getEditNews", method = GET)
    public String getEditNews(Long infoid) throws Exception {
        try {
            GeneralInfo info=getInfoService().getGeneralInfo(infoid);
            return gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/deleteNews", method = GET)
    public String deleteNews(Long infoid) throws Exception {
        try {
            infoService.deleteGeneralInfo(infoid);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateNews", method = POST)
    public String updateNews(String strInfo) throws Exception {
        Map<String,Object> checkInfoMonth= null;
        Map<String,Object> checkExpiryMonth= null;
        String expiryDate = null;
        String infoDate1 = null;
        GeneralInfo genrInfo =null;
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
                genrInfo = fromJson(strInfo, GeneralInfo.class);
            }
            else {

                String strUpdatedInfo = DateValidationUtility.updatedJsonString((boolean)checkInfoMonth.get("valid"),(boolean)checkExpiryMonth.get("valid"),strInfo);

                genrInfo = fromJson(strUpdatedInfo,GeneralInfo.class);

            }
            infoService.updateGeneralInfo(genrInfo);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public InfoService getInfoService() {
        return infoService;
    }

    public void setInfoService(InfoService infoService) {
        this.infoService = infoService;
    }

}
