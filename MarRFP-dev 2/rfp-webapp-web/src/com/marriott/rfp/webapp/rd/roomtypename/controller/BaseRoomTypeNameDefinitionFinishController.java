package com.marriott.rfp.webapp.rd.roomtypename.controller;

import com.marriott.rfp.business.rd.api.RoomTypeNameService;
import com.marriott.rfp.object.roomtypename.RoomTypeNameDataView;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseRoomTypeNameDefinitionFinishController extends BaseController {
    private static final Logger log = LoggerFactory.getLogger(BaseRoomTypeNameDefinitionFinishController.class);
    @Autowired
    private RoomTypeNameService roomTypeNameService = null;


    public BaseRoomTypeNameDefinitionFinishController() {
        super();
    }

    public BaseRoomTypeNameDefinitionFinishController(RoomTypeNameService roomTypeNameService) {
        super();
        this.roomTypeNameService = roomTypeNameService;
    }

    public String getRoomTypeNameFinish(String roomPool) throws Exception {
        try {
            RoomTypeNameDataView  roomTypeNameDataView = roomTypeNameService.getDataForMenuOnly(roomPool);
            return gsonStream(roomTypeNameDataView);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setRoomTypeNameService(RoomTypeNameService roomTypeNameService) {
        this.roomTypeNameService = roomTypeNameService;
    }

    public RoomTypeNameService getRoomTypeNameService() {
        return roomTypeNameService;
    }

}
