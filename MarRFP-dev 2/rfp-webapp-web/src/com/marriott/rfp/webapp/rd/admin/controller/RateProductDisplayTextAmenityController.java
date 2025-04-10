package com.marriott.rfp.webapp.rd.admin.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RateProductAdminService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.roomdef.beans.*;
import com.marriott.rfp.object.roomdef.displaytext.RateProductDisplayTextAmenityModel;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM"})
@RestController
@RequestMapping("rateproducttextamenity")
public class RateProductDisplayTextAmenityController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(RateProductDisplayTextAmenityController.class);
    @Autowired
    private RateProductAdminService rateProductAdminService = null;


    public RateProductDisplayTextAmenityController() {
        super();
    }

    public RateProductDisplayTextAmenityController(RateProductAdminService rateProductAdminService) {
        super();
        this.rateProductAdminService = rateProductAdminService;
    }

    public RateProductAdminService getrateProductAdminService() {
        return rateProductAdminService;
    }

    public void setrateProductAdminService(RateProductAdminService rateProductAdminService) {
        this.rateProductAdminService = rateProductAdminService;
    }

    @RequestMapping(value = "/getRateProductNameTextAmenity", method = RequestMethod.POST)
    public String getRateProductNameTextAmenity(String strChannel, String strLanguage) throws Exception {
        Channel channel = null;
        Language language = null;
        RateProductDisplayTextAmenityModel displayTextAmenityModel = null;
        try {
            channel = fromJson(strChannel, Channel.class);
            language = fromJson(strLanguage, Language.class);
            displayTextAmenityModel = rateProductAdminService.getDisplayTextAmenity(channel, language.getCode());
            return gsonStream(displayTextAmenityModel);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateAmenityText", method = RequestMethod.POST)
    public String updateAmenityText(String strChannel, String strLanguage, String strTheBrand, String strTheType, String strTheUOM) {
        Channel channel = null;
        Language language = null;
        Map<String, Brand> theBrand = null;
        Map<String, Type> theType = null;
        Map<String, UnitOfMeasure> theUOM = null;
        channel = fromJson(strChannel, Channel.class);
        language = fromJson(strLanguage, Language.class);
        java.lang.reflect.Type brandType = new TypeToken<Map<String, Brand>>() {
        }.getType();
        theBrand = (Map<String, Brand>) fromJson(strTheBrand, brandType);
        java.lang.reflect.Type collectionType = new TypeToken<Map<String, Type>>() {
        }.getType();
        theType = (Map<String, Type>) fromJson(strTheType, collectionType);
        java.lang.reflect.Type UOMType = new TypeToken<Map<String, UnitOfMeasure>>() {
        }.getType();
        theUOM = (Map<String, UnitOfMeasure>) fromJson(strTheUOM, UOMType);
        rateProductAdminService.updateDisplayTextAmenity(channel, language.getCode(), theBrand, theType, theUOM, getUsername());
        return RFPConstants.SUCCESS;
    }


}
