package com.marriott.rfp.webapp.pricing.edie.controller;


import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.pricing.edie.api.EdieService;
import com.marriott.rfp.object.pricing.edie.EdieHotelProfile;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security(value = "MFPADMIN")
@RestController
@RequestMapping("/ediehotelprofilename")
public class EdieHotelProfileNameController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(EdieHotelProfileNameController.class);
    @Autowired
    private EdieService edieService = null;


    public EdieHotelProfileNameController() {
        super();
    }

    @Autowired
    public EdieHotelProfileNameController(EdieService edieService) {
        super();
        this.setEdieService(edieService);
    }

    @RequestMapping(value = "/getEdieHotelProfileNames", method = GET)
    public String getEdieHotelProfileNames() throws Exception {
        try {
            List<EdieHotelProfile> edieHotelProfileList = edieService.getEdieHotelProfiles();
            return objectMapperStream(edieHotelProfileList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateProfileName", method = POST)
    public String updateProfileName(String strEdieHotelProfileList) throws Exception {
        try {
            Type collectionType = new TypeToken<List<EdieHotelProfile>>() {
            }.getType();
            List<EdieHotelProfile> edieHotelProfileList = (List<EdieHotelProfile>) fromJson(strEdieHotelProfileList, collectionType);
            edieService.updateHotelProfileName(edieHotelProfileList);
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setEdieService(EdieService edieService) {
        this.edieService = edieService;
    }

    public EdieService getEdieService() {
        return edieService;
    }

}
