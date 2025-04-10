package com.marriott.rfp.webapp.pricing.hotel.acctspec.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificFacility;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.lang.reflect.Type;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/accountspecfacility")
public class HotelAccountSpecificFacilityTabController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelAccountSpecificFacilityTabController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;
    public HotelAccountSpecificFacilityTabController() {
        super();
    }

    public HotelAccountSpecificFacilityTabController(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    @RequestMapping(value = "/getAccountSpecificFacility", method = GET)
    public String getAccountSpecificFacility(Long hotel_accountinfoid, Long hotelid, Long accountid) throws Exception {
        try {
            HotelAccountSpecificFacility hotelAccountSpecificfacility = hotelRFPAccountSpecificService.findHotelAccountFacilityTabSpecific(hotel_accountinfoid, hotelid, accountid);
            return objectMapperStream(hotelAccountSpecificfacility);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updatefacility", method = POST)
    public String update(String strHasd, Long hotel_accountinfoid) throws Exception {
        try {
            Type collectionType = new TypeToken<Map<Long, HotelAccountSpecificFacility>>() {
            }.getType();
            Map<Long, HotelAccountSpecificFacility> hasd = getGson().fromJson(strHasd, collectionType);
            if (hasd != null) {
                hotelRFPAccountSpecificService.updateAccountSpecificFacility(hotel_accountinfoid,
                        hasd.get(hotel_accountinfoid), getUserProperties());
            }
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }
}

