package com.marriott.rfp.webapp.rd.roomdef.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.constants.api.ConstantsService;
import com.marriott.rfp.business.rd.api.RoomDefService;
import com.marriott.rfp.object.roomdef.RoomDefDataView;
import com.marriott.rfp.object.roomdef.RoomDefDefinitionUpdateView;
import com.marriott.rfp.object.roomdef.RoomDefLinks;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD", "MFPKORAD"})
@RestController
@RequestMapping("roomdefhoteldefinition")
public class HotelRoomDefDefinitionController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(HotelRoomDefDefinitionController.class);
    @Autowired
    private RoomDefService roomDefService = null;

    @Autowired
    private ConstantsService constantsService;

    public HotelRoomDefDefinitionController() {
        super();
    }

    public HotelRoomDefDefinitionController(RoomDefService roomDefService) {
        super();
        this.roomDefService = roomDefService;
    }

    @RequestMapping(value = "/getHotelRoomDefDefinition", method = {RequestMethod.GET, RequestMethod.POST})
    public String getHotelRoomDefDefinition(String roomPool, String marshaCode, Boolean newInd, String hotelName, String screenid) throws Exception {
        boolean isReadOnly = false;
        RoomDefDataView roomDefDataView=null;
        RoomDefLinks roomDefLinks=null;
        newInd=(newInd==null)?false:newInd;
        try {
            isReadOnly = getUserProperties().getIsReadOnly() || getUserProperties().getIsDBMarsha();
            roomDefDataView = roomDefService.getHotelDataForDefinition(marshaCode, roomPool, newInd, screenid);
            roomDefLinks = constantsService.getRoomDefLinks();
            Map<String, Object> info = new HashMap<>();
            info.put("isReadOnly", isReadOnly);
            info.put("RoomDefDataView", roomDefDataView);
            info.put("roomDefLinks",roomDefLinks);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateDefinition", method = RequestMethod.POST)
    public String updateDefinition(String roomPool, String marshaCode, String strRoomDefDefinition, String formChg) throws Exception {
        Map<String, RoomDefDefinitionUpdateView> roomDefDefinition = null;
        Map<String, RoomDefDefinitionUpdateView> roomDefDefinitionNew1 = null;
        try {
            boolean updateSyncsOnly = true;
            Type collectionType = new TypeToken<Map<String, RoomDefDefinitionUpdateView>>() {
            }.getType();
            roomDefDefinition = fromJson(strRoomDefDefinition, collectionType);
            if (formChg.equals("Y") || findMustComplete(roomDefDefinition))
                updateSyncsOnly = false;
            try {
                if (roomDefDefinition != null) {
                    Map<String, RoomDefDefinitionUpdateView>  roomDefDefinitionNew = new HashMap<String, RoomDefDefinitionUpdateView>();
                    roomDefDefinition.forEach((key, value) -> {
                        key = key.replace('Z', ' ');
                        roomDefDefinitionNew.put(key, value);
                    });
                    roomDefDefinitionNew1 = roomDefDefinitionNew;
                }

            } catch (Exception e) {
                log.error(e.getMessage(),e);
            }
            roomDefService.updateRoomPoolDefinition(marshaCode, roomPool,  roomDefDefinitionNew1, updateSyncsOnly, getUsername());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    private boolean findMustComplete(Map<String, RoomDefDefinitionUpdateView> roomDefDefinition) {
        boolean mustComplete = false;
        // If there are any mustCompletes an Update must be sent
        if (roomDefDefinition != null) {
            for (Iterator<Entry<String, RoomDefDefinitionUpdateView>> it = roomDefDefinition.entrySet().iterator(); it.hasNext(); ) {
                Entry<String, RoomDefDefinitionUpdateView> entry = (Entry<String, RoomDefDefinitionUpdateView>) it.next();
                RoomDefDefinitionUpdateView roomDefData = entry.getValue();
                if (roomDefData.getMustComplete().equals("true")) {
                    mustComplete = true;
                    break;
                }
            }
        }
        return mustComplete;
    }



    public RoomDefService getRoomDefService() {
        return roomDefService;
    }

    public void setRoomDefService(RoomDefService roomDefService) {
        this.roomDefService = roomDefService;
    }



}
