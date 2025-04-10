package com.marriott.rfp.webapp.rd.roomtypename.controller;

import com.google.gson.reflect.TypeToken;
import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RoomTypeNameService;
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

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD"})
@RestController
@RequestMapping("roomtypenamehoteldefinition")
public class HotelRoomTypeNameDefinitionController extends BaseRoomTypeNameDefinitionController {

    private static final Logger log = LoggerFactory.getLogger(HotelRoomTypeNameDefinitionController.class);
    private static final String LEVEL="hotel";

    public HotelRoomTypeNameDefinitionController() {
        super();
        boolean showHotelInstructions=true;
    }

    @Autowired
    public HotelRoomTypeNameDefinitionController(RoomTypeNameService roomTypeNameService) {
        super(roomTypeNameService);
        boolean showHotelInstructions=true;
    }

    @RequestMapping(value = "/getRoomNameDefine", method = {RequestMethod.POST, RequestMethod.GET})
    public String getRoomNameDefine(String roomPool, String marshaCode, String hotelName, String screenid) throws Exception {
        try {
            boolean isReadOnly=getUserProperties().getIsReadOnly() || getUserProperties().getIsDBMarsha();
            boolean showHotelInstructions=true;
            RoomTypeNameDataView roomTypeNameDataView=getRoomTypeNameService().getHotelDataForDefinition(marshaCode, roomPool,screenid);
            getDefinitionData(roomPool, marshaCode ,screenid);
            Map<String, Object> info = new HashMap<>();
            info.put("readOnly", isReadOnly);
            info.put("roomTypeNameDataView", roomTypeNameDataView);
            info.put("showHotelInstructions", showHotelInstructions);
            info.put("level", LEVEL);
            return objectMapperStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


    @RequestMapping(value = "/updateDefinition", method = RequestMethod.POST)
    public String updateDefinition(String roomPool, String marshaCode, String formChg, String strRoomTypeNameDefinition) throws Exception {
        try {
            Type collectionType = new TypeToken<Map<String, RoomTypeNameDefinitionUpdateView>>() {
            }.getType();
            Map<String, RoomTypeNameDefinitionUpdateView> roomTypeNameDefinition = fromJson(strRoomTypeNameDefinition, collectionType);
            if (formChg != null && formChg.equals("Y") && !(getUserProperties().getIsReadOnly() || getUserProperties().getIsDBMarsha()))
                getRoomTypeNameService().updateHotelRoomTypeNameDefinition(marshaCode, roomPool, roomTypeNameDefinition, getUserProperties().getEid());
            return SUCCESS;
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


    @Override
    public void  getDefinitionData(String roomPool, String marshaCode, String screenid) {
        RoomTypeNameDataView roomTypeNameDataView=getRoomTypeNameService().getHotelDataForDefinition(marshaCode, roomPool,screenid);
    }

    @Override
    public void getDefinitionData() {
        String roomPool="";
        String screenid="";
        RoomTypeNameDataView roomTypeNameDataView=getRoomTypeNameService().getMasterDataForDefinition(roomPool, screenid);
    }
}
