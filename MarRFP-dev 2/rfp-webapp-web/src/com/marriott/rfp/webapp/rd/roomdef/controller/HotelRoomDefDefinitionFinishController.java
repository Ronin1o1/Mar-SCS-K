package com.marriott.rfp.webapp.rd.roomdef.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RoomDefService;
import com.marriott.rfp.object.roomdef.RoomDefSyncAlerts;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Vector;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD", "MFPKORAD"})
@RestController
@RequestMapping("/roomdefhotelfinish")
public class HotelRoomDefDefinitionFinishController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelRoomDefDefinitionFinishController.class);
    @Autowired
    private RoomDefService roomDefService;

    public HotelRoomDefDefinitionFinishController() {
        super();
    }

    @Autowired
    public HotelRoomDefDefinitionFinishController(RoomDefService roomDefService) {
        super();
        this.roomDefService = roomDefService;
    }

    @RequestMapping(value = "/getFinishProduct", method = GET)
    public String getFinishProduct(String marshaCode, String roomPool) throws Exception {
        Vector<RoomDefSyncAlerts> syncAlerts=null;
        try {
            syncAlerts=roomDefService.getHotelSyncAlerts(marshaCode, roomPool);
            return gsonStream(syncAlerts);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }

    public void setRoomDefService(RoomDefService roomDefService) {
        this.roomDefService = roomDefService;
    }

    public RoomDefService getRoomDefService() {
        return roomDefService;
    }



}
