package com.marriott.rfp.webapp.rd.roomtypename.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RoomTypeNameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.marriott.rfp.object.rd.common.RoomPool;

import java.util.Vector;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD"})
@RestController
@RequestMapping("roomtypenamehotelroompool")
public class HotelRoomTypeNameRoomPoolListController extends BaseRoomPoolListController {

    public HotelRoomTypeNameRoomPoolListController() {
        super();
    }

    @Autowired
    public HotelRoomTypeNameRoomPoolListController(RoomTypeNameService roomTypeNameService) {
        super(roomTypeNameService);
        String level="hotel";
    }

    public Vector<RoomPool> retrieveRoomPoolList(String marshaCode) {
        return getRoomTypeNameService().getHotelRoomPoolList(marshaCode);
    }

    @Override
    public Vector<RoomPool> retrieveRoomPoolList() {
        return getRoomTypeNameService().getMasterRoomPoolList();
    }

    @RequestMapping(value = "/getRetrieveRoomPoolList", method = RequestMethod.GET)
    public String getRetrieveRoomPoolList(String marshaCode, String hotelName) throws Exception {
        return super.getRetrieveRoomPoolList(marshaCode, hotelName);
    }
}
