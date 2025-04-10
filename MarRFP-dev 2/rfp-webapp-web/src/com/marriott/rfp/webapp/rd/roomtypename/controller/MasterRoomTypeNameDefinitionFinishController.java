package com.marriott.rfp.webapp.rd.roomtypename.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RoomTypeNameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR"})
@RestController
@RequestMapping("roomtypenamemasterfinish")
public class MasterRoomTypeNameDefinitionFinishController extends BaseRoomTypeNameDefinitionFinishController {

    public MasterRoomTypeNameDefinitionFinishController() {
        super();
    }

    @Autowired
    public MasterRoomTypeNameDefinitionFinishController(RoomTypeNameService roomTypeNameService) {
        super(roomTypeNameService);
        String level="master";
    }

	@RequestMapping(value = "/getRoomTypeNameFinish", method = RequestMethod.GET)
	public String getRoomTypeNameFinish(String roomPool, String marshaCode, String hotelName, Long screenid) throws Exception {
		return super.getRoomTypeNameFinish(roomPool);
	}
}
