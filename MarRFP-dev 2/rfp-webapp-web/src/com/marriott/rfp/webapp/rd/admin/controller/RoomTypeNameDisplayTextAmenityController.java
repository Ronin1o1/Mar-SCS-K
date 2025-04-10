package com.marriott.rfp.webapp.rd.admin.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RDTextNotFoundException;
import com.marriott.rfp.business.rd.api.RoomTypeNameAdminService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.roomdef.beans.*;
import com.marriott.rfp.object.roomdef.displaytext.RoomTypeNameDisplayTextAmenityModel;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM"})
@RestController
@RequestMapping("roomtypenametextamenity")
public class RoomTypeNameDisplayTextAmenityController extends BaseController {

    @Autowired
    private RoomTypeNameAdminService roomTypeNameAdminService = null;


    public RoomTypeNameDisplayTextAmenityController() {
        super();
    }

    public RoomTypeNameDisplayTextAmenityController(RoomTypeNameAdminService roomTypeNameAdminService) {
        super();
        this.roomTypeNameAdminService = roomTypeNameAdminService;
    }

    public RoomTypeNameAdminService getroomTypeNameAdminService() {
        return roomTypeNameAdminService;
    }

    public void setroomTypeNameAdminService(RoomTypeNameAdminService roomTypeNameAdminService) {
        this.roomTypeNameAdminService = roomTypeNameAdminService;
    }

    @RequestMapping(value = "/getRoomTypeNameTextAmenity", method = RequestMethod.POST)
    public String getRoomTypeNameTextAmenity(String strChannel, String strLanguage) throws Exception {
         Channel channel = null;
         Language language = null;
         RoomTypeNameDisplayTextAmenityModel displayTextAmenityModel = null;
        try {
            channel = fromJson(strChannel, Channel.class);
            language = fromJson(strLanguage, Language.class);
            displayTextAmenityModel = roomTypeNameAdminService.getDisplayTextAmenity(channel, language.getCode());
            return objectMapperStream(displayTextAmenityModel);
        } catch (RDTextNotFoundException e) {
            return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateAmenityText",method = RequestMethod.POST)
    public String updateAmenityText(String strChannel, String strLanguage, String strTheAlternateText, String strTheType, String strTheUOM) {
        Channel channel = null;
        Language language = null;
        Map<String, AlternateText> theAlternateText =null;
        Map<String, Type> theType =null;
        Map<String, UnitOfMeasure> theUOM = null;
        channel = fromJson(strChannel, Channel.class);
        language = fromJson(strLanguage, Language.class);
        java.lang.reflect.Type alternateType = new TypeToken<Map<String, AlternateText>>() {}.getType();
        theAlternateText = (Map<String, AlternateText>) fromJson(strTheAlternateText, alternateType);
        java.lang.reflect.Type collectionType = new TypeToken<Map<String, Type>>() {}.getType();
        theType = (Map<String, Type>) fromJson(strTheType, collectionType);
        java.lang.reflect.Type UOMType = new TypeToken<Map<String, UnitOfMeasure>>() {}.getType();
        theUOM = (Map<String, UnitOfMeasure>) fromJson(strTheUOM, UOMType);
        roomTypeNameAdminService.updateDisplayTextAmenity(channel, language.getCode(), theAlternateText, theType, theUOM, getUsername());
        return RFPConstants.SUCCESS;
    }


}
