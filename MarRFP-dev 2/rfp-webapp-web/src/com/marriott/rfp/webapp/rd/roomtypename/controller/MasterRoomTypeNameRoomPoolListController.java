package com.marriott.rfp.webapp.rd.roomtypename.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RoomTypeNameService;
import com.marriott.rfp.object.rd.common.RoomPool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Vector;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR"})
@RestController
@RequestMapping("roomtypenamemasterroompool")
public class MasterRoomTypeNameRoomPoolListController extends BaseRoomPoolListController {

    public MasterRoomTypeNameRoomPoolListController() {
        super();
    }

    @Autowired
    public MasterRoomTypeNameRoomPoolListController(RoomTypeNameService roomTypeNameService) {
        super(roomTypeNameService);
        String level="master";
    }

    @Override
    public Vector<RoomPool> retrieveRoomPoolList() {
        return getRoomTypeNameService().getMasterRoomPoolList();
    }

    @Override
    public Vector<RoomPool> retrieveRoomPoolList(String marshaCode) {
        return getRoomTypeNameService().getHotelRoomPoolList(marshaCode);
    }

    @RequestMapping(value = "/getRetrieveRoomPoolList", method = RequestMethod.GET)
    public String getRetrieveRoomPoolList() throws Exception {
        return super.getRetrieveRoomPoolList();
    }
}
