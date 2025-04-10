package com.marriott.rfp.webapp.pricing.edie.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.edie.api.EdieService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.POST;


@Security(value = "MFPADMIN")
@RestController
@RequestMapping("/ediehotelprofileadd")
public class EdieHotelProfileAddController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(EdieHotelProfileAddController.class);
    @Autowired
    private EdieService edieService = null;


    public EdieHotelProfileAddController() {
        super();
    }

    @Autowired
    public EdieHotelProfileAddController(EdieService edieService) {
        super();
        this.setEdieService(edieService);
    }

    @RequestMapping(value = "/addProfile", method = POST)
    public String addProfile(String profile_name, Long profile_id) throws Exception {
        try {
            profile_id = edieService.addHotelProfile(profile_name);
            return objectMapperStream(profile_id);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    public void setEdieService(EdieService edieService) {
        this.edieService = edieService;
    }

    public EdieService getEdieService() {
        return edieService;
    }

}
