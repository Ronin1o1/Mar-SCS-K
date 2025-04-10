package com.marriott.rfp.webapp.pricing.hotel.acctspec.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificAmenityData;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.dto.HotelAccountSpecificEligAmenTab;
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
@RequestMapping("/accountspecamen")
public class HotelAccountSpecificEligAmenTabController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelAccountSpecificEligAmenTabController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;

    public HotelAccountSpecificEligAmenTabController() {
        super();
    }

    public HotelAccountSpecificEligAmenTabController(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    @RequestMapping(value = "/getAccSpecEligAmen", method = GET)
    public HotelAccountSpecificEligAmenTab getAccSpecEligAmen(Long hotel_accountinfoid, Long hotelrfpid) throws Exception {
        try {
            HotelAccountSpecificEligAmenTab hotelAccountSpecificEligAmenTab = new HotelAccountSpecificEligAmenTab();
            hotelAccountSpecificEligAmenTab.setHotelAccountSpecificamenity(hotelRFPAccountSpecificService.findHotelAccountAmenityTabSpecific(hotel_accountinfoid, hotelrfpid));
            hotelAccountSpecificEligAmenTab.setIsTopAccount(hotelRFPAccountSpecificService.getIsTopAccount(hotel_accountinfoid));
            hotelAccountSpecificEligAmenTab.setIsHotelExempted(hotelRFPAccountSpecificService.getIsHotelExempted(hotelrfpid));
            return hotelAccountSpecificEligAmenTab;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }

    }

    @RequestMapping(value = "/updateAmenity", method = POST)
    public String update(String strHasd, Long hotel_accountinfoid) throws Exception {
        try {
            Type collectionType = new TypeToken<Map<Long, HotelAccountSpecificAmenityData>>() {
            }.getType();
            Map<Long, HotelAccountSpecificAmenityData> hasd = getGson().fromJson(strHasd, collectionType);
            if (hasd != null) {
                hotelRFPAccountSpecificService.updateAccountSpecificAmenity(hotel_accountinfoid, hasd.get(hotel_accountinfoid), getUserProperties());
            }
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return FATAL_ERROR;
        }
    }
}
