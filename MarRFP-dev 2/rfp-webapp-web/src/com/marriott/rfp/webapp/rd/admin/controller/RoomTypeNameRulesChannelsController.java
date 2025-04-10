package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RoomTypeNameAdminService;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM"})
@RestController
@RequestMapping("roomtypenamerules")
public class RoomTypeNameRulesChannelsController extends BaseRulesChannelsController {

    @Autowired
    private RoomTypeNameAdminService roomTypeNameAdminService = null;

    public RoomTypeNameRulesChannelsController() {
        super();
    }

    @Autowired
    public RoomTypeNameRulesChannelsController(RoomTypeNameAdminService roomTypeNameAdminService) {
        super();
        this.roomTypeNameAdminService = roomTypeNameAdminService;
    }

    public RoomTypeNameAdminService getroomTypeNameAdminService() {
        return roomTypeNameAdminService;
    }

    public void setroomTypeNameAdminService(RoomTypeNameAdminService roomTypeNameAdminService) {
        this.roomTypeNameAdminService = roomTypeNameAdminService;
    }

    @Override
    public MI_HotelRoomProductInfoChannelsRS retrieveChannelList() {
        MI_HotelRoomProductInfoChannelsRS channelList=roomTypeNameAdminService.getChannels();
        return channelList;
    }

    @Override
    public MI_HotelRoomProductInfoEntriesRS retrieveEntryList() {
        MI_HotelRoomProductInfoEntriesRS entryList=roomTypeNameAdminService.getEntries();
        return entryList;

    }

    @Override
    public void deleteTheRules(Channel channel, Entry entry) {
        roomTypeNameAdminService.deleteDisplayRules(channel, entry, getUsername());
    }

    @RequestMapping(value = "/getRulesChannel", method = RequestMethod.GET)
    public String getRulesChannel(String strChannel, String strEntry) throws Exception {
        return super.getRulesChannel();
    }

    @RequestMapping(value = "/getRoomEntries", method = RequestMethod.POST)
    public String getRoomEntries() throws Exception {
        return super.getRoomEntries();
    }

    @RequestMapping(value = "/getDeleteRules", method = RequestMethod.POST)
    public String getDeleteRules(String strChannel, String strEntry) {
        return super.getDeleteRules(strChannel, strEntry);
    }
}
