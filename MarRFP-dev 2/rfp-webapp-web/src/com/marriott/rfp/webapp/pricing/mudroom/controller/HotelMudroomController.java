package com.marriott.rfp.webapp.pricing.mudroom.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.mudroom.api.MudroomService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.mudroom.HotelMudroom;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPUSER"})
@RestController
@RequestMapping("/hotelmudroom")
public class HotelMudroomController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(HotelMudroomController.class);
    @Autowired
    private MudroomService mudroomService = null;

    public HotelMudroomController() {
        super();
    }

    @Autowired
    public HotelMudroomController(MudroomService mudroomService) {
        super();
        this.setMudroomService(mudroomService);
    }

    //renamed execute
    @RequestMapping(value = "/getHotelMudroom", method = GET)
    public String getHotelMudroom() throws Exception {
        try {
            HotelMudroom  hotelRespondent = mudroomService.getHotelRespondent(getUserProperties());
            return gsonStream(hotelRespondent);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updatehotelmudroom", method = POST)
    public String updatehotelmudroom(String strHotelRespondent) throws Exception {
        try {

            HotelMudroom  hotelRespondent = fromJson(strHotelRespondent, HotelMudroom.class);
            mudroomService.updateHotelRespondent(hotelRespondent);
            User u = getUserProperties();
            u.setUpdateContactInfo(false);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public void setMudroomService(MudroomService mudroomService) {
        this.mudroomService = mudroomService;
    }

    public MudroomService getMudroomService() {
        return mudroomService;
    }

}
