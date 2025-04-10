package com.marriott.rfp.webapp.rd.admin.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RDTextNotFoundException;
import com.marriott.rfp.business.rd.api.RoomDefAdminService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Language;
import com.marriott.rfp.object.roomdef.displaytext.DisplayTextElementModel;
import com.marriott.rfp.object.roomdef.displaytext.DisplayTextModel;
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

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPKORAD"})
@RestController
@RequestMapping("roomdeftextdata")
public class RoomDefDisplayTextDataController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(RoomDefDisplayTextDataController.class);
    @Autowired
    private RoomDefAdminService roomDefAdminService = null;

    public RoomDefDisplayTextDataController() {
        super();
    }

    public RoomDefDisplayTextDataController(RoomDefAdminService roomDefAdminService) {
        super();
        this.roomDefAdminService = roomDefAdminService;
    }

    public RoomDefAdminService getroomDefAdminService() {
        return roomDefAdminService;
    }

    @RequestMapping(value = "/getRoomDefDisplayData", method = RequestMethod.POST)
    public String getRoomDefDisplayData(String strChannel, String strLanguage, Boolean bCreateNew) throws Exception {
        Vector<DisplayTextModel> displayTextList=null;
        try {
            Channel channel = fromJson(strChannel, Channel.class);
            Language language = fromJson(strLanguage, Language.class);
            displayTextList = roomDefAdminService.getDisplayTextData(channel, language.getCode(), bCreateNew);
        } catch (RDTextNotFoundException e) {
            if (bCreateNew) {
                bCreateNew = false;
                return objectMapperStream(new HashMap<>().put("bCreateNew", bCreateNew));
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
        Type collectionType = new TypeToken<Map<String, DisplayTextElementModel>>() {
        }.getType();
        Map<String, DisplayTextElementModel> theText = (Map<String, DisplayTextElementModel>) fromJson(strTheText, collectionType);
        roomDefAdminService.updateDisplayTextData(channel, language.getCode(), theText, getUsername());
        return RFPConstants.SUCCESS;
    }

    public void setroomDefAdminService(RoomDefAdminService roomDefAdminService) {
        this.roomDefAdminService = roomDefAdminService;
    }
}
