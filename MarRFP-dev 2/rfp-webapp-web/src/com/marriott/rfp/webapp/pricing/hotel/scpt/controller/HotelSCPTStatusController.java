package com.marriott.rfp.webapp.pricing.hotel.scpt.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.scpt.api.SCPTService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.pricing.scpt.SCPTStatus;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.lang.reflect.Type;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = {"MFPADMIN", "MFPUSER"})
@RestController
@RequestMapping("/hotelscptstatus")
public class HotelSCPTStatusController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelSCPTStatusController.class);
    @Autowired
    private SCPTService scptService = null;

    public HotelSCPTStatusController() {
        super();
    }

    public HotelSCPTStatusController(SCPTService scptService) {
        this.setScptService(scptService);
    }


    @RequestMapping(value = "/getHotelSCPTStatus", method = GET)
    public String getHotelSCPTStatus(Long hotelid, Long period) throws Exception {
        try {

            List<SCPTStatus> scptstatus = scptService.findSCPTStatus(hotelid, period);

            return objectMapperStream(scptstatus);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @SuppressWarnings("unchecked")
    @RequestMapping(value = "/update", method = POST)
    public String update(String strSCPTStatus, Long hotelid, Long period) throws Exception {
        try {
            Type collectionType = new TypeToken<List<SCPTStatus>>() {
            }.getType();
            List<SCPTStatus> scptstatus = (List<SCPTStatus>) fromJson(strSCPTStatus, collectionType);
            scptService.updateSCPTStatus(hotelid, period, scptstatus);
            return RFPConstants.SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    public SCPTService getScptService() {
        return scptService;
    }

    public void setScptService(SCPTService scptService) {
        this.scptService = scptService;
    }

}
