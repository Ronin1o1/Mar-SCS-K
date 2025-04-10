package com.marriott.rfp.webapp.rd.admin.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RoomDefAdminService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.roomdef.beans.*;
import com.marriott.rfp.object.roomdef.displaytext.DisplayTextAmenityModel;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.Map;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPKORAD"})
@RestController
@RequestMapping("roomdeftextamenity")
public class RoomDefDisplayTextAmenityController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(RoomDefDisplayTextAmenityController.class);
    @Autowired
    private RoomDefAdminService roomDefAdminService = null;

    public RoomDefDisplayTextAmenityController() {
        super();
    }

    public RoomDefDisplayTextAmenityController(RoomDefAdminService roomDefAdminService) {
        super();
        this.roomDefAdminService = roomDefAdminService;
    }

    public RoomDefAdminService getroomDefAdminService() {
        return roomDefAdminService;
    }

    @RequestMapping(value = "/getRoomDefDisplayTextAmenity", method = RequestMethod.POST)
    public String getRoomDefDisplayTextAmenity(String strChannel, String strLanguage) throws Exception {
        Channel channel= null;
        Language language =null;
        DisplayTextAmenityModel displayTextAmenityModel=null;
        try {
            channel = fromJson(strChannel, Channel.class);
            language = fromJson(strLanguage, Language.class);
            displayTextAmenityModel = roomDefAdminService.getDisplayTextAmenity(channel, language.getCode());
            return gsonStream(displayTextAmenityModel);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }

    }

    @RequestMapping(value = "/updateAmenityText", method = RequestMethod.POST)
    public String updateAmenityText(String strChannel, String strLanguage, String strTheBrand, String strTheFormat, String strTheUOM) {
        Channel channel = fromJson(strChannel, Channel.class);
        Language language = fromJson(strLanguage, Language.class);
        Type brandType = new TypeToken<Map<String, Brand>>() {}.getType();
        Map<String, Brand> theBrand = (Map<String, Brand>) fromJson(strTheBrand, brandType);
        Type formatType = new TypeToken<Map<String, Format>>() {}.getType();
        Map<String, Format> theFormat = (Map<String, Format>) fromJson(strTheFormat, formatType);
        Type UOMType = new TypeToken<Map<String, UnitOfMeasure>>() {}.getType();
        Map<String, UnitOfMeasure> theUOM = (Map<String, UnitOfMeasure>) fromJson(strTheUOM, UOMType);
        roomDefAdminService.updateDisplayTextAmenity(channel, language.getCode(), theBrand, theFormat, theUOM, getUsername());
        return RFPConstants.SUCCESS;
    }

    public void setroomDefAdminService(RoomDefAdminService roomDefAdminService) {
        this.roomDefAdminService = roomDefAdminService;
    }



}
