package com.marriott.rfp.webapp.pricing.hotel.acctspec.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificBlackoutData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelBlackoutDate;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/accountspecblack")
public class HotelAccountSpecificBlackoutsTabController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelAccountSpecificBlackoutsTabController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;
    public HotelAccountSpecificBlackoutsTabController() {
        super();
    }


    public HotelAccountSpecificBlackoutsTabController(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    @RequestMapping(value = "/getSpecificBlackoutData", method = GET)
    public String getSpecificBlackoutData(Long hotel_accountinfoid, String isLocked) throws Exception {
        try {
            HotelAccountSpecificBlackoutData hotelAccountSpecificBlackoutData = hotelRFPAccountSpecificService.findHotelAccountBlackTabSpecific(hotel_accountinfoid, isLocked, getUserProperties());
            return objectMapperStream(hotelAccountSpecificBlackoutData);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateBlackouts", method = POST)
    public String update(Long hotel_accountinfoid, String strHotelBlackoutDate, String waiveblackouts) throws Exception {
        Map<Long, HotelBlackoutDate> hotelBlackoutDate=null;
        try {
            Type collectionType = new TypeToken<Map<Long, HotelBlackoutDate>>() {
            }.getType();
            hotelBlackoutDate = getGson().fromJson(strHotelBlackoutDate, collectionType);
            hotelRFPAccountSpecificService.updateAccountSpecificBlackout(hotel_accountinfoid,
                    waiveblackouts, hotelBlackoutDate, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }
}
