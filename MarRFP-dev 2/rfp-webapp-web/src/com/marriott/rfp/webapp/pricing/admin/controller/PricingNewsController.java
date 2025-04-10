package com.marriott.rfp.webapp.pricing.admin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.info.api.InfoService;
import com.marriott.rfp.object.info.RFPInfo;
import com.marriott.rfp.utility.DateUtility;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.util.DateValidationUtility;
import org.apache.commons.lang.StringUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormat;
import java.text.FieldPosition;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.lang.Integer.parseInt;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN","MFPAPADM"})
@RestController
@RequestMapping("/pricingnews")
public class PricingNewsController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(PricingNewsController.class);
    @Autowired
    private InfoService infoService = null;

    public PricingNewsController() {
        super();
    }

    public PricingNewsController(InfoService infoService) {
        super();
        this.infoService = infoService;

    }

    @RequestMapping(value = "/getNews", method = GET)
    public String getNews() throws Exception {
        try {
            List<RFPInfo> infoList = getInfoService().getInfoPricingList();
            return gsonStream(infoList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getEditNews", method = GET)
    public String getEditNews(Long infoid) throws Exception {
        try {
            RFPInfo rfpInfo=getInfoService().getPricingInfo(infoid);
            return gsonStream(rfpInfo);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/deleteNews", method = POST)
    public String deleteNews(Long infoid) throws Exception {
        try {
            infoService.deleteInfo(infoid);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateNews", method = POST)
    public String updateNews(String info) throws Exception {
        Map<String,Object> checkInfoMonth= null;
        Map<String,Object> checkExpiryMonth= null;
        String expiryDate = null;
        String infoDate1 = null;
        RFPInfo rfpInfo = null;
        try {
            JSONObject json = new JSONObject(info);
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
                rfpInfo = fromJson(info, RFPInfo.class);

              /*  JSONObject json1 = new JSONObject(info);
                json1.remove("infodate");
                json1.remove("infoexpiredate");
                String strInfoDate1 = new SimpleDateFormat("MM/dd/yy").format(new Date());
                SimpleDateFormat parser = new SimpleDateFormat("MM/dd/yy");
                SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
                String strInfoDate = formatter.format(parser.parse(strInfoDate1));
                json1.put("infodate",strInfoDate);
                json1.putOpt("infoexpiredate",null);
                String s = json1.toString();*/

            }
            else {
                String strUpdatedInfo = DateValidationUtility.updatedJsonString((boolean)checkInfoMonth.get("valid"),(boolean)checkExpiryMonth.get("valid"),info);
                rfpInfo = fromJson(strUpdatedInfo,RFPInfo.class);
               /* if (checkInfoMonth != null && (boolean) checkInfoMonth.get("valid") == false) {
                    rfpInfo.setInfodate(new Date());
                }
                if (checkExpiryMonth != null && (boolean) checkExpiryMonth.get("valid") == false) {
                    rfpInfo.setInfoexpiredate(null);
                }*/

           /* if((boolean)checkInfoMonth.get("valid") == true && (boolean)checkExpiryMonth.get("valid") == true) {
                if((Date)checkExpiryMonth.get("value") >)
            }*/
            }
            infoService.updatePricingInfo(rfpInfo);
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
