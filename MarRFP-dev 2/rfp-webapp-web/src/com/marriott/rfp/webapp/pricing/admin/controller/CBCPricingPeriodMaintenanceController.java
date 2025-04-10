package com.marriott.rfp.webapp.pricing.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.admin.api.PricingAdminService;
import com.marriott.rfp.object.pricing.period.Period;
import com.marriott.rfp.object.pricing.period.PricingPeriod;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.util.DateValidationUtility;
import org.apache.commons.lang.StringUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security("MFPADMIN")
@RestController
@RequestMapping("/cbcpricingperiodmaintenance")
public class CBCPricingPeriodMaintenanceController extends BaseController {

	private static final Logger log = LoggerFactory.getLogger(CBCPricingPeriodMaintenanceController.class);
    @Autowired
    private PricingAdminService pricingAdminService = null;

    public CBCPricingPeriodMaintenanceController() {
	super();
    }

    public CBCPricingPeriodMaintenanceController(PricingAdminService pricingAdminService) {
	super();
	this.setPricingAdminService(pricingAdminService);
    }

	@RequestMapping(value ="/getCBCPricingPeriod" , method = POST)
	public String getCBCPricingPeriod() throws Exception {
    	try {
			List<Period> periodList = pricingAdminService.findCBCPeriodsForMaintenance();
			return objectMapperStream(periodList);
    	} catch (Exception e) {
			log.error(e.getMessage(),e);
    	    return FATAL_ERROR;
    	}
        }

    public String editCBCDueDate() throws Exception {
    	   return SUCCESS;
    }

	@RequestMapping(value ="/getEditCBCDueDate" , method = POST)
	public String getEditCBCDueDate(Long pricingperiodid, Long period) throws Exception {
		PricingPeriod pricingperiod;
		try {
    	    if (pricingperiodid > 0)
    		pricingperiod = pricingAdminService.findCBCDueDate(pricingperiodid);
    	    else {
    		pricingperiod = new PricingPeriod();
    		pricingperiod.setPeriod(period);
    	    }
			//return gsonStream(pricingperiod);

			return SUCCESS;
    	} catch (Exception e) {
			log.error(e.getMessage(),e);
    	    return FATAL_ERROR;
    	}
        }

	@RequestMapping(value ="/deleteCBCDueDate" , method = POST)
    public String deleteCBCDueDate(Long pricingperiodid) throws Exception {
	try {
	    pricingAdminService.deleteCBCDueDate(pricingperiodid);
	    return SUCCESS;
	} catch (Exception e) {
		log.error(e.getMessage(),e);
	    return FATAL_ERROR;
	}
    }

	@RequestMapping(value ="/updateCBCDueDate" , method = POST)
    public String updateCBCDueDate(String duedate,Long period,Long pricingperiodid) throws Exception {
		Map<String,Object>  is_valid = null;
    	try {
		PricingPeriod 	pricingperiod=new PricingPeriod();
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
		/*if(StringUtils.isNotEmpty(duedate)) {
			Date due_Date=new Date(duedate);
			pricingperiod.setDuedate(due_Date);
		}*/
		pricingperiod.setPeriod(period);
		pricingperiod.setPricingperiodid(pricingperiodid);
		pricingAdminService.updateCBCDueDate(pricingperiod);
	    return SUCCESS;
	} catch (Exception e) {
    		log.error(e.getMessage(),e);
	    return FATAL_ERROR;
	}
    }

    public String updateCBCHotelView() throws Exception {
		List<Period> periodList=null;
	try {
		pricingAdminService.updateCBCHotelView(periodList);
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
