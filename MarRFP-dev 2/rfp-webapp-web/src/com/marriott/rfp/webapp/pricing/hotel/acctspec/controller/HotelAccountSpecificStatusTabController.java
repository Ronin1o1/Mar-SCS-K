package com.marriott.rfp.webapp.pricing.hotel.acctspec.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecQandA;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificStatusData;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/accountspecstatus")
public class HotelAccountSpecificStatusTabController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelAccountSpecificStatusTabController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;

    public HotelAccountSpecificStatusTabController() {
        super();
    }

    @Autowired
    public HotelAccountSpecificStatusTabController(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        super();
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    @RequestMapping(value = "/getAccountSpecficStatusTab", method = GET)
    public String getAccountSpecficStatusTab(Long hotel_accountinfoid) throws Exception {
        try {
            HotelAccountSpecificStatusData hotelAccountSpecificStatusData = hotelRFPAccountSpecificService.findHotelAccountStatusTabSpecific(hotel_accountinfoid);
            return objectMapperStream(hotelAccountSpecificStatusData);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateStatus", method = POST)
    public String update(Long hotel_accountinfoid, String strHasd) throws Exception {
        try {

            Type collectionType = new TypeToken<Map<Long, HotelAccountSpecificStatusData>>() {
            }.getType();
            Map<Long, HotelAccountSpecificStatusData> hasd = fromJson(strHasd, collectionType);
            if (hasd != null) {
                hotelRFPAccountSpecificService.updateAccountSpecificStatusTab(hotel_accountinfoid, hasd.get(hotel_accountinfoid), getUserProperties());
            }
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
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
