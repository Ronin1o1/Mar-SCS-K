package com.marriott.rfp.webapp.rd.roomtypename.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RoomTypeNameService;
import com.marriott.rfp.common.util.RFPConstants;
import com.marriott.rfp.object.roomtypename.RoomTypeNameDataView;
import com.marriott.rfp.object.roomtypename.RoomTypeNameDefinitionUpdateView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR"})
@RestController
@RequestMapping("roomtypenamemasterdefinition")
public class MasterRoomTypeNameDefinitionController extends BaseRoomTypeNameDefinitionController {

    private static final String LEVEL="master";

    private static final Logger log = LoggerFactory.getLogger(MasterRoomTypeNameDefinitionController.class);
    public MasterRoomTypeNameDefinitionController() {
        super();
    }

    @Autowired
    public MasterRoomTypeNameDefinitionController(RoomTypeNameService roomTypeNameService) {
        super(roomTypeNameService);
        boolean showHotelInstructions=false;
    }

    public void getDefinitionData() {
        String roomPool="";
        String screenid="";
        RoomTypeNameDataView roomTypeNameDataView=getRoomTypeNameService().getMasterDataForDefinition(roomPool,screenid);
    }

    @RequestMapping(value = "/getRoomNameDefine", method = {RequestMethod.POST, RequestMethod.GET})
    public String getRoomNameDefine(String roomPool, String screenid) throws Exception {
        try {
            boolean showHotelInstructions=false;
            boolean isReadOnly=getUserProperties().getIsReadOnly();
            RoomTypeNameDataView roomTypeNameDataView = getRoomTypeNameService().getMasterDataForDefinition(roomPool,screenid);
            Map<String, Object> info = new HashMap<>();
            info.put("readOnly", isReadOnly);
            info.put("roomTypeNameDataView", roomTypeNameDataView);
            info.put("showHotelInstructions", showHotelInstructions);
            info.put("level", LEVEL);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
           return RFPConstants.FATAL_ERROR;
        }
    }

    @RequestMapping(value = "/updateDefinition", method = RequestMethod.POST)
    public String updateDefinition(String strRoomTypeNameDefinition, String formChg, String roomPool) throws Exception {

        Type collectionType = new TypeToken<Map<String, RoomTypeNameDefinitionUpdateView>>() {
        }.getType();
        Map<String, RoomTypeNameDefinitionUpdateView> roomTypeNameDefinition = fromJson(strRoomTypeNameDefinition, collectionType);
        if (formChg != null && formChg.equals("Y"))
            getRoomTypeNameService().updateMasterRoomTypeNameDefinition(roomPool, roomTypeNameDefinition, getUserProperties().getEid());
        return RFPConstants.SUCCESS;
    }


    @Override
    public void getDefinitionData(String roomPool, String marshaCode, String screenid) {
        RoomTypeNameDataView roomTypeNameDataView=getRoomTypeNameService().getMasterDataForDefinition(roomPool,screenid);
    }
}
