package com.marriott.rfp.webapp.rd.roomtypename.controller;

import com.marriott.rfp.business.rd.api.RoomTypeNameService;
import com.marriott.rfp.object.rd.common.RoomPool;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Vector;

public abstract class BaseRoomPoolListController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(BaseRoomPoolListController.class);
    @Autowired
    private RoomTypeNameService roomTypeNameService = null;


    public BaseRoomPoolListController() {
        super();
    }

    public BaseRoomPoolListController(RoomTypeNameService roomTypeNameService) {
        super();
        this.roomTypeNameService = roomTypeNameService;
    }

    public String getRetrieveRoomPoolList() throws Exception {
        try {
            Vector<RoomPool> roomPoolList = retrieveRoomPoolList();
            return objectMapperStream(roomPoolList);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }

    }

    public String getRetrieveRoomPoolList(String marshaCode, String hotelName) throws Exception {
        try {
            Vector<RoomPool> roomPoolList =   retrieveRoomPoolList(marshaCode);
            return objectMapperStream(roomPoolList);
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

    public abstract Vector<RoomPool> retrieveRoomPoolList(String marshaCode);

    public abstract Vector<RoomPool>  retrieveRoomPoolList();


}
