package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.pricing.hotelrfp.RemovalReason;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/hotelremovalreason")
public class RemovalReasonController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(RemovalReasonController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;

    public RemovalReasonController() {
        super();
    }

    @Autowired
    public RemovalReasonController(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        super();
        this.setHotelRFPAccountSpecificService(hotelRFPAccountSpecificService);
    }

    @RequestMapping(value = "/getRemovalReason", method = GET)
    public String getRemovalReason() throws Exception {
        try {
            List<RemovalReason> removalReasonList = hotelRFPAccountSpecificService.findRemovalReasons();
            return objectMapperStream(removalReasonList);
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
