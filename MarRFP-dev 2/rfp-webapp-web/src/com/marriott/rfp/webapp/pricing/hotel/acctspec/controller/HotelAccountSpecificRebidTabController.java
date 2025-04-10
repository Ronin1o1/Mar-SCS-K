package com.marriott.rfp.webapp.pricing.hotel.acctspec.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRebid;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/accountspecrebid")
public class HotelAccountSpecificRebidTabController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelAccountSpecificRebidTabController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService;

    public HotelAccountSpecificRebidTabController() {
        super();
    }

    @Autowired
    public HotelAccountSpecificRebidTabController(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }


    @RequestMapping(value = "/getHotelAccountSpecificRebid", method = GET)
    public String getHotelAccountSpecificRebid(Long hotel_accountinfoid) throws Exception {
        try {

            HotelAccountSpecificRebid hotelAccountSpecificRebid = hotelRFPAccountSpecificService.findHotelAccountRebidTabSpecific(hotel_accountinfoid);
            return gsonStream(hotelAccountSpecificRebid);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }


    @RequestMapping(value = "/updateRebid", method = POST)
    public String update(Long hotel_accountinfoid, String strHasd) throws Exception {
        try {

            Type collectionType = new TypeToken<Map<Long, HotelAccountSpecificRebid>>() {
            }.getType();
            Map<Long, HotelAccountSpecificRebid> hasd = fromJson(strHasd, collectionType);
            if (hasd != null) {
                hotelRFPAccountSpecificService.updateAccountSpecificRebid(hotel_accountinfoid, hasd.get(hotel_accountinfoid), getUserProperties());
            }
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }
}
