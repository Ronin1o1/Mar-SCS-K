package com.marriott.rfp.webapp.rd.roomdef.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RoomDefService;
import com.marriott.rfp.object.rd.common.RoomPool;
import com.marriott.rfp.object.roomdef.RoomDefLinks;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Vector;

@RestController
@RequestMapping("roomdefhotelroompool")
@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD", "MFPKORAD"})
public class HotelRoomDefRoomPoolListController extends BaseController {

    @Autowired
    private RoomDefService roomDefService = null;

    public HotelRoomDefRoomPoolListController() {
        super();
    }

    public HotelRoomDefRoomPoolListController(RoomDefService roomDefService) {
        this.roomDefService = roomDefService;
    }

    @RequestMapping(value = "/getHotelRoomPool", method = RequestMethod.GET)
    public String getHotelRoomPool(String marshaCode) throws Exception {
        Vector<RoomPool> roomPoolList = roomDefService.getHotelRoomPoolList(marshaCode);
        return objectMapperStream(roomPoolList);
    }


}
