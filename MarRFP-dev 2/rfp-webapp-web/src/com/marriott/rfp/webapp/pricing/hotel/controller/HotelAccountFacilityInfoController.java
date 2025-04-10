package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountFacilityService;
import com.marriott.rfp.object.pricing.hotelrfp.AccountFacility;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Security(value = {"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("hotelaccountfacility")
public class HotelAccountFacilityInfoController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelAccountFacilityInfoController.class);
    @Autowired
    private HotelRFPAccountFacilityService hotelRFPAccountFacilityService = null;

    public HotelAccountFacilityInfoController() {
        super();
    }

    @Autowired
    public HotelAccountFacilityInfoController(HotelRFPAccountFacilityService hotelRFPAccountFacilityService) {
        super();
        this.setHotelRFPAccountFacilityService(hotelRFPAccountFacilityService);
    }

    @RequestMapping(value = "/getHotelAccountFacilityInfoAction", method = RequestMethod.GET)
    public String getHotelAccountFacilityInfoAction(Long hotelid, Long accountrecid) throws Exception {
        try {
            List<AccountFacility> accountFacilityList = hotelRFPAccountFacilityService.findFacilityDetails(hotelid, accountrecid);
            return objectMapperStream(accountFacilityList);
        } catch (Exception e) {
            log.error(e.getMessage());
            return FATAL_ERROR;
        }
    }

    public void setHotelRFPAccountFacilityService(HotelRFPAccountFacilityService hotelRFPAccountFacilityService) {
        this.hotelRFPAccountFacilityService = hotelRFPAccountFacilityService;
    }

    public HotelRFPAccountFacilityService getHotelRFPAccountFacilityService() {
        return hotelRFPAccountFacilityService;
    }


}
