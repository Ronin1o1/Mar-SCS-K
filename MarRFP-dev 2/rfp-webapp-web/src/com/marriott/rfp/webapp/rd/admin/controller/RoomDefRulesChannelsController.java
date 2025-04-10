package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RoomDefAdminService;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Security({"MFPADMIN", "MFPRDADM", "MFPPPADM", "MFPKORAD"})
@RestController
@RequestMapping("roomdefrules")
public class RoomDefRulesChannelsController extends BaseRulesChannelsController {

    @Autowired
    private RoomDefAdminService roomDefAdminService = null;

    public RoomDefRulesChannelsController() {
        super();
    }

    @Autowired
    public RoomDefRulesChannelsController(RoomDefAdminService roomDefAdminService) {
        super();
        this.roomDefAdminService = roomDefAdminService;
    }

    public RoomDefAdminService getroomDefAdminService() {
        return roomDefAdminService;
    }

    public void setroomDefAdminService(RoomDefAdminService roomDefAdminService) {
        this.roomDefAdminService = roomDefAdminService;
    }

    @Override
    public MI_HotelRoomProductInfoChannelsRS retrieveChannelList() {
        MI_HotelRoomProductInfoChannelsRS channelList=roomDefAdminService.getChannels();
        return channelList;

    }

    @Override
    public MI_HotelRoomProductInfoEntriesRS retrieveEntryList() {
        MI_HotelRoomProductInfoEntriesRS entryList=roomDefAdminService.getEntries();
        return entryList;
    }

    @Override
    public void deleteTheRules(Channel channel, Entry entry) {
        roomDefAdminService.deleteDisplayRules(channel, entry, getUsername());
    }

    @RequestMapping(value = "/getRulesChannel", method = RequestMethod.GET)
    public String getRulesChannel() throws Exception {
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
