package com.marriott.rfp.webapp.rd.roomtypename.controller;

import com.marriott.rfp.business.rd.api.RoomTypeNameService;
import com.marriott.rfp.object.roomtypename.RoomTypeNameDataView;
import com.marriott.rfp.object.roomtypename.RoomTypeNameDefinitionUpdateView;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

public abstract class BaseRoomTypeNameDefinitionController extends BaseController {

    @Autowired
    private RoomTypeNameService roomTypeNameService = null;

    public BaseRoomTypeNameDefinitionController() {
        super();
    }

    public BaseRoomTypeNameDefinitionController(RoomTypeNameService roomTypeNameService) {
        super();
        this.roomTypeNameService = roomTypeNameService;
    }

    public abstract void getDefinitionData(String roomPool, String marshaCode , String screenid);

    public abstract void getDefinitionData();

    public RoomTypeNameService getRoomTypeNameService() {
        return roomTypeNameService;
    }

    public void setRoomTypeNameService(RoomTypeNameService roomTypeNameService) {
        this.roomTypeNameService = roomTypeNameService;
    }

}
