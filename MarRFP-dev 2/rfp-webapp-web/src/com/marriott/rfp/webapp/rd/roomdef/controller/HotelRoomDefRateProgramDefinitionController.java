package com.marriott.rfp.webapp.rd.roomdef.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RoomDefService;
import com.marriott.rfp.object.roomdef.RoomDefDataView;
import com.marriott.rfp.object.roomdef.RoomDefDefinitionUpdateView;
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

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD", "MFPKORAD"})
@RestController
@RequestMapping("/roomdefhotelrateprogramdefinition")
public class HotelRoomDefRateProgramDefinitionController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelRoomDefRateProgramDefinitionController.class);
    @Autowired
    private RoomDefService roomDefService = null;


    public HotelRoomDefRateProgramDefinitionController() {
        super();
    }

    public HotelRoomDefRateProgramDefinitionController(RoomDefService roomDefService) {
        super();
        this.roomDefService = roomDefService;
    }

    @RequestMapping(value = "/getDefinition", method = RequestMethod.GET)
    public String getDefinition(String marshaCode, String roomPool, String rateProgram, String screenid) throws Exception {
        boolean isReadOnly = false;
        RoomDefDataView roomDefDataView=null;
        try {
            if (screenid == null || screenid.equals(""))
                screenid = "1";
            isReadOnly = getUserProperties().getIsReadOnly() || getUserProperties().getIsDBMarsha();
            roomDefDataView = roomDefService.getHotelDataForDefinition(marshaCode, roomPool, rateProgram, screenid);
            Map<String, Object> info = new HashMap<>();
            info.put("screenid",screenid);
            info.put("isReadOnly",isReadOnly);
            info.put("roomDefDataView",roomDefDataView);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateDefinition", method = RequestMethod.POST)
    public String updateDefinition(String marshaCode, String roomPool, String rateProgram, String strRoomDefDefinition, String formChg) throws Exception {
        Map<String, RoomDefDefinitionUpdateView> roomDefDefinition=null;
        try {
            boolean updateSyncsOnly = true;
            if (formChg.equals("Y")) {
                updateSyncsOnly = false;
            }
            Type collectionType = new TypeToken<Map<String, RoomDefDefinitionUpdateView>>() {
            }.getType();
            roomDefDefinition = (Map<String, RoomDefDefinitionUpdateView>)fromJson(strRoomDefDefinition, collectionType);
            roomDefService.updateRateProgramDefinition(marshaCode, roomPool, rateProgram, roomDefDefinition, updateSyncsOnly, getUsername());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }



    public RoomDefService getRoomDefService() {
        return roomDefService;
    }

    public void setRoomDefService(RoomDefService roomDefService) {
        this.roomDefService = roomDefService;
    }


}
