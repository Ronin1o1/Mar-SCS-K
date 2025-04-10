package com.marriott.rfp.webapp.util;

import org.apache.commons.lang.StringUtils;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.marriott.rfp.webapp.common.controller.BaseController.ERROR;

public class DateValidationUtility {
    public static Map<String, Object> getDateValues(String strDate) {
        String subDate = null;
        String subYear = null;
        String subMonth = null;
        Integer month = 0;
        Integer date = 0;
        Integer year = 0;
        Map<String, Object> dateMap = new HashMap<>();
        try {
            String arr[] = strDate.split("/");
            if (arr.length != 0) {
                subDate = arr[1];
                subMonth = arr[0];
                subYear = arr[2];
            }
            if (StringUtils.isNotEmpty(subDate))
                date = Integer.parseInt(subDate);
            if (StringUtils.isNotEmpty(subYear))
                year = Integer.parseInt(subYear);
            if (StringUtils.isNotEmpty(subMonth))
                month = Integer.parseInt(subMonth);
            dateMap.put("date", date);
            dateMap.put("month", month);
            dateMap.put("year", year);
            return dateMap;
        } catch (Exception e) {
            dateMap.put("date", 0);
            dateMap.put("month", 0);
            dateMap.put("year", 0);
            return dateMap;
        }

    }

    public static Map<String, Object> isValid(Integer year, Integer month, Integer date) {

        boolean valid = false;
        LocalDate validDate = null;
        Map<String, Object> dateMap1 = new HashMap<>();
        try {
            // String d = DateUtility.formatCognosDate(strDate);
            //  Map<String,Object> dateMap = getDateValues(strDate);
            validDate = LocalDate.of(year, month, date);
            valid = true;
            dateMap1.put("validDate", validDate);
            dateMap1.put("valid", valid);
        } catch (Exception e) {
            valid = false;
            dateMap1.put("validDate", null);
            dateMap1.put("valid", valid);
        }
        return dateMap1;
    }

    public static String updatedJsonString(boolean checkInfoMonth, boolean checkExpiryMonth, String info) {
        String strUpdatedInfo = null;
        try {
            if(checkExpiryMonth == false && checkInfoMonth == false) {
                JSONObject json1 = new JSONObject(info);
                json1.remove("infodate");
                json1.remove("infoexpiredate");
                String strInfoDate1 = new SimpleDateFormat("MM/dd/yy").format(new Date());
                SimpleDateFormat parser = new SimpleDateFormat("MM/dd/yy");
                SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
                String strInfoDate = formatter.format(parser.parse(strInfoDate1));
                json1.put("infodate", strInfoDate);
                json1.putOpt("infoexpiredate", null);
                 strUpdatedInfo = json1.toString();
            }
            else if(checkExpiryMonth == false){
                JSONObject json1 = new JSONObject(info);
                json1.remove("infoexpiredate");
                json1.putOpt("infoexpiredate", null);
                strUpdatedInfo = json1.toString();
            }
            else{
                JSONObject json1 = new JSONObject(info);
                json1.remove("infodate");
                String strInfoDate1 = new SimpleDateFormat("MM/dd/yy").format(new Date());
                SimpleDateFormat parser = new SimpleDateFormat("MM/dd/yy");
                SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
                String strInfoDate = formatter.format(parser.parse(strInfoDate1));
                json1.put("infodate", strInfoDate);
                strUpdatedInfo = json1.toString();
            }
            return strUpdatedInfo;
        } catch (Exception e) {
            return ERROR;
        }
    }
}
