package com.marriott.rfp.webapp.rd.roomtypename.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RoomTypeNameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD"})
@RestController
@RequestMapping("roomtypenamehotelfinish")
public class HotelRoomTypeNameDefinitionFinishController extends BaseRoomTypeNameDefinitionFinishController {


    public HotelRoomTypeNameDefinitionFinishController() {
        super();
    }

    @Autowired
    public HotelRoomTypeNameDefinitionFinishController(RoomTypeNameService roomTypeNameService) {
        super(roomTypeNameService);
        String level="hotel";
    }

    @RequestMapping(value = "/getRoomTypeNameFinish", method = RequestMethod.GET)
    public String getRoomTypeNameFinish(String roomPool, String marshaCode, String hotelName, Long screenid) throws Exception {
        return super.getRoomTypeNameFinish(roomPool);
    }
}
