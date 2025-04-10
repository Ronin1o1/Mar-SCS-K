package com.marriott.rfp.webapp.rd.admin.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RDTextNotFoundException;
import com.marriott.rfp.business.rd.api.RoomTypeNameAdminService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.displaytext.RoomTypeNameDisplayTextElementModel;
import com.marriott.rfp.object.roomdef.displaytext.RoomTypeNameDisplayTextModel;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM"})
@RestController
@RequestMapping("roomtypenametextdata")
public class RoomTypeNameDisplayTextDataController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(RoomTypeNameDisplayTextDataController.class);
    @Autowired
    private RoomTypeNameAdminService roomTypeNameAdminService = null;


    public RoomTypeNameDisplayTextDataController() {
        super();
    }

    public RoomTypeNameDisplayTextDataController(RoomTypeNameAdminService roomTypeNameAdminService) {
        super();
        this.roomTypeNameAdminService = roomTypeNameAdminService;
    }

    public RoomTypeNameAdminService getroomTypeNameAdminService() {
        return roomTypeNameAdminService;
    }

    public void setroomTypeNameAdminService(RoomTypeNameAdminService roomTypeNameAdminService) {
        this.roomTypeNameAdminService = roomTypeNameAdminService;
    }

    @RequestMapping(value = "/getRoomTypeNameDisplayText", method = RequestMethod.POST)
    public String getRoomTypeNameDisplayText(String strChannel, String strLanguage, Boolean bCreateNew) throws Exception {
        bCreateNew = (bCreateNew == null) ? false : bCreateNew;
        Vector<RoomTypeNameDisplayTextModel> displayTextList = null;
        try {
            Channel channel = fromJson(strChannel, Channel.class);
            Language language = fromJson(strLanguage, Language.class);
            displayTextList = roomTypeNameAdminService.getDisplayTextData(channel, language.getCode(), bCreateNew);
        } catch (RDTextNotFoundException e) {
            if (bCreateNew) {
                bCreateNew = false;
                return gsonStream(new HashMap<>().put("bCreateNew", bCreateNew));
            } else {
                return "copyTheText";
            }
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return RFPConstants.FATAL_ERROR;
        }
        return gsonStream(displayTextList);
    }

    @RequestMapping(value = "/updateDisplayText", method = RequestMethod.POST)
    public String updateDisplayText(String strChannel, String strLanguage, String strTheText) {
        Channel channel = fromJson(strChannel, Channel.class);
        Language language = fromJson(strLanguage, Language.class);
        Type collectionType = new TypeToken<Map<String, RoomTypeNameDisplayTextElementModel>>() {
        }.getType();
        Map<String, RoomTypeNameDisplayTextElementModel> theText = (Map<String, RoomTypeNameDisplayTextElementModel>) fromJson(strTheText, collectionType);
        roomTypeNameAdminService.updateDisplayTextData(channel, language.getCode(), theText, getUsername());
        return RFPConstants.SUCCESS;
    }


}
