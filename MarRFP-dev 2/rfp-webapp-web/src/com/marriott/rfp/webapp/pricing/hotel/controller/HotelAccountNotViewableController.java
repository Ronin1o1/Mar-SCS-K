package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountCenterService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.hotelrfp.AccountNotViewable;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.dto.HotelAccountNotViewable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/infoAccountNotViewable")
public class HotelAccountNotViewableController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(HotelAccountNotViewableController.class);
    @Autowired
    private HotelRFPAccountCenterService hotelRFPAccountCenterService = null;

    public HotelAccountNotViewableController() {
        super();
    }

    @Autowired
    public HotelAccountNotViewableController(HotelRFPAccountCenterService hotelRFPAccountCenterService) {
        super();
        this.setHotelRFPAccountCenterService(hotelRFPAccountCenterService);
    }

    @RequestMapping(value = "/getHotelAccountNotViewable", method = GET)
    public HotelAccountNotViewable getHotelAccountNotViewable(Long period, String marshaCode) throws Exception {
        try {
            HotelAccountNotViewable hotelAccountNotViewable = new HotelAccountNotViewable();
            hotelAccountNotViewable.getAccountpricingtype();
            hotelAccountNotViewable.setAccountNotViewable(hotelRFPAccountCenterService.getAccountNotViewableList(period, getUserProperties(), marshaCode, hotelAccountNotViewable.getAccountpricingtype()));
            return hotelAccountNotViewable;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new GenericException(RFPConstants.FATAL_ERROR);
        }

    }

    public void setHotelRFPAccountCenterService(HotelRFPAccountCenterService hotelRFPAccountCenterService) {
        this.hotelRFPAccountCenterService = hotelRFPAccountCenterService;
    }

    public HotelRFPAccountCenterService getHotelRFPAccountCenterService() {
        return hotelRFPAccountCenterService;
    }


}
