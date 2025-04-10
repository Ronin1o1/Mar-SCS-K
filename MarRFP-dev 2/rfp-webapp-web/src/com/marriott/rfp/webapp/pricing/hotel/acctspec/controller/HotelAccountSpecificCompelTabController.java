package com.marriott.rfp.webapp.pricing.hotel.acctspec.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificBusinessCase;
import com.marriott.rfp.object.pricing.hotelrfp.TypeofPropertyDropDown;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.dto.HotelAccountSpecificCompelTab;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/accountspeccompel")
public class HotelAccountSpecificCompelTabController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelAccountSpecificCompelTabController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;

    public HotelAccountSpecificCompelTabController() {
        super();
    }


    public HotelAccountSpecificCompelTabController(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        this.hotelRFPAccountSpecificService = hotelRFPAccountSpecificService;
    }

    @RequestMapping(value = "/getCBC", method = GET)
    public HotelAccountSpecificCompelTab getCBC(Long hotel_accountinfoid) throws Exception {
        try {
            HotelAccountSpecificCompelTab hotelAccountSpecificCompelTab=new HotelAccountSpecificCompelTab();
            hotelAccountSpecificCompelTab.setHotelAccountSpecificBusinessCase(hotelRFPAccountSpecificService.findHotelAccountCompelTabSpecific(hotel_accountinfoid));
            hotelAccountSpecificCompelTab.setTypeofPropertyDropDowns(hotelRFPAccountSpecificService.findPropertytypesDropDowns());
            return hotelAccountSpecificCompelTab;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }
    }

    @RequestMapping(value = "/updateCbc", method = POST)
    public String update(String strHotelAccountSpecificBusinessCase, Long hotel_accountinfoid) throws Exception {
        try {
            HotelAccountSpecificBusinessCase hotelAccountSpecificBusinessCase = fromJson(strHotelAccountSpecificBusinessCase, HotelAccountSpecificBusinessCase.class);
            hotelRFPAccountSpecificService.updateAccountSpecificCompel(hotel_accountinfoid, hotelAccountSpecificBusinessCase, getUserProperties());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

}
