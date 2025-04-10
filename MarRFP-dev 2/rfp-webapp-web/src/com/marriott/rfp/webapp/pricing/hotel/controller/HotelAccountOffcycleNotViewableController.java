package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountCenterService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.webapp.common.controller.BaseController;
import com.marriott.rfp.webapp.common.exceptionhandlers.GenericException;
import com.marriott.rfp.webapp.dto.HotelAccountOffcycleNotViewable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN", "MFPSALES", "MFPFSALE", "MFPUSER"})
@RestController
@RequestMapping("/infoAccountOffcycleNotViewable")
public class HotelAccountOffcycleNotViewableController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelAccountOffcycleNotViewableController.class);
    @Autowired
    private HotelRFPAccountCenterService hotelRFPAccountCenterService = null;


    public HotelAccountOffcycleNotViewableController() {
        super();
    }

    @Autowired
    public HotelAccountOffcycleNotViewableController(HotelRFPAccountCenterService hotelRFPAccountCenterService) {
        super();
        this.setHotelRFPAccountCenterService(hotelRFPAccountCenterService);
    }

    @RequestMapping(value = "/getHotelAccountOffcycleNotViewable", method = GET)
    public HotelAccountOffcycleNotViewable getHotelAccountOffcycleNotViewable(Long period, String marshaCode) throws Exception {
        try {
            HotelAccountOffcycleNotViewable hotelAccountOffcycleNotViewable=new HotelAccountOffcycleNotViewable();
            hotelAccountOffcycleNotViewable.setAccountpricingtype("C");
            hotelAccountOffcycleNotViewable.setAccountNotViewable(hotelRFPAccountCenterService.getAccountOffcycleNotViewableList(period, getUserProperties(), marshaCode, hotelAccountOffcycleNotViewable.getAccountpricingtype()));
            return hotelAccountOffcycleNotViewable;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
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
