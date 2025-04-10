package com.marriott.rfp.webapp.pricing.admin.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.object.pricing.period.PricingPeriod;
import com.marriott.rfp.utility.DateUtility;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.util.DateValidationUtility;
import org.apache.commons.lang.StringUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security("MFPADMIN")
@RestController
@RequestMapping("/pricingperiodmaintenance")
public class PricingPeriodMaintenanceController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(PricingPeriodMaintenanceController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;

    public PricingPeriodMaintenanceController() {
        super();
    }

    public PricingPeriodMaintenanceController(PricingAdminService pricingAdminService) {
        super();
        this.setPricingAdminService(pricingAdminService);
    }

    @RequestMapping(value = "/getPricingPeriod", method = POST)
    public String getPricingPeriod() throws Exception {
        try {
            List<Period> periodList = pricingAdminService.findPeriodsForMaintenance();
            return objectMapperStream(periodList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/getEditDueDate", method = GET)
    public String getEditDueDate(Long pricingperiodid, Long period) throws Exception {
        PricingPeriod pricingperiod;
        try {
            if (pricingperiodid > 0)
                pricingperiod = pricingAdminService.findDueDate(pricingperiodid);
            else {
                pricingperiod = new PricingPeriod();
                pricingperiod.setPeriod(period);
            }
            return gsonStream(pricingperiod);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/deleteDueDate", method = POST)
    public String deleteDueDate(Long pricingperiodid) throws Exception {
        try {
            pricingAdminService.deleteDueDate(pricingperiodid);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateDueDate", method = GET)
    public String updateDueDate(Long period, Long pricingperiodid, String duedate) throws Exception {
        PricingPeriod pricingperiod;
        Map<String,Object>  is_valid = null;
        try {
            pricingperiod = new PricingPeriod();
            JSONObject json = new JSONObject();
            String strDueDate = null;
            json.put("duedate",duedate);
            if(json.getString("duedate")!= null)
                strDueDate=json.getString("duedate");
            Map<String,Object> dateMap = DateValidationUtility.getDateValues(strDueDate);
            is_valid = DateValidationUtility.isValid((int)dateMap.get("year"),(int)dateMap.get("month"),(int)dateMap.get("date"));;
            if(StringUtils.isNotEmpty(duedate) && (boolean)is_valid.get("valid") == true) {
                pricingperiod.setDuedate(new Date (duedate));
            }
            else {
                pricingperiod.setDuedate(null);
            }
            pricingperiod.setPeriod(period);
            pricingperiod.setPricingperiodid(pricingperiodid);
            pricingAdminService.updateDueDate(pricingperiod);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateHotelView", method = POST)
    public String updateHotelView(String strPeriodList) throws Exception {
        try {
            //Upgrade-revisit need to generalise
            Type collectionType = new TypeToken<List<Period>>() {
            }.getType();
            List<Period> periodList = (List<Period>) fromJson(strPeriodList, collectionType);
            pricingAdminService.updateHotelView(periodList);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


    public void setPricingAdminService(PricingAdminService pricingAdminService) {
        this.pricingAdminService = pricingAdminService;
    }

    public PricingAdminService getPricingAdminService() {
        return pricingAdminService;
    }

}
