package com.marriott.rfp.webapp.pricing.hotel.controller;

import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountSpecificService;
import com.marriott.rfp.object.pricing.hotelrfp.RejectionReason;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping(value = {"/hotelrejectionreason", "/hotelrejectionreasonAcceptance"})
public class RejectionReasonController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(RejectionReasonController.class);
    @Autowired
    private HotelRFPAccountSpecificService hotelRFPAccountSpecificService = null;

    public RejectionReasonController() {
        super();
    }

    @Autowired
    public RejectionReasonController(HotelRFPAccountSpecificService hotelRFPAccountSpecificService) {
        super();
        this.setHotelRFPAccountSpecificService(hotelRFPAccountSpecificService);
    }

    @RequestMapping(value = "/getRejectionReason", method = GET)
    public String getRejectionReason() throws Exception {
        List<RejectionReason> rejectionReasonList = null;
        try {
            rejectionReasonList = hotelRFPAccountSpecificService.findRejectionReasons();
            return objectMapperStream(rejectionReasonList);
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
