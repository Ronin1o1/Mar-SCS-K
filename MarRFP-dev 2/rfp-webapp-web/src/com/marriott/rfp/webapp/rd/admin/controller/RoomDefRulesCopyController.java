package com.marriott.rfp.webapp.rd.admin.controller;

import com.marriott.rfp.annotation.Security;
import com.marriott.rfp.business.rd.api.RDRulesNotFoundException;
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
@RequestMapping("roomdefrulescopy")
public class RoomDefRulesCopyController extends BaseRulesCopyController {

    @Autowired
    private RoomDefAdminService roomDefAdminService = null;

    public RoomDefRulesCopyController() {
        super();
    }

    @Autowired
    public RoomDefRulesCopyController(RoomDefAdminService roomDefAdminService) {
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
    public void copyRules(Channel channel, Entry entry, Channel copychannel, Entry copyentry) throws RDRulesNotFoundException {
        roomDefAdminService.copyDisplayRules(channel, entry,copychannel, copyentry, getUsername());

    }

    @RequestMapping(value = "/getRulesCopy", method = RequestMethod.GET)
    public String getRulesCopy(String strChannel, String strEntry) throws Exception {
        return super.getRulesCopy(strChannel, strEntry);
    }

    @RequestMapping(value = "/copyIntoRules", method = RequestMethod.POST)
    public String copyIntoRules(String strChannel, String strCopyChannel, String strCopyEntry,String strEntry,Boolean copyRulesExist) throws Exception {
        copyRulesExist=(copyRulesExist==null)?true:copyRulesExist;
        return super.copyIntoRules(strChannel, strCopyChannel, strCopyEntry, strEntry,copyRulesExist);
    }
}
