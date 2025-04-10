package com.marriott.rfp.webapp.pricing.hotel.acctspec.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecific;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificDataUpdate;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/accountspecrates")
public class HotelAccountSpecificRatesTabController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelAccountSpecificRatesTabController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;

    public HotelAccountSpecificRatesTabController() {
        super();
    }

    public HotelAccountSpecificRatesTabController(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    @RequestMapping(value = "/getRates", method = GET)
    public String getRates(Long hotel_accountinfoid) throws Exception {
        try {
            HotelAccountSpecific hotelAccountSpecific = hotelRFPAccountSpecificService.findHotelAccountSpecificRatestab(hotel_accountinfoid, getUserProperties());
            String earlycharge = hotelRFPAccountSpecificService.getEarlyCharge();
            Map<String, Object> info = new HashMap<>();
            info.put("hotelAccountSpecific", hotelAccountSpecific);
            info.put("earlycharge", earlycharge);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateRates", method = POST)
    public String updateRates(String strHasd, Long hotel_accountinfoid) throws Exception {
        try {
            Type collectionType = new TypeToken<Map<Long, HotelAccountSpecificDataUpdate>>() {
            }.getType();
            Map<Long, HotelAccountSpecificDataUpdate> hasd = fromJson(strHasd, collectionType);
            hotelRFPAccountSpecificService.updateAccountSpecificRatestab(hotel_accountinfoid, hasd.get(hotel_accountinfoid), getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    //Upgrade-revisit:no curl,not tested
    @RequestMapping(value = "/updateFlags", method = POST)
    public String updateFlags(String strHasd, Long hotel_accountinfoid) throws Exception {
        try {
            Type collectionType = new TypeToken<Map<Long, HotelAccountSpecificDataUpdate>>() {
            }.getType();
            Map<Long, HotelAccountSpecificDataUpdate> hasd = fromJson(strHasd, collectionType);
            hotelRFPAccountSpecificService.updateAccountSpecificFlags(hotel_accountinfoid, hasd.get(hotel_accountinfoid), getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    //Upgrade-revisit:no curl,not tested
    @RequestMapping(value = "/updateCopyGov", method = POST)
    public String updateCopyGov(Long hotel_accountinfoid, String govCopyRates) throws Exception {
        try {
            hotelRFPAccountSpecificService.updateCopyGov(hotel_accountinfoid, govCopyRates, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateProduct", method = POST)
    public String updateProduct(Long hotel_accountinfoid, Long newratetype_selected) throws Exception {
        try {
            hotelRFPAccountSpecificService.updateProduct(hotel_accountinfoid, newratetype_selected, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }
    
    @RequestMapping(value = "/copySeasons", method = POST)
    public String copySeasons(Long hotelrfpid, Long hotel_accountinfoid, Long newratetype_selected, String accounttype) throws Exception{
		try{
			hotelRFPAccountSpecificService.copySeasons(hotelrfpid, hotel_accountinfoid, newratetype_selected, accounttype, getUserProperties());
			return SUCCESS;
		} catch (Exception e){
			e.printStackTrace();
			return FATAL_ERROR;
		}
	}

    public void setHotelRFPAccountSpecificService(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    public HotelRFPAccountSpecificService getHotelRFPAccountSpecificService() {
        return hotelRFPAccountSpecificService;
    }

}