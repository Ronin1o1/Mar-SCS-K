package com.marriott.rfp.webapp.rd.roomdef.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RoomDefService;
import com.marriott.rfp.object.rd.common.RateProgram;
import com.marriott.rfp.object.roomdef.RoomDefDataView;
import com.marriott.rfp.webapp.common.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPDBMAR", "MFPUSER", "MFP3RHTL", "MFPREAD", "MFPKORAD"})
@RestController
@RequestMapping("/roomdefhotelrateprogram")
public class HotelRoomDefRateProgramListController extends BaseController {

    private static final Logger log = LoggerFactory.getLogger(HotelRoomDefRateProgramListController.class);
    @Autowired
    private RoomDefService roomDefService = null;
    private static final int MAX_RPGMS_DEFINED = 10;

    public HotelRoomDefRateProgramListController() {
        super();
    }
    @Autowired
    public HotelRoomDefRateProgramListController(RoomDefService roomDefService) {
        super();//Added super
        this.roomDefService = roomDefService;
    }

    @RequestMapping(value = "/getDefRatePrograms", method = GET)
    public String getDefRatePrograms(String marshaCode, String roomPool) throws Exception {
        try {
            RoomDefDataView roomDefDataView = roomDefService.getHotelMenuForDefinition(marshaCode, roomPool);
            Vector<RateProgram> rateProgramList = roomDefService.getHotelRateProgramList(marshaCode, roomPool);
            boolean allowViewAllRatePrograms = setAllowViewRatePrograms(rateProgramList);
            Map<String, Object> info = new HashMap<>();
            info.put("RateProgramList", rateProgramList);
            info.put("AllowViewAllRateProgram", allowViewAllRatePrograms);
            info.put("roomDefDataView", roomDefDataView);
            return gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


    @RequestMapping(value = "/getDeleteRateProgramDefinition", method = POST)
    public String getDeleteRateProgramDefinition(String marshaCode, String roomPool,String rateProgram) throws Exception {
        try {
            roomDefService.removeRateLevel(marshaCode, roomPool, rateProgram, getUsername());
            RoomDefDataView roomDefDataView = roomDefService.getHotelMenuForDefinition(marshaCode, roomPool);
            Vector<RateProgram> rateProgramList =  roomDefService.getHotelRateProgramList(marshaCode, roomPool);
            boolean allowViewAllRatePrograms = setAllowViewRatePrograms(rateProgramList);
            Map<String, Object> info = new HashMap<>();
            info.put("RateProgramList", rateProgramList);
            info.put("AllowViewAllRateProgram",allowViewAllRatePrograms );
            info.put("roomDefDataView", roomDefDataView);
           return  gsonStream(info);
        } catch (Exception e) {
            log.error(e.getMessage(),e);
            return FATAL_ERROR;
        }
    }


    public boolean setAllowViewRatePrograms(Vector<RateProgram> rateProgramList) {
        boolean allowViewAllRatePrograms = true;
        if (rateProgramList != null && rateProgramList.size() > MAX_RPGMS_DEFINED) {
            int numDefs = 0;
            for (int i = 0; i < rateProgramList.size(); i++) {
                if (((RateProgram) rateProgramList.elementAt(i)).getHasRoomDefinition())
                    numDefs++;
            }
            if (MAX_RPGMS_DEFINED <= numDefs)
                allowViewAllRatePrograms = false;
        }
        return allowViewAllRatePrograms;
    }


    public RoomDefService getRoomDefService() {
        return roomDefService;
    }

    public void setRoomDefService(RoomDefService roomDefService) {
        this.roomDefService = roomDefService;
    }

}
