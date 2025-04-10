package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountCenterService;
import com.marriott.rfp.object.pricing.hotelrfp.HotelNobidReason;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/hotelnobidreason")

public class NobidReasonController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(NobidReasonController.class);
    @Autowired
    private HotelRFPAccountCenterService hotelRFPAccountCenterService = null;

    public NobidReasonController() {
        super();
    }

    @Autowired
    public NobidReasonController(HotelRFPAccountCenterService hotelRFPAccountCenterService) {
        super();
        this.setHotelRFPAccountCenterService(hotelRFPAccountCenterService);
    }

    @RequestMapping(value = "/getNobidReason", method = GET)
    public String getNobidReason() throws Exception {
        try {
            List<HotelNobidReason> nobidReasonList = hotelRFPAccountCenterService.findNobidReasons();
            return objectMapperStream(nobidReasonList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    public void setHotelRFPAccountCenterService(HotelRFPAccountCenterService hotelRFPAccountCenterService) {
        this.hotelRFPAccountCenterService = hotelRFPAccountCenterService;
    }

    public HotelRFPAccountCenterService getHotelRFPAccountCenterService() {
        return hotelRFPAccountCenterService;
    }

}
